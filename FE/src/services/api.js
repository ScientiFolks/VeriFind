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

    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error("Error fetching search results");
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};

export const getDetailedSummary = async (url, title) => {
  try {
    const response = await api.post('/extraction/summarize-extraction', {
      url,
      title
    });

    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error("Error fetching detailed summary");
    }
  } catch (error) {
    console.error('Error fetching detailed summary:', error);
    throw error;
  }
};

export const verifyDocument = async (document) => {
  try {
    const formData = new FormData();
    formData.append('file', document);

    const response = await api.post('/revision/pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error("Error uploading PDF");
    }
  } catch (error) {
    console.error("Error uploading PDF:", error);
    throw error;
  }
}

export const verifyStatement = async (statement) => {
  try {
    const params = new URLSearchParams({
      statement: statement
    });

    const url = `/revision/statement?${params.toString()}`;
    const response = await api.post(url);

    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error("Error sending statement to PDF endpoint");
    }
  } catch (error) {
    console.error("Error sending statement to PDF endpoint:", error);
    throw error;
  }
}

export default api;
