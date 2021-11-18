import { TextField, Button } from "@mui/material"
import { useState } from "react"
export default function LoginForm({onSubmit: onSubmitProp}) {
    const initialValues = {
        username: "",
        password: ""
    }

    const [values, setValues] = useState(initialValues);

    const onValueChange = (valueName, value) => {
        setValues({...values, [valueName]: value})
    }

    const onSubmit = (e) => {
        e.preventDefault();

        onSubmitProp(values);
    }

    return (
        <form className="login-form">
            <TextField value={values.username} placeholder="username" onChange={(e) => {
                onValueChange("username", e.target.value);
            }}>Username</TextField>
            <TextField value={values.password} placeholder="password" type="password" onChange={(e) => {
                onValueChange("password", e.target.value);
            }}>Password</TextField>
            <Button title="Sign in" onClick={onSubmit}/>
        </form>
    )
}