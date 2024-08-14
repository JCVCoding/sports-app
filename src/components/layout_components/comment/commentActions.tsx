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
  isLiked,
  isDisliked,
  isReply,
  parentId,
  setOpen: openReplies,
}: CommentActionsProps) => {
  const [open, setOpen] = useState(false);
  let currentLikeCount = likeCount;
  let currentDislikeCount = dislikeCount;
  let [isLikedValue, setIsLikedValue] = useState(isLiked);
  let [isDislikedValue, setIsDislikedValue] = useState(isDisliked);
  let inputReference = useRef<HTMLInputElement>(null);

  const [likeDislikeComment] = useLikeDislikeCommentMutation();
  const [likeDislikeReply] = useLikeDislikeReplyMutation();

  const { data } = useSession();

  let email = data?.user?.email ? data.user.email : null;

  const openCommentReply = () => {
    setOpen(true);
  };

  const closeCommentReply = () => {
    setOpen(false);
  };

  const focusReplyDialogInput = () => {
    inputReference.current?.focus();
  };

  const mutateComment = (action: string) => {
    likeDislikeComment({
      league,
      uuid,
      id,
      action: action,
      email,
      dislikeCount: currentDislikeCount,
      likeCount: currentLikeCount,
    });
  };

  const mutateReply = (action: string) => {
    likeDislikeReply({
      league,
      uuid,
      id,
      parentId,
      action: action,
      email,
      dislikeCount: currentDislikeCount,
      likeCount: currentLikeCount,
    });
  };

  const likeComment = () => {
    if (data?.user && isDislikedValue) {
      currentLikeCount += 1;
      currentDislikeCount > 0 && (currentDislikeCount -= 1);
      setIsLikedValue(true);
      setIsDislikedValue(false);
      !isReply ? mutateComment("like") : mutateReply("like_reply");
    } else if (data?.user && isLikedValue) {
      currentLikeCount -= 1;
      setIsLikedValue(false);
      !isReply
        ? mutateComment("like_neutral")
        : mutateReply("like_reply_neutral");
    } else {
      currentLikeCount += 1;
      setIsLikedValue(true);
      !isReply ? mutateComment("like") : mutateReply("like_reply");
    }
  };
  const dislikeComment = () => {
    if (data?.user && isLikedValue) {
      currentDislikeCount += 1;
      currentLikeCount > 0 && (currentLikeCount -= 1);
      setIsDislikedValue(true);
      setIsLikedValue(false);
      !isReply ? mutateComment("dislike") : mutateReply("dislike_reply");
    } else if (data?.user && isDislikedValue) {
      currentDislikeCount -= 1;
      setIsDislikedValue(false);
      !isReply
        ? mutateComment("dislike_neutral")
        : mutateReply("dislike_reply_neutral");
    } else {
      currentDislikeCount += 1;
      setIsDislikedValue(true);
      !isReply ? mutateComment("dislike") : mutateReply("dislike_reply");
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
