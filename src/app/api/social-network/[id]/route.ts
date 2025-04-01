import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { link } = await req.json()

    if (!id || !link) {
      return NextResponse.json({ message: "El id y el link son obligatorios" }, { status: 400 })
    }

    const updatedLink = await db.link.update({
      where: {
        id
      },
      data: {
        link: link
      },
    })
    return NextResponse.json(updatedLink, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Error al actualizar el link" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json({ message: "El id es obligatorio" }, { status: 400 })
    }

    const deletedLink = await db.link.delete({
      where: {
        id
      },
    })
    return NextResponse.json(deletedLink, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Error al eliminar el link" }, { status: 500 })
  }
}