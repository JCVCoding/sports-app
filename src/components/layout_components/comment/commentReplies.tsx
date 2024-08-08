"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { Button, Collapse } from "@material-tailwind/react";
import Comment from "./comment";
import { useState } from "react";
import { CommentDataType } from "./commentTypes";
import { useAppSelector } from "@/lib/hooks";

const CommentReplies = ({ replies }: { replies: CommentDataType[] }) => {
  const [open, setOpen] = useState(false);
  const league = useAppSelector((state) => state.commentReducer.league);
  const uuid = useAppSelector((state) => state.commentReducer.uuid);

  const toggleOpen = () => setOpen(!open);

  return (
    <div className="ml-6 sm:ml-8">
      <Button
        className="rounded-full flex gap-x-3 normal-case text-sm"
        color="blue"
        ripple={false}
        size="sm"
        variant="text"
        onClick={toggleOpen}
      >
        {open ? (
          <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <ChevronUpIcon className="h-4 w-4" aria-hidden="true" />
        )}
        <span>
          {replies.length} {replies.length > 1 ? "replies" : "reply"}
        </span>
      </Button>
      <Collapse open={open}>
        {replies.map((reply) => {
          const {
            author,
            dislikeCount,
            likeCount,
            text,
            publishedAt,
            updatedAt,
            id,
            authorEmail,
            dislikedUsers,
            likedUsers,
            parentId,
            avatar,
          } = reply;
          return (
            <div key={id}>
              <Comment
                author={author}
                avatar={avatar}
                text={text}
                timestamp={updatedAt ? updatedAt : publishedAt}
                likeCount={likeCount}
                dislikeCount={dislikeCount}
                id={id}
                league={league}
                uuid={uuid}
                authorEmail={authorEmail}
                parentId={parentId}
                dislikedUsers={dislikedUsers}
                likedUsers={likedUsers}
                isReply={true}
                isEdited={updatedAt !== null}
              />
            </div>
          );
        })}
      </Collapse>
    </div>
  );
};

export default CommentReplies;
