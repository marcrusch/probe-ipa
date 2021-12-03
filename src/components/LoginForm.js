import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function LoginForm({ onSubmit: onSubmitProp }) {
  const initialValues = {
    username: "",
    password: "",
  };

  const [values, setValues] = useState(initialValues);

  const onValueChange = (valueName, value) => {
    setValues({ ...values, [valueName]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    onSubmitProp(values);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      onSubmitProp(values);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", (e) => handleEnter(e));
    return document.removeEventListener("keydown", (e) => handleEnter(e));
  }, [values]);

  return (
    <>
      <form className="login-form">
        <div className="login__input">
          <TextField
            label="Username"
            value={values.username}
            placeholder="Username"
            onChange={(e) => {
              onValueChange("username", e.target.value);
            }}
          >
            Username
          </TextField>
        </div>
        <div className="login__input">
          <TextField
            label="Password"
            value={values.password}
            placeholder="Password"
            type="password"
            onChange={(e) => {
              onValueChange("password", e.target.value);
            }}
          >
            Password
          </TextField>
        </div>
        <div className="login__input">
          <Button onClick={onSubmit} variant="outlined">
            Sign in
          </Button>
        </div>
      </form>
      <style jsx>{`
        .login__input {
          padding: 10px;
        }
      `}</style>
    </>
  );
}
