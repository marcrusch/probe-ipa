import { Button } from "@mui/material";
import { useState } from "react";
import Device from "./Device";

export default function AdminDeviceOverviewEntry({
  device,
  handleEditClick: handleEditClickProp,
  lendPeriods,
  availabilityFiltered,
  pushUnavailable,
}) {
  const onClick = () => {
    handleEditClickProp(device);
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
              onClick={onClick}
              sx={{
                position: "absolute",
                right: "0",
                top: "50%",
                transform: "translate(0, -50%)",
                width: "150px",
              }}
              variant="contained"
            >
              Edit Device
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
