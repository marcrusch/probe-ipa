import Availability from "./Availability";

export default function Device({ device, lendPeriods }) {
  return (
    <>
      <div className="device">
        <div className="device__info-item">{device._id}</div>
        <div className="device__info-item">{device.operatingSystem}</div>
        <div className="device__info-item">{device.keyboardLayout}</div>
        <div className="device__info-item">
          {device.displaySize.slice(5) + '"'}
        </div>
        <div className="device__info-item">{device.modelYear.slice(5)}</div>
        <div className="device__info-item">{device.comment}</div>
        <div className="device__info-item">
          <Availability lendPeriods={lendPeriods} />
        </div>
        <div className="device__info-item"></div>
      </div>
      <style jsx>{`
        .device {
          display: flex;
        }
        .device__info-item {
          flex: 1;
          text-align: center;
          padding: 20px;
        }
      `}</style>
    </>
  );
}
