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
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
interface CommentActionsProps {
  id: string;
  likeCount: number;
  dislikeCount: number;
  league: string;
  uuid: string;
  authorEmail: string | null | undefined;
  isLiked: boolean;
  isDisliked: boolean;
  isReply: boolean;
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
}: CommentActionsProps) => {
  const [open, setOpen] = useState(false);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
  const [currentDislikeCount, setCurrentDislikeCount] = useState(dislikeCount);
  const [isLikedValue, setIsLikedValue] = useState(isLiked);
  const [isDislikedValue, setIsDislikedValue] = useState(isDisliked);
  let inputReference = useRef<HTMLInputElement>(null);

  const currentLikeCountRef = useRef(likeCount);
  const currentDislikeCountRef = useRef(dislikeCount);

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

      fetch(`/api/comment/${league}/${uuid}`, {
        method: "PATCH",
        body: JSON.stringify({
          id: id,
          action: "like",
          authorEmail,
          dislikeCount: currentDislikeCountRef.current,
          likeCount: currentLikeCountRef.current,
        }),
        headers: { "Content-Type": "application/json" },
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

      fetch(`/api/comment/${league}/${uuid}`, {
        method: "PATCH",
        body: JSON.stringify({
          id: id,
          action: "dislike",
          authorEmail,
          dislikeCount: currentDislikeCountRef.current,
          likeCount: currentLikeCountRef.current,
        }),
        headers: { "Content-Type": "application/json" },
      });
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <Button
          className="rounded-full px-2"
          size="sm"
          variant="text"
          onClick={likeComment}
        >
          {isLikedValue ? (
            <SolidThumbUp className="h-6 w-6" />
          ) : (
            <HandThumbUpIcon className="h-6 w-6" />
          )}
        </Button>
        <span className="mr-2">{currentLikeCount}</span>
        <Button
          className="rounded-full px-2"
          size="sm"
          variant="text"
          onClick={dislikeComment}
        >
          {isDislikedValue ? (
            <SolidThumbDown className="h-6 w-6" />
          ) : (
            <HandThumbDownIcon className="h-6 w-6" />
          )}
        </Button>
        <span className="mr-2">{currentDislikeCount}</span>
        {!isReply && (
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
        />
      ) : null}
    </div>
  );
};

export default CommentActions;
