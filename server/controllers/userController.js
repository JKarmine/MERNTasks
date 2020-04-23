const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    // Check errors
    const errors = validationResult(req);

    if ( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create new user
        user = new User(req.body);

        // Hash pass
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        user = await user.save();

        const payload = {
            user: {
                id: user._id
            }
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: '1d' // 1 day
        }, (error, token) => {
            if (error) throw error;

            res.json({ token });
        });
    } catch (error) {
        console.log(error);
        res.status(400).send('Error');
    }
};