"use client";

import { useAppSelector } from "@/lib/hooks";
import { Avatar, Button, Input } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useAddCommentMutation } from "./commentSlice";

const CommentBox = () => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");

  const league = useAppSelector((state) => state.commentReducer.league);
  const uuid = useAppSelector((state) => state.commentReducer.uuid);

  const { data } = useSession();

  const [addComment] = useAddCommentMutation();

  const openOnFocus = () => {
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    const author = data?.user?.name;
    const authorEmail = data?.user?.email;
    const avatar = data?.user?.image;
    addComment({ league, uuid, inputValue, author, authorEmail, avatar });
    setInputValue("");
    close();
  };

  return (
    <div className="flex flex-row">
      <Avatar
        alt=""
        src={data?.user?.image as string}
        className="mr-4"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />
      <div className="flex-1">
        <Input
          crossOrigin={undefined}
          id="comment_box"
          variant="static"
          placeholder="Add a comment..."
          onClick={openOnFocus}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          label="Add a comment"
          labelProps={{
            className: "hidden",
            htmlFor: "comment_box",
            id: "comment_box_label",
          }}
          aria-labelledby="comment_box_label"
        />
        {open ? (
          <div className="flex items-center justify-end gap-x-2 pt-2">
            <Button
              className="rounded-full normal-case text-sm"
              size="sm"
              variant="text"
              onClick={close}
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
              onClick={onSubmit}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
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
