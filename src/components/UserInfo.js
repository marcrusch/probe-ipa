import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserInfo({userInfo}) {
    return (
        <>
            <div className="user-info">
                <div className="user-info__icon-wrapper">
                    <FontAwesomeIcon style={{position: "absolute", right: 0}} icon={faUserCircle}/>
                </div>
            </div>
            <style jsx>{`
                .user-info__icon-wrapper {
                    color: #fff;
                    font-size: 42px;
                }
            `}</style>
        </>
    )
}
