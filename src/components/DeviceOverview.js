import DeviceOverviewEntry from "./DeviceOverviewEntry";
import useSWR, { mutate } from "swr";
import Filter from "./Filter";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

const DEVICES_PATH = "/api/devices";

export default function DeviceOverview({ onRequestLend, allowLend }) {
  const initial = {
    operatingSystem: "All",
    keyboardLayout: "All",
    displaySize: "All",
    modelYear: "All",
    availability: "All",
  };
  const { devices } = useDevicesFlow();

  const [values, setValues] = useState(initial);

  return (
    <>
      <div className="filter-container">
        <Filter setValues={setValues} values={values} />
      </div>
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
            ? devices
                .filter(
                  (item) =>
                    (item.operatingSystem === values.operatingSystem ||
                      values.operatingSystem === "All") &&
                    (item.keyboardLayout === values.keyboardLayout ||
                      values.keyboardLayout === "All") &&
                    (item.displaySize === values.displaySize ||
                      values.displaySize === "All") &&
                    (item.modelYear === values.modelYear ||
                      values.modelYear === "All")
                )
                .map((device) => (
                  <DeviceOverviewEntry
                    allowLend={allowLend}
                    device={device}
                    onRequestLend={onRequestLend}
                    key={`device_${device._id}`}
                    lendPeriods={device.lendPeriods.data}
                    availabilityFiltered={values.availability !== "All"}
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

  const onMutate = async () => {
    await mutate();
  };

  return {
    devices,
  };
};
