import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMemberThunk } from '../redux/modules/LoginSlice';
import useInput from "../hooks/useInput"
// input 훅 import
import axios from "axios";
import { useCookies } from 'react-cookie';
// 쿠키에 refresh 쿠키를 저장하기 위함
import instance from '../shared/request';
//import instance2 from '../shared/request2';


const LoginPost = () => {

  const dispatch = useDispatch();
  const [emailId, onChangeIdHandler] = useInput('');
  const [password, onChangePasswordHandler] = useInput('');
  // 로그인 인풋
  const [signId, onChangeSignIdHandler] = useInput('');
  const [signNick, onChangeSignNickHandler] = useInput('');
  const [signPw, onChangeSignPasswordHandler] = useInput('');
  const [signPwOk, onChangeSignPasswordOkHandler] = useInput('');
  // 회원가입 인풋

  const loginInit = {
    id: 0,
    nickname: "",
    password: "",
  }

  const signInit = {
    id: 0,
    nickname: "",
    password: "",
  }

  const [login, setLogin] = useState(loginInit)
  const [signUp, setSignUp] = useState(signInit)
  const [cookies, setCookie, removeCookie] = useCookies(["cook"]);
  console.log(["cook"])

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const temp = {
      "nickname": emailId,
      "password": password
    }
  // 이메일 비밀번호 BE양식 : nickname:~, password: ~
  const data = instance.post('api/member/login', temp)
    .then(res => {
      //const { accessToken } = res.data;
      //axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      // accessToken을 헤더에 붙여주는 과정이지만, instance에서 이미실행
      console.log(res)
      console.log(res.data)
      console.log(res.request.getResponseHeader('authorization'))
      // access 토큰을 받아와짐.
      setCookie('token', res.request.getResponseHeader('authorization'))
      setCookie('refreshToken', res.request.getResponseHeader('refresh-token'))
      // setCookie를 사용해 application>cookie에 토큰 2개담기
      if (res.data.success === false) alert(res.data.error.message);
      //setInterval(onSilentRefresh, 180000);
      // 3분뒤 로그인 연장
    }
  )
  .catch(error => {
    alert("로그인 정보를 받아올 수 없습니다!");
  })
    setLogin({emailId: "", password: ""});
  }

  // const onSilentRefresh = () => {
  //   instance2.post('api/auth/member/reissue')
  //   .then((res) => {
  //     //setCookie('token', res.request.getResponseHeader('authorization'))
  //     //setCookie('refreshToken', res.request.getResponseHeader('refresh-token'))
  //     setTimeout(onSilentRefresh, 180000)
  //   })
  //   .catch(error=> {
  //   });
  // }
  // // if (performance.navigation.type===1){
  // //   onSilentRefresh();
  // // }

  const onSubmitSignHandler = (event) => {
    event.preventDefault();
    // 추가
    if(signPw != signPwOk) alert("비밀번호와 확인란의 입력 값이 동일한지 확인해주세요!")
    //비밀번호 비밀번호 확인 동일여부
    // if(!/^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\\d~!@#$%^&*()+|=]{8,20}$/.test(signPw)) {
    //   alert("비밀번호에는 영문, 숫자, 특수문자를 각각 1글자 이상 포함해야 합니다!");
    //   return
    // }
    // if(!/^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\\d~!@#$%^&*()+|=]{8,20}$/.test(signPwOk)) {
    //   alert("비밀번호에는 영문, 숫자, 특수문자를 각각 1글자 이상 포함해야 합니다!");
    //   return
    // }
    
    dispatch(addMemberThunk({
      nickname:signId,
      password:signPw, 
      passwordConfirm:signPwOk, 
      name:signNick}));
      setSignUp(signInit);
  }

  return (
    <div>
      <section>
        <form onSubmit={onSubmitHandler}>
          <h3>로그인</h3>
          <input
            type='text'
            name='emailId'
            value={emailId}
            placeholder='E-mail'
            onChange={onChangeIdHandler}
          />
          <input
            type='password'
            name='password'
            value={password}
            placeholder='PW'
            onChange={onChangePasswordHandler}
          />
          <b>계정이 없으신가요?</b> <b>회원가입</b>
          <button>로그인</button>
          <button>메인으로</button>
        </form>
        <br/>
        <hr/>
        <br/>
        <form onSubmit={onSubmitSignHandler}>
          <h3>회원가입</h3>
          <input
            type='text'
            name='signId'
            value={signId}
            placeholder="E-mail"
            onChange={onChangeSignIdHandler}
          />
          <button>중복확인</button>
          <p>이메일을 입력해주세요.</p>
          <input
            type='text'
            name='signNick'
            value={signNick}
            placeholder='ID'
            onChange={onChangeSignNickHandler}
          />
          <p>아이디를 입력해 주세요.</p>         
          <input
            type='password'
            name='signPw'
            value={signPw}
            placeholder="PW"
            onChange={onChangeSignPasswordHandler}
          />
          <p>영문/숫자//특수문자를 각각 1글자 이상 사용하여 8~20자</p>
          <input
            type='password'
            name='signId'
            value={signPwOk}
            placeholder="PW 확인"
            onChange={onChangeSignPasswordOkHandler}
          />
          <p>비밀번호 재확인</p>
          <b>이미 가입하셨나요?</b> <b>로그인</b>
          <button>회원가입</button>
        </form>
      </section>
    </div>
  );
}

export default LoginPost;