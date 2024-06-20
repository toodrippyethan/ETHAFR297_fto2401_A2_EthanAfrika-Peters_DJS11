// podcastSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = 'https://podcast-api.netlify.app';

// Thunk to fetch all shows
export const fetchAllShowsAsync = createAsyncThunk(
  'podcasts/fetchAllShows',
  async () => {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  }
);

const initialState = {
  shows: [],
  loading: false,
  error: null,
};

const podcastSlice = createSlice({
  name: 'podcasts',
  initialState,
  reducers: {
    setPodcasts: (state, action) => {
      state.shows = action.payload;
      state.loading = false;
      state.error = null;
    },
    sortShowsAZ: (state) => {
      state.shows.sort((a, b) => a.title.localeCompare(b.title));
    },
    sortShowsZA: (state) => {
      state.shows.sort((a, b) => b.title.localeCompare(a.title));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllShowsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllShowsAsync.fulfilled, (state, action) => {
        state.shows = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAllShowsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPodcasts, sortShowsAZ, sortShowsZA } = podcastSlice.actions;

export default podcastSlice.reducer;
