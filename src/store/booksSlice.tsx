import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BookType, BooksResponseType } from "../models/types";

const initialState = {
  books: [] as BookType[],
  totalBooks: 0 as number,
};

const booksSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addBooksToList(state, action: PayloadAction<BooksResponseType>) {
      if (action.payload.items) {
        state.books.push(...action.payload.items);
      }
    },
    clearBooksList(state) {
      state.books = [];
      state.totalBooks = 0;
    },
    setTotalBooksQuantity(state, action: PayloadAction<number>) {
      state.totalBooks = action.payload;
    },
  },
});

export default booksSlice.reducer;
export const { addBooksToList, clearBooksList, setTotalBooksQuantity } =
  booksSlice.actions;
