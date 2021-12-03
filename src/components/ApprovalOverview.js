import ApprovalOverviewEntry from "./ApprovalOverviewEntry";

export default function ApprovalOverview({ approvals, onApprove, onDelete }) {
  return (
    <>
      <div className="approval-overview">
        <div className="approval-overview__header">
          <div className="approval-overview__header-item">Lend ID</div>
          <div className="approval-overview__header-item">From</div>
          <div className="approval-overview__header-item">To</div>
          <div className="approval-overview__header-item">User</div>
          <div className="approval-overview__header-item">Device ID</div>
          <div className="approval-overview__header-item">State</div>
          <div className="approval-overview__header-item"></div>
        </div>
        <div className="approval-overview__main">
          {approvals && !approvals.length && (
            <p className="approval-overview__error-message">
              No approvals required!
            </p>
          )}
          {approvals.map((approval, index) => (
            <ApprovalOverviewEntry
              approval={approval}
              key={`approval_${index}`}
              onApprove={onApprove}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .approval-overview {
          margin-top: 20px;
        }

        .approval-overview__header {
          background-color: #222;
          width: 100%;
          display: flex;
        }

        .approval-overview__header-item {
          flex: 1;
          padding: 20px;
          color: #fff;
          text-align: center;
        }

        .approval-overview__main {
          position: relative;
        }

        .approval-overview__error-message {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        @media screen and (max-width: 1024px) {
          .approval-overview__header {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
