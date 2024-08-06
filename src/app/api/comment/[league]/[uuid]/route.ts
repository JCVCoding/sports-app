import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { randomInt, randomUUID } from "crypto";

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

export async function POST(
  req: NextRequest,
  { params }: { params: { league: string; uuid: string } }
) {
  const db = await getDB();
  const data = await req.json();
  db.collection(`${params.league.toUpperCase()}_Comments`).insertOne({
    uuid: params.uuid,
    id: Math.floor(Math.random() * 1000).toString(),
    parentId: data.parentId,
    text: data.inputValue,
    likeCount: 0,
    dislikeCount: 0,
    publishedAt: new Date(),
    updatedAt: null,
    dislikedUsers: [],
    likedUsers: [],
    author: data.author,
    authorEmail: data.authorEmail,
  });
  return NextResponse.json(req.body);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { league: string; uuid: string } }
) {
  const { id } = await req.json();
  const db = await getDB();

  db.collection(`${params.league.toUpperCase()}_Comments`).findOneAndDelete({
    uuid: params.uuid,
    id: id,
  });

  return NextResponse.json(req.body);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { league: string; uuid: string } }
) {
  const { id, action, authorEmail, text } = await req.json();
  const db = await getDB();

  const like = async () => {
    await db
      .collection(`${params.league.toUpperCase()}_Comments`)
      .findOneAndUpdate(
        {
          uuid: params.uuid,
          id: id,
        },
        {
          $inc: {
            likeCount: 1,
            dislikeCount: -1,
          },
          $addToSet: { likedUsers: authorEmail },
        }
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
        {
          $inc: {
            likeCount: -1,
            dislikeCount: 1,
          },
          $addToSet: { dislikedUsers: authorEmail },
        }
      );
  };
  const pullLikedUser = async () => {
    await db
      .collection(`${params.league.toUpperCase()}_Comments`)
      .findOneAndUpdate(
        {
          uuid: params.uuid,
          id: id,
        },
        {
          $pull: { likedUsers: authorEmail },
        }
      );
  };
  const pullDislikedUser = async () => {
    await db
      .collection(`${params.league.toUpperCase()}_Comments`)
      .findOneAndUpdate(
        {
          uuid: params.uuid,
          id: id,
        },
        {
          $pull: { dislikedUsers: authorEmail },
        }
      );
  };
  const editComment = async () => {
    await db
      .collection(`${params.league.toUpperCase()}_Comments`)
      .findOneAndUpdate(
        {
          uuid: params.uuid,
          id: id,
        },
        {
          $set: { text: text },
        }
      );
  };

  try {
    switch (action) {
      case "like":
        like();
        pullDislikedUser();
        break;
      case "dislike":
        dislike();
        pullLikedUser();
        break;
      case "edit":
        editComment();
      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }
  return NextResponse.json({ id, action });
}
