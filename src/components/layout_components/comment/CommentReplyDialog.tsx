"use client";

import { Avatar, Button, Input } from "@material-tailwind/react";
import { Dispatch, forwardRef, Ref, SetStateAction, useState } from "react";
import { useReplyToCommentMutation } from "./commentSlice";
import { useAppSelector } from "@/lib/hooks";
import { useSession } from "next-auth/react";

const CommentReplyDialog = (
  {
    closeDialog,
    id,
    setOpen,
  }: {
    closeDialog: () => void;
    id: string | null | undefined;
    setOpen: Dispatch<SetStateAction<boolean>>;
  },
  ref: Ref<HTMLInputElement>
) => {
  const [inputValue, setInputValue] = useState<string>("");
  const { data } = useSession();
  const { league, uuid } = useAppSelector((state) => state.commentReducer);
  const [reply] = useReplyToCommentMutation();

  const replyHandler = () => {
    reply({
      uuid,
      league,
      id,
      action: "reply",
      reply: {
        id: Math.floor(Math.random() * 1000).toString(),
        parentId: id,
        text: inputValue,
        likeCount: 0,
        dislikeCount: 0,
        publishedAt: new Date().toISOString(),
        updatedAt: null,
        dislikedUsers: [],
        likedUsers: [],
        author: data?.user?.name,
        authorEmail: data?.user?.email,
        avatar: data?.user?.image,
      },
    });
    setInputValue("");
    closeDialog();
    setOpen(true);
  };
  return (
    <div className="flex flex-wrap">
      <Avatar
        alt=""
        src="/next.svg"
        size="xs"
        className="relative top-4"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />
      <div className="flex-1 pl-4">
        <Input
          crossOrigin={undefined}
          variant="static"
          placeholder="Add a reply..."
          inputRef={ref}
          onChange={(e) => setInputValue(e.target.value)}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <div className="flex items-center justify-end gap-x-2 pt-2">
          <Button
            className="rounded-full normal-case text-sm"
            onClick={() => closeDialog()}
            size="sm"
            variant="text"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Cancel
          </Button>
          <Button
            className="rounded-full normal-case text-sm disabled:bg-gray-300 disabled:text-gray-600"
            color="blue"
            disabled={inputValue == ""}
            ripple={false}
            size="sm"
            type="submit"
            variant="filled"
            onClick={replyHandler}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(CommentReplyDialog);
