import { createSlice } from '@reduxjs/toolkit';
const storedToken = localStorage.getItem('jwtToken');
const initialState = {
    books: [],
    selectedCategory: 'all',
    searchedText: null,
    token: storedToken ? storedToken : null
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
      setToken: (state, action) => {
        const token = action.payload;
        state.token = token;
        localStorage.setItem('jwtToken', token); 
      },
      clearToken: (state) => {
        state.token = null;
        localStorage.removeItem('jwtToken'); 
      }
    },
  });
  
  export const { setSliceBooks, setCategory,searchBooks,setToken,clearToken } = bookSlice.actions;
  export default bookSlice.reducer;
  