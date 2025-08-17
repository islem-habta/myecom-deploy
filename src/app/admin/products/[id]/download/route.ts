import db from "@/db/db";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const product = await db.product.findUnique({
    where: { id },
    select: { filePath: true, name: true },
  });

  if (product == null) return notFound();

  try {
    // If it's a Cloudinary URL, redirect to it
    if (product.filePath.includes('cloudinary.com')) {
      return NextResponse.redirect(product.filePath);
    }

    // Fallback for local files (if any exist)
    const response = await fetch(product.filePath);
    if (!response.ok) {
      throw new Error('File not found');
    }

    const fileBuffer = await response.arrayBuffer();
    const extension = product.filePath.split(".").pop() || 'pdf';
    const safeName = product.name.replace(/[^a-zA-Z0-9-_]/g, "_");

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Disposition": `attachment, filename="${safeName}.${extension}"`,
        "Content-Length": fileBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("File download error:", error);
    return notFound();
  }
}
