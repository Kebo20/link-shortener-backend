import fs from "fs/promises";
import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const routerExpress = express.Router();

const pathRouter = `${__dirname}`;



try {
    const files = await fs.readdir(pathRouter);

    for (const file of files) {
        const fileWithOutExt = file.split('.').shift()
        const skip = ['index'].includes(fileWithOutExt);

        if (!skip) {
            const { router } = await import(`./${fileWithOutExt}.js`);

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
