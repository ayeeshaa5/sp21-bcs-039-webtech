import { combineReducers } from "@reduxjs/toolkit";

import userSlice from "./postSlice";
import postSlice from "./postSlice";
import themeSlice from "./theme"

const rootReducer = combineReducers({
    user: userSlice,
    theme: themeSlice,
    posts: postSlice,
});

export { rootReducer };