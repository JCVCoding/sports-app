"use client";

import CommentActions from "./commentActions";
import { Avatar } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
export interface commentProps {
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
  likeCount: number;
  dislikeCount: number;
  id: string;
  league: string;
  uuid: string;
  authorEmail: string;
}

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
}: commentProps) => {
  const { data } = useSession();

  return (
    <>
      <div className="flex flex-wrap">
        <Avatar src="/next.svg" size="xs" />
        <div className="px-2 flex-1">
          <div>
            {data?.user?.email === authorEmail ? (
              <span className="font-bold">{author}</span>
            ) : (
              author
            )}
            <span className="ml-1 text-xs text-gray-400">{timestamp}</span>
          </div>
          <div className="my-1">{text}</div>
          <CommentActions
            likeCount={likeCount}
            dislikeCount={dislikeCount}
            id={id}
            league={league}
            uuid={uuid}
          />
        </div>
      </div>
    </>
  );
};

export default Comment;
