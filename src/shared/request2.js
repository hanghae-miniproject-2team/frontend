import axios from "axios";
import { Cookies } from "react-cookie";

const token3 = new Cookies().get("token");
console.log(token3);
// const tokenSub = token3.substring(7);
// console.log(tokenSub);

const token4 = new Cookies().get("refreshToken");
console.log(token4);
// 토큰 꺼내기.

const instance2 = axios.create({
  baseURL: "http://54.180.141.164",
  header: {
    Authorization: `${token3}`,
    //Access_Token: `${tokenSub}`,
    "Refresh-Token": `${token4}`,
  },
  // 서버가 붙여주는 이름: 우리가 받은 토큰
  // 헤더에 붙이기.// reissue는 Bearer를 떼달라해서 작성
});

// 가지고 있는 토큰 넣어주기!
// 로그인 전이면 토큰이 없으니 못 넣어요.
// 그럴 땐 로그인 하고 토큰을 받아왔을 때 넣어줍시다.
//instance.defaults.headers.common["Authorization"] = USER_TOKEN;

export default instance2;
