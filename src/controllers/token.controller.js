const { pool } = require('../configs/pool.config');

exports.fixed = async (req, res) => {
    try {
        const id = req.user.id;
        let role;

        // check if current user is a manager
        const { rows: managerCheck } = await pool.query('SELECT * FROM manager WHERE id = $1', [id]);
        if (managerCheck.length === 0) {
            // check if current user is an employee
            const { rows: employeeCheck } = await pool.query('SELECT * FROM employee WHERE id = $1', [id]);
            if (employeeCheck.length === 0) {
                throw new Error('User not found');
            }
        }

        if (managerCheck.length > 0) {
            role = 'manager';
        } else {
            role = 'employee';
        }

        res.status(200).json({ role: role, id: id, isValid: true, expiresIn: req.user.exp });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
