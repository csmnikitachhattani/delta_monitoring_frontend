import { combineReducers } from "@reduxjs/toolkit";
//import deleteModalReducer from "@/store/modules/deleteSlice";
import deleteReducer from "@/store/modules/deleteSlice";

/**
 * 🛠️ ROOT REDUCER
 * This file combines all individual slices. 
 * We use a dummy reducer to ensure the store is never empty on initialization.
 */

const dummyReducer = (state = { initialized: true }, action) => {
    return state;
};

const rootReducer = combineReducers({
    app: dummyReducer,
    delete : deleteReducer,
    //delete: deleteModalReducer
    // Add your real slices here as you create them, e.g.:
    // auth: authReducer,
});

export default rootReducer;