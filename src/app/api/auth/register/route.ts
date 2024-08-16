import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password, firstName, lastName, username } = await req.json();
    const client = await clientPromise;
    const db = client.db("AuthData");
    const userFound = await db.collection("users").findOne({ email });
    if (userFound) {
      return NextResponse.json({
        error: "User already exists! Only one account per email is allowed",
      });
    }
    const hashedPassword = await hash(password, 10);
    const user = {
      name: firstName + " " + lastName,
      username,
      email,
      password: hashedPassword,
    };

    await db.collection("users").insertOne(user);
    return NextResponse.json({ message: "Success" });
  } catch (e) {
    console.error({ e });
    return NextResponse.json({ error: e });
  }
}
