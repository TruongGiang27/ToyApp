import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../config/supabase';

// Đăng ký user
// Đăng ký user vào bảng users tự tạo
export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const { email, password_hash, full_name, phone } = userData;
            const { data, error } = await supabase
                .from('users')
                .insert([{ email, password_hash, full_name, phone }])
                .select();
            if (error) throw new Error(error.message || 'Đăng ký thất bại');
            return { user: data[0] };
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Đăng nhập user
// Đăng nhập user bằng bảng users tự tạo
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (loginData, { rejectWithValue }) => {
        try {
            const { email, password_hash } = loginData;
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('email', email)
                .eq('password_hash', password_hash)
                .single();
            if (error || !data) throw new Error('Sai email hoặc mật khẩu');
            return { user: data };
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null,
        isLoggedIn: false,
    },
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isLoggedIn = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isLoggedIn = false;
            });
    },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;