import {UserRegistrationDTO} from '../model/dto/user_registration_dto';
import {
  ConflictError,
  LoginPasswordNotMatchError,
  UserNotFoundError,
} from '../utilities/custom_errors';
import {Database} from '../integration/database';
import {UserDAO} from '../integration/user_dao';
import {AuthenticationService} from './authentication_service';
import {APPLICANT_ROLE_ID} from '../utilities/configurations';
import {UserLoginDTO} from '../model/dto/user_login_dto';
import {UserDTO} from '../model/dto/user_dto';
import * as bcrypt from 'bcrypt';

/**
 * This class implements the logic for handling user related operations.
 */
export class UserService {
  constructor() {}

  /**
   * This function handles the register user operation.
   * @param {UserRegistrationDTO} data the validated and sanitized registration data passed through the presentation layer.
   * @return {Promise<boolean>} A promise that will be true if the registration was successful and handled by the api layer.
   * @async
   */
  async handleRegistration(data: UserRegistrationDTO): Promise<boolean> {
    const db = Database.getInstance().database;
    return await db.transaction(async transaction => {
      const userDAO = UserDAO.getInstance();
      const result = await userDAO.findUserByUsername(
        data.username,
        transaction
      );
      if (result !== null) {
        throw new ConflictError('That username already exists');
      }
      const hashedPassword = await AuthenticationService.hashPassword(
        data.password
      );

      const regData: UserRegistrationDTO = {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        password: hashedPassword,
        personalNumber: data.personalNumber,
        email: data.email,
      };
      await userDAO.createUser(regData, APPLICANT_ROLE_ID);
      return true;
    });
  }

  /**
   * Handles user login by verifying the provided username and password.
   * It checks if the user exists and if the password matches the stored password hash.
   *
   * @param {UserLoginDTO} data - The user's login credentials including username and password.
   * @returns {Promise<UserDTO>} A promise that resolves to the UserDTO of the logged-in user.
   * @throws {UserNotFoundError} Thrown if no user is found with the provided username.
   * @throws {LoginPasswordNotMatchError} Thrown if the provided password does not match the stored password hash.
   * @async
   */
  async handleLogin(data: UserLoginDTO): Promise<UserDTO> {
    try {
      const userDao = UserDAO.getInstance();
      const user = await userDao.findUserByUsername(data.username);
      if (!user) {
        throw new UserNotFoundError(
          `User with username ${data.username} not found.`
        );
      }
      const passwordMatch = await bcrypt.compare(
        data.password,
        user.passwordHash
      );
      if (!passwordMatch) {
        throw new LoginPasswordNotMatchError('Password is invalid');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Checks if a user with the given username exists in the database.
   *
   * This function queries the database for a user with the specified username. If the user exists,
   * it returns the user's data. This can be used to verify if a user is logged in by checking if
   * their account exists in the system. The function throws an error if the user is not found.
   *
   * @param {string} username - The username of the user to check.
   * @returns {Promise<UserDTO>} A promise that resolves to the user's data if the user exists.
   * @throws {UserNotFoundError} If no user with the given username is found in the database.
   * @async
   */

  async isLoggedIn(username: string): Promise<UserDTO> {
    try {
      const userDao = UserDAO.getInstance();
      const user = await userDao.findUserByUsername(username);
      if (!user) {
        throw new UserNotFoundError(
          `User with username ${username} not found.`
        );
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
