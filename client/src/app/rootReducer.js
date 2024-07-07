import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import documentsReducer from "../features/documentsSlice";
import tasksReducer from "../features/tasksSlice";
import globalReducer from "../features/globalSlice";
import workspaceReducer from "../features/workspaceSlice";

const rootReducer = combineReducers({
  global: globalReducer,
  auth: authReducer,
  documents: documentsReducer,
  tasks: tasksReducer,
  workspace: workspaceReducer,
});

export default rootReducer;
