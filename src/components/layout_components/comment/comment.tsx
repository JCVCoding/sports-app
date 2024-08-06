"use client";

import CommentActions from "./commentActions";
import { Avatar, Button, Input } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import CommentActionMenu from "./commentActionMenu";
import { useReducer, useState } from "react";

export interface commentProps {
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
  likeCount: number;
  dislikeCount: number;
  id: string;
  league: string | null | undefined;
  uuid: string | null | undefined;
  authorEmail: string | null | undefined;
  dislikedUsers: string[] | null | undefined;
  likedUsers: string[] | null | undefined;
  isReply: boolean;
}

export const EditingReducer = (
  state: { isEditing: boolean },
  action: { type: "EDITING" | "DONE" }
) => {
  switch (action.type) {
    case "EDITING":
      return { isEditing: (state.isEditing = true) };
    case "DONE":
      return { isEditing: (state.isEditing = false) };
    default:
      break;
  }
};

const Comment = ({
  author,
  id,
  avatar,
  text,
  timestamp,
  likeCount,
  dislikeCount,
  league,
  uuid,
  authorEmail,
  dislikedUsers,
  likedUsers,
  isReply,
}: commentProps) => {
  const [commentText, setCommentText] = useState(text);
  const [state, dispatch] = useReducer(EditingReducer, { isEditing: false });
  const { data } = useSession();
  let isLiked = false;
  let isDisliked = false;
  if (likedUsers?.includes(data?.user?.email!)) {
    isLiked = true;
  }
  if (dislikedUsers?.includes(data?.user?.email!)) {
    isDisliked = true;
  }
  const completeEdit = async () => {
    dispatch({ type: "DONE" });
    await fetch(`/api/comment/${league}/${uuid}`, {
      method: "PATCH",
      body: JSON.stringify({
        id,
        text: commentText,
        action: "edit",
      }),
      headers: { "Content-Type": "application/json" },
    });
  };
  return (
    <>
      <div className="flex flex-wrap">
        <Avatar src="" size="xs" />
        <div className="px-2 flex-1">
          <div>
            {data?.user?.email === authorEmail ? (
              <span className="font-bold">{author}</span>
            ) : (
              author
            )}
            <span className="ml-1 text-xs text-gray-400">{timestamp}</span>
          </div>
          {state.isEditing ? (
            <div className="relative flex w-full">
              <Input
                crossOrigin={undefined}
                variant="static"
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText}
              />
              <Button
                size="sm"
                variant="outlined"
                className="!absolute right-1 top-1"
                onClick={completeEdit}
              >
                Done
              </Button>
            </div>
          ) : (
            <div className="my-1">{commentText}</div>
          )}
          <CommentActions
            likeCount={likeCount}
            dislikeCount={dislikeCount}
            id={id}
            league={league}
            uuid={uuid}
            authorEmail={authorEmail}
            isLiked={isLiked}
            isDisliked={isDisliked}
            isReply={isReply}
          />
        </div>
        <div className="px-2 flex-2 flex justify-end items-center">
          <CommentActionMenu id={id} editDispatch={dispatch} />
        </div>
      </div>
    </>
  );
};

export default Comment;
