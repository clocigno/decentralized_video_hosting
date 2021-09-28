import { createSlice } from "@reduxjs/toolkit";

const drawer = createSlice({
  name: "open",
  initialState: false,
  reducers: {
    drawerChange(state) {
      return { open: !state.open };
    }
  }
});

export const { drawerChange } = drawer.actions;

export default drawer.reducer;