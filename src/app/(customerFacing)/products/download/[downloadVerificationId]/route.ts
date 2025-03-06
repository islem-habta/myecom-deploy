import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } } // ✅ Ensures `id` has a defined type
) {
  if (!params.id) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const data = await db.downloadVerification.findUnique({
    where: { id: params.id, expiresAt: { gt: new Date() } },
    select: { product: { select: { filePath: true, name: true } } },
  });

  if (!data) {
    return NextResponse.redirect(new URL("/products/download/expired", req.url));
  }

  try {
    const { size } = await fs.stat(data.product.filePath);
    const file = await fs.readFile(data.product.filePath);
    const extension = data.product.filePath.split(".").pop();

    return new NextResponse(file, {
      headers: {
        "Content-Disposition": `attachment; filename="${data.product.name}.${extension}"`,
        "Content-Length": size.toString(),
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
