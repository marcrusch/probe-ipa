import { Button } from "@mui/material";

export default function LendPeriod({lendPeriod, onDelete}) {
    const handleDeleteClick = () => {
        onDelete({id: lendPeriod._id});
    }
    return (
        <>
            <div className="lend-period">
                <div className="lend-period__item">
                    {lendPeriod._id}
                </div>
                <div className="lend-period__item">
                    {new Date(lendPeriod.startTs).toLocaleDateString()}
                </div>
                <div className="lend-period__item">
                    {new Date(lendPeriod.endTs).toLocaleDateString()}
                </div>
                <div className="lend-period__item">
                    {lendPeriod.lendState}
                </div>
                <div className="lend-period__item">
                </div>
                <div className="lend-period__item">
                    <Button variant="contained" onClick={handleDeleteClick}>Delete</Button>
                </div>
            </div>
            <style jsx>{`
                .lend-period {
                    display: flex;
                }

                .lend-period__item {
                    flex: 1;
                    text-align: center;
                    padding: 20px;
                }
            `}</style>
        </>
    )
}