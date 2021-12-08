import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Button, TextField } from "@mui/material";
import { addYears } from "date-fns";
import { useState } from "react";
import enLocale from "date-fns/locale/en-GB";

export default function TimerangePicker({ setDatepickerValue }) {
  const initial = {
    from: null,
    to: null,
  };

  const onValueChange = (valueName, value) => {
    setValues({ ...values, [valueName]: value });
    setDatepickerValue({ ...values, [valueName]: value });
  };

  const [values, setValues] = useState(initial);

  return (
    <>
      <div className="timerange-picker">
        <h2 className="timerange-picker__title">Select lend timerange</h2>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
          <div className="timerange-picker__container">
            <div className="datepicker-wrapper">
              <DatePicker
                label="From"
                minDate={new Date().getTime()}
                maxDate={addYears(new Date(), 1).getTime()}
                value={values.from}
                onChange={(newValue) => {
                  onValueChange("from", newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className="datepicker-wrapper">
              <DatePicker
                label="To"
                minDate={values.from || new Date().getTime()}
                maxDate={addYears(new Date(), 1).getTime()}
                value={values.to}
                onChange={(newValue) => {
                  onValueChange("to", newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className="timerange-picker__clear-button">
              <Button
                variant="outlined"
                onClick={() => {
                  setValues(initial);
                  setDatepickerValue(initial);
                }}
              >
                Clear
              </Button>
            </div>
          </div>
        </LocalizationProvider>
      </div>
      <style jsx>{`
        .timerange-picker {
          width: 100%;
          text-align: center;
        }

        .datepicker-wrapper,
        .timerange-picker__clear-button {
          display: inline-block;
          margin: 10px;
          vertical-align: middle;
        }
      `}</style>
    </>
  );
}
