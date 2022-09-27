import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

import configData from "../../../../services/config.json";

const POSTS_URL = `${configData.AddressApi}/Organization/complement-value`;

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  count: 0,
});

export const fetchComplementValue = createAsyncThunk(
  "postsComplementValue/fetchComplementValue",
  async () => {
    const response = await axios.get(POSTS_URL);
    return response.data;
  }
);

export const addNewPost = createAsyncThunk(
  "postsComplementValue/addNewPost",
  async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost);
    return response.data;
    // if (response?.status === 200) return initialPost;
    // return `${response?.status}: ${response?.statusText}`;
  }
);

export const updatePost = createAsyncThunk(
  "postsComplementValue/updatePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
      // return response.data;
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
      //return err.message;
      return initialPost; // only for testing Redux!
    }
  }
);

export const deletePost = createAsyncThunk(
  "postsComplementValue/deletePost",
  async (initialPost) => {
    const { id } = initialPost;

    const response = await axios.delete(`${POSTS_URL}/${id}`);
    if (response?.status === 200) return initialPost;
    return `${response?.status}: ${response?.statusText}`;
  }
);

const postsSlice = createSlice({
  name: "postsComplementValue",
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.entities[postId];
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    increaseCount(state, action) {
      state.count = state.count + 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchComplementValue.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchComplementValue.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adding date and reactions
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          return post;
        });
        // Add any fetched postsComplementValue to the array
        postsAdapter.upsertMany(state, loadedPosts);
      })
      .addCase(fetchComplementValue.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        // action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        // action.payload.reactions = {
        //   item : 0,
        // };
        console.log(action.payload);
        postsAdapter.addOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        action.payload.date = new Date().toISOString();
        postsAdapter.upsertOne(state, action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        postsAdapter.removeOne(state, id);
      });
  },
});

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the postsComplementValue slice of state
} = postsAdapter.getSelectors((state) => state.postsComplementValue);

export const getPostsStatus = (state) => state.postsComplementValue.status;
export const getPostsError = (state) => state.postsComplementValue.error;
export const getCount = (state) => state.postsComplementValue.count;

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (postsComplementValue, userId) =>
    postsComplementValue.filter((post) => post.userId === userId)
);

export const { increaseCount, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
