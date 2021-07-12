
/**
 * @swagger
 * components:
 *      schemas:
 *          Users:
 *              type: object
 *              properties:
 *                name:
 *                 type: string
 *                email:
 *                 type: string
 *                password:
 *                 type: string
 *                isAdmin:
 *                 type: boolean 
 */     

/**
 * @swagger
 * components:
 *      schemas:
 *          UsersLogin:
 *              type: object
 *              properties:
 *                email:
 *                 type: string
 *                password:
 *                 type: string
 */     





/*USER Register */
/**
 * @swagger
* tags:
 *  name: users
 *  description: This is for users 
 * /user/register:
 *   post:
 *     tags: [users]
 *     consumes:
 *         - "application/json"
 *     produces:  
 *         - "application/json"
 *     requestBody:
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: '#components/schemas/Users'
 *     responses:
 *          content:
 *              application/json:
 *          200:
 *             description: success
 *          404:
 *              description: error
 */



/*USER Login */
/**
 * @swagger
* tags:
 *  name: users
 *  description: This is for users 
 * /user/login:
 *   post:
 *     tags: [users]
 *     consumes:
 *         - "application/json"
 *     produces:  
 *         - "application/json"
 *     requestBody:
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: '#components/schemas/UsersLogin'
 *     responses:
 *          content:
 *              application/json:
 *          200:
 *             description: success
 *          404:
 *              description: error
 */
