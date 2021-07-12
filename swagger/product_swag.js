
/*ALL SCHEMA*/
/**
 * @swagger
 * components:
 *      schemas:
 *          Offer:
 *              type: object
 *              properties:
 *                price:
 *                 type: integer
 *                product:
 *                 type: string
 */   



/**
 * @swagger
 * components:
 *      schemas:
 *          Dashboard:
 *              type: object
 *              properties:
 *                name:
 *                 type: string
 *                price:
 *                 type: integer
 *                offerer:
 *                 type: array
 *                owner:
 *                 type: string
 */                 


/*PRODUCT DASHBOARD ADMİN POST*/
/**
 * @swagger
 * tags:
 *  name: product dashboard
 *  description: This is for product dashboard
 * /product/dashboard:
 *   post:
 *     tags: [product dashboard]
 *     consumes:
 *         - "application/json"
 *     produces:  
 *         - "application/json"
 *     requestBody:
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: '#components/schemas/Dashboard'
 *     responses:
 *          content:
 *              application/json:
 *          200:
 *             description: success
 *          404:
 *              description: error
 */

/*PRODUCT DASHBOARD ADMİN GET*/
/**
 * @swagger
 * tags:
 *  name: product dashboard
 *  description: This is for product dashboard
 * /product/dashboard:
 *  get:
 *      tags: [product dashboard]
 *      responses:
 *          default:
 *              description: This is the default response for it
 */




/*PRODUCT OFFER İD GET*/
/**
 * @swagger
 * tags:
 *  name: admin offerdetail 
 *  description: This is for offerdetail
 * /product/offer/{offerdetail_id}:
 *  get:
 *   tags: [admin offerdetail ]
 *   summary: get offerdetail
 *   description: get offerdetail
 *   parameters:
 *    - in: path
 *      name: offerdetail_id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the offerdetail
 *   responses:
 *    200:
 *     description: success
 */

/*PRODUCT OFFER İD PUT*/
/**
 * @swagger
 * /product/offer/{offerdetail_id}:
 *  put:
 *   summary: update offer
 *   description: update offer
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: offerdetail_id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the product
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       $ref: '#components/schemas/Offer'
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: error
 */

                     







/*PRODUCTS GET */
/**
 * @swagger
 * tags:
 *  name: product
 *  description: This is for product
 * /product:
 *  get:
 *      tags: [product]
 *      responses:
 *          default:
 *              description: This is the default response for it
 */


/*PRODUCT OFFERDETAİL GET */

/**
 * @swagger
 * tags:
 *  name: customer offerdetail 
 *  description: This is for offerdetail
 * /product/offerdetail/{offerdetail_id}:
 *  get:
 *   tags: [customer offerdetail ]
 *   summary: get offerdetail
 *   description: get offerdetail
 *   parameters:
 *    - in: path
 *      name: offerdetail_id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the offerdetail
 *   responses:
 *    200:
 *     description: success
 */
