import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import AdminDeviceOverview from "./AdminDeviceOverview";
import EditDeviceOverlay from "./EditDeviceOverlay";
import TabNavigation from "./TabNavigation";

const DEVICES_PATH = "/api/devices";
const LENDPERIODS_PATH = "/api/lendPeriods";

export default function Admin({
  user,
  displayCreateDeviceOverlay,
  setDisplayCreateDeviceOverlay,
}) {
  const initSnackbar = {
    open: false,
    severity: "success",
    alert: "Device deleted",
  };

  const [activeTab, setActiveTab] = useState("overview");
  const { devices, onCreate, onDelete, onEdit } = useDevicesFlow();
  const { lendPeriods, onDeleteLendPeriod } = useLendPeriodsFlow();
  const [snackbar, setSnackbar] = useState(initSnackbar);
  const [selectedDevice, setSelectedDevice] = useState();

  const onEditClick = async (device) => {
    setSelectedDevice(device);
  };

  const handleSnackbarClose = () => {
    setSnackbar(initSnackbar);
  };

  const handleDeviceDelete = async (payload) => {
    try {
      if (lendPeriods) {
        lendPeriods
          .filter((lendPeriod) => lendPeriod.device._id === payload.id)
          .forEach(async (item) => {
            await onDeleteLendPeriod({ id: item._id });
          });
      }
      const deleted = await onDelete(payload);
      setSnackbar({ ...snackbar, open: true });
      setSelectedDevice(false);
    } catch {
      setSnackbar({
        open: true,
        severity: "error",
        alert: "Oops, that didn't work :/",
      });
    }
  };

  const handleDeviceEdit = async (payload) => {
    try {
      const edited = await onEdit(payload);
      setSnackbar({
        ...snackbar,
        open: true,
        alert: "Device updated successfully",
      });
      setSelectedDevice(false);
    } catch {
      setSnackbar({
        open: true,
        severity: "error",
        alert: "Oops, that didn't work :/",
      });
    }
  };

  const handleCancel = () => {
    setSelectedDevice(false);
    setDisplayCreateDeviceOverlay(false);
  };

  const handleDeviceCreate = (payload) => {
    try {
      const created = onCreate(payload);
      setSnackbar({
        ...snackbar,
        open: true,
        alert: "Device created successfully",
      });
      setDisplayCreateDeviceOverlay(false);
    } catch {
      setSnackbar({
        open: true,
        severity: "error",
        alert: "Oops, that didn't work :/",
      });
    }
  };

  return (
    <>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={snackbar.severity}>{snackbar.alert}</Alert>
      </Snackbar>
      <div className="admin">
        {selectedDevice && (
          <EditDeviceOverlay
            device={selectedDevice}
            onDelete={handleDeviceDelete}
            onEdit={handleDeviceEdit}
            onCancel={handleCancel}
          />
        )}
        {displayCreateDeviceOverlay && (
          <EditDeviceOverlay
            onCancel={handleCancel}
            onCreate={handleDeviceCreate}
          />
        )}
        <div className="main-content">
          <div className="tab-navigation-wrapper">
            <TabNavigation
              user={user}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
            />
          </div>
          {activeTab === "overview" && (
            <>
              <AdminDeviceOverview
                devices={devices}
                handleEditClick={onEditClick}
              />
            </>
          )}
          {activeTab === "pending" && <></>}
        </div>
      </div>
      <style jsx>{`
        .tab-navigation-wrapper {
          text-align: center;
        }

        .main-content {
          width: 100vw;
          padding: 25px 5vw;
        }
      `}</style>
    </>
  );
}

const useDevicesFlow = () => {
  const fetcher = async (url) => await fetch(url).then((res) => res.json());
  const { data: devices } = useSWR(DEVICES_PATH, fetcher);

  const onCreate = async (payload) => {
    await putDevice(payload);
    await mutate(DEVICES_PATH);
  };
  const onDelete = async (payload) => {
    await deleteDevice(payload);
    await mutate(DEVICES_PATH);
  };

  const onEdit = async (payload) => {
    await editDevice(payload);
    await mutate(DEVICES_PATH);
  };

  return {
    devices,
    onCreate,
    onDelete,
    onEdit,
  };
};

const putDevice = (payload) =>
  fetch(DEVICES_PATH, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));

const editDevice = (payload) =>
  fetch(DEVICES_PATH, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));

const deleteDevice = (payload) =>
  fetch(DEVICES_PATH, {
    method: "DELETE",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));

const useLendPeriodsFlow = () => {
  const fetcher = async (url) => await fetch(url).then((res) => res.json());
  const { data: lendPeriods } = useSWR(LENDPERIODS_PATH, fetcher);

  const onDeleteLendPeriod = async (payload) => {
    await deleteLendPeriods(payload);
    await mutate(LENDPERIODS_PATH);
  };

  return {
    lendPeriods,
    onDeleteLendPeriod,
  };
};
const deleteLendPeriods = (payload) =>
  fetch(LENDPERIODS_PATH, {
    method: "DELETE",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
