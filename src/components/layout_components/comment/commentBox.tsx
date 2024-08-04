"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Avatar, Button, Input } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { addComment } from "./commentSlice";

const CommentBox = () => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");

  const league = useAppSelector((state) => state.commentReducer.league);
  const uuid = useAppSelector((state) => state.commentReducer.uuid);
  const dispatch = useAppDispatch();

  const { data } = useSession();

  const openOnFocus = () => {
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    const author = data?.user?.name;
    const authorEmail = data?.user?.email;
    fetch(`/api/comment/${league}/${uuid}`, {
      method: "POST",
      body: JSON.stringify({
        inputValue,
        author,
        authorEmail,
        parentId: null,
      }),
      headers: { "Content-Type": "application/json" },
    });

    dispatch(
      addComment({
        id: Math.floor(Math.random() * 1000).toString(),
        parentId: "",
        text: inputValue,
        likeCount: 0,
        dislikeCount: 0,
        publishedAt: new Date().toTimeString(),
        updatedAt: null,
        dislikedUsers: [],
        likedUsers: [],
        author,
        authorEmail,
        reply: [],
        uuid: "",
      })
    );
  };

  return (
    <div className="flex flex-row">
      <Avatar src="/next.svg" className="mr-4" />
      <div className="flex-1">
        <Input
          crossOrigin={undefined}
          variant="static"
          placeholder="Add a comment..."
          onClick={openOnFocus}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {open ? (
          <div className="flex items-center justify-end gap-x-2 pt-2">
            <Button
              className="rounded-full normal-case text-sm"
              size="sm"
              variant="text"
              onClick={close}
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
              onClick={onSubmit}
            >
              Comment
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CommentBox;
