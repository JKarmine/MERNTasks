const User = require('../models/User');

exports.createUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User(req.body);

        await user.save();

        res.json({ msg: 'User created successfully' });
    } catch (error) {
        console.log(error);
        res.status(400).send('Error');
    }
};