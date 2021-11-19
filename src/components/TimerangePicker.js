import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function TimerangePicker({setDatepickerValue}) {
    const initial = {
        from: null,
        to: null
    }

    const [disabled, setDisabled] = useState(false);

    const onValueChange = (valueName, value) => {
        setDisabled(false)
        setValues({...values, [valueName]: value})
    }

    const [values, setValues] = useState(initial);
    
    return (
        <>
            <div className="timerange-picker">
                <h2 className="timerange-picker__title">Select lend timerange</h2>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div className="timerange-picker__container">
                        <div className="datepicker-wrapper">
                            <DatePicker 
                                label="From"
                                value={values.from}
                                onChange={(newValue) => {
                                    onValueChange("from", newValue)
                                }}
                                renderInput={(params) => <TextField {...params}/>}
                                />
                        </div>
                        <div className="datepicker-wrapper">
                            <DatePicker 
                                label="To"
                                value={values.to}
                                onChange={(newValue) => {
                                    onValueChange("to", newValue)
                                }}
                                renderInput={(params) => <TextField {...params}/>}
                            />
                        </div>
                        <div className="timerange-picker__select-button">
                            <Button disabled={disabled} variant="outlined" onClick={() => {
                                setDatepickerValue(values)
                                setDisabled(true);
                            }}>Select</Button>
                        </div>
                    </div>
                </LocalizationProvider>
            </div>
            <style jsx>{`
                .timerange-picker {
                    width: 100%;
                    text-align: center;
                }

                .datepicker-wrapper, .timerange-picker__select-button {
                    display: inline-block;
                    margin: 10px;
                    vertical-align: middle;
                }

            `}</style>
        </>
    )
}