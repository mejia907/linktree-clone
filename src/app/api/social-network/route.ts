import { NextResponse, NextRequest } from "next/server"
import { db } from "@/lib/db"
import { getAuth } from "@clerk/nextjs/server"

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req)

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()

    const newLink = await db.link.create({
      data: {
        name: data.name,
        link: data.link,
        icon: data.icon,
        user: {
          connect: {
            id: userId
          }
        }
      }
    })

    return NextResponse.json(newLink)
  } catch (error) {
    return NextResponse.json({ message: "Error al crear el link" }, { status: 500 })
  }
}