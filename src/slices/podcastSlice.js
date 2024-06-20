import { createSlice } from '@reduxjs/toolkit';
import { fetchAllShows, fetchShowById } from '../api'; // Import API functions

const initialState = {
  shows: [],
  loading: false,
  error: null,
};

const podcastSlice = createSlice({
  name: 'podcasts',
  initialState,
  reducers: {
    setShows: (state, action) => {
      state.shows = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    sortShowsAZ: (state) => {
      state.shows.sort((a, b) => a.title.localeCompare(b.title));
    },
    sortShowsZA: (state) => {
      state.shows.sort((a, b) => b.title.localeCompare(a.title));
    },
    setPodcasts: (state, action) => {
      state.shows = action.payload;
    },
  },
});

// Thunks for fetching data
export const fetchAllShowsAsync = () => async (dispatch) => {
  dispatch(podcastSlice.actions.setLoading(true));
  try {
    const showsData = await fetchAllShows();
    dispatch(podcastSlice.actions.setShows(showsData));
    dispatch(podcastSlice.actions.setLoading(false));
  } catch (error) {
    dispatch(podcastSlice.actions.setError(error.message));
    dispatch(podcastSlice.actions.setLoading(false));
  }
};

export const fetchShowByIdAsync = (showId) => async (dispatch) => {
  dispatch(podcastSlice.actions.setLoading(true));
  try {
    const showData = await fetchShowById(showId);
    // Handle individual show data as needed
    dispatch(podcastSlice.actions.setLoading(false));
    return showData; // Return show data to the caller (e.g., for displaying details)
  } catch (error) {
    dispatch(podcastSlice.actions.setError(error.message));
    dispatch(podcastSlice.actions.setLoading(false));
  }
};

export const { setShows, setLoading, setError, sortShowsAZ, sortShowsZA, setPodcasts } = podcastSlice.actions;
export default podcastSlice.reducer;
