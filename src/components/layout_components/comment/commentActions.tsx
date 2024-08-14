"use client";

import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";
import {
  HandThumbDownIcon as SolidThumbDown,
  HandThumbUpIcon as SolidThumbUp,
} from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import CommentReplyDialog from "./CommentReplyDialog";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import {
  useLikeDislikeCommentMutation,
  useLikeDislikeReplyMutation,
} from "./commentSlice";
interface CommentActionsProps {
  id: string | null | undefined;
  likeCount: number;
  dislikeCount: number;
  league: string | null | undefined;
  uuid: string | null | undefined;
  authorEmail: string | null | undefined;
  isLiked: boolean;
  isDisliked: boolean;
  isReply: boolean;
  parentId?: string | null | undefined;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const CommentActions = ({
  likeCount,
  dislikeCount,
  id,
  league,
  uuid,
  authorEmail,
  isLiked,
  isDisliked,
  isReply,
  parentId,
  setOpen: openReplies,
}: CommentActionsProps) => {
  const [open, setOpen] = useState(false);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
  const [currentDislikeCount, setCurrentDislikeCount] = useState(dislikeCount);
  const [isLikedValue, setIsLikedValue] = useState(isLiked);
  const [isDislikedValue, setIsDislikedValue] = useState(isDisliked);
  let inputReference = useRef<HTMLInputElement>(null);

  const currentLikeCountRef = useRef(likeCount);
  const currentDislikeCountRef = useRef(dislikeCount);

  const [likeDislikeComment] = useLikeDislikeCommentMutation();
  const [likeDislikeReply] = useLikeDislikeReplyMutation();

  const { data } = useSession();

  const openCommentReply = () => {
    setOpen(true);
  };

  const closeCommentReply = () => {
    setOpen(false);
  };

  const focusReplyDialogInput = () => {
    inputReference.current?.focus();
  };

  const likeComment = () => {
    if (data?.user && !isLikedValue) {
      setCurrentLikeCount(currentLikeCount + 1);
      currentLikeCountRef.current += 1;

      currentDislikeCount > 0 &&
        setCurrentDislikeCount(currentDislikeCount - 1);
      currentDislikeCount > 0 ? (currentDislikeCountRef.current -= 1) : null;

      setIsLikedValue(true);
      setIsDislikedValue(false);

      !isReply
        ? likeDislikeComment({
            league,
            uuid,
            id,
            action: "like",
            authorEmail,
            dislikeCount: currentDislikeCountRef.current,
            likeCount: currentLikeCountRef.current,
          })
        : likeDislikeReply({
            league,
            uuid,
            id,
            parentId,
            action: "like_reply",
            authorEmail,
            dislikeCount: currentDislikeCountRef.current,
            likeCount: currentLikeCountRef.current,
          });
    }
  };
  const dislikeComment = () => {
    if (data?.user && !isDislikedValue) {
      currentLikeCount > 0 && setCurrentLikeCount(currentLikeCount - 1);
      currentLikeCount > 0 ? (currentLikeCountRef.current -= 1) : null;

      setCurrentDislikeCount(currentDislikeCount + 1);
      currentDislikeCountRef.current += 1;

      setIsDislikedValue(true);
      setIsLikedValue(false);

      !isReply
        ? likeDislikeComment({
            league,
            uuid,
            id,
            action: "dislike",
            authorEmail,
            dislikeCount: currentDislikeCountRef.current,
            likeCount: currentLikeCountRef.current,
          })
        : likeDislikeReply({
            league,
            uuid,
            id,
            parentId,
            action: "dislike_reply",
            authorEmail,
            dislikeCount: currentDislikeCountRef.current,
            likeCount: currentLikeCountRef.current,
          });
    }
  };

  return (
    <div>
      <div className="flex items-center gap-1">
        {/* @ts-ignore */}
        <Button
          className="rounded-full px-2"
          size="sm"
          variant="text"
          onClick={likeComment}
        >
          {isLikedValue ? (
            <SolidThumbUp className="h-4 w-4" />
          ) : (
            <HandThumbUpIcon className="h-4 w-4" />
          )}
        </Button>
        <span className="mr-2 text-sm">{currentLikeCount}</span>
        {/* @ts-ignore */}
        <Button
          className="rounded-full px-2"
          size="sm"
          variant="text"
          onClick={dislikeComment}
        >
          {isDislikedValue ? (
            <SolidThumbDown className="h-4 w-4" />
          ) : (
            <HandThumbDownIcon className="h-4 w-4" />
          )}
        </Button>
        <span className="mr-2 text-sm">{currentDislikeCount}</span>
        {!isReply && data?.user && (
          /* @ts-ignore */
          <Button
            className="rounded-full font-bold normal-case"
            onClick={() => {
              openCommentReply();
              focusReplyDialogInput();
            }}
            size="sm"
            variant="text"
          >
            Reply
          </Button>
        )}
      </div>
      {open ? (
        <CommentReplyDialog
          closeDialog={closeCommentReply}
          ref={inputReference}
          id={id}
          /* @ts-ignore */
          setOpen={openReplies}
        />
      ) : null}
    </div>
  );
};

export default CommentActions;
