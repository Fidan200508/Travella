import apiClient from "./apiClient";

export const fetchCities = async () => {
  const res = await apiClient.get("/cities");
  // API returns { cities: [...] }
  return res.data?.cities ?? [];
};

export const fetchPlacesByCity = async (cityName) => {
  if (!cityName) return [];
  const res = await apiClient.get(`/cities/${encodeURIComponent(cityName)}/places`);
  // API returns { city, places: [...] }
  return res.data?.places ?? [];
};
