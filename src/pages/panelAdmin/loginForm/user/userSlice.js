import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

import configData from "../../../../services/config.json";

const POSTS_URL = `${configData.AddressApi}/User`;
const POSTS_URL_register = `${configData.AddressApi}/User/register`;
const POSTS_URL_login = `${configData.AddressApi}/User/login`;

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  count: 0,
});

export const fetchUser = createAsyncThunk("postsUser/fetchUser", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

// register
export const addNewPost = createAsyncThunk(
  "postsUser/addNewPost",
  async (initialPost) => {
    const response = await axios.post(POSTS_URL_register, initialPost);
    return response.data;
    // if (response?.status === 200) return initialPost;
    // return `${response?.status}: ${response?.statusText}`;
  }
);

// login
export const addNewPost_Login = createAsyncThunk(
  "postsUser/addNewPost_Login",
  async (initialPost) => {
    const response = await axios.post(POSTS_URL_login, initialPost);

    console.log("initialPost");
    console.log(initialPost.username);
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("username", JSON.stringify(initialPost.username));
      const location = (window.location.href = "/user");
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
export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("username");
};
export const addNewPost_Logout = createAsyncThunk(
  "postsUser/addNewPost",
  async (initialPost) => {
    const response = await axios.post(POSTS_URL_register, initialPost);
    return response.data;
    // if (response?.status === 200) return initialPost;
    // return `${response?.status}: ${response?.statusText}`;
  }
);

export const updatePost = createAsyncThunk(
  "postsUser/updatePost",
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
  "postsUser/deletePost",
  async (initialPost) => {
    const { id } = initialPost;

    const response = await axios.delete(`${POSTS_URL}/${id}`);
    if (response?.status === 200) return initialPost;
    return `${response?.status}: ${response?.statusText}`;
  }
);

const postsSlice = createSlice({
  name: "postsUser",
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
      .addCase(fetchUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adding date and reactions
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          return post;
        });
        // Add any fetched postsUser to the array
        postsAdapter.upsertMany(state, loadedPosts);
      })
      .addCase(fetchUser.rejected, (state, action) => {
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
  // Pass in a selector that returns the postsUser slice of state
} = postsAdapter.getSelectors((state) => state.postsUser);

export const getPostsStatus = (state) => state.postsUser.status;
export const getPostsError = (state) => state.postsUser.error;
export const getCount = (state) => state.postsUser.count;

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (postsUser, userId) => postsUser.filter((post) => post.userId === userId)
);

export const { increaseCount, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
