import { combineReducers } from "@reduxjs/toolkit";
import documentsReducer from "../features/documentsSlice";
import tasksReducer from "../features/tasksSlice";
import globalReducer from "../features/globalSlice";
import workspaceReducer from "../features/workspaceSlice";

const rootReducer = combineReducers({
  global: globalReducer,
  documents: documentsReducer,
  tasks: tasksReducer,
  workspace: workspaceReducer,
});

export default rootReducer;
