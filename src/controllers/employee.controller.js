const { pool } = require('../configs/pool.config');
const { auth } = require('../services/auth.services');

exports.login = async (req, res) => {
    try {       
        const { email } = req.body;

        const response = await auth.employee(req.body);
        if (!response.success) throw new Error(response.message);
        response.success = undefined;
        
        const {rows: employee }= await pool.query('SELECT * FROM employee where email = $1', [email]);
        if (employee.length === 0) console.error('[!] Data employee tidak ditemukan dari logging');

        const logger = await pool.query('INSERT INTO login_logs (role, manager_id) VALUES ($1, $2) RETURNING *',
            ['employee', employee[0].manager_id]
        );
        if (!logger) console.error('[!] Gagal log login employee');

        res.status(200).json({ success: true, data: response });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getByUid = async (req, res) => {
    try {
        const employeeId = req.user.id;

        const { rows: employee } = await pool.query('SELECT * FROM employee WHERE id = $1', [employeeId]);
        if (employee.length === 0) throw new Error('Data employee tidak ditemukan');

        res.status(200).json({ success: true, data: employee[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.UpdateByUid = async (req, res) => {
    try {
        const employeeId = req.user.id;
        const { name, email, birth_date, nik_number, address, picture_url } = req.body;

        const { rows: employee } = await pool.query(
            'UPDATE employee SET name = $1, email = $2, birth_date = $3, nik_number = $4, address = $5, picture_url = $6 WHERE id = $7 RETURNING *',
            [name, email, birth_date, nik_number, address, picture_url, employeeId]
        );
        if (employee.length === 0) throw new Error('Data employee tidak ditemukan');

        res.status(200).json({ success: true, message: 'Data employee berhasil diubah', data: employee[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const employeeId = req.user.id;
        req.body.id = employeeId;

        const response = await auth.employeeChangePassword({ ...req.body }); 
        if (!response.success) throw new Error(response.message);
        response.success = undefined;

        res.status(200).json({ success: true, message: response.message, data: response.data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
