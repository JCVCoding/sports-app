import Comment from "./comment";
import CommentReplies from "./commentReplies";
import { useAppSelector } from "@/lib/hooks";
import { CommentDataType } from "./commentTypes";

import { getTimestamp } from "@/lib/timestamp";
import { useState } from "react";

const CommentThread = ({ comment }: { comment: CommentDataType }) => {
  const { league, uuid } = useAppSelector((state) => state.commentReducer);
  const [open, setOpen] = useState(false);
  return (
    <div className="my-1">
      <Comment
        author={comment.author!}
        avatar={comment.avatar}
        text={comment.text}
        timestamp={getTimestamp(comment.publishedAt ? comment.publishedAt : "")}
        likeCount={comment.likeCount ? comment.likeCount : null}
        dislikeCount={comment.dislikeCount}
        id={comment.id}
        league={league}
        uuid={uuid}
        authorEmail={comment.authorEmail}
        dislikedUsers={comment.dislikedUsers}
        likedUsers={comment.likedUsers}
        isReply={false}
        isEdited={typeof comment.updatedAt === "string"}
        setOpen={setOpen}
      />
      {comment.replies && (
        <CommentReplies
          replies={comment.replies}
          open={open}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};

export default CommentThread;
