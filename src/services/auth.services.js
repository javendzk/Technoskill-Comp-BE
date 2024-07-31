const jwt = require('jsonwebtoken');
const pool = require('../config/db.pool.js');
const bcrypt = require('bcrypt');

const authEmployee = async (body) => {
    try {
        const {name, password} = body;
        if (!name || !password) throw new Error('[!] Password / Username harus diisi');

        const response = await pool.query('SELECT * FROM MANAGER WHERE name = $1', [name]);
        if (response.rows.length === 0) throw new Error('[!] Name tidak valid');

        const isPasswordValid = await bcrypt.compare(password, response.rows[0].password);
        if (!isPasswordValid) throw new Error('[!] Password tidak valid');

        const token = jwt.sign({
            id: response.rows[0].id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        
        return {
            success: true,
            name: response.rows[0].name,
            token: token,
        }

    }

    catch (Error) {
        return {
            success: false,
            message: Error.message,
        }
    }
}

module.exports = {
    auth: {
        employee: authEmployee,
        manager: authManager,
    }
}