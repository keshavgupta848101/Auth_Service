const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req, res) => {
    try {
        const responseData = {
            email: req.body.email,
            password: req.body.password
        }
        const response = await userService.create(responseData);
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new user',
            data: response,
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: {},
            success: false,
            err: error.explanation
        });
    }
}
module.exports = {
    create
}