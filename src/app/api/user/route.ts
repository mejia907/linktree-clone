import { NextRequest, NextResponse } from "next/server"
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

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

    const dataUser = await req.json();
    const { name, userName, avatarUrl, links, typeUser } = dataUser

    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        username: userName,
        avatarUrl,
        firstLogin: false,
        typeUser,
        links: {
          create: links.map((link: Link) => ({
            icon: link.icon,
            link: link.link,
            name: link.name,
          })),
        },
      },
    })

    return NextResponse.json({ message: "Usuario creado con éxito", data: user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}
