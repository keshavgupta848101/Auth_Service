const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRepository = require('../repository/user-reporitory');

class UserService {
    constructor() {
        this.UserRepository = new UserRepository();
    }
    async create(data) {
        try {
            const user = this.UserRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    async sigIn(email, plainPassword) {
        const user = this.UserRepository.getByEmail(email);

        const passwordMatch = this.checkPassword(plainPassword, user.password)

        if (!passwordMatch) {
            console.log("Password doesn't match");
            throw { error: 'Incorrect password' };
        }

        const newJwt = this.createToken({ email: user.email, id: user.id });
        return newJwt;
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: '1h' });
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }



    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation", error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword)
        } catch (error) {
            console.log("Something went wrong in password comparisation", error);
            throw error;
        }
    }
}

module.exports = UserRepository;