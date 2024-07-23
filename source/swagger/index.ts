import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

// Configuración de Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API Information',
            contact: {
                name: 'Developer',
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                },
            ],
        },
    },
    apis: [path.join(__dirname, './swaggerDoc.ts')],

};


const swaggerDocs = swaggerJsDoc(swaggerOptions);


export const swagger = (route: string, server: any) => {
    return server.use(route, swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};