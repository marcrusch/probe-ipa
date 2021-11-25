import { Button } from "@mui/material";
import Device from "./Device";
import { useEffect, useState } from "react";

export default function DeviceOverviewEntry({
  device,
  onRequestLend: onRequestLendProp,
  allowLend,
  lendPeriods,
  availabilityFiltered,
}) {
  const onRequestLend = (e) => {
    e.preventDefault();
    onRequestLendProp(device);
  };

  const [available, setAvailable] = useState(true);

  return (
    <>
      {((availabilityFiltered && available) || !availabilityFiltered) && (
        <div className="device-overview-entry">
          <div className="device-overview-entry__device-wrapper">
            <Device
              device={device}
              lendPeriods={lendPeriods}
              setAvailable={setAvailable}
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
                width: "150px",
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
          flex: 1;
        }

        .device-overview-entry__operation-wrapper {
          position: relative;
        }
      `}</style>
    </>
  );
}
