import { NextResponse, NextRequest } from "next/server"
import { db } from "@/lib/db"

export async function GET(req: NextRequest, { params }: { params: Promise<{ username: string }> }) {
  try {
    const { username } = await params

    if (!username) {
      return NextResponse.json({ message: "El username es obligatorio" }, { status: 400 })
    }

    const user = await db.user.findUnique({
      where: {
        username
      },
      include: {
        links: true,
      },
    })

    if (!user) {
      return NextResponse.json({ message: "El usuario no existe" }, { status: 404 })
    }

    return NextResponse.json(user)

  } catch (error) {
    return NextResponse.json({ message: "Error al obtener la información del usuario" }, { status: 500 })
  }

}