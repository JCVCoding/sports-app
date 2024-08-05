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
  league: string | null | undefined;
  uuid: string | null | undefined;
  authorEmail: string | null | undefined;
  dislikedUsers: string[] | null | undefined;
  likedUsers: string[] | null | undefined;
  isReply: boolean;
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
  dislikedUsers,
  likedUsers,
  isReply,
}: commentProps) => {
  const { data } = useSession();
  let isLiked = false;
  let isDisliked = false;
  if (likedUsers?.includes(data?.user?.email!)) {
    isLiked = true;
  }
  if (dislikedUsers?.includes(data?.user?.email!)) {
    isDisliked = true;
  }
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
          <div className="my-1">{text}</div>
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
      </div>
    </>
  );
};

export default Comment;
