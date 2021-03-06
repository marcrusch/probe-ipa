import { useEffect, useState } from "react";
import { CalendarPicker, LocalizationProvider, PickersDay } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { addDays, subDays } from "date-fns";
import enLocale from "date-fns/locale/en-GB";

export default function Availability({ lendPeriods, setAvailable }) {
  const [displayOverlay, setDisplayOverlay] = useState(false);
  const unavailableDays = [];
  let dotAvailability = "available";
  if (lendPeriods && lendPeriods.length) {
    const currentTimestamp = new Date().getTime();
    const currentLendPeriods = lendPeriods.filter(
      (lendPeriod) =>
        lendPeriod.startTs <= currentTimestamp && lendPeriodIsActive(lendPeriod)
    );
    if (currentLendPeriods.length) {
      dotAvailability = "current-unavailable";
    } else {
      const futureLendPeriods = lendPeriods.filter(
        (lendPeriod) =>
          lendPeriod.startTs >= currentTimestamp &&
          lendPeriod.endTS > currentTimestamp &&
          lendPeriodIsActive(lendPeriod)
      );

      if (futureLendPeriods) {
        dotAvailability = "future-unavailable";
      }
    }

    lendPeriods.forEach((lendPeriod) => {
      const dayDiff = Math.floor(
        (lendPeriod.endTs - lendPeriod.startTs) / (1000 * 60 * 60 * 24)
      );
      const startDate = subDays(new Date(lendPeriod.startTs), 1);
      const daysToColor = [];

      for (let i = 1; i <= dayDiff + 1; i++) {
        daysToColor.push(addDays(startDate, i).setHours(0, 0, 0, 0));
      }
      unavailableDays.push(...daysToColor);
    });
  }

  useEffect(() => {
    setAvailable(dotAvailability === "current-unavailable" ? false : true);
  }, [setAvailable, dotAvailability]);

  return (
    <>
      <div
        className="availability"
        onMouseEnter={() => {
          setDisplayOverlay(true);
        }}
        onMouseLeave={() => {
          setDisplayOverlay(false);
        }}
      >
        <div
          className={`availability__dot availability__dot--state-${dotAvailability}`}
        ></div>
        {displayOverlay && (
          <div className="availability__overview">
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={enLocale}
            >
              <CalendarPicker
                onChange={() => {}}
                onDaySelect={() => {}}
                outsideCurrentMonth={false}
                readOnly
                minDate={new Date().getTime()}
                renderDay={(day) => {
                  if (unavailableDays.indexOf(day.getTime()) !== -1) {
                    return (
                      <PickersDay
                        day={day}
                        onChange={() => {}}
                        onDaySelect={() => {}}
                        outsideCurrentMonth={false}
                        style={{ backgroundColor: "#f00" }}
                        key={day}
                      />
                    );
                  } else {
                    return (
                      <PickersDay
                        day={day}
                        onChange={() => {}}
                        onDaySelect={() => {}}
                        outsideCurrentMonth={false}
                        key={day}
                      />
                    );
                  }
                }}
              />
            </LocalizationProvider>
          </div>
        )}
      </div>
      <style jsx>{`
        .availability {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .availability__dot--state-available {
          background-color: #00ff00;
        }
        .availability__dot--state-current-unavailable {
          background-color: #ff0000;
        }
        .availability__dot--state-future-unavailable {
          background-color: #ffa500;
        }

        .availability__dot {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .availability__overview {
          top: 0;
          left: 50%;
          transform: translate(-50%);
          position: absolute;
          background-color: #fff;
          border: 1px solid #444;
          z-index: 10;
          border-radius: 10px;
        }

        .color-index__color {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
        }

        .color-index__description {
          display: inline-block;
          margin-left: 20px;
        }

        .color-index {
          display: flex;
          width: 600px;
          float: right;
          margin-top: 100px;
        }

        .color-index__item {
          flex: 1;
        }
      `}</style>
    </>
  );
}

const lendPeriodIsActive = (lendPeriod) => {
  return (
    lendPeriod.lendState === "LEND_APPROVED" ||
    lendPeriod.lendState === "RETURNED" ||
    lendPeriod.lendState === "REQUESTED"
  );
};
