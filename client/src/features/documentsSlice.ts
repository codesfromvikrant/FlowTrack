import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  documents: {
    data: [],
    currentData: {},
  },
  tags: {
    data: [],
    error: "",
  }
};

export const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    setAllData: (state, action) => {
      const { key, value } = action.payload;
      state[key].data = value;
    },
    addData: (state, action) => {
      const { key, value } = action.payload;
      state[key].data.push(value);
    },
    updateData: (state, action) => {
      const { key, value } = action.payload;
      const index = state[key].data.findIndex((item) => item._id === value.id);
      state[key].data[index] = value.data;
    },
    deleteData: (state, action) => {
      const { key, value } = action.payload;
      state[key].data = state[key].data.filter((item) => item._id !== value.id);
    },
    setTagError: (state, action) => {
      state.tags.error = action.payload;
    },
    setCurrentData: (state, action) => {
      const { key, value } = action.payload;
      state[key].currentData = value;
    },
  },
});

export const {
  setAllData,
  addData,
  updateData,
  deleteData,
  setTagError,
  setCurrentData,
} = documentsSlice.actions;

const catchAsync = (fn) => {
  return (dispatch, getState) => {
    fn(dispatch, getState).catch(error => console.error(error));
  };
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

const headersTypeJson = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getAllDocuments = (filterTags = []) => catchAsync(async (dispatch, getState) => {
  let queryString = '';
  filterTags.forEach((tagId) => {
    queryString += `tags[]=${tagId}&`;
  });
  console.log(`${apiBaseUrl}documents?${queryString}`);
  const response = await axios.get(`${apiBaseUrl}documents?${queryString}`);
  const { data } = await response.data;
  const { documents } = data;
  dispatch(setAllData({ key: 'documents', value: documents }));
})

export const getDocument = (id) => catchAsync(async (dispatch, getState) => {
  const response = await axios.get(`${apiBaseUrl}documents/${id}`);
  const { data } = await response.data;
  const { document } = data;
  dispatch(setCurrentData({ key: 'documents', value: document }));
})

export const updateDocument = (id, updatedDocument) => catchAsync(async (dispatch, getState) => {
  await axios.patch(`${apiBaseUrl}documents/${id}`, updatedDocument, headersTypeJson);
  dispatch(updateData({ key: 'documents', value: { id, data: updatedDocument } }));
})

export const createDocument = (newDocument, setSearchParams) => catchAsync(async (dispatch, getState) => {
  const response = await axios.post(`${apiBaseUrl}documents`, newDocument, headersTypeJson);
  const { data } = await response.data;
  const { document } = data;
  dispatch(addData({ key: 'documents', value: document }));
  const documentId = document._id;
  setSearchParams({ documentId });
})

export const deleteDocument = (id) => catchAsync(async (dispatch, getState) => {
  await axios.delete(`${apiBaseUrl}documents/${id}`);
  dispatch(deleteData({ key: 'documents', value: { id } }));
})

// Tags
export const getAllTags = () => catchAsync(async (dispatch, getState) => {
  const response = await axios.get(`${apiBaseUrl}tags?category=documents`);
  const { data } = await response.data;
  const { tags } = data;
  dispatch(setAllData({ key: 'tags', value: tags }));
})

export const createNewTag = (newTag) => catchAsync(async (dispatch, getState) => {
  const response = await axios.post(`${apiBaseUrl}tags`, newTag, headersTypeJson);
  const { status } = response.data;
  if (status === 'fail') {
    dispatch(setTagError(response.data.message));
    return;
  }
  dispatch(addData({ key: 'tags', value: newTag }));
})

export const updateDocumentTags = (id, tagId) => catchAsync(async (dispatch, getState) => {
  const response = await axios.post(`${apiBaseUrl}documents/tags/${id}`, { tagId }, headersTypeJson);
  const { data } = response.data;
  const { document } = data;
  dispatch(updateData({ key: 'documents', value: { id, data: document } }));
})


export default documentsSlice.reducer;
