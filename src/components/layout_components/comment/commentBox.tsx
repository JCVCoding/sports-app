"use client";

import { Avatar, Button, Input } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { useState } from "react";

const CommentBox = () => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");

  const { data } = useSession();

  const openOnFocus = () => {
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    fetch(`/api/comment/${context?.league}/${context?.uuid}`, {
      method: "POST",
      body: JSON.stringify({
        inputValue,
        author: data?.user?.name,
        authorEmail: data?.user?.email,
        parentId: null,
      }),
      headers: { "Content-Type": "application/json" },
    });
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
