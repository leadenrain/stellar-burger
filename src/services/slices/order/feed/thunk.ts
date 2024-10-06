import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../../../utils/burger-api';

export const fetchFeed = createAsyncThunk('feed/get', getFeedsApi);
