import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
  name: 'job',
  initialState: {
    jobList: [],
    selectedJob: null,
  },
  reducers: {
    setJobList: (state, action) => {
      state.jobList = action.payload;
    },
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
  },
});

export const { setJobList, setSelectedJob } = jobSlice.actions;

export default jobSlice.reducer;
