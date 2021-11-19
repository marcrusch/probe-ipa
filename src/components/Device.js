export default function Device({device}) {
    return (
        <>
            <div className="device">
                <div className="device__info-item">
                    {device._id}
                </div>
                <div className="device__info-item">
                    {device.operatingSystem}
                </div>
                <div className="device__info-item">
                    {device.keyboardLayout}
                </div>
                <div className="device__info-item">
                    {device.displaySize}
                </div>
                <div className="device__info-item">
                    {device.modelYear}
                </div>
            </div>
            <style jsx>{`
                .device {
                    display: flex;
                }
                .device__info-item {
                    flex: 1;
                    text-align: center;
                    padding: 20px;
                }
            `}</style>
        </>
    )
}