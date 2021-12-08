import { useState } from "react";
import AdminDeviceOverviewEntry from "./AdminDeviceOverviewEntry";
import Filter from "./Filter";
import OverviewHeader from "./OverviewHeader";

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
        <OverviewHeader handleSortClick={handleSortClick} currentSort={sort} />
        <div className="admin-device-overview__main">
          {devices && !devices.length && (
            <p className="admin-device-overview__error-message">
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

        .admin-device-overview__main {
          position: relative;
        }

        .admin-device-overview__error-message {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
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
