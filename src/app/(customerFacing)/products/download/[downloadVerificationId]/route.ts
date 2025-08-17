import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { downloadVerificationId: string } }
) {
  const { downloadVerificationId } = params;

  if (!downloadVerificationId) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const data = await db.downloadVerification.findUnique({
    where: { id: downloadVerificationId, expiresAt: { gt: new Date() } },
    select: { product: { select: { filePath: true, name: true } } },
  });

  if (!data) {
    return NextResponse.redirect(new URL("/products/download/expired", req.url));
  }

  try {
    // If it's a Cloudinary URL, redirect to it
    if (data.product.filePath.includes('cloudinary.com')) {
      return NextResponse.redirect(data.product.filePath);
    }

    // Fallback for local files (if any exist)
    const response = await fetch(data.product.filePath);
    if (!response.ok) {
      throw new Error('File not found');
    }

    const fileBuffer = await response.arrayBuffer();
    const extension = data.product.filePath.split(".").pop() || 'pdf';

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Disposition": `attachment; filename="${data.product.name}.${extension}"`,
        "Content-Length": fileBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("File download error:", error);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
