import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import {
  like,
  dislike,
  editComment,
  pullDislikedUser,
  pullLikedUser,
  pushLikedUser,
  pushDislikedUser,
} from "@/lib/commentPatchMethods";
import {
  replyToComment,
  editReply,
  dislikeReply,
  likeReply,
  pullDislikedUserReply,
  pullLikedUserReply,
  pushLikedUserReply,
  pushDislikedUserReply,
} from "@/lib/replyPatchMethods";
async function getDB() {
  const client = await clientPromise;
  const db = client.db("CommentData");
  return db;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { league: string; uuid: string } }
) {
  const comments = await fetch(
    `https://${process.env.HASURA_PROJECT_ENDPOINT}${params.league}_comment_thread/?uuid=${params.uuid}`,
    {
      headers: {
        "x-hasura-admin-secret": `${process.env.HASURA_ADMIN_SECRET}`,
      },
    }
  ).then((data) => data.json());

  return NextResponse.json(comments);
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
    publishedAt: new Date().toISOString(),
    updatedAt: null,
    dislikedUsers: [],
    likedUsers: [],
    author: data.author,
    authorEmail: data.authorEmail,
    replies: [],
    avatar: data.avatar,
  });
  return NextResponse.json({ data });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { league: string; uuid: string } }
) {
  const { id, action, parentId } = await req.json();
  const db = await getDB();

  try {
    switch (action) {
      case "delete_comment":
        await db
          .collection(`${params.league.toUpperCase()}_Comments`)
          .deleteOne({
            uuid: params.uuid,
            id: id,
          });
        break;
      case "delete_reply":
        await db
          .collection(`${params.league.toUpperCase()}_Comments`)
          .updateOne(
            {
              uuid: params.uuid,
              id: parentId,
              "replies.id": id,
            },
            { $pull: { replies: { id: id } } }
          );
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }
  return NextResponse.json({ id });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { league: string; uuid: string } }
) {
  const {
    id,
    action,
    text,
    likeCount,
    dislikeCount,
    reply,
    parentId,
    newTimestamp,
    email,
  } = await req.json();
  const db = await getDB();

  try {
    switch (action) {
      case "like":
        await like(db, params, id, likeCount, dislikeCount);
        await pushLikedUser(db, params, id, email);
        await pullDislikedUser(db, params, id, email);
        break;
      case "like_neutral":
        await like(db, params, id, likeCount, dislikeCount);
        await pullLikedUser(db, params, id, email);
        break;
      case "dislike":
        await dislike(db, params, id, likeCount, dislikeCount);
        await pushDislikedUser(db, params, id, email);
        await pullLikedUser(db, params, id, email);
        break;
      case "dislike_neutral":
        await dislike(db, params, id, likeCount, dislikeCount);
        await pullDislikedUser(db, params, id, email);
        break;
      case "edit":
        await editComment(db, params, id, text, newTimestamp);
        break;
      case "reply":
        await replyToComment(db, params, id, reply);
        break;
      case "edit_reply":
        await editReply(db, params, id, parentId, text, newTimestamp);
        break;
      case "like_reply":
        await likeReply(db, params, id, likeCount, dislikeCount, parentId);
        await pushLikedUserReply(db, params, id, email, parentId);
        await pullDislikedUserReply(db, params, id, email, parentId);
        break;
      case "like_reply_neutral":
        await likeReply(db, params, id, likeCount, dislikeCount, parentId);
        await pullLikedUserReply(db, params, id, email, parentId);
        break;
      case "dislike_reply":
        await dislikeReply(db, params, id, likeCount, dislikeCount, parentId);
        await pushDislikedUserReply(db, params, id, email, parentId);
        await pullLikedUserReply(db, params, id, email, parentId);
        break;
      case "dislike_reply_neutral":
        await dislikeReply(db, params, id, likeCount, dislikeCount, parentId);
        await pullDislikedUserReply(db, params, id, email, parentId);
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }
  return NextResponse.json({ id, action });
}
