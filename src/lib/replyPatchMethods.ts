import { CommentDataType } from "@/components/layout_components/comment/commentTypes";
import { Db } from "mongodb";
export const replyToComment = async (
  db: Db,
  params: { league: string; uuid: string },
  id: string,
  reply: CommentDataType[]
) => {
  await db
    .collection(`${params.league.toUpperCase()}_Comments`)
    .updateOne(
      { uuid: params.uuid, id: id },
      { $addToSet: { replies: reply } }
    );
};
export const editReply = async (
  db: Db,
  params: { league: string; uuid: string },
  id: string,
  parentId: string,
  text: string,
  newTimestamp: string
) => {
  await db.collection(`${params.league.toUpperCase()}_Comments`).updateOne(
    {
      uuid: params.uuid,
      id: parentId,
      "replies.id": id,
    },
    {
      $set: { "replies.$.text": text, "replies.$.updatedAt": newTimestamp },
    }
  );
};

export const likeReply = async (
  db: Db,
  params: { league: string; uuid: string },
  id: string,
  likeCount: string,
  dislikeCount: string,
  parentId: string
) => {
  await db.collection(`${params.league.toUpperCase()}_Comments`).updateOne(
    {
      uuid: params.uuid,
      id: parentId,
      "replies.id": id,
    },
    {
      $set: {
        "replies.$.likeCount": likeCount,
        "replies.$.dislikeCount": dislikeCount,
      },
    }
  );
};
export const dislikeReply = async (
  db: Db,
  params: { league: string; uuid: string },
  id: string,
  likeCount: string,
  dislikeCount: string,
  parentId: string
) => {
  await db.collection(`${params.league.toUpperCase()}_Comments`).updateOne(
    {
      uuid: params.uuid,
      id: parentId,
      "replies.id": id,
    },
    {
      $set: {
        "replies.$.likeCount": likeCount,
        "replies.$.dislikeCount": dislikeCount,
      },
    }
  );
};
export const pullLikedUserReply = async (
  db: Db,
  params: { league: string; uuid: string },
  id: string,
  email: string,
  parentId: string
) => {
  await db.collection(`${params.league.toUpperCase()}_Comments`).updateOne(
    {
      uuid: params.uuid,
      id: parentId,
      "replies.id": id,
    },
    {
      $pull: { "replies.$.likedUsers": email },
    }
  );
};
export const pullDislikedUserReply = async (
  db: Db,
  params: { league: string; uuid: string },
  id: string,
  email: string,
  parentId: string
) => {
  await db.collection(`${params.league.toUpperCase()}_Comments`).updateOne(
    {
      uuid: params.uuid,
      id: parentId,
      "replies.id": id,
    },
    {
      $pull: { "replies.$.dislikedUsers": email },
    }
  );
};
export const pushLikedUserReply = async (
  db: Db,
  params: { league: string; uuid: string },
  id: string,
  email: string,
  parentId: string
) => {
  await db.collection(`${params.league.toUpperCase()}_Comments`).updateOne(
    {
      uuid: params.uuid,
      id: parentId,
      "replies.id": id,
    },
    {
      $push: { "replies.$.likedUsers": email },
    }
  );
};
export const pushDislikedUserReply = async (
  db: Db,
  params: { league: string; uuid: string },
  id: string,
  email: string,
  parentId: string
) => {
  await db.collection(`${params.league.toUpperCase()}_Comments`).updateOne(
    {
      uuid: params.uuid,
      id: parentId,
      "replies.id": id,
    },
    {
      $push: { "replies.$.dislikedUsers": email },
    }
  );
};
