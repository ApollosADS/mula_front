import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongoDB";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 }).populate("format");
    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const form = await req.formData();
    const name = form.get("name")?.toString();
    const description = form.get("description")?.toString() || "";
    const price = Number(form.get("price"));
    const stock = Number(form.get("stock")) || 0;
    const format = form.get("format")?.toString();
    const image = form.get("image");
    const metadata = form.get("metadata")?.toString();

    if (!name || !price || !format) {
      return NextResponse.json(
        { error: "Les champs name, price et format sont obligatoires" },
        { status: 400 }
      );
    }

    let imagePath = null;

    if (image && image instanceof File) {
      const uploadsDir = path.join(process.cwd(), "public/uploads");

      // Créer le dossier uploads s'il n'existe pas
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Lire le fichier et l'écrire dans uploads
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const filename = `${Date.now()}-${image.name}`;
      const filePath = path.join(uploadsDir, filename);

      fs.writeFileSync(filePath, buffer);
      imagePath = `/uploads/${filename}`;
    }

    const productData: any = {
      name,
      description,
      price,
      stock,
      format,
    };

    if (imagePath) {
      productData.image = imagePath;
    }

    if (metadata) {
      try {
        productData.metadata = JSON.parse(metadata);
      } catch {
        productData.metadata = {};
      }
    }

    const product = await Product.create(productData);

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

