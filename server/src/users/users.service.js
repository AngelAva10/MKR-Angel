const ServiceError = require("../global/errorHandling/serviceError/ServiceError");


const usersService = (userRepository, passwordService) => {
    return {
        getAllUsers: () => {
            try {
                return userRepository.findAll();
            } catch (error) {
                throw new ServiceError(error.message, 404, "usersService.getAll");
            }
        },
        getUserById: async (id) => {
            try {
                return await userRepository.findById(id);
            } catch (error) {
                throw new ServiceError(error.message, 404, "usersService.findUserById");
            }
        },
        createUser: async ({ email, password }) => {
            try {

                const user = await userRepository.findByEmail(email);

                if (user) {
                    throw new ServiceError("User already exist", 400, "usersService.createUser");
                }

                const hashedPassword = await passwordService.encryptPassword(password);


                return await userRepository.create({ email, password: hashedPassword });
            } catch (error) {
                throw new ServiceError(error.message, 404, "usersService.createUser");
            }
        },
    }


};

module.exports = usersService;