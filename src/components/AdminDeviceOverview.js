import useSWR from "swr";
import AdminDeviceOverviewEntry from "./AdminDeviceOverviewEntry";

const DEVICES_PATH = "/api/devices";

export default function AdminDeviceOverview({onRequestLend, allowLend}) {
    const {devices, onCreate} = useDevicesFlow();
    return (
        <>
            <div className="admin-device-overview">
                <div className="admin-device-overview__header">
                    <div className="admin-device-overview__header-item">#</div>
                    <div className="admin-device-overview__header-item">Operating System</div>
                    <div className="admin-device-overview__header-item">Keyboard Layout</div>
                    <div className="admin-device-overview__header-item">Display Size</div>
                    <div className="admin-device-overview__header-item">Model Year</div>
                    <div className="admin-device-overview__header-item">Comment</div>
                    <div className="admin-device-overview__header-item"></div>
                </div>
                <div className="admin-device-overview__main">
                    {devices?devices.map((device) => <AdminDeviceOverviewEntry allowLend={allowLend} device={device} onRequestLend={onRequestLend} key={`device_${device._id}`}/>):""}
                </div>
            </div>
        </>
    )
}

const useDevicesFlow = () => {
    const fetcher = async (url) => await fetch(url).then((res) => res.json());
    const {data: devices} = useSWR(DEVICES_PATH, fetcher);

    const onCreate = async (payload) => {
        await putDevice(payload);
        await mutate(DEVICES_PATH);
    }

    return {
        devices,
        onCreate
    }
}

const putDevice = (payload) => 
    fetch(DEVICES_PATH, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json"
        },
    }).then((res) => (res.ok?res.json(): Promise.reject(res)))