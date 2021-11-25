import { useState } from "react";

export default function Availability({ lendPeriods }) {
  let dotAvailability = "available";
  if (lendPeriods && lendPeriods.length) {
    const currentTimestamp = new Date().getTime();
    const currentLendPeriods = lendPeriods.filter(
      (lendPeriod) =>
        lendPeriod.startTs <= currentTimestamp &&
        lendPeriod.endTs >= currentTimestamp &&
        (lendPeriod.lendState === "LEND_APPROVED" ||
          lendPeriod.lendState === "RETURNED")
    );
    if (currentLendPeriods.length) {
      dotAvailability = "current-unavailable";
    } else {
      const futureLendPeriods = lendPeriods.filter(
        (lendPeriod) =>
          lendPeriod.startTs >= currentTimestamp &&
          lendPeriod.endTS > currentTimestamp &&
          (lendPeriod.lendState === "LEND_APPROVED" ||
            lendPeriod.lendState === "RETURNED")
      );

      if (futureLendPeriods) {
        dotAvailability = "future-unavailable";
      }
    }
  }
  return (
    <>
      <div className="availability">
        <div
          className={`availability__dot availability__dot--state-${dotAvailability}`}
        ></div>
        <div className="availability__overview"></div>
      </div>
      <style jsx>{`
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
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
      `}</style>
    </>
  );
}
