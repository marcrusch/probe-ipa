import DeviceOverviewEntry from "./DeviceOverviewEntry";
import useSWR from "swr";
import Filter from "./Filter";

const DEVICES_PATH = "/api/devices";

export default function DeviceOverview({ onRequestLend, allowLend }) {
  const { devices } = useDevicesFlow();
  return (
    <>
      <Filter />
      <div className="device-overview">
        <div className="device-overview__header">
          <div className="device-overview__header-item">#</div>
          <div className="device-overview__header-item">Operating System</div>
          <div className="device-overview__header-item">Keyboard Layout</div>
          <div className="device-overview__header-item">Display Size</div>
          <div className="device-overview__header-item">Model Year</div>
          <div className="device-overview__header-item">Comment</div>
          <div className="device-overview__header-item">Availability</div>
          <div className="device-overview__header-item"></div>
        </div>
        <div className="device-overview__main">
          {devices
            ? devices.map((device) => (
                <DeviceOverviewEntry
                  allowLend={allowLend}
                  device={device}
                  onRequestLend={onRequestLend}
                  key={`device_${device._id}`}
                  lendPeriods={device.lendPeriods.data}
                />
              ))
            : ""}
        </div>
      </div>
      <style jsx>{`
        .device-overview {
          margin-top: 20px;
        }

        .device-overview__header {
          background-color: #222;
          width: 100%;
          display: flex;
        }

        .device-overview__header-item {
          flex: 1;
          padding: 20px;
          color: #fff;
          text-align: center;
        }
      `}</style>
    </>
  );
}

const useDevicesFlow = () => {
  const fetcher = async (url) => await fetch(url).then((res) => res.json());
  const { data: devices } = useSWR(DEVICES_PATH, fetcher);
  return {
    devices,
  };
};
