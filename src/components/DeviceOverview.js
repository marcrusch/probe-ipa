import DeviceOverviewEntry from "./DeviceOverviewEntry";
import useSWR, { mutate } from "swr";
import Filter from "./Filter";
import { useState } from "react";
import OverviewHeader from "./OverviewHeader";
import ColorIndex from "./ColorIndex";

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

  const [sort, setSort] = useState({
    property: "",
    ascending: true,
  });

  const handleSortClick = (val) => {
    if (sort.property.length) {
      if (val === sort.property) {
        setSort({ ...sort, ascending: !sort.ascending });
        return;
      }
    }
    setSort({
      property: val,
      ascending: true,
    });
  };

  const [unavailable, setUnavailable] = useState([]);

  const pushUnavailable = (deviceId) => {
    setUnavailable[unavailable.push(deviceId)];
  };

  return (
    <>
      <div className="filter-container">
        <Filter setValues={setValues} values={values} />
      </div>
      <div className="device-overview">
        <OverviewHeader handleSortClick={handleSortClick} currentSort={sort} />
        <div className="device-overview__main">
          {devices && !devices.length && (
            <p className="device-overview__error-message">
              Sorry, currently no devices exist! Create a device or contact your
              administrator to get started.
            </p>
          )}
          {devices
            ? devices
                .sort((a, b) =>
                  sort.property !== "availability"
                    ? sort.ascending
                      ? a[sort.property] > b[sort.property]
                        ? -1
                        : 1
                      : a[sort.property] > b[sort.property]
                      ? 1
                      : -1
                    : sort.ascending
                    ? unavailable.indexOf(a._id) > unavailable.indexOf(b._id)
                      ? 1
                      : -1
                    : unavailable.indexOf(a._id) > unavailable.indexOf(b._id)
                    ? -1
                    : 1
                )
                .filter((item) => {
                  let renderItem = true;
                  for (const key in item) {
                    if (
                      key !== "comment" &&
                      key !== "_id" &&
                      key !== "lendPeriods"
                    ) {
                      if (renderItem) {
                        renderItem =
                          item[key] === values[key] || values[key] === "All";
                      }
                    }
                  }
                  return renderItem;
                })
                .map((device) => (
                  <DeviceOverviewEntry
                    allowLend={allowLend}
                    device={device}
                    onRequestLend={onRequestLend}
                    key={`device_${device._id}`}
                    lendPeriods={device.lendPeriods.data}
                    availabilityFiltered={values.availability !== "All"}
                    pushUnavailable={pushUnavailable}
                  />
                ))
            : ""}
        </div>
        <ColorIndex />
      </div>
      <style jsx>{`
        .device-overview {
          margin-top: 20px;
        }

        .device-overview__main {
          position: relative;
        }

        .device-overview__error-message {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
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
