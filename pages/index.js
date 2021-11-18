import Cookies from 'js-cookie';
import { useEffect, useState } from 'react'
import Login from './Login';

export default function Home() {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const cookieValue = Cookies.get("userinfo");
    if(cookieValue) {
      const cookieValues = [];
      cookieValue.split(";").forEach((item) => {
        cookieValues.push(item.split("=")[1]);
      })
      setUserInfo({
        username: cookieValues[0],
        password: cookieValues[1],
        role: cookieValues[2]
      })
    }
  }, [])

  const onUser = (user) => {
    if(user) {
      setUserInfo(user);
      Cookies.set("userinfo", `username=${user.username};password=${user.password};role=${user.role}`);
    }
  }

  return (
    <>
      {!userInfo && <Login onUser={onUser}/>}
      {userInfo && <div>username: {userInfo.username} password: {userInfo.password} role: {userInfo.role}</div>}
    </>
  )
}
