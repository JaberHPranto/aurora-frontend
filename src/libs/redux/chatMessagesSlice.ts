import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
}

interface ChatState {
  messages: Message[];
}

const initialState: ChatState = {
  messages: [],
};

const chatMessagesSlice = createSlice({
  name: "chatMessages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },

    addMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = [...state.messages, ...action.payload];
    },

    updateMessage: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Message> }>
    ) => {
      const { id, updates } = action.payload;
      const messageIndex = state.messages.findIndex((msg) => msg.id === id);
      if (messageIndex !== -1) {
        state.messages[messageIndex] = {
          ...state.messages[messageIndex],
          ...updates,
        };
      }
    },

    deleteMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(
        (msg) => msg.id !== action.payload
      );
    },

    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

// Export actions
export const {
  addMessage,
  addMessages,
  updateMessage,
  deleteMessage,
  clearMessages,
} = chatMessagesSlice.actions;

export const selectAllMessages = (state: { chatMessages: ChatState }) =>
  state.chatMessages.messages;

export default chatMessagesSlice.reducer;
