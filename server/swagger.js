/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
/**
 * @swagger
 * tags:
 *   - name: Cohorts
 *     description: Cohort management
 *   - name: Students
 *     description: Student management
 */

/**
 * @swagger
 * /api/cohorts:
 *   get:
 *     summary: Get all cohorts
 *     tags: [Cohorts]
 *     responses:
 *       200:
 *         description: List of all cohorts
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new cohort
 *     tags: [Cohorts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cohortSlug
 *               - cohortName
 *               - program
 *             properties:
 *               cohortSlug:
 *                 type: string
 *               cohortName:
 *                 type: string
 *               program:
 *                 type: string
 *               format:
 *                 type: string
 *               campus:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               inProgress:
 *                 type: boolean
 *               programManager:
 *                 type: string
 *               leadTeacher:
 *                 type: string
 *               totalHours:
 *                 type: number
 *     responses:
 *       201:
 *         description: Cohort created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/cohorts/{cohortId}:
 *   get:
 *     summary: Get a cohort by ID
 *     tags: [Cohorts]
 *     parameters:
 *       - in: path
 *         name: cohortId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cohort ID
 *     responses:
 *       200:
 *         description: Cohort found
 *       404:
 *         description: Cohort not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a cohort by ID
 *     tags: [Cohorts]
 *     parameters:
 *       - in: path
 *         name: cohortId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cohort ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Cohort updated
 *       404:
 *         description: Cohort not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a cohort by ID
 *     tags: [Cohorts]
 *     parameters:
 *       - in: path
 *         name: cohortId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cohort ID
 *     responses:
 *       204:
 *         description: Cohort deleted
 *       404:
 *         description: Cohort not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of all students
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
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
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               linkedinUrl:
 *                 type: string
 *               languages:
 *                 type: array
 *                 items:
 *                   type: string
 *               program:
 *                 type: string
 *               background:
 *                 type: string
 *               image:
 *                 type: string
 *               cohort:
 *                 type: string
 *               projects:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/students/cohort/{cohortId}:
 *   get:
 *     summary: Get all students in a cohort
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: cohortId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cohort ID
 *     responses:
 *       200:
 *         description: List of students in the cohort
 *       404:
 *         description: Cohort or students not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/students/{studentId}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student found
 *       404:
 *         description: Student not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Student updated
 *       404:
 *         description: Student not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       204:
 *         description: Student deleted
 *       404:
 *         description: Student not found
 *       500:
 *         description: Server error
 */
