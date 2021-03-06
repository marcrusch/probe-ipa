import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";

export default function UserInfo({ userInfo, onLogout }) {
  return (
    <>
      <div className="user-info">
        <div className="user-info__icon-wrapper">
          <FontAwesomeIcon
            style={{ position: "absolute", right: 0 }}
            icon={faUserCircle}
          />
        </div>
        <div className="user-info__info">
          <p>Username: {userInfo.username}</p>
          <p>Your role: {userInfo.role}</p>
          <Button
            variant="outlined"
            onClick={onLogout}
            fullWidth
            sx={{ zIndex: "20", backgroundColor: "#fff" }}
          >
            Log out
          </Button>
        </div>
      </div>
      <style jsx>{`
        .user-info__icon-wrapper {
          color: #fff;
          font-size: 42px;
        }

        .user-info__info {
          display: none;
        }

        .user-info__info p {
          margin: 10px 0;
        }

        .user-info:hover .user-info__info {
          z-index: 10;
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          background-color: #eee;
          padding: 10px;
          border-radius: 5px;
        }
      `}</style>
    </>
  );
}
