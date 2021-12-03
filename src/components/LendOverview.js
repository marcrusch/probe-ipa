import LendPeriod from "./LendPeriod";

export default function LendOverview({
  lendPeriods,
  user,
  onDelete,
  onReturn,
}) {
  return (
    <>
      <div className="lend-overview">
        <div className="lend-overview__header">
          <div className="lend-overview__header-item">#</div>
          <div className="lend-overview__header-item">From</div>
          <div className="lend-overview__header-item">To</div>
          <div className="lend-overview__header-item">State</div>
          <div className="lend-overview__header-item">Device OS</div>
          <div className="lend-overview__header-item">Device screen size</div>
          <div className="lend-overview__header-item"></div>
        </div>
        <div className="lend-overview__main">
          {lendPeriods && !lendPeriods.length && (
            <p className="lend-overview__error-message">
              Sorry, currently no devices exist! Create a device or contact your
              administrator to get started.
            </p>
          )}
          {lendPeriods.map((lendPeriod, index) => {
            if (lendPeriod.user === user.username) {
              return (
                <LendPeriod
                  lendPeriod={lendPeriod}
                  key={`lendPeriod_${index}`}
                  onDelete={onDelete}
                  onReturn={onReturn}
                />
              );
            }
          })}
        </div>
      </div>
      <style jsx>{`
        .lend-overview {
          margin-top: 20px;
        }

        .lend-overview__header {
          background-color: #222;
          width: 100%;
          display: flex;
        }

        .lend-overview__header-item {
          flex: 1;
          padding: 20px;
          color: #fff;
          text-align: center;
        }

        .lend-overview__main {
          position: relative;
        }

        .lend-overview__error-message {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        @media screen and (max-width: 1024px) {
          .lend-overview__header {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
