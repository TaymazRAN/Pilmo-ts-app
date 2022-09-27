import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

import configData from "../../../../services/config.json";

const POSTS_URL = `${configData.AddressApi}/identity/admin`;
const POSTS_URL_Login = `${configData.AddressApi}/identity/admin/login`;
// const POSTS_URL_Logout = `${configData.AddressApi}/identity/admin/Logout`;
const POSTS_URL_register = `${configData.AddressApi}/identity/admin/register`;

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  count: 0,
});

export const fetchAdmin = createAsyncThunk(
  "postsAdmin/fetchAdmin",
  async () => {
    const response = await axios.get(POSTS_URL);
    return response.data;
  }
);

// login----------------------------------------------------------------------
export const addNewPost_Login = createAsyncThunk(
  "postsAdmin/addNewPost_Login",
  async (initialPost) => {
    const response = await axios.post(POSTS_URL_Login, initialPost);

    console.log("initialPost");
    console.log(initialPost.username);
    if (response.data.token) {
      localStorage.setItem("admin", JSON.stringify(response.data));
      localStorage.setItem("adminname", JSON.stringify(initialPost.username));
      const location = (window.location.href = "/admin");
      return response.data && location;
    }

    // if (response?.status === 200) return initialPost;
    // return `${response?.status}: ${response?.statusText}`;
    // return response.data;
  }
);

export const getCurrentUser = () => {
  var user = JSON.parse(localStorage.getItem("username"));
  return user;
};

// Logout
export const logoutAdmin = () => {
  localStorage.removeItem("admin");
  localStorage.removeItem("adminname");
};

// register
export const addNewPost_register = createAsyncThunk(
  "postsAdmin/addNewPost",
  async (initialPost) => {
    const response = await axios.post(POSTS_URL_register, initialPost);
    return response.data;
  }
);
export const addNewPost = createAsyncThunk(
  "postsAdmin/addNewPost",
  async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost);
    return response.data;
    // if (response?.status === 200) return initialPost;
    // return `${response?.status}: ${response?.statusText}`;
  }
);

export const updatePost = createAsyncThunk(
  "postsAdmin/updatePost",
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
  "postsAdmin/deletePost",
  async (initialPost) => {
    const { id } = initialPost;

    const response = await axios.delete(`${POSTS_URL}/${id}`);
    if (response?.status === 200) return initialPost;
    return `${response?.status}: ${response?.statusText}`;
  }
);

const postsSlice = createSlice({
  name: "postsAdmin",
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
      .addCase(fetchAdmin.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adding date and reactions
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          return post;
        });
        // Add any fetched postsAdmin to the array
        postsAdapter.upsertMany(state, loadedPosts);
      })
      .addCase(fetchAdmin.rejected, (state, action) => {
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
      .addCase(addNewPost_Login.fulfilled, (state, action) => {
        action.payload.date = new Date().toISOString();
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
  // Pass in a selector that returns the postsAdmin slice of state
} = postsAdapter.getSelectors((state) => state.postsAdmin);

export const getPostsStatus = (state) => state.postsAdmin.status;
export const getPostsError = (state) => state.postsAdmin.error;
export const getCount = (state) => state.postsAdmin.count;

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (postsAdmin, userId) => postsAdmin.filter((post) => post.userId === userId)
);

export const { increaseCount, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
