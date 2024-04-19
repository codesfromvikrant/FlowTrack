import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import galleryReducer from '../features/gallerySlice';
import documentsReducer from '../features/documentsSlice';
import projectsReducer from '../features/projectsSlice';
import tasksReducer from '../features/tasksSlice';
import globalReducer from '../features/globalSlice';

const rootReducer = combineReducers({
  global: globalReducer,
  auth: authReducer,
  gallery: galleryReducer,
  documents: documentsReducer,
  projects: projectsReducer,
  tasks: tasksReducer,
});

export default rootReducer;