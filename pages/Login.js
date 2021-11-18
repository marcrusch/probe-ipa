import LoginForm from "../src/components/LoginForm";
import mockUsers from "../src/config/mockUsers.json";

export default function Login({onUser}) {
    const onSubmit = (values) => {
        const user = mockUsers.users.find((item) => item.username===values.username && item.password===values.username);
        onUser(user);
    }
    return (
        <>
            <div className="login">
                <div className="login-form-wrapper">
                    <LoginForm onSubmit={onSubmit}/>
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
    )
}