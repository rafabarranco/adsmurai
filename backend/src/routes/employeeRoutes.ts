import { Router, Request, Response } from 'express';
import { Employee } from '../models/employee';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - id
 *         - firstName
 *         - lastName
 *         - email
 *         - hireDate
 *         - department
 *         - salary
 *         - picture
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: Employee ID
 *         firstName:
 *           type: string
 *           description: Employee's first name
 *         lastName:
 *           type: string
 *           description: Employee's last name
 *         email:
 *           type: string
 *           description: Employee's email address
 *         hireDate:
 *           type: string
 *           format: date-time
 *           description: Hire date
 *         dismissalDate:
 *           type: string
 *           format: date-time
 *           description: Dismissal date (optional)
 *         department:
 *           type: string
 *           description: Employee's department
 *           enum: [finance, engineering, customer success]
 *         salary:
 *           type: number
 *           description: Employee's salary
 *         picture:
 *           type: string
 *           description: URL of the employee's picture
 *         role:
 *           type: string
 *           description: Employee's role
 *           enum: [user, admin, superadmin]
 */

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get all employees
 *     responses:
 *       200:
 *         description: List of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Employee ID
 *                   firstName:
 *                     type: string
 *                     description: Employee's first name
 *                   lastName:
 *                     type: string
 *                     description: Employee's last name
 *                   hireDate:
 *                     type: string
 *                     format: date-time
 *                     description: Hire date
 *                   email:
 *                     type: string
 *                     description: Employee's email address
 *                   salary:
 *                     type: number
 *                     description: Employee's salary
 *                   role:
 *                     type: string
 *                     enum: [user, admin, superadmin]
 *                     description: Employee's role
 */

router.get('/employees', async (req: Request, res: Response) => {
  try {
    const employees = await Employee.findAll({
      attributes: ['id', 'firstName', 'lastName', 'hireDate', 'email', 'salary', 'role']
    });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employees' });
  }
});

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 */

router.get('/employees/:id', async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employee' });
  }
});

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Employee created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 */

router.post('/employees', async (req: Request, res: Response) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: 'Error creating employee' });
  }
});

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Update an existing employee
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 */

router.put('/employees/:id', async (req: Request, res: Response) => {
  try {
    const [updated] = await Employee.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedEmployee = await Employee.findByPk(req.params.id);
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Error updating employee' });
  }
});

export default router;