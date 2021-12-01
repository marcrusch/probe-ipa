import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import mockUsers from "../config/mockUsers.json";

export default function Login({ setGlobalUser }) {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const cookieValue = Cookies.get("userinfo");
    if (cookieValue) {
      const cookieValues = [];
      cookieValue.split(";").forEach((item) => {
        cookieValues.push(item.split("=")[1]);
      });
      setUserInfo({
        username: cookieValues[0],
        password: cookieValues[1],
        role: cookieValues[2],
      });
    }
  }, []);

  const onSubmit = (values) => {
    const user = mockUsers.users.find(
      (item) =>
        item.username === values.username && item.password === values.username
    );
    if (user) {
      setUserInfo(user);
      Cookies.set(
        "userinfo",
        `username=${user.username};password=${user.password};role=${user.role}`
      );
    }
  };

  useEffect(() => {
    if (userInfo) {
      setGlobalUser(userInfo);
    }
  }, [userInfo, setGlobalUser]);

  return (
    <>
      <div className="login">
        <div className="login-form-wrapper">
          <LoginForm onSubmit={onSubmit} />
        </div>
      </div>
      <style jsx>{`
        .login {
          position: relative;
          width: 100vw;
          height: 100vh;
        }
        .login-form-wrapper {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </>
  );
}
