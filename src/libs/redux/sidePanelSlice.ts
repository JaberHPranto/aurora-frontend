import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLeftPanelOpen: true,
  isRightPanelOpen: true,
};

const sidePanelSlice = createSlice({
  name: "sidePanel",
  initialState,
  reducers: {
    toggleLeftPanel: (state) => {
      state.isLeftPanelOpen = !state.isLeftPanelOpen;
    },
    toggleRightPanel: (state) => {
      state.isRightPanelOpen = !state.isRightPanelOpen;
    },
  },
});

export const { toggleLeftPanel, toggleRightPanel } = sidePanelSlice.actions;

export default sidePanelSlice.reducer;
