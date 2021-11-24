import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import DeviceOverview from "./DeviceOverview";
import Filter from "./Filter";
import LendOverlay from "./LendOverlay";
import LendOverview from "./LendOverview";
import TabNavigation from "./TabNavigation";
import TimerangePicker from "./TimerangePicker";

const LENDPERIODS_PATH = "/api/lendPeriods";

export default function Main({ user }) {
  const initSnackbar = {
    open: false,
    severity: "success",
    alert: "Lend successfully requested",
  };
  const [datepickerValue, setDatepickerValue] = useState();
  const [lendRequestValues, setLendRequestValues] = useState();
  const [snackbar, setSnackbar] = useState(initSnackbar);
  const [activeTab, setActiveTab] = useState("overview");

  const { lendPeriods, onCreate, onDelete } = useLendPeriodFlow();

  const onDatepickerSelect = (values) => {
    setDatepickerValue(values);
  };

  const onRequestLend = (device) => {
    setLendRequestValues({ device, datepickerValue });
  };

  const onLendRequestSubmit = async () => {
    let allowLend = true;
    if (lendPeriods) {
      lendPeriods.forEach((lendPeriod) => {
        if (datepickerValue.from < datepickerValue.to) {
          if (lendPeriod.device._id === lendRequestValues.device._id) {
            allowLend =
              lendRequestValues.datepickerValue.from > lendPeriod.endTs;
            if (allowLend) {
              allowLend =
                lendRequestValues.datepickerValue.to > lendPeriod.startTs;
            }
          }
        } else {
          allowLend = false;
        }
      });
    }
    if (allowLend) {
      try {
        const posted = await onCreate({
          deviceId: lendRequestValues.device._id,
          startTs: lendRequestValues.datepickerValue.from.getTime(),
          endTs: lendRequestValues.datepickerValue.to.getTime(),
          lendState: "REQUESTED",
          user: user.username,
        });
        setSnackbar({ ...snackbar, open: true });
        setLendRequestValues(null);
      } catch (e) {
        setSnackbar({
          open: true,
          severity: "error",
          alert: "Oops, that didn't work :(",
        });
      }
    } else {
      setSnackbar({
        open: true,
        severity: "error",
        alert: "Please select a different timerange",
      });
    }
  };

  const onLendRequestCancel = () => {
    setLendRequestValues(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar(initSnackbar);
  };

  const handleLendPeriodDelete = (payload) => {
    try {
      onDelete(payload);
      setSnackbar({
        open: true,
        severity: "success",
        alert: "Successfully deleted lend request.",
      });
    } catch {
      setSnackbar({
        open: true,
        severity: "error",
        alert: "Lend request could not be deleted.",
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
      <div className="main">
        {lendRequestValues && (
          <LendOverlay
            lendRequestValues={lendRequestValues}
            onCancel={onLendRequestCancel}
            onSubmit={onLendRequestSubmit}
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
              <TimerangePicker
                setDatepickerValue={onDatepickerSelect}
                selected={datepickerValue ? true : false}
              />
              <Filter user={user} />
              <DeviceOverview
                allowLend={datepickerValue ? true : false}
                onRequestLend={onRequestLend}
              />
            </>
          )}
          {activeTab === "lends" && (
            <>
              <LendOverview
                lendPeriods={lendPeriods}
                user={user}
                onDelete={handleLendPeriodDelete}
              />
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        .main-content {
          width: 100vw;
          padding: 25px 5vw;
        }

        .tab-navigation-wrapper {
          text-align: center;
        }
      `}</style>
    </>
  );
}

const useLendPeriodFlow = () => {
  const fetcher = async (url) => await fetch(url).then((res) => res.json());

  const { data: lendPeriods } = useSWR(LENDPERIODS_PATH, fetcher);

  const onCreate = async (payload) => {
    await putLend(payload);
    await mutate(LENDPERIODS_PATH);
  };

  const onDelete = async (payload) => {
    await deleteLend(payload);
    await mutate(LENDPERIODS_PATH);
  };

  return {
    lendPeriods,
    onCreate,
    onDelete,
  };
};

const putLend = (payload) =>
  fetch(LENDPERIODS_PATH, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));

const deleteLend = (payload) =>
  fetch(LENDPERIODS_PATH, {
    method: "DELETE",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
