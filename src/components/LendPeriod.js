import { Button } from "@mui/material";

export default function LendPeriod({ lendPeriod, onDelete, onReturn }) {
  const handleDeleteClick = () => {
    onDelete({ id: lendPeriod._id });
  };

  const handleReturnClick = () => {
    onReturn({
      id: lendPeriod._id,
      data: {
        startTs: lendPeriod.startTs,
        endTs: lendPeriod.endTs,
        deviceId: lendPeriod.device._id,
        lendState: "RETURNED",
        user: lendPeriod.user,
      },
    });
  };
  return (
    <>
      <div className="lend-period">
        <div className="lend-period__item">{lendPeriod._id}</div>
        <div className="lend-period__item">
          {new Date(lendPeriod.startTs).toLocaleDateString()}
        </div>
        <div className="lend-period__item">
          {new Date(lendPeriod.endTs).toLocaleDateString()}
        </div>
        <div className="lend-period__item">{lendPeriod.lendState}</div>
        <div className="lend-period__item">
          {lendPeriod.device.operatingSystem}
        </div>
        <div className="lend-period__item">
          {lendPeriod.device.displaySize.slice(5) + '"'}
        </div>
        <div className="lend-period__item lend-period__button">
          {lendPeriod.lendState === "REQUESTED" && (
            <Button
              sx={{ marginRight: "-20px" }}
              variant="contained"
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          )}
          {lendPeriod.lendState === "LEND_APPROVED" && (
            <Button
              sx={{ marginRight: "-20px" }}
              variant="contained"
              onClick={handleReturnClick}
            >
              Return
            </Button>
          )}
        </div>
      </div>
      <style jsx>{`
        .lend-period {
          display: flex;
        }

        .lend-period__item {
          flex: 1;
          text-align: center;
          padding: 20px;
        }

        .lend-period__button {
          text-align: right;
        }
      `}</style>
    </>
  );
}
