import { createSlice } from '@reduxjs/toolkit';
const storedToken = localStorage.getItem('jwtToken');
const localUser = localStorage.getItem('userID');
const initialState = {
    books: [],
    selectedCategory: 'all',
    searchedText: null,
    token: storedToken ? storedToken : null,
    user_id: localUser ? localUser : null
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
      },
      setUserId: (state,action)=>{
        const user = action.payload;
        state.user_id = user;
        localStorage.setItem('userID',user);
      },
      clearUserId:(state)=>{
        state.user_id=null;
        localStorage.removeItem('userID');
      }
    },
  });
  
  export const { setSliceBooks, setCategory,searchBooks,setToken,clearToken,setUserId,clearUserId } = bookSlice.actions;
  export default bookSlice.reducer;
  