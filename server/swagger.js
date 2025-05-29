/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     description: Retrieves all available students from the database
 *     tags:
 *      - Students
 *     responses:
 *       200:
 *         description: A list of all students
 *       500:
 *         description: Server error
 */

//EXAMPLE
/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create a new student
 *     description: Adds a new student to the database.
 *     tags:
 *       - Students
 *     operationId: createStudent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phone
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               phone:
 *                 type: string
 *                 example: "+123456789"
 *               linkedinUrl:
 *                 type: string
 *                 example: "https://linkedin.com/in/johndoe"
 *               languages:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["English", "Spanish"]
 *               program:
 *                 type: string
 *                 enum: [Web Dev, UX/UI, Data Analytics, Cybersecurity]
 *                 example: Web Dev
 *               background:
 *                 type: string
 *                 example: "Marketing"
 *               image:
 *                 type: string
 *                 example: "https://imgur.com/r8bo8u7"
 *               cohort:
 *                 type: string
 *                 description: Cohort ObjectId
 *                 example: "60c72b2f9b1e8e5f88d8b456"
 *               projects:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: []
 *     responses:
 *       201:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 *     security:
 *       - bearerAuth: []
 */
