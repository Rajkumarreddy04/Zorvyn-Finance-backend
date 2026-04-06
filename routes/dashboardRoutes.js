const router = require("express").Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const { getSummary } = require("../controllers/dashboardController");

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get dashboard summary
 *     description: Returns aggregated financial data including total income, total expenses, net balance, category breakdown, and recent transactions. Accessible by Admin and Analyst roles.
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalIncome:
 *                   type: number
 *                   example: 10000
 *                 totalExpense:
 *                   type: number
 *                   example: 4000
 *                 netBalance:
 *                   type: number
 *                   example: 6000
 *                 categoryBreakdown:
 *                   type: object
 *                   example:
 *                     salary: 8000
 *                     food: 2000
 *                 recent:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       amount:
 *                         type: number
 *                         example: 500
 *                       type:
 *                         type: string
 *                         example: expense
 *                       category:
 *                         type: string
 *                         example: food
 *       403:
 *         description: Forbidden (insufficient permissions)
 */

router.get("/", auth, role(["admin", "analyst"]), getSummary);

module.exports = router;