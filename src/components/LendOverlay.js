import { Button } from "@mui/material";

export default function LendOverlay({
  lendRequestValues: { device, datepickerValue },
  onCancel,
  onSubmit,
}) {
  return (
    <>
      <div className="lend-overlay">
        <div className="lend-overlay__window">
          <h2 className="lend-overlay__title">Device</h2>
          <div className="lend-overlay__grid">
            <p className="lend-overlay__info-label">#</p>
            <p className="lend-overlay__info-item">{device._id}</p>
            <p className="lend-overlay__info-label">Operating System</p>
            <p className="lend-overlay__info-item">{device.operatingSystem}</p>
            <p className="lend-overlay__info-label">Keyboard Layout</p>
            <p className="lend-overlay__info-item">{device.keyboardLayout}</p>
            <p className="lend-overlay__info-label">Display Size</p>
            <p className="lend-overlay__info-item">
              {device.displaySize.slice(5) + '"'}
            </p>
            <p className="lend-overlay__info-label">Model Year</p>
            <p className="lend-overlay__info-item">
              {device.modelYear.slice(5)}
            </p>
          </div>
          <h2 className="lend-overlay__title">Lend</h2>
          <div className="lend-overlay__grid">
            <p className="lend-overlay__info-label">From</p>
            <p className="lend-overlay__info-item">
              {datepickerValue.from.toLocaleDateString()}
            </p>
            <p className="lend-overlay__info-label">To</p>
            <p className="lend-overlay__info-item">
              {datepickerValue.to.toLocaleDateString()}
            </p>
          </div>
          <div className="lend-overlay__grid">
            <Button onClick={onCancel}>Cancel</Button>
            <Button onClick={onSubmit} variant="contained">
              Submit Request
            </Button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .lend-overlay {
          position: fixed;
          width: 100vw;
          height: 100vh;
          background-color: #ffffffaa;
          z-index: 10;
          top: 0;
          left: 0;
        }

        .lend-overlay__title {
          margin: 0;
        }

        .lend-overlay__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }

        .lend-overlay__window {
          position: absolute;
          background-color: #ffffff;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid #444;
          border-radius: 10px;
          padding: 25px;
        }
      `}</style>
    </>
  );
}
