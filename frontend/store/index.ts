import {
  configureStore,
} from "@reduxjs/toolkit";


// =========================
// REDUCERS
// =========================

import productReducer 
from "./slices/productSlice";


import filterReducer 
from "./slices/filterSlice";


import categoryReducer 
from "./slices/categorySlice";




// =========================
// STORE
// =========================

export const store = 
configureStore({

  reducer: {


    // PRODUCTS
    products: productReducer,


    // SHOP FILTER
    filter: filterReducer,


    // CATEGORIES
    category: categoryReducer,


  },


});




// =========================
// TYPES
// =========================

export type RootState =
ReturnType<
  typeof store.getState
>;



export type AppDispatch =
typeof store.dispatch;