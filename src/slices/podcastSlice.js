// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { db } from '../firebase';

// const initialState = {
//   shows: [],
//   loading: false,
//   error: null,
// };

// export const fetchAllShowsAsync = createAsyncThunk(
//   'podcasts/fetchAllShows',
//   async () => {
//     // Example of fetching shows from Firestore or API
//     const showsSnapshot = await db.collection('shows').get();
//     const showsData = showsSnapshot.docs.map(doc => doc.data());
//     return showsData;
//   }
// );

// const podcastsSlice = createSlice({
//   name: 'podcasts',
//   initialState,
//   reducers: {
//     // Additional reducers can be added here if needed
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllShowsAsync.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllShowsAsync.fulfilled, (state, action) => {
//         state.loading = false;
//         state.shows = action.payload;
//       })
//       .addCase(fetchAllShowsAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const { setPodcasts } = podcastsSlice.actions;

// export default podcastsSlice.reducer;
