import { Button } from "@mui/material";
import { useState } from "react";
import UserInfo from "./UserInfo";
import Image from "next/image";

export default function Header({
  userInfo,
  onLogout,
  setDisplayCreateDeviceOverlay,
}) {
  return (
    <>
      <div className="header">
        <div className="header__child">
          <Image
            src="/merkle-logo-bright.png"
            className="header__logo"
            alt="Logo"
            width={300}
            height={70}
          />
        </div>
        <div className="header__child">
          <h1 className="header__title">Lend.</h1>
        </div>
        {userInfo.role === "admin" && (
          <div className="header__child">
            <Button
              className="header__child"
              onClick={() => setDisplayCreateDeviceOverlay(true)}
            >
              Create new Device
            </Button>
          </div>
        )}
        <div className="header__child header__spacing" />
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
  );
}
