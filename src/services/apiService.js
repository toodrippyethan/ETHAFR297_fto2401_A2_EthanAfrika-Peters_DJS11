// apiService.js

const BASE_URL = 'https://podcast-api.netlify.app';

export async function fetchShows() {
  try {
    const response = await fetch(`${BASE_URL}/shows`);
    if (!response.ok) {
      throw new Error('Failed to fetch shows');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}

export async function fetchShowById(id) {
  try {
    const response = await fetch(`${BASE_URL}/id/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch show details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
}
