import { useState } from "react";
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
              handleSortClick("id");
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
            ? devices.map((device) => (
                <AdminDeviceOverviewEntry
                  device={device}
                  handleEditClick={handleEditClick}
                  key={`device_${device._id}`}
                  lendPeriods={device.lendPeriods.data}
                  availabilityFiltered={values.availability !== "All"}
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
