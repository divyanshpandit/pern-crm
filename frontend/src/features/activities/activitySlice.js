import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import activityService from '../../services/activityService';

const initialState = {
  activities: [],
  isLoading: false,
  isError: false,
  message: '',
};

// Create new activity
export const createActivity = createAsyncThunk(
  'activities/create',
  async (activityData, thunkAPI) => {
    try {
      return await activityService.createActivity(activityData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all activities for a lead
export const getActivitiesForLead = createAsyncThunk(
  'activities/getForLead',
  async (leadId, thunkAPI) => {
    try {
      return await activityService.getActivitiesForLead(leadId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createActivity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activities.push(action.payload);
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getActivitiesForLead.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActivitiesForLead.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activities = action.payload;
      })
      .addCase(getActivitiesForLead.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = activitySlice.actions;
export default activitySlice.reducer;
