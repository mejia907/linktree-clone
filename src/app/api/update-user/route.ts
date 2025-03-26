import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";

export async function PATCH(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const dataUser = await req.json();

    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: dataUser,
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: "Error al actualizar el usuario" }, { status: 500 });
  }
}