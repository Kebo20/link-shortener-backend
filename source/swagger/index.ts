import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';


// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'User Management API',
            description: 'API para obtener la información de un usuario por ID.',
            contact: {
                name: 'kevo',
            },
            version: '1.0.0',
        },
        // servers: [
        //     {
        //         url: '/v1',
        //     },
        // ]

    },
    apis: [path.join(__dirname, 'swaggerDoc.ts')],
    //apis: [path.join(__dirname, 'swagger.yaml')],
    // apis: [path.join(__dirname, 'swagger.json')],



};


const swaggerDocs = swaggerJsDoc(swaggerOptions);


export const swagger = (route: string, server: any) => {
    return server.use(route, swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};