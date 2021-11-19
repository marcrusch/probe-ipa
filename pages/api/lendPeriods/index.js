import { createLendPeriod, deleteLendPeriod, listLendPeriods, updateLendPeriod } from "../../../lib/fauna"

export default async function handler(req, res) {
    const handlers = {
        GET: async () => {
            const lendPeriods = await listLendPeriods();

            res.json(lendPeriods);
        },
        POST: async () => {
            const {
                body: {
                    deviceId, startTs, endTs, lendState, user
                }
            } = req;

            const created = await createLendPeriod({
                startTs,
                endTs,
                lendState,
                user,
                device: {
                    connect: deviceId
                }
            })

            res.json(created);
        }, 
        PATCH: async () => {
            const {
                body: {
                    id, data: {deviceId, startTs, endTs, lendState, user}
                }
            } = req;

            const updated = await updateLendPeriod(id, {
                startTs,
                endTs,
                lendState,
                user,
                device: {
                    connect: deviceId
                }
            })

            res.json(updated);
        },
        DELETE: async () => {
            const {
                body: {
                    id
                }
            } = req;

            const deleted = await deleteLendPeriod(id);

            res.json(deleted);
        }
    }

    if(!handlers[req.method]) {
        return res.status(405).end();
    }

    await handlers[req.method]();
}