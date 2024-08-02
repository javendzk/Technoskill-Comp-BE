const { pool } = require('../configs/pool.config');
const { auth } = require('../services/auth.services');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    try {
        const response = await auth.manager(req.body);
        if (!response.success) throw new Error(response.message);
        response.success = undefined;

        const logger = await pool.query('INSERT INTO login_logs (role, name, manager_id) VALUES ($1, $2, $3) RETURNING *',
            ['manager', response.name, response.id]
        );
        
        if (!logger) console.log('[!] Gagal log login manager');
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.register = async (req, res) => {
    try {
        const { email, password, name, name_business } = req.body;
        console.log(req.body);

        if (!email || !password || !name || !name_business) {
            throw new Error('Kekurangan informasi: email, password, name, name_business');
        }

        const { rows: emailCheck } = await pool.query('SELECT * FROM manager WHERE email = $1', [email]);

        if (emailCheck.length > 0) {
            throw new Error('Email sudah registered');
        }

        const { rows: businessCheck } = await pool.query('SELECT * FROM manager WHERE name_business = $1', [
            name_business,
        ]);

        if (businessCheck.length > 0) {
            throw new Error('Business name sudah registered');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const { rows: manager } = await pool.query(
            'INSERT INTO manager (email, password_hash, name, name_business) VALUES ($1, $2, $3, $4) RETURNING *',
            [email, hashedPassword, name, name_business]
        );

        res.status(200).json({ success: true, message: 'Berhasil register manager', data: manager[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.addEmployee = async (req, res) => {
    try {
        const { name, division, email, salary } = req.body;
        const manager_id = req.user.id;

        if (!name || !division || !email || !salary) {
            throw new Error('Kekuranqan informasi: name, division, email, salary');
        }

        const { rows: emailCheck } = await pool.query('SELECT * FROM employee WHERE email = $1 AND manager_id = $2', [
            email,
            manager_id,
        ]);

        if (emailCheck.length > 0) {
            throw new Error('Email sudah terdaftar');
        }

        const password = email;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const { rows: employee } = await pool.query(
            'INSERT INTO employee (name, division, email, salary, password_hash, manager_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, division, email, salary, hashedPassword, manager_id]
        );

        employee[0].password = password
        
        res.status(200).json({ success: true, message: 'Berhasil add employee', data: employee[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getLogsByManager = async (req, res) => {
    try {
        const manager_id = req.user.id;

        const { rows: loginLogs } = await pool.query('SELECT * FROM login_logs WHERE manager_id = $1', [manager_id]);

        res.status(200).json({ success: true, message: 'Berhasil retrieve logs manager', data: loginLogs });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getAllEmployeeByManager = async (req, res) => {
    try {
        const manager_id = req.user.id;

        const { rows: managerCheck } = await pool.query('SELECT * FROM manager WHERE id = $1', [manager_id]);

        if (managerCheck.length === 0) {
            throw new Error('Access denied, anda bukan manager');
        }

        const { rows: employees } = await pool.query('SELECT * FROM employee WHERE manager_id = $1', [manager_id]);
        res.status(200).json({ success: true, message: 'Berhasil retrieve employee dari manager', data: employees });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getEmployeeByUid = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const manager_id = req.user.id;

        const { rows: employeeCheck } = await pool.query('SELECT * FROM employee WHERE id = $1 AND manager_id = $2', [
            employeeId,
            manager_id,
        ]);

        if (employeeCheck.length === 0) {
            throw new Error('Employee tidak ketemu');
        }

        const { rows: employee } = await pool.query('SELECT * FROM employee WHERE id = $1', [employeeId]);
        res.status(200).json({ success: true, message: 'Berhasil get employee dengan Uid', data: employee[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.updateEmployeeByUid = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const manager_id = req.user.id;
        const { division, salary } = req.body;

        if (!division || !salary) {
            throw new Error('Kekurangan informasi : name, division, email, salary');
        }

        const { rows: employeeCheck } = await pool.query('SELECT * FROM employee WHERE id = $1 AND manager_id = $2', [
            employeeId,
            manager_id,
        ]);

        if (employeeCheck.length === 0) {
            throw new Error('Employee tidak ketemu');
        }

        const { rows: employee } = await pool.query(
            'UPDATE employee SET division = $1, salary = $2 WHERE id = $3 RETURNING *',
            [division, salary, employeeId]
        );

        res.status(200).json({ success: true, message: 'Berhasil update employee dengan Uid', data: employee[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteEmployeeByUid = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const manager_id = req.user.id;

        const { rows: employeeCheck } = await pool.query('SELECT * FROM employee WHERE id = $1 AND manager_id = $2', [
            employeeId,
            manager_id,
        ]);
        if (employeeCheck.length === 0) {
            throw new Error('Employee tidak ketemu');
        }

        await pool.query('DELETE FROM employee WHERE id = $1', [employeeId]);

        res.status(200).json({ success: true, message: 'Berhasil hapus employee' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
