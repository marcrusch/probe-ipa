import LendPeriod from "./LendPeriod"

export default function LendOverview({lendPeriods, user, onDelete}) {
    return (
        <>
            <div className="lend-overview">
                <div className="lend-overview__header">
                    <div className="lend-overview__header-item">#</div>
                    <div className="lend-overview__header-item">From</div>
                    <div className="lend-overview__header-item">To</div>
                    <div className="lend-overview__header-item">State</div>
                    <div className="lend-overview__header-item"></div>
                    <div className="lend-overview__header-item"></div>
                </div>
                {lendPeriods.map((lendPeriod, index) => {
                    if(lendPeriod.user === user.username) {
                        return <LendPeriod lendPeriod={lendPeriod} key={`lendPeriod_${index}`} onDelete={onDelete}/>
                    }
                })}
            </div>
            <style jsx>{`
                .lend-overview {
                    margin-top: 20px;
                }

                .lend-overview__header {
                    background-color: #222;
                    width: 100%;
                    display: flex;
                }

                .lend-overview__header-item {
                    flex: 1;
                    padding: 20px;
                    color: #fff;
                    text-align: center;
                }
            `}</style>
        </>
    )
}