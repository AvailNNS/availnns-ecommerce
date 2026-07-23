import {
  useDispatch,
  useSelector,
} from "react-redux";

import type {
  RootState,
  AppDispatch,
} from "@/store";


// =========================
// TYPED DISPATCH
// =========================

export const useAppDispatch =
() => useDispatch<AppDispatch>();



// =========================
// TYPED SELECTOR
// =========================

export const useAppSelector =
useSelector.withTypes<RootState>();