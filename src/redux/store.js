import { configureStore } from "@reduxjs/toolkit";
import favoriteSlice from "./Favorites/favouritesSlice";

export const store = configureStore({
  reducer: { favorites: favoriteSlice },
});
