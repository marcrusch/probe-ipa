import UserInfo from "./UserInfo";

export default function Header({userInfo, onLogout}) {
    return (
        <>
            <div className="header">
                <div className="header__child">
                    <img src="/merkle-logo-bright.png" className="header__logo"/>
                </div>
                <div className="header__child">
                    <h1 className="header__title">Lend.</h1>
                </div>
                <div className="header__child header__spacing"/>
                <div className="header__child">
                    {userInfo && <UserInfo userInfo={userInfo} onLogout={onLogout} />}
                </div>
            </div>
            <style jsx>{`
                .header {
                    width: 100vw;
                    background-color: #222;
                    display: flex;
                }

                .header__child {
                    flex: 1;
                    position: relative;
                    margin: 20px;
                }

                .header__logo {
                    width: 100%;
                    position: absolute;
                    top: 50%;
                    transform: translate(0, -50%);
                }

                .header__spacing {
                    flex: 5;
                }

                .header__title {
                    color: #fff;
                    margin: 0;
                    font-size: 36px;
                }
            `}</style>
        </>
    )
}
