import { Button } from "@mui/material";
import Device from "./Device";

export default function DeviceOverviewEntry({device, onRequestLend: onRequestLendProp, allowLend}) {
    const onRequestLend = (e) => {
        e.preventDefault();
        onRequestLendProp(device);
    }
    return (
        <>
            <div className="device-overview-entry">
                <div className="device-overview-entry__device-wrapper">
                    <Device device={device}/>
                </div>
                <div className="device-overview-entry__operation-wrapper">
                    <Button disabled={!allowLend} onClick={onRequestLend} sx={{position: "absolute", right: "0", top: "50%", transform: "translate(0, -50%)", width: "150px"}} variant="contained">Request Lend</Button>
                </div>
            </div>
            <style jsx>{`
                .device-overview-entry {
                    display: flex;
                }

                .device-overview-entry__device-wrapper {
                    flex: 1;
                }

                .device-overview-entry__operation-wrapper {
                    position: relative;
                }
            `}</style>
        </>
    )
}