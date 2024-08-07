import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import {
  like,
  dislike,
  editComment,
  pullDislikedUser,
  pullLikedUser,
} from "@/lib/commentPatchMethods";
import { replyToComment, editReply } from "@/lib/replyPatchMethods";
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
    replies: [],
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
  const {
    id,
    action,
    authorEmail,
    text,
    likeCount,
    dislikeCount,
    reply,
    parentId,
  } = await req.json();
  const db = await getDB();

  try {
    switch (action) {
      case "like":
        like(db, params, id, likeCount, dislikeCount, authorEmail);
        pullDislikedUser(db, params, id, authorEmail);
        break;
      case "dislike":
        dislike(db, params, id, likeCount, dislikeCount, authorEmail);
        pullLikedUser(db, params, id, authorEmail);
        break;
      case "edit":
        editComment(db, params, id, text);
      case "reply":
        replyToComment(db, params, id, reply);
      case "edit_reply":
        console.log(id, parentId, text);
        editReply(db, params, id, parentId, text);
      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }
  return NextResponse.json({ id, action });
}
