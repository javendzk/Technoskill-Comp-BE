const { pool } = require('../configs/pool.config');

exports.fixed = async (req, res) => {
    try {
        const id = req.user.id;
        let role;

        const { rows: managerCheck } = await pool.query('SELECT * FROM manager WHERE id = $1', [id]);

        if (managerCheck.length === 0) {
            const { rows: employeeCheck } = await pool.query('SELECT * FROM employee WHERE id = $1', [id]);

            if (employeeCheck.length === 0) {
                throw new Error('User tidak ditemukan');
            }
        }

        if (managerCheck.length > 0) {
            role = 'manager';
        } else {
            role = 'employee';
        }

        res.status(200).json({ success: true, data: {role: role, id: id, isValid: true, expiresIn: req.user.exp} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
