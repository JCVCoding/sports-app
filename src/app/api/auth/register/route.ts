import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password, firstName, lastName, confirmPassword } =
      await req.json();
    const client = await clientPromise;
    const db = client.db("AuthData");
    const userFound = await db.collection("users").findOne({ email });
    if (userFound) {
      return NextResponse.json(
        {
          error: "user",
          message: "User already exists! Only one account per email is allowed",
        },
        { status: 401 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "password", message: "Passwords do not match" },
        { status: 401 }
      );
    }
    const hashedPassword = await hash(password, 10);
    const user = {
      name: firstName + " " + lastName,
      email,
      password: hashedPassword,
    };

    await db.collection("users").insertOne(user);
    return NextResponse.json(
      { error: null, message: "Success" },
      { status: 200 }
    );
  } catch (e) {
    console.error({ e });
    return NextResponse.json({ error: e });
  }
}
