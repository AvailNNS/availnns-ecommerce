import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getCategories,
} from "@/services/category.service";


// ===============================
// FETCH CATEGORIES
// ===============================

export const fetchCategories =
createAsyncThunk(

  "category/fetchCategories",

  async()=>{

    const data =
    await getCategories();

    return data;

  }

);



// ===============================
// TYPES
// ===============================

interface CategoryState {

  categories:any[];

  loading:boolean;

  error:string | null;

}



// ===============================
// INITIAL STATE
// ===============================

const initialState:CategoryState = {

  categories:[],

  loading:false,

  error:null,

};



// ===============================
// SLICE
// ===============================

const categorySlice =
createSlice({

  name:"category",

  initialState,


  reducers:{


    clearCategories:(state)=>{

      state.categories=[];

    },


  },


  extraReducers:(builder)=>{


    builder


    .addCase(
      fetchCategories.pending,

      (state)=>{

        state.loading=true;

      })


    .addCase(
      fetchCategories.fulfilled,

      (state, action)=>{


        state.loading=false;


        // getCategories() array return করছে

        state.categories =
        action.payload || [];


      })



    .addCase(
      fetchCategories.rejected,

      (state)=>{


        state.loading=false;

        state.error =
        "Failed to load categories";


      });


  }


});




// ===============================
// ACTIONS
// ===============================

export const {
  clearCategories,

} = categorySlice.actions;




// ===============================
// REDUCER
// ===============================

export default categorySlice.reducer;