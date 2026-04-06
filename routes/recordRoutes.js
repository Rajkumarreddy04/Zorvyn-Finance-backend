const router = require("express").Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const {
    createRecord,
    getRecords,
    updateRecord,
    deleteRecord
} = require("../controllers/recordController");

/**
 * @swagger
 * /api/records:
 *   post:
 *     summary: Create a financial record
 *     description: Allows admin users to create income or expense records
 *     tags:
 *       - Records
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 5000
 *               type:
 *                 type: string
 *                 example: income
 *               category:
 *                 type: string
 *                 example: salary
 *               notes:
 *                 type: string
 *                 example: April salary
 *     responses:
 *       200:
 *         description: Record created successfully
 *       400:
 *         description: Invalid input
 *
 *   get:
 *     summary: Get all records
 *     description: Fetch all financial records (Admin and Analyst)
 *     tags:
 *       - Records
 *     responses:
 *       200:
 *         description: List of records
 */

/**
 * @swagger
 * /api/records/{id}:
 *   put:
 *     summary: Update a record
 *     description: Allows admin users to update a financial record
 *     tags:
 *       - Records
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 6000
 *               category:
 *                 type: string
 *                 example: bonus
 *               notes:
 *                 type: string
 *                 example: Updated entry
 *     responses:
 *       200:
 *         description: Record updated successfully
 *       404:
 *         description: Record not found
 *
 *   delete:
 *     summary: Delete a record
 *     description: Allows admin users to delete a financial record
 *     tags:
 *       - Records
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Record ID
 *     responses:
 *       200:
 *         description: Record deleted successfully
 *       404:
 *         description: Record not found
 */

router.post("/", auth, role(["admin"]), createRecord);
router.get("/", auth, role(["admin", "analyst"]), getRecords);
router.put("/:id", auth, role(["admin"]), updateRecord);
router.delete("/:id", auth, role(["admin"]), deleteRecord);

module.exports = router;