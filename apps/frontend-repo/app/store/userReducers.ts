import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  data: Record<string, unknown> | null;
  loading: boolean;
  loadingUpdate: boolean;
  errorMsg: string | null;
  successMsg: string | null;
}

const initialState: UserState = {
  data: null,
  loading: true,
  loadingUpdate: false,
  errorMsg: null,
  successMsg: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state: UserState, action: PayloadAction<Record<string, unknown>>) {
      state.data = action.payload;
    },
    setLoading(state: UserState, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setLoadingUpdate(state: UserState, action: PayloadAction<boolean>) {
      state.loadingUpdate = action.payload;
    },
    setErrorMsg(state: UserState, action: PayloadAction<string | null>) {
      state.errorMsg = action.payload;
    },
    setSuccessMsg(state: UserState, action: PayloadAction<string | null>) {
      state.successMsg = action.payload;
    },
  },
});

export const { setUser, setLoading, setLoadingUpdate, setErrorMsg, setSuccessMsg } = userSlice.actions;
export default userSlice.reducer;
