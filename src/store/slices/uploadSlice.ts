import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UploadState {
    taskId: string | null;
    previews: {
        [key: string]: string;
    };
}

const initialState: UploadState = {
    taskId: null,
    previews: {},
};

const uploadSlice = createSlice({
    name: "upload",
    initialState,
    reducers: {
        setTaskId(state, action: PayloadAction<string>) {
            state.taskId = action.payload;
        },
        setPreview(state, action: PayloadAction<{ key: string; url: string }>) {
            state.previews[action.payload.key] = action.payload.url;
        },
    },
});

export const { setTaskId, setPreview } = uploadSlice.actions;
export default uploadSlice.reducer;
