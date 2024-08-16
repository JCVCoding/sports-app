import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { compare } from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const client = await clientPromise;
  const db = client.db("AuthData");
  const user = await db.collection("users").findOne({ email });

  if (user) {
    const isPasswordValid = await compare(password!, user.password);
    if (isPasswordValid) {
      return NextResponse.json(user);
    }
    return NextResponse.json({ error: "password" }, { status: 400 });
  } else {
    return NextResponse.json({ error: "user" }, { status: 500 });
  }
}
