import fs from "fs/promises";
import express from "express";

export const routerExpress = express.Router();

const pathRouter = `${__dirname}`;
const extension = process.env.MODE === 'PRODUCTION' ? 'js' : 'ts'
async function indexRoute() {

    try {
        const files = await fs.readdir(pathRouter);

        for (const file of files) {
            const fileWithOutExt = file.split('.').shift() ?? ''
            const skip = ['index', 'index2'].includes(fileWithOutExt);

            if (!skip) {
                const { router } = await import(`./${fileWithOutExt}.${extension}`);

                routerExpress.use(`/${fileWithOutExt}`, router);
                console.log('CARGAR RUTA ---->', fileWithOutExt);
            }
        }
    } catch (error) {
        console.error('Error al leer el directorio:', error);
    }

    routerExpress.get('*', (req, res) => {
        res.status(404)
        res.send({ error: 'Not found' });
    });
}

indexRoute()


