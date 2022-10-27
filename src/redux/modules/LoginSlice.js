import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "../../shared/request";
//import { useCookies } from "react-cookie";

//const MEMBER = process.env.REACT_APP_MEMBER;
//const LOGIN = process.env.REACT_APP_LOGIN;

export const addMemberThunk = createAsyncThunk(
  "ADD_MEMBER",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const { data } = await instance.post("api/member/signup", payload);
      console.log(data);
      // 추가
      if (data.success === false) alert("중복된 이메일입니다.");
      // 추가
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 로그인 thunk 사용 훅을 최상단에서 쓸 수 없기 때문에 setCookie를 사용해
// reducer로 setCookie 저장해야되는가?

// export const checkMemberThunk = createAsyncThunk(
//   "CHECK_MEMBER",
//   async (payload, thunkAPI) => {
//     console.log(payload); //emailId, password 넘어옴
//     const [cookies, setCookie, removeCookie] = useCookies(["cook"]);
//     try {
//       const config = { headers: { "Content-Type": "application/json" } };
//       const { data } = await axios.post(LOGIN, payload, config).then((res) => {
//         setCookie("token", res.request.getResponseHeader("authorization"));
//         console.log(res);
//         //console.log(res.request.getResponseHeader("authorization"));
//         setCookie(
//           "refreshToken",
//           res.request.getResponseHeader("refresh-token")
//         );
//         //console.log(res.request.getResponseHeader("refresh-Token"));
//       });
//       console.log(data);
//       return thunkAPI.fulfillWithValue(data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
const initialState = { member: [], isLoading: false, error: null };

const LoginSlice = createSlice({
  name: "member",
  initialState,
  reducers: {},
  extraReducers: {
    [addMemberThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [addMemberThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.member.push(action.payload);
    },
    [addMemberThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // [checkMemberThunk.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [checkMemberThunk.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.success = true;
    // },
    // [checkMemberThunk.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
});
export default LoginSlice.reducer;
