import { combineReducers } from "redux";
import { categoriesReducer } from "./reducer/categories/categories.reducer";
import userReducer from "./reducer/user/user.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer
});
