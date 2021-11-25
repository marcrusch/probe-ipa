import useSWR from "swr";
import AdminDeviceOverviewEntry from "./AdminDeviceOverviewEntry";

const DEVICES_PATH = "/api/devices";

export default function AdminDeviceOverview({ devices, handleEditClick }) {
  return (
    <>
      <div className="admin-device-overview">
        <div className="admin-device-overview__header">
          <div className="admin-device-overview__header-item">#</div>
          <div className="admin-device-overview__header-item">
            Operating System
          </div>
          <div className="admin-device-overview__header-item">
            Keyboard Layout
          </div>
          <div className="admin-device-overview__header-item">Display Size</div>
          <div className="admin-device-overview__header-item">Model Year</div>
          <div className="admin-device-overview__header-item">Comment</div>
          <div className="admin-device-overview__header-item">Availability</div>
          <div className="admin-device-overview__header-item"></div>
        </div>
        <div className="admin-device-overview__main">
          {devices
            ? devices.map((device) => (
                <AdminDeviceOverviewEntry
                  device={device}
                  handleEditClick={handleEditClick}
                  key={`device_${device._id}`}
                  lendPeriods={device.lendPeriods.data}
                />
              ))
            : ""}
        </div>
      </div>
      <style jsx>{`
        .admin-device-overview {
          margin-top: 20px;
        }

        .admin-device-overview__header {
          background-color: #222;
          width: 100%;
          display: flex;
        }

        .admin-device-overview__header-item {
          flex: 1;
          padding: 20px;
          color: #fff;
          text-align: center;
        }
      `}</style>
    </>
  );
}
