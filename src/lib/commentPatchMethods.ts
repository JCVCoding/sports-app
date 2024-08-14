import { Db } from "mongodb";

export const like = async (
  db: Db,
  params: { league: string; uuid: string },
  id: string,
  likeCount: string,
  dislikeCount: string
) => {
  db.collection(`${params.league.toUpperCase()}_Comments`).updateOne(
    {
      uuid: params.uuid,
      id: id,
    },
    {
      $set: {
        likeCount,
        dislikeCount,
      },
    }
  );
};
export const dislike = async (
  db: Db,
  params: { league: string; uuid: string },
  id: string,
  likeCount: string,
  dislikeCount: string
) => {
  await db.collection(`${params.league.toUpperCase()}_Comments`).updateOne(
    {
      uuid: params.uuid,
      id: id,
    },
    {
      $set: {
        likeCount,
        dislikeCount,
      },
    }
  );
};
export const pullLikedUser = async (
  db: Db,
  params: { league: string; uuid: string },
  id: string,
  email: string
) => {
  await db.collection(`${params.league.toUpperCase()}_Comments`).updateOne(
    {
      uuid: params.uuid,
      id: id,
    },
    {
      $pull: { likedUsers: email },
    }
  );
};
export const pullDislikedUser = async (
  db: Db,
  params: { league: string; uuid: string },
  id: string,
  email: string
) => {
  await db.collection(`${params.league.toUpperCase()}_Comments`).updateOne(
    {
      uuid: params.uuid,
      id: id,
    },
    {
      $pull: { dislikedUsers: email },
    }
  );
};
export const pushLikedUser = async (
  db: Db,
  params: { league: string; uuid: string },
  id: string,
  email: string
) => {
  await db.collection(`${params.league.toUpperCase()}_Comments`).updateOne(
    {
      uuid: params.uuid,
      id: id,
    },
    {
      $push: { likedUsers: email },
    }
  );
};
export const pushDislikedUser = async (
  db: Db,
  params: { league: string; uuid: string },
  id: string,
  email: string
) => {
  await db.collection(`${params.league.toUpperCase()}_Comments`).updateOne(
    {
      uuid: params.uuid,
      id: id,
    },
    {
      $push: { dislikedUsers: email },
    }
  );
};
export const editComment = async (
  db: Db,
  params: { league: string; uuid: string },
  id: string,
  text: string,
  newTimestamp: string
) => {
  await db.collection(`${params.league.toUpperCase()}_Comments`).updateOne(
    {
      uuid: params.uuid,
      id: id,
    },
    {
      $set: { text: text, updatedAt: newTimestamp },
    }
  );
};
