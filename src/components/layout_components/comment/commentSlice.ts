import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CommentDataType } from "./commentTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type CommentState = {
  comments?: CommentDataType[];
  league?: string;
  uuid?: string;
};

export const CommentAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  tagTypes: ["Comment"],
  reducerPath: "commentApi",
  endpoints: (build) => ({
    getComments: build.query<CommentDataType[], string & CommentDataType[]>({
      query: (uuid) => ({
        url: `https://wealthy-pug-54.hasura.app/api/rest/comment_thread/?uuid=${uuid}`,
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": `${process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET}`,
        },
      }),
      providesTags: [{ type: "Comment" }],
    }),
    addComment: build.mutation<CommentState, CommentDataType & CommentState>({
      query: ({ league, uuid, inputValue, author, authorEmail }) => ({
        url: `api/comment/${league}/${uuid}`,
        method: "POST",
        body: JSON.stringify({
          inputValue,
          author,
          authorEmail,
        }),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: [{ type: "Comment" }],
    }),
    deleteComment: build.mutation({
      query: ({ league, uuid, id, action }) => ({
        url: `api/comment/${league}/${uuid}`,
        method: "DELETE",
        body: JSON.stringify({
          id,
          action,
        }),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: [{ type: "Comment" }],
    }),
    editComment: build.mutation({
      query: ({ league, uuid, id, updatedText }) => ({
        url: `/api/comment/${league}/${uuid}`,
        method: "PATCH",
        body: JSON.stringify({
          id,
          text: updatedText,
          action: "edit",
        }),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: [{ type: "Comment" }],
    }),
    likeDislikeComment: build.mutation({
      query: ({
        league,
        uuid,
        id,
        action,
        authorEmail,
        dislikeCount,
        likeCount,
      }) => ({
        url: `api/comment/${league}/${uuid}`,
        method: "PATCH",
        body: JSON.stringify({
          id,
          action,
          authorEmail,
          dislikeCount,
          likeCount,
        }),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: [{ type: "Comment" }],
    }),
    replyToComment: build.mutation({
      query: ({ league, uuid, id, action, reply }) => ({
        url: `api/comment/${league}/${uuid}`,
        method: "PATCH",
        body: JSON.stringify({
          id,
          action,
          reply,
        }),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: [{ type: "Comment" }],
    }),
    editReply: build.mutation({
      query: ({ league, uuid, id, parentId, action, text }) => ({
        url: `api/comment/${league}/${uuid}`,
        method: "PATCH",
        body: JSON.stringify({
          id,
          action,
          parentId,
          text,
        }),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: [{ type: "Comment" }],
    }),
    deleteReply: build.mutation({
      query: ({ league, uuid, id, parentId, action }) => ({
        url: `api/comment/${league}/${uuid}`,
        method: "DELETE",
        body: JSON.stringify({
          id,
          action,
          parentId,
        }),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: [{ type: "Comment" }],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useLikeDislikeCommentMutation,
  useEditCommentMutation,
  useReplyToCommentMutation,
  useEditReplyMutation,
  useDeleteReplyMutation,
} = CommentAPI;

// Define the initial state using that type
const initialState: CommentState = { comments: [], league: "", uuid: "" };

export const commentsSlice = createSlice({
  name: "comments",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUUID: (state, action: PayloadAction<string>) => {
      return { ...state, uuid: action.payload };
    },
    setLeague: (state, action: PayloadAction<string>) => {
      return { ...state, league: action.payload };
    },
  },
});

export const { setUUID, setLeague } = commentsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.comments.value;

export default commentsSlice.reducer;
