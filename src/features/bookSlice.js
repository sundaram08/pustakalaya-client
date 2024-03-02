import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    books: [],
    selectedCategory: 'all',
    searchedText: null,
  };

  export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
      setSliceBooks: (state, action) => {
        state.books = action.payload;
      },
      setCategory: (state, action) => {
        const category = action.payload;
        state.selectedCategory = category;
      },
      searchBooks: (state, action) => {
        const searchText = action.payload.toLowerCase();
      
        state.searchedText = searchText;
      },
    },
  });
  
  export const { setSliceBooks, setCategory,searchBooks } = bookSlice.actions;
  export default bookSlice.reducer;
  