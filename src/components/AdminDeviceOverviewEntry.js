import { Button } from "@mui/material";
import Device from "./Device";
import LendPeriod from "./LendPeriod";

export default function AdminDeviceOverviewEntry({
  device,
  handleEditClick: handleEditClickProp,
  lendPeriods,
}) {
  const onClick = () => {
    handleEditClickProp(device);
  };
  return (
    <>
      <div className="device-overview-entry">
        <div className="device-overview-entry__device-wrapper">
          <Device device={device} lendPeriods={lendPeriods} />
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
