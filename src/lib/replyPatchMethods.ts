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
    .findOneAndUpdate(
      { uuid: params.uuid, id: id },
      { $addToSet: { replies: reply } }
    );
};
export const editReply = async (
  db: Db,
  params: { league: string; uuid: string },
  id: string,
  parentId: string,
  text: string
) => {
  console.log(id, parentId, text);
  await db
    .collection(`${params.league.toUpperCase()}_Comments`)
    .findOneAndUpdate(
      {
        uuid: params.uuid,
        id: parentId,
        "replies.id": id,
      },
      {
        $set: { "replies.$.text": text },
      }
    );
};
