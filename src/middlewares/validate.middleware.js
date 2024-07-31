const { validationResult } = require('express-validator');

const validateMiddleware = [
    (req, res, next) => {
        for (const [key, value] of Object.entries(req.body)) {
            if (key === 'picture_url') {
                if (value.includes('$') || value.includes(';')) return res.status(400).json("[!] Picture_url mengandung $;");

            } else {
                if (typeof value === 'string' && !/^[a-zA-Z0-9]*$/.test(value)) return res.status(400).json("[!] Input tidak valid");
            } 
        }
        next();
    },
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = validateMiddleware;