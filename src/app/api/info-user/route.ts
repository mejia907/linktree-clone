import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getAuth } from "@clerk/nextjs/server"


export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req)

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    let user = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        links: true,
      },
    })

    // Si el usuario no existe
    if (!user) {
      user = await db.user.create({
        data: {
          id: userId,
          name: "User",
          username: `user-${userId}`,
          links: {
            create: [],
          },
        },
        include: {
          links: true,
        },
      })
    }
    return NextResponse.json(user)

  } catch (error) {
    return NextResponse.json({ message: "Error obteniendo información del usuario" }, { status: 500 })
  }
}