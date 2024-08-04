import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CommentDataType } from "./commentTypes";
import { CommentThreadType } from "./commentTypes";

type CommentState = {
  comments: CommentDataType[];
  league: string;
  uuid: string;
};

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (uuid: string) => {
    const commentData = await fetch(
      `https://wealthy-pug-54.hasura.app/api/rest/comment_thread/?uuid=${uuid}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": `${process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET}`,
        },
      }
    );
    const data: CommentThreadType = await commentData.json();
    return data;
  }
);

// Define the initial state using that type
const initialState: CommentState = { comments: [], league: "", uuid: "" };
//   id: Math.floor(Math.random() * 1000).toString(),
//   parentId: "",
//   text: "",
//   likeCount: 0,
//   dislikeCount: 0,
//   publishedAt: new Date().toTimeString(),
//   updatedAt: null,
//   dislikedUsers: [],
//   likedUsers: [],
//   author: "",
//   authorEmail: "",
//   reply: [],
//   uuid: "",

export const commentsSlice = createSlice({
  name: "comments",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<CommentDataType>) => {
      return { ...state, data: action.payload };
    },
    setUUID: (state, action: PayloadAction<string>) => {
      state.uuid = action.payload;
    },
    setLeague: (state, action: PayloadAction<string>) => {
      state.league = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = Object.values(action.payload)[0];
    });
  },
});

export const { addComment, setUUID, setLeague } = commentsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.comments.value;

export default commentsSlice.reducer;
