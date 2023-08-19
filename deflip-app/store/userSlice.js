// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    addUserInfo: (state, action) => {
      const { item } = action.payload;
      if (item) {
        state.info = item; 
      }
    },
  },
});

export const { addUserInfo } = userSlice.actions;
export default userSlice.reducer;
