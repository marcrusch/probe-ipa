import { useState } from "react";
import Availability from "./Availability";

export default function Device({ device, lendPeriods, setAvailable }) {
  const [idProps, setIdProps] = useState({
    id: device._id,
    width: window.innerWidth,
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth < 1500) {
      if (window.innerWidth <= idProps.width + 200) {
        setIdProps({
          id: `${device._id.slice(0, window.innerWidth / 100)}...`,
          width: window.innerWidth,
        });
      }
    } else {
      setIdProps({
        id: device._id,
        width: window.innerWidth,
      });
    }
  });

  return (
    <>
      <div className="device">
        <div className="device__info-item">{idProps.id}</div>
        <div className="device__info-item">{device.operatingSystem}</div>
        <div className="device__info-item">{device.keyboardLayout}</div>
        <div className="device__info-item">
          {device.displaySize.slice(5) + '"'}
        </div>
        <div className="device__info-item">{device.modelYear.slice(5)}</div>
        <div className="device__info-item">{device.comment}</div>
        <div className="device__info-item">
          <Availability lendPeriods={lendPeriods} setAvailable={setAvailable} />
        </div>
      </div>
      <style jsx>{`
        .device {
          display: flex;
        }
        .device__info-item {
          flex: 1;
          text-align: center;
          padding: 20px;
        }

        @media screen and (max-width: 1024px) {
          .device {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  );
}
