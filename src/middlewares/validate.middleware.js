const { validationResult } = require('express-validator');

const validateMiddleware = [
    (req, res, next) => {
        for (const [key, value] of Object.entries(req.body)) {
            if (key === 'picture_url') {
                if (value.includes('$') || value.includes(';'))
                    return res.status(400).json({ success: false, message: 'Picture_url mengandung $;' });
            } else {
                if (typeof value === 'string' && !/^[a-zA-Z0-9@._\-:/ ]*$/.test(value))
                    return res.status(400).json({ success: false, message: 'Input hanya a-Z 0-9' });
            }
        }
        next();
    },
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    },
];

module.exports = validateMiddleware;
