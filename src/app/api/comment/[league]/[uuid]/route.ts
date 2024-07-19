import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { headers } from "next/headers";

async function getDB() {
  const client = await clientPromise;
  const db = client.db("CommentData");
  return db;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { league: string; uuid: string } }
) {
  const data = await fetch(
    `https://wealthy-pug-54.hasura.app/api/rest/comment_thread/?uuid=${params.uuid}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": `${process.env.HASURA_ADMIN_SECRET}`,
      },
    }
  );
  console.log(params.uuid, process.env.HASURA_ADMIN_SECRET);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  return NextResponse.json(req.body);
}

export async function DELETE() {}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { league: string; uuid: string } }
) {
  const { id, action } = await req.json();
  const db = await getDB();

  const like = async () => {
    await db
      .collection(`${params.league.toUpperCase()}_Comments`)
      .findOneAndUpdate(
        {
          uuid: params.uuid,
          id: id,
        },
        { $inc: { likeCount: 1 } }
      );
  };
  const dislike = async () => {
    await db
      .collection(`${params.league.toUpperCase()}_Comments`)
      .findOneAndUpdate(
        {
          uuid: params.uuid,
          id: id,
        },
        { $inc: { dislikeCount: 1 } }
      );
  };

  try {
    switch (action) {
      case "like":
        like();
        break;
      case "dislike":
        dislike();
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }
  return NextResponse.json({ id });
}
