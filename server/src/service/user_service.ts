import {UserRegistrationDTO} from '../model/dto/user_registration_dto';
import {ConflictError, UserNotFoundError} from '../utilities/custom_errors';
import {Database} from '../integration/database';
import {UserDAO} from '../integration/user_dao';
import {AuthenticationService} from './authentication_service';
import {APPLICANT_ROLE_ID} from '../utilities/configurations';
import {UserLoginDTO} from '../model/dto/user_login_dto';
import {UserDTO} from '../model/dto/user_dto';
import {UserApplicationDTO} from '../model/dto/user_application_dto';

/**
 * This class implements the logic for handling user related operations.
 */
export class UserService {
  constructor() {}

  /**
   * This function handles the register user operation.
   *
   * @param {UserRegistrationDTO} data the validated and sanitized registration data passed through the presentation layer.
   * @return {Promise<boolean>} A promise that will be true if the registration was successful and handled by the api layer.
   * @async
   */
  async handleRegistration(data: UserRegistrationDTO): Promise<boolean> {
    const db = Database.getInstance().getDatabase();
    return await db.transaction(async transaction => {
      const userDAO = UserDAO.getInstance();
      const result = await userDAO.findUserByUsername(data.username);
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
    const db = Database.getInstance().getDatabase();
    return await db.transaction(async transaction => {
      const userDao = UserDAO.getInstance();
      const user = await userDao.findUserByUsername(data.username);
      if (!user) {
        throw new UserNotFoundError(
          `User with username ${data.username} not found.`
        );
      }
      await AuthenticationService.comparePasswords(
        data.password,
        user.passwordHash
      );
      return user;
    });
  }

  /**
   * Fetches a list of users and their applications from the database.
   *
   * @returns A promise that resolves to an array of UserApplicationDTO objects representing the user applications.
   * @throws {Error} Throws an 'Unauthorized' error if the user's role ID is not 1.
   * @throws {Error} Throws the error if there is an issue fetching the users or their applications from the database.
   */
  async handleListUsers(): Promise<UserApplicationDTO[]> {
    const transaction = await Database.getInstance().database.transaction();

    try {
      const users = await UserDAO.getInstance().getAllApplications();
      const userListDTOs: UserApplicationDTO[] = users.map(user => ({
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        status: user.status,
      }));
      await transaction.commit();
      return userListDTOs;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
