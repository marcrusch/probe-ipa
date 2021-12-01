import { Button } from "@mui/material";
import Device from "./Device";
import { useEffect, useState } from "react";

export default function DeviceOverviewEntry({
  device,
  onRequestLend: onRequestLendProp,
  allowLend,
  lendPeriods,
  availabilityFiltered,
  pushUnavailable,
}) {
  const onRequestLend = (e) => {
    e.preventDefault();
    onRequestLendProp(device);
  };

  const [available, setAvailable] = useState(true);

  const onAvailableChange = (val) => {
    if (!val) {
      pushUnavailable(device._id);
    }
    setAvailable(val);
  };

  return (
    <>
      {((availabilityFiltered && available) || !availabilityFiltered) && (
        <div className="device-overview-entry">
          <div className="device-overview-entry__device-wrapper">
            <Device
              device={device}
              lendPeriods={lendPeriods}
              setAvailable={onAvailableChange}
            />
          </div>
          <div className="device-overview-entry__operation-wrapper">
            <Button
              disabled={!allowLend}
              onClick={onRequestLend}
              sx={{
                position: "absolute",
                right: "0",
                top: "50%",
                transform: "translate(0, -50%)",
                width: "100%",
              }}
              variant="contained"
            >
              Request Lend
            </Button>
          </div>
        </div>
      )}
      <style jsx>{`
        .device-overview-entry {
          display: flex;
        }

        .device-overview-entry__device-wrapper {
          flex: 7;
        }

        .device-overview-entry__operation-wrapper {
          position: relative;
          width: 100%;
          flex: 1;
        }

        @media screen and (max-width: 1024px) {
          .device-overview-entry {
            border: 1px solid #000;
            border-radius: 10px;
            padding: 10px;
            margin: 10px;
            display: block;
          }

          .device-overview-entry__operation-wrapper {
            height: 30px;
          }
        }
      `}</style>
    </>
  );
}
