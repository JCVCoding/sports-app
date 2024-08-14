"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { Button, Collapse } from "@material-tailwind/react";
import Comment from "./comment";
import { SetStateAction } from "react";
import { CommentDataType } from "./commentTypes";
import { useAppSelector } from "@/lib/hooks";
import { getTimestamp } from "@/lib/timestamp";
import { Dispatch } from "react";

const CommentReplies = ({
  replies,
  open,
  setOpen,
}: {
  replies: CommentDataType[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const league = useAppSelector((state) => state.commentReducer.league);
  const uuid = useAppSelector((state) => state.commentReducer.uuid);

  const toggleOpen = () => setOpen(!open);

  return (
    <div className="ml-6 sm:ml-8">
      {replies.length >= 1 && (
        <Button
          className="rounded-full flex gap-x-3 normal-case text-sm"
          color="blue"
          ripple={false}
          size="sm"
          variant="text"
          onClick={toggleOpen}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {open ? (
            <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronUpIcon className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="text-xs">
            {replies.length.toString() +
              " " +
              (replies.length > 1 ? "replies" : "reply")}
          </span>
        </Button>
      )}
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
                timestamp={getTimestamp(publishedAt!)}
                likeCount={likeCount ? likeCount : 0}
                dislikeCount={dislikeCount}
                id={id}
                league={league}
                uuid={uuid}
                authorEmail={authorEmail}
                parentId={parentId}
                dislikedUsers={dislikedUsers}
                likedUsers={likedUsers}
                isReply={true}
                isEdited={typeof updatedAt === "string"}
                setOpen={function (value: SetStateAction<boolean>): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
          );
        })}
      </Collapse>
    </div>
  );
};

export default CommentReplies;
