import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Preview {
    url: string;
    type: string;
}

interface UploadState {
    taskId: string | null;
    previews: Record<string, Preview>;
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
        setPreview(
            state,
            action: PayloadAction<{ key: string; url: string; type: string }>
        ) {
            const { key, url, type } = action.payload;
            state.previews[key] = { url, type };
        },
    },
});

export const { setTaskId, setPreview } = uploadSlice.actions;
export default uploadSlice.reducer;
