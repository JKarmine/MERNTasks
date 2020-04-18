const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res) => {
    // Check errors
    const errors = validationResult(req);

    if ( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User doesn't exist" });
        }

        const rightPass = await bcryptjs.compare(password, user.password);
        if (!rightPass) {
            return res.status(400).json({ msg: 'Wrong password' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 // 1 hour
        }, (error, token) => {
            if (error) throw error;

            res.json({ token });
        });

    } catch (error) {
        console.log(error);
    }
}