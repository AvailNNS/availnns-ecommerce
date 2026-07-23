import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getProducts,
} from "@/services/product.service";



// ===============================
// FETCH PRODUCTS
// ===============================

export const fetchProducts = createAsyncThunk(

  "products/fetchProducts",

  async()=>{

    const data =
    await getProducts();


    return data;

  }

);



// ===============================
// TYPES
// ===============================

interface ProductState {

  products:any[];

  loading:boolean;

  error:string | null;

}



// ===============================
// INITIAL STATE
// ===============================

const initialState:ProductState = {

  products:[],

  loading:false,

  error:null,

};




// ===============================
// SLICE
// ===============================

const productSlice = createSlice({

  name:"products",

  initialState,


  reducers:{


    clearProducts:(state)=>{

      state.products=[];

    },


  },



  extraReducers:(builder)=>{


    builder


    .addCase(
      fetchProducts.pending,

      (state)=>{

        state.loading=true;

        state.error=null;

      })



    .addCase(
      fetchProducts.fulfilled,

      (state, action)=>{


        state.loading=false;


        state.products =
        action.payload || [];


      })



    .addCase(
      fetchProducts.rejected,

      (state)=>{


        state.loading=false;

        state.error =
        "Failed to load products";


      });


  }


});




// ===============================
// ACTIONS
// ===============================

export const {
  clearProducts,

} = productSlice.actions;



// ===============================
// REDUCER
// ===============================

export default productSlice.reducer;