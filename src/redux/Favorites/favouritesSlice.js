import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const counterSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorite: (state, action) => {
      state.value = action.payload;
    },
    addFavorite: (state, action) => {
      if (
        !state.value.find((element) => element.payload.id === action.payload.id)
      ) {
        state.value = [...state.value, action];
        localStorage.setItem("favourites", JSON.stringify(state.value));
      }
    },
    removeFavorite: (state, action) => {
      const stateCopy = [...state.value];
      const restElements = stateCopy.filter(
        (element) => element.payload.id !== action.payload.payload.id
      );
      state.value = restElements;
      localStorage.setItem("favourites", JSON.stringify(state.value));
    },
  },
});

export const { addFavorite, removeFavorite, setFavorite } =
  counterSlice.actions;

export default counterSlice.reducer;
