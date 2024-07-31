const { pool } = require('../configs/pool.config');
const { auth } = require('../services/auth.services');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    try {
        const response = await auth.manager(req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.register = async (req, res) => {
    try {
        const { email, password, name, name_business } = req.body;
        console.log(req.body);
        // check if body is missing
        if (!email || !password || !name || !name_business) {
            throw new Error('Missing required fields: email, password, name, name_business');
        }

        // check if email is already registered
        const { rows: emailCheck } = await pool.query('SELECT * FROM manager WHERE email = $1', [email]);
        if (emailCheck.length > 0) {
            throw new Error('Email is already registered');
        }

        // check if business name is already registered
        const { rows: businessCheck } = await pool.query('SELECT * FROM manager WHERE name_business = $1', [
            name_business,
        ]);
        if (businessCheck.length > 0) {
            throw new Error('Business name is already registered');
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // insert to database
        const { rows: manager } = await pool.query(
            'INSERT INTO manager (email, password_hash, name, name_business) VALUES ($1, $2, $3, $4) RETURNING *',
            [email, hashedPassword, name, name_business]
        );

        res.status(200).json({
            message: 'Manager registered successfully',
            data: manager[0],
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addEmployee = async (req, res) => {
    try {
        const { name, division, email, salary } = req.body;
        const manager_id = req.user.id;

        // check if body is missing
        if (!name || !division || !email || !salary) {
            throw new Error('Missing required fields: name, division, email, salary');
        }

        // check if email is already registered
        const { rows: emailCheck } = await pool.query('SELECT * FROM employee WHERE email = $1 AND manager_id = $2', [
            email,
            manager_id,
        ]);
        if (emailCheck.length > 0) {
            throw new Error('Email is already registered');
        }

        // initial password is email
        const password = email;

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // insert to database
        const { rows: employee } = await pool.query(
            'INSERT INTO employee (name, division, email, salary, password_hash, manager_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, division, email, salary, hashedPassword, manager_id]
        );

        res.status(200).json({
            message: 'Employee added successfully',
            data: employee[0],
            password: password,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLogsByManager = async (req, res) => {};

exports.getAllEmployeeByManager = async (req, res) => {
    try {
        const manager_id = req.user.id;

        // check if manager exists
        const { rows: managerCheck } = await pool.query('SELECT * FROM manager WHERE id = $1', [manager_id]);
        if (managerCheck.length === 0) {
            throw new Error('Access denied, anda bukan manager');
        }

        const { rows: employees } = await pool.query('SELECT * FROM employee WHERE manager_id = $1', [manager_id]);
        res.status(200).json({
            message: 'Employees retrieved successfully',
            data: employees,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEmployeeByUid = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const manager_id = req.user.id;

        // check if employee exists
        const { rows: employeeCheck } = await pool.query('SELECT * FROM employee WHERE id = $1 AND manager_id = $2', [
            employeeId,
            manager_id,
        ]);
        if (employeeCheck.length === 0) {
            throw new Error('Employee not found');
        }

        const { rows: employee } = await pool.query('SELECT * FROM employee WHERE id = $1', [employeeId]);
        res.status(200).json({
            message: 'Employee retrieved successfully',
            data: employee[0],
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateEmployeeByUid = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const manager_id = req.user.id;
        const { division, salary } = req.body;

        // check if body is missing
        if (!division || !salary) {
            throw new Error('Missing required fields: name, division, email, salary');
        }

        // check if employee exists
        const { rows: employeeCheck } = await pool.query('SELECT * FROM employee WHERE id = $1 AND manager_id = $2', [
            employeeId,
            manager_id,
        ]);
        if (employeeCheck.length === 0) {
            throw new Error('Employee not found');
        }

        // update employee
        const { rows: employee } = await pool.query(
            'UPDATE employee SET division = $1, salary = $2 WHERE id = $3 RETURNING *',
            [division, salary, employeeId]
        );

        res.status(200).json({
            message: 'Employee updated successfully',
            data: employee[0],
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteEmployeeByUid = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const manager_id = req.user.id;

        // check if employee exists
        const { rows: employeeCheck } = await pool.query('SELECT * FROM employee WHERE id = $1 AND manager_id = $2', [
            employeeId,
            manager_id,
        ]);
        if (employeeCheck.length === 0) {
            throw new Error('Employee not found');
        }

        // delete employee
        await pool.query('DELETE FROM employee WHERE id = $1', [employeeId]);

        res.status(200).json({
            message: 'Employee deleted successfully',
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
