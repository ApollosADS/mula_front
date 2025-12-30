import { NextResponse } from "next/server";
import Format from "@/models/Format";
import { connectDB } from "@/lib/mongoDB";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { volume, description, metadata } = await req.json();

    // Vérifie si volume existe
    if (!volume) {
      return NextResponse.json({ error: "Volume requis" }, { status: 400 });
    }

    const format = await Format.create({ volume, description, metadata });
    return NextResponse.json(format, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const formats = await Format.find().sort({ createdAt: -1 });
    return NextResponse.json(formats, { status: 200 });
  } catch (error: any) {
    console.error("Erreur get formats:", error);
    return NextResponse.json(
      { error: "Impossible de récupérer les formats" },
      { status: 500 }
    );
  }
}

