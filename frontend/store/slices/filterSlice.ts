import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";


interface FilterState {

  search:string;

  category:string;

  minPrice:number;

  maxPrice:number;

  sort:
  "featured"
  | "latest"
  | "price-low"
  | "price-high";

}



const initialState:FilterState = {

  search:"",

  category:"",

  minPrice:0,

  maxPrice:0,

  sort:"featured",

};



const filterSlice = createSlice({

  name:"filter",

  initialState,


  reducers:{


    setSearch(
      state,
      action:PayloadAction<string>
    ){

      state.search =
      action.payload;

    },


    setCategory(
      state,
      action:PayloadAction<string>
    ){

      state.category =
      action.payload;

    },


    setPriceRange(
      state,
      action:PayloadAction<{
        min:number;
        max:number;
      }>
    ){

      state.minPrice =
      action.payload.min;


      state.maxPrice =
      action.payload.max;

    },


    setSort(
      state,
      action:PayloadAction<FilterState["sort"]>
    ){

      state.sort =
      action.payload;

    },


    clearFilters(state){

      state.search="";

      state.category="";

      state.minPrice=0;

      state.maxPrice=0;

      state.sort="featured";

    }


  }

});


export const {
  setSearch,
  setCategory,
  setPriceRange,
  setSort,
  clearFilters,

}=filterSlice.actions;


export default filterSlice.reducer;