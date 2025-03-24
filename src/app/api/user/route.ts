import { NextRequest, NextResponse } from "next/server"
import { getAuth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"

interface Link {
  name: string
  icon: string
  link: string
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req)

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const dataUser = await req.json()
    const { name, userName, avatarUrl, links, typeUser } = dataUser

    // Obtener el usuario con sus links actuales
    const existingUser = await db.user.findUnique({
      where: { id: userId },
      include: { links: true },
    })

    if (!existingUser) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 })
    }

    // Comparar links actuales con los nuevos
    const existingLinksMap = new Map(existingUser.links.map((l) => [l.name, l]))

    const linksToUpdate = links.filter((link: Link) => existingLinksMap.has(link.name))
    const linksToCreate = links.filter((link: Link) => !existingLinksMap.has(link.name))

    // Actualizar los links existentes
    for (const link of linksToUpdate) {
      await db.link.update({
        where: { id: existingLinksMap.get(link.name)?.id },
        data: { link: link.link, icon: link.icon },
      })
    }

    // Crear los nuevos links
    if (linksToCreate.length > 0) {
      await db.link.createMany({
        data: linksToCreate.map((link: Link) => ({
          userId,
          name: link.name,
          icon: link.icon,
          link: link.link,
        })),
      })
    }

    // Actualizar usuario con la nueva información
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        name,
        username: userName,
        avatarUrl,
        firstLogin: false,
        typeUser,
      },
      include: { links: true },
    })

    return NextResponse.json({ message: "Usuario actualizado con éxito", data: updatedUser }, { status: 200 })

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 })
  }
}
