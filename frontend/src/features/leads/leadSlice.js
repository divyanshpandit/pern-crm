import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import leadService from '../../services/leadService';

const initialState = {
  leads: [],
  lead: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Create new lead
export const createLead = createAsyncThunk('leads/create', async (leadData, thunkAPI) => {
  try {
    return await leadService.createLead(leadData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get all leads
export const getLeads = createAsyncThunk('leads/getAll', async (_, thunkAPI) => {
  try {
    return await leadService.getLeads();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get single lead
export const getLead = createAsyncThunk('leads/get', async (leadId, thunkAPI) => {
  try {
    return await leadService.getLead(leadId);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update lead
export const updateLead = createAsyncThunk('leads/update', async ({ leadId, leadData }, thunkAPI) => {
  try {
    return await leadService.updateLead(leadId, leadData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete lead
export const deleteLead = createAsyncThunk('leads/delete', async (leadId, thunkAPI) => {
  try {
    await leadService.deleteLead(leadId);
    return leadId; // Return the ID of the deleted lead
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const leadSlice = createSlice({
  name: 'lead',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    addLead: (state, action) => {
      state.leads.push(action.payload);
    },
    updateLeadState: (state, action) => {
      state.leads = state.leads.map((lead) =>
        lead.id === action.payload.id ? action.payload : lead
      );
    },
    deleteLeadState: (state, action) => {
      state.leads = state.leads.filter((lead) => lead.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLead.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.leads.push(action.payload); // This is handled by the websocket event
      })
      .addCase(createLead.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLeads.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLeads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.leads = action.payload;
      })
      .addCase(getLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLead.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLead.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lead = action.payload;
      })
      .addCase(getLead.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateLead.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLead.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.leads = state.leads.map((lead) =>
        //   lead.id === action.payload.id ? action.payload : lead
        // ); // This is handled by the websocket event
      })
      .addCase(updateLead.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteLead.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLead.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.leads = state.leads.filter((lead) => lead.id !== action.payload); // This is handled by the websocket event
      })
      .addCase(deleteLead.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, addLead, updateLeadState, deleteLeadState } = leadSlice.actions;
export default leadSlice.reducer;
