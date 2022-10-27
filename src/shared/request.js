import axios from "axios";
import { Cookies } from "react-cookie";

const token = new Cookies().get("token");
console.log(token);
const token2 = new Cookies().get("refreshToken");
console.log(token2);
// 토큰 꺼내기.
const instance = axios.create({
  baseURL: "http://54.180.141.164",
  header: {
    Authorization: `${token}`,
    "Refresh-Token": `${token2}`,
    // 서버가 붙여주는 이름: 우리가 받은 토큰
  },
  // 헤더에 붙이기.
});

// 가지고 있는 토큰 넣어주기!
// 로그인 전이면 토큰이 없으니 못 넣어요.
// 그럴 땐 로그인 하고 토큰을 받아왔을 때 넣어줍시다.
//instance.defaults.headers.common["Authorization"] = USER_TOKEN;

export default instance;
