"use server"

import db from "@/db/db"
import { z } from "zod"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary"

const fileSchema = z.instanceof(File, { message: "Required" })
const imageSchema = fileSchema.refine(
  file => file.size === 0 || file.type.startsWith("image/")
)

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  file: fileSchema.refine(file => file.size > 0, "Required"),
  image: imageSchema.refine(file => file.size > 0, "Required"),
})

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  try {
    // Upload file to Cloudinary
    const fileBuffer = Buffer.from(await data.file.arrayBuffer())
    const fileUpload = await uploadToCloudinary(fileBuffer, 'ecommerce/files')
    const filePath = fileUpload.secure_url

    // Upload image to Cloudinary
    const imageBuffer = Buffer.from(await data.image.arrayBuffer())
    const imageUpload = await uploadToCloudinary(imageBuffer, 'ecommerce/images')
    const imagePath = imageUpload.secure_url

    await db.product.create({
      data: {
        isAvailableForPurchase: false,
        name: data.name,
        description: data.description,
        priceInCents: data.priceInCents,
        filePath,
        imagePath,
      },
    })

    revalidatePath("/")
    revalidatePath("/products")

    redirect("/admin/products")
  } catch (error) {
    console.error("Upload error:", error)
    return { error: "Failed to upload files" }
  }
}

const editSchema = addSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
})

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data
  const product = await db.product.findUnique({ where: { id } })

  if (product == null) return notFound()

  try {
    let filePath = product.filePath
    if (data.file != null && data.file.size > 0) {
      // Delete old file from Cloudinary if it exists
      if (product.filePath.includes('cloudinary.com')) {
        const publicId = product.filePath.split('/').pop()?.split('.')[0]
        if (publicId) {
          await deleteFromCloudinary(`ecommerce/files/${publicId}`)
        }
      }
      
      // Upload new file
      const fileBuffer = Buffer.from(await data.file.arrayBuffer())
      const fileUpload = await uploadToCloudinary(fileBuffer, 'ecommerce/files')
      filePath = fileUpload.secure_url
    }

    let imagePath = product.imagePath
    if (data.image != null && data.image.size > 0) {
      // Delete old image from Cloudinary if it exists
      if (product.imagePath.includes('cloudinary.com')) {
        const publicId = product.imagePath.split('/').pop()?.split('.')[0]
        if (publicId) {
          await deleteFromCloudinary(`ecommerce/images/${publicId}`)
        }
      }
      
      // Upload new image
      const imageBuffer = Buffer.from(await data.image.arrayBuffer())
      const imageUpload = await uploadToCloudinary(imageBuffer, 'ecommerce/images')
      imagePath = imageUpload.secure_url
    }

    await db.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        priceInCents: data.priceInCents,
        filePath,
        imagePath,
      },
    })

    revalidatePath("/")
    revalidatePath("/products")

    redirect("/admin/products")
  } catch (error) {
    console.error("Update error:", error)
    return { error: "Failed to update product" }
  }
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.product.update({ where: { id }, data: { isAvailableForPurchase } })

  revalidatePath("/")
  revalidatePath("/products")
}

export async function deleteProduct(id: string) {
  const product = await db.product.findUnique({ where: { id } })

  if (product == null) return notFound()

  try {
    // Delete files from Cloudinary if they exist
    if (product.filePath.includes('cloudinary.com')) {
      const filePublicId = product.filePath.split('/').pop()?.split('.')[0]
      if (filePublicId) {
        await deleteFromCloudinary(`ecommerce/files/${filePublicId}`)
      }
    }

    if (product.imagePath.includes('cloudinary.com')) {
      const imagePublicId = product.imagePath.split('/').pop()?.split('.')[0]
      if (imagePublicId) {
        await deleteFromCloudinary(`ecommerce/images/${imagePublicId}`)
      }
    }

    await db.product.delete({ where: { id } })

    revalidatePath("/")
    revalidatePath("/products")
  } catch (error) {
    console.error("Delete error:", error)
    // Still delete from database even if file deletion fails
    await db.product.delete({ where: { id } })
    revalidatePath("/")
    revalidatePath("/products")
  }
}
