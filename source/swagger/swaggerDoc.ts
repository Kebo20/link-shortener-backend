/**
 * @swagger
 * openapi: 3.0.1
 * info:
 *   title: User Management API
 *   description: API para la gestión de usuarios y personas en el sistema ITEPREVENGO.
 *   contact:
 *     name: Joel Fernandez
 *   version: 1.0.0
 * servers:
 *   - url: /v1
 * tags:
 *   - name: User
 *     description: Operaciones relacionadas con usuarios
 * components:
 *   parameters:
 *     x-access-token:
 *       in: header
 *       schema:
 *         type: string
 *       name: x-access-token
 *       description: Token de sesión
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         idUser:
 *           type: integer
 *           description: Id del usuario
 *           example: 1
 *         userName:
 *           type: string
 *           description: Nombre de usuario
 *           example: 'johndoe'
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *           example: 'hashedpassword'
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *           example: 'johndoe@example.com'
 *         createdBy:
 *           type: integer
 *           description: Id del usuario que creó este registro
 *           example: 1
 *         creationDate:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *           example: '2024-01-01T00:00:00Z'
 *         updatedBy:
 *           type: integer
 *           description: Id del usuario que actualizó este registro
 *           example: 1
 *         idGroup:
 *           type: integer
 *           description: Id del grupo al que pertenece el usuario
 *           example: 1
 *         status:
 *           type: integer
 *           description: Estado del usuario
 *           example: 1
 *     Person:
 *       type: object
 *       properties:
 *         idPerson:
 *           type: integer
 *           description: Id de la persona
 *           example: 1
 *         email:
 *           type: string
 *           description: Correo electrónico de la persona
 *           example: 'johndoe@example.com'
 *         document:
 *           type: string
 *           description: Documento de identidad
 *           example: '12345678'
 *         firstName:
 *           type: string
 *           description: Primer nombre
 *           example: 'John'
 *         lastName:
 *           type: string
 *           description: Apellido
 *           example: 'Doe'
 *         fullName:
 *           type: string
 *           description: Nombre completo
 *           example: 'John Doe'
 *         sex:
 *           type: string
 *           description: Sexo
 *           example: 'M'
 *         phone:
 *           type: string
 *           description: Teléfono
 *           example: '+1234567890'
 *         address:
 *           type: string
 *           description: Dirección
 *           example: '123 Main St'
 *         birthDate:
 *           type: string
 *           format: date
 *           description: Fecha de nacimiento
 *           example: '1990-01-01'
 *         createdBy:
 *           type: integer
 *           description: Id del usuario que creó este registro
 *           example: 1
 *         creationDate:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *           example: '2024-01-01T00:00:00Z'
 *         updatedBy:
 *           type: integer
 *           description: Id del usuario que actualizó este registro
 *           example: 1
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: 'Operación exitosa'
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: 'Error al procesar la solicitud'
 * paths:
 *   /users/register:
 *     post:
 *       tags:
 *         - User
 *       summary: Registra un nuevo usuario
 *       description: Crea un nuevo usuario en el sistema.
 *       parameters:
 *         - $ref: '#/components/parameters/x-access-token'
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         '200':
 *           description: Usuario registrado correctamente
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/SuccessResponse'
 *         '400':
 *           description: Solicitud inválida
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         '500':
 *           description: Error interno del servidor
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *   /users/update:
 *     put:
 *       tags:
 *         - User
 *       summary: Actualiza un usuario existente
 *       description: Modifica los detalles de un usuario en el sistema.
 *       parameters:
 *         - $ref: '#/components/parameters/x-access-token'
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         '200':
 *           description: Usuario actualizado correctamente
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/SuccessResponse'
 *         '400':
 *           description: Solicitud inválida
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         '500':
 *           description: Error interno del servidor
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *   /users/delete:
 *     delete:
 *       tags:
 *         - User
 *       summary: Elimina un usuario
 *       description: Elimina un usuario del sistema.
 *       parameters:
 *         - $ref: '#/components/parameters/x-access-token'
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Id del usuario a eliminar
 *                   example: 1
 *       responses:
 *         '200':
 *           description: Usuario eliminado correctamente
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/SuccessResponse'
 *         '400':
 *           description: Solicitud inválida
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         '500':
 *           description: Error interno del servidor
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *   /v1/user:
 *     get:
 *       tags:
 *         - User
 *       summary: Lista todos los usuarios
 *       description: Obtiene una lista de todos los usuarios en el sistema.
 *       parameters:
 *         - $ref: '#/components/parameters/x-access-token'
 *       responses:
 *         '200':
 *           description: Lista de usuarios
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/User'
 *         '500':
 *           description: Error interno del servidor
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *   /users/{id}:
 *     get:
 *       tags:
 *         - User
 *       summary: Obtiene un usuario por ID
 *       description: Obtiene los detalles de un usuario específico.
 *       parameters:
 *         - $ref: '#/components/parameters/x-access-token'
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: Id del usuario a obtener
 *       responses:
 *         '200':
 *           description: Detalles del usuario
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     $ref: '#/components/schemas/User'
 *         '400':
 *           description: Solicitud inválida
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         '500':
 *           description: Error interno del servidor
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 */

