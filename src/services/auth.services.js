const jwt = require('jsonwebtoken');
const pool = require('../configs/pool.config');
const bcrypt = require('bcrypt');

const authManager = async (body) => {
    try {
        const { email, password } = body;
        console.log(body);
        if (!email || !password) throw new Error('Kurang informasi: email, password');

        const response = await pool.query('SELECT * FROM MANAGER WHERE email = $1', [email]);
        console.log(response.rows);
        if (response.rows.length === 0) throw new Error('Email tidak valid');

        const isPasswordValid = await bcrypt.compare(password, response.rows[0].password_hash);
        if (!isPasswordValid) throw new Error('Password tidak valid');

        const token = jwt.sign(
            {
                id: response.rows[0].id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return { success: true, name: response.rows[0].name, id: response.rows[0].id, token: token };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

const authEmployee = async (body) => {
    try {
        const { email, password } = body;
        console.log(body);
        if (!email || !password) throw new Error('Kurang informai: email, password');

        const response = await pool.query('SELECT * FROM employee WHERE email = $1', [email]);
        console.log(response.rows);
        if (response.rows.length === 0) throw new Error('Email tidak valid');

        const isPasswordValid = await bcrypt.compare(password, response.rows[0].password_hash);
        if (!isPasswordValid) throw new Error('Password tidak valid');

        const token = jwt.sign(
            {
                id: response.rows[0].id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return { success: true, name: response.rows[0].name, token: token };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

const employeeChangePassword = async (body) => {
    try {
        const { id, old_password, new_password } = body;
        console.log(body);
        if (!id || !old_password || !new_password) throw new Error('Kurang informasi: id, old_password, new_password');

        const response = await pool.query('SELECT * FROM employee WHERE id = $1', [id]);
        console.log(response.rows);
        if (response.rows.length === 0) throw new Error('Email tdak valid');

        const isPasswordValid = await bcrypt.compare(old_password, response.rows[0].password_hash);
        if (!isPasswordValid) throw new Error('Password tidak valid');

        const hashedPassword = await bcrypt.hash(new_password, 10);
        const updateResponse = await pool.query('UPDATE employee SET password_hash = $1 WHERE id = $2 RETURNING *', [
            hashedPassword,
            id,
        ]);

        return { success: true, message: 'Password berhasil diubah', data: updateResponse.rows[0] };
    } catch (Error) {
        return { success: false, message: Error.message };
    }
};

module.exports = {
    auth: {
        employee: authEmployee,
        manager: authManager,
        employeeChangePassword: employeeChangePassword,
    },
};
