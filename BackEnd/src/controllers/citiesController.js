import { cities } from "../data/cities.js";
import { places } from "../data/places.js";

export const getCities = (req, res) => {
  res.json({ cities });
};

export const getPlacesByCity = (req, res) => {
  const { city } = req.params;

  if (!places[city]) {
    return res.status(404).json({ message: "City not found" });
  }

  res.json({
    city,
    places: places[city],
  });
};
