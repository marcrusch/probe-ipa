import { createDevice, deleteDevice, listDevices, updateDevice } from "../../../lib/fauna"

export default async function handler(req, res) {
    const handlers = {
        GET: async () => {
            const devices = await listDevices();

            res.json(devices)
        },
        POST: async () => {
            const {
                body: {displaySize, keyboardLayout, operatingSystem, comment, modelYear}
            } = req;

            const created = await createDevice({
                displaySize,
                keyboardLayout,
                operatingSystem,
                comment,
                modelYear
            })

            res.json(created);
        }, 
        PATCH: async () => {
            const {
                body: {
                    id, data: {displaySize, keyboardLayout, operatingSystem, comment, modelYear}
                }
            } = req;

            const updated = await updateDevice(id, {
                displaySize,
                keyboardLayout,
                operatingSystem,
                comment,
                modelYear
            })

            res.json(updated);
        },
        DELETE: async () => {
            const {
                body: {
                    id
                }
            } = req;

            const deleted = await deleteDevice(id);

            res.json(deleted);
        }
    }

    if(!handlers[req.method]) {
        return res.status(405).end();
    }

    await handlers[req.method]();
}