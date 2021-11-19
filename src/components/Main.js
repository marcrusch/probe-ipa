import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import DeviceOverview from "./DeviceOverview";
import LendOverlay from "./LendOverlay";
import TimerangePicker from "./TimerangePicker";

const LENDPERIODS_PATH = "/api/lendPeriods";

export default function Main({user}) {
    const initSnackbar = {
        open: false,
        severity: "success",
        alert: "Lend successfully requested"
    }
    const [datepickerValue, setDatepickerValue] = useState();
    const [lendRequestValues, setLendRequestValues] = useState();
    const [snackbar, setSnackbar] = useState(initSnackbar);

    const onDatepickerSelect = (values) => {
        setDatepickerValue(values);
    }

    const onRequestLend = (device) => {
        setLendRequestValues({device, datepickerValue});
    }

    const onLendRequestSubmit = async () => {
        try {
            const posted = await putLend({
                deviceId: lendRequestValues.device._id,
                startTs: lendRequestValues.datepickerValue.from.getTime(),
                endTs: lendRequestValues.datepickerValue.to.getTime(),
                lendState: "REQUESTED",
                user: user.username
            });
            setSnackbar({...snackbar, open: true})
            setLendRequestValues(null);
        } catch(e) {
            setSnackbar({open: true, severity: "error", alert: "Oops, that didn't work :("});
        }
        
    }

    const onLendRequestCancel = () => {
        setLendRequestValues(null);
    }

    const handleSnackbarClose = () => {
        setSnackbar(initSnackbar);
      }

    return (
        <>
            <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={handleSnackbarClose}>
                <Alert severity={snackbar.severity}>{snackbar.alert}</Alert>
            </Snackbar>
            <div className="main">
                {lendRequestValues && <LendOverlay lendRequestValues={lendRequestValues} onCancel={onLendRequestCancel} onSubmit={onLendRequestSubmit}/>}
                <div className="main-content">
                    <TimerangePicker setDatepickerValue={onDatepickerSelect} selected={datepickerValue?true:false}/>
                    <DeviceOverview allowLend={datepickerValue?true:false} onRequestLend={onRequestLend}/>
                </div>
            </div>
            <style jsx>{`
                .main-content {
                    width: 100vw;
                    padding: 25px 5vw;
                }
            `}</style>
        </>
    )
}

const putLend = (payload) => 
    fetch(LENDPERIODS_PATH, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        },
    }).then((res) => (res.ok?res.json(): Promise.reject(res)))