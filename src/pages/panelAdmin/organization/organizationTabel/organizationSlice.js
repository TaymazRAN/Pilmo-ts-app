import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

import configData from "../../../../services/config.json";

const POSTS_URL = `${configData.AddressApi}/Organization`;

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  count: 0,
});

export const fetchOrganization = createAsyncThunk(
  "postsOrganization/fetchOrganization",
  async () => {
    const response = await axios.get(POSTS_URL);
    return response.data;
  }
);

export const addNewPost = createAsyncThunk(
  "postsOrganization/addNewPost",
  async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost);
    return response.data;
    // if (response?.status === 200) return initialPost;
    // return `${response?.status}: ${response?.statusText}`;
  }
);

export const updatePost = createAsyncThunk(
  "postsOrganization/updatePost",
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
  "postsOrganization/deletePost",
  async (initialPost) => {
    const { id } = initialPost;

    const response = await axios.delete(`${POSTS_URL}/${id}`);
    if (response?.status === 200) return initialPost;
    return `${response?.status}: ${response?.statusText}`;
  }
);

const postsSlice = createSlice({
  name: "postsOrganization",
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
      .addCase(fetchOrganization.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchOrganization.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adding date and reactions
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          return post;
        });
        // Add any fetched postsOrganization to the array
        postsAdapter.upsertMany(state, loadedPosts);
      })
      .addCase(fetchOrganization.rejected, (state, action) => {
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
  // Pass in a selector that returns the postsOrganization slice of state
} = postsAdapter.getSelectors((state) => state.postsOrganization);

export const getPostsStatus = (state) => state.postsOrganization.status;
export const getPostsError = (state) => state.postsOrganization.error;
export const getCount = (state) => state.postsOrganization.count;

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (postsOrganization, userId) =>
    postsOrganization.filter((post) => post.userId === userId)
);

export const { increaseCount, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
