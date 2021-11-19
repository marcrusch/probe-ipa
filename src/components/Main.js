import { useEffect, useState } from "react";
import TimerangePicker from "./TimerangePicker";

export default function Main() {
    const [datepickerValue, setDatepickerValue] = useState();

    useEffect(() => {
        console.log(datepickerValue);
    }, [datepickerValue])
    return (
        <>
            <div className="main">
                <div className="main-content">
                    <TimerangePicker setDatepickerValue={setDatepickerValue}/>
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