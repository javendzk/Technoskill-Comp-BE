const { pool } = require('../configs/pool.config');
const { auth } = require('../services/auth.services');

exports.login = async (req, res) => {
    try {
        const response = await auth.employee(req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getByUid = async (req, res) => {
    try {
        const id = req.user.id;
        const response = await pool.query('SELECT * FROM employee WHERE id = $1', [id]);
        if (response.rows.length === 0) throw new Error('[!] Data anda tidak ditemukan');
        res.status(200).json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.UpdateByUid = async (req, res) => {
    try {
        const id = req.user.id;
        const { name, email, birth_date, nik_number, address, picture_url } = req.body;

        const response = await pool.query(
            'UPDATE employee SET name = $1, email = $2, birth_date = $3, nik_number = $4, address = $5, picture_url = $6 WHERE id = $7 RETURNING *',
            [name, email, birth_date, nik_number, address, picture_url, id]
        );
        if (response.rows.length === 0) throw new Error('[!] Data anda tidak ditemukan');
        res.status(200).json({
            message: 'Data berhasil diubah',
            data: response.rows[0],
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const id = req.user.id;
        const response = await auth.employeeChangePassword({ id, ...req.body });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
