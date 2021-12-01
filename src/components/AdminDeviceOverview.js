import { useEffect, useState } from "react";
import useSWR from "swr";
import AdminDeviceOverviewEntry from "./AdminDeviceOverviewEntry";
import Filter from "./Filter";

const DEVICES_PATH = "/api/devices";

export default function AdminDeviceOverview({ devices, handleEditClick }) {
  const initial = {
    operatingSystem: "All",
    keyboardLayout: "All",
    displaySize: "All",
    modelYear: "All",
    availability: "All",
  };
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
      <div className="admin-device-overview">
        <div className="admin-device-overview__header">
          <div
            className="admin-device-overview__header-item"
            onClick={() => {
              handleSortClick("_id");
            }}
          >
            #
          </div>
          <div
            className="admin-device-overview__header-item"
            onClick={() => {
              handleSortClick("operatingSystem");
            }}
          >
            Operating System
          </div>
          <div
            className="admin-device-overview__header-item"
            onClick={() => {
              handleSortClick("keyboardLayout");
            }}
          >
            Keyboard Layout
          </div>
          <div
            className="admin-device-overview__header-item"
            onClick={() => {
              handleSortClick("displaySize");
            }}
          >
            Display Size
          </div>
          <div
            className="admin-device-overview__header-item"
            onClick={() => {
              handleSortClick("modelYear");
            }}
          >
            Model Year
          </div>
          <div
            className="admin-device-overview__header-item"
            onClick={() => {
              handleSortClick("comment");
            }}
          >
            Comment
          </div>
          <div
            className="admin-device-overview__header-item"
            onClick={() => {
              handleSortClick("availability");
            }}
          >
            Availability
          </div>
          <div className="admin-device-overview__header-item"></div>
        </div>
        <div className="admin-device-overview__main">
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
                  <AdminDeviceOverviewEntry
                    device={device}
                    handleEditClick={handleEditClick}
                    key={`device_${device._id}`}
                    lendPeriods={device.lendPeriods.data}
                    availabilityFiltered={values.availability !== "All"}
                    pushUnavailable={pushUnavailable}
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
          cursor: pointer;
        }

        @media screen and (max-width: 1024px) {
          .admin-device-overview__header {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
