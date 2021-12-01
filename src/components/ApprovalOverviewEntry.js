import { Button } from "@mui/material";
import LendPeriod from "./LendPeriod";

export default function ApprovalOverviewEntry({
  approval,
  onApprove: onApproveProp,
  onDelete: onDeleteProp,
}) {
  const onApprove = () => {
    if (approval.lendState === "REQUESTED") {
      onApproveProp({
        id: approval._id,
        data: {
          startTs: approval.startTs,
          endTs: approval.endTs,
          deviceId: approval.device._id,
          lendState:
            approval.lendState === "REQUESTED"
              ? "LEND_APPROVED"
              : "RETURN_APPROVED",
          user: approval.user,
        },
      });
    } else if (approval.lendState === "RETURNED") {
      onDeleteProp({ id: approval._id });
    }
  };

  return (
    <>
      <div className="approval-overview-entry">
        <div className="approval-overview-entry__item">{approval._id}</div>
        <div className="approval-overview-entry__item">
          {new Date(approval.startTs).toLocaleDateString()}
        </div>
        <div className="approval-overview-entry__item">
          {new Date(approval.endTs).toLocaleDateString()}
        </div>
        <div className="approval-overview-entry__item">
          {approval.lendState}
        </div>
        <div className="approval-overview-entry__item">{approval.user}</div>
        <div className="approval-overview-entry__item">
          {approval.device._id}
        </div>
        <div className="approval-overview-entry__item approval-overview-entry__approve-container">
          <Button
            variant="contained"
            sx={{
              position: "absolute",
              right: "0",
              top: "50%",
              transform: "translate(0, -50%)",
            }}
            onClick={onApprove}
          >
            Approve
          </Button>
        </div>
      </div>
      <style jsx>{`
        .approval-overview-entry {
          display: flex;
        }

        .approval-overview-entry__item {
          flex: 1;
          text-align: center;
          padding: 20px;
        }

        .approval-overview-entry__approve-container {
          position: relative;
        }

        @media screen and (max-width: 1024px) {
          .approval-overview-entry {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            border: 1px solid #000;
            border-radius: 10px;
            padding: 10px;
            margin: 10px;
          }

          .approval-overview-entry__approve-container {
            height: 60px;
            text-align: center;
          }
        }

        @media screen and (max-width: 480px) {
          .approval-overview-entry {
            grid-template-columns: repeat(1, 1fr);
          }
        }
      `}</style>
    </>
  );
}
