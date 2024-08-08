import { Db } from "mongodb";

export const like = async (
  db: Db,
  params: { league: string; uuid: string },
  id: string,
  likeCount: string,
  dislikeCount: string,
  authorEmail: string
) => {
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
export const dislike = async (
  db: Db,
  params: { league: string; uuid: string },
  id: string,
  likeCount: string,
  dislikeCount: string,
  authorEmail: string
) => {
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
export const pullLikedUser = async (
  db: Db,
  params: { league: string; uuid: string },
  id: string,
  authorEmail: string
) => {
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
export const pullDislikedUser = async (
  db: Db,
  params: { league: string; uuid: string },
  id: string,
  authorEmail: string
) => {
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
export const editComment = async (
  db: Db,
  params: { league: string; uuid: string },
  id: string,
  text: string,
  newTimestamp: string
) => {
  await db
    .collection(`${params.league.toUpperCase()}_Comments`)
    .findOneAndUpdate(
      {
        uuid: params.uuid,
        id: id,
      },
      {
        $set: { text: text, updatedAt: newTimestamp },
      }
    );
};
