import db from "@/db/db";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";

export async function GET(req: NextRequest, { params: { id } }) {
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const product = await db.product.findUnique({
    where: { id },
    select: { filePath: true, name: true },
  });

  if (product == null) return notFound();

  try {
    const { size } = await fs.stat(product.filePath);
    const file = await fs.readFile(product.filePath);
    const extension = product.filePath.split(".").pop();
    const safeName = product.name.replace(/[^a-zA-Z0-9-_]/g, "_");

    return new NextResponse(file, {
      headers: {
        "Content-Disposition": `attachment, filename="${safeName}.${extension}"`,
        "Content-Length": size.toString(),
      },
    });
  } catch (error) {
    console.error("File system error:", error);
    return notFound();
  }
}
