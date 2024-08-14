"use client";

import CommentActions from "./commentActions";
import { Avatar, Button, Input } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import CommentActionMenu from "./commentActionMenu";
import { useReducer, useState, SetStateAction } from "react";
import { useEditCommentMutation, useEditReplyMutation } from "./commentSlice";
import { Dispatch } from "react";

export interface commentProps {
  author: string | null | undefined;
  avatar: string | null | undefined;
  text: string | null | undefined;
  timestamp: string | null | undefined;
  likeCount: number | null;
  dislikeCount: number | null | undefined;
  id: string | null | undefined;
  league: string | null | undefined;
  uuid: string | null | undefined;
  authorEmail: string | null | undefined;
  dislikedUsers: string[] | null | undefined;
  likedUsers: string[] | null | undefined;
  isReply: boolean;
  parentId?: string | null | undefined;
  isEdited: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
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
  parentId,
  isEdited,
  setOpen,
}: commentProps) => {
  const [commentText, setCommentText] = useState(text);
  // @ts-ignore
  const [state, dispatch] = useReducer(EditingReducer, { isEditing: false });
  const { data } = useSession();
  const [editComment] = useEditCommentMutation();
  const [editReply] = useEditReplyMutation();

  let isLiked = false;
  let isDisliked = false;
  let email = data?.user?.email ? data.user.email : "";

  if (likedUsers?.includes(email)) {
    isLiked = true;
  }
  if (dislikedUsers?.includes(email)) {
    isDisliked = true;
  }
  const completeEdit = () => {
    const newTimestamp = new Date().toISOString();
    editComment({
      league,
      uuid,
      id,
      updatedText: commentText,
      action: "edit",
      newTimestamp,
    });
    // @ts-ignore
    dispatch({ type: "DONE" });
  };
  const completeReplyEdit = () => {
    const newTimestamp = new Date().toISOString();
    editReply({
      league,
      uuid,
      id,
      parentId,
      text: commentText,
      action: "edit_reply",
      newTimestamp,
    });
    // @ts-ignore
    dispatch({ type: "DONE" });
  };
  return (
    <>
      <div className="flex flex-wrap">
        {/* @ts-ignore */}
        <Avatar src={avatar} className="lg" />
        <div className="px-2 flex-1">
          <div>
            {data?.user?.email === authorEmail ? (
              <span className="font-bold">{author}</span>
            ) : (
              author
            )}
            <span className="ml-1 text-xs text-gray-400">
              {timestamp}
              {isEdited ? "(edited)" : null}
            </span>
          </div>
          {state.isEditing ? (
            <div className="relative flex w-full">
              {/* @ts-ignore */}
              <Input
                crossOrigin={undefined}
                variant="static"
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText as string}
              />
              {/* @ts-ignore */}
              <Button
                size="sm"
                variant="outlined"
                className="!absolute right-1 top-1"
                onClick={!isReply ? completeEdit : completeReplyEdit}
              >
                Done
              </Button>
            </div>
          ) : (
            <div className="my-1 text-sm md:text-base">{commentText}</div>
          )}
          <CommentActions
            likeCount={likeCount ? likeCount : 0}
            dislikeCount={dislikeCount ? dislikeCount : 0}
            id={id}
            league={league}
            uuid={uuid}
            authorEmail={authorEmail}
            isLiked={isLiked}
            isDisliked={isDisliked}
            isReply={isReply}
            parentId={parentId}
            setOpen={setOpen}
          />
        </div>
        <div className="px-2 flex-2 flex justify-end items-center">
          {data?.user?.email === authorEmail && (
            <CommentActionMenu
              id={id}
              parentId={parentId}
              editDispatch={dispatch}
              isReply={isReply}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Comment;
