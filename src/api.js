// api.js

import axios from 'axios';

const API_BASE_URL = 'https://podcast-api.netlify.app';

// Function to fetch all shows (PREVIEW)
export const fetchAllShows = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data; // Assuming API response is an array of shows (PREVIEW)
  } catch (error) {
    console.error('Error fetching all shows:', error);
    throw error; // Propagate error to the calling component for handling
  }
};

// Function to fetch specific show details by ID
export const fetchShowById = async (showId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/id/${showId}`);
    return response.data; // Assuming API response structure for a show object with seasons and episodes
  } catch (error) {
    console.error(`Error fetching show ${showId}:`, error);
    throw error; // Propagate error to the calling component for handling
  }
};
