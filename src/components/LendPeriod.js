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
        <div className="lend-period__item">
          {lendPeriod.device.operatingSystem}
        </div>
        <div className="lend-period__item">
          {lendPeriod.device.displaySize.slice(5) + '"'}
        </div>
        <div className="lend-period__item">{lendPeriod.lendState}</div>
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
          {lendPeriod.lendState === "RETURNED" && (
            <Button sx={{ marginRight: "-20px" }} variant="contained" disabled>
              Return pending
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

        @media screen and (max-width: 1024px) {
          .lend-period {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            border: 1px solid #000;
            border-radius: 10px;
            padding: 10px;
            margin: 10px;
          }

          .lend-period__button {
            height: 60px;
            text-align: center;
          }
        }
        @media screen and (max-width: 480px) {
          .lend-period {
            grid-template-columns: repeat(1, 1fr);
          }
        }
      `}</style>
    </>
  );
}
