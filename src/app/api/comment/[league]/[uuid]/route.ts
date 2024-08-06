import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

async function getDB() {
  const client = await clientPromise;
  const db = client.db("CommentData");
  return db;
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
    publishedAt:
      new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString(),
    updatedAt: null,
    dislikedUsers: [],
    likedUsers: [],
    author: data.author,
    authorEmail: data.authorEmail,
  });
  return NextResponse.json({ data });
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

  return NextResponse.json({ id });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { league: string; uuid: string } }
) {
  const { id, action, authorEmail, text, likeCount, dislikeCount } =
    await req.json();
  const db = await getDB();
  console.log("hello");

  const like = () => {
    db.collection(`${params.league.toUpperCase()}_Comments`).findOneAndUpdate(
      {
        uuid: params.uuid,
        id: id,
      },
      {
        $set: {
          likeCount,
          dislikeCount,
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
          $set: {
            likeCount,
            dislikeCount,
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
