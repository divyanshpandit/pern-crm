import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dashboardService from '../../services/dashboardService';

const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  message: '',
};

// Get dashboard data
export const getDashboardData = createAsyncThunk(
  'dashboard/getData',
  async (_, thunkAPI) => {
    try {
      return await dashboardService.getDashboardData();
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

export const dashboardSlice = createSlice({
  name: 'dashboard',
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
      .addCase(getDashboardData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = dashboardSlice.actions;
export default dashboardSlice.reducer;
