import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || "http://localhost:8000",
});

export const searchLiterature = async (query, maxResults) => {
  try {
    const response = await api.post(
      `/search/search?query=${encodeURIComponent(
        query
      )}&max_results=${maxResults}`
    );

    if (response.data.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error("Error fetching search results");
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};

export default api;
