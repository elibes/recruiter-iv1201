import * as React from 'react';
import '../styles/RegistrationForm.css';
import {useSelector, useDispatch} from 'react-redux';
import InputField from './InputField';
import {AppDispatch, RootState} from '../../store';
import {
  setEmail,
  setFirstname,
  setLastname,
  setPassword,
  setPasswordConfirm,
  setPersonalNumber,
  setUsername,
  validateRegistration,
  register,
} from '../../viewmodel/userSlice';
import Button from './Button';

/**
 * Represents a registration form component allowing users to input their registration details.
 * It includes input fields for personal information and registration actions.
 * The form provides validation feedback for each field and displays a message upon registration completion or error.
 */
const RegistrationForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    firstname,
    lastname,
    userName,
    password,
    passwordConfirm,
    personalNumber,
    email,
    resultMsg,
    error,
    backendError,
  } = useSelector((state: RootState) => state.user);

  /**
   * Generates an error message for a specific field if an error exists.
   * @param {string} fieldName - The name of the field to check for an error.
   * @returns {string | undefined} - The error message for the field, if any.
   */
  const generateErrorMessage = (fieldName: string) => {
    if (backendError[0] && backendError[0].includes('::')) {
      const errorStrings = backendError[0].split('::');
      for (const errorString of errorStrings) {
        const [errorFieldName, ...messageParts] = errorString.split(' ');
        const message = messageParts.join(' ');
        if (fieldName === errorFieldName) {
          return message;
        }
      }
    } else if (backendError[0] && backendError[0].includes(fieldName)) {
      const [errorFieldName, ...messageParts] = backendError[0].split(' ');
      return messageParts.join(' ');
    }
    return undefined;
  };

  /**
   * Handles changes to the firstname input field.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object from the input field.
   */
  const handleFirstnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFirstname(e.target.value));
  };

  /**
   * Handles changes to the lastname input field.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object from the input field.
   */
  const handleLastnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLastname(e.target.value));
  };

  /**
   * Handles changes to the username input field.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object from the input field.
   */
  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(e.target.value));
  };

  /**
   * Handles changes to the password input field.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object from the input field.
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value));
  };

  /**
   * Handles changes to the password confirmation input field.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object from the input field.
   */
  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setPasswordConfirm(e.target.value));
  };

  /**
   * Handles changes to the email input field.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object from the input field.
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };

  /**
   * Handles changes to the person number input field.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object from the input field.
   */
  const handlePersonalNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setPersonalNumber(e.target.value));
  };

  /**
   * Initiates the registration process, including validation and registration actions.
   */
  const handleRegister = () => {
    dispatch(validateRegistration());
    dispatch(register());
  };

  return (
    <div className="registration-container">
      <div>
        <h2>Registration</h2>
        <div className="reg-inputs">
          <InputField
            label="first name"
            type="text"
            value={firstname}
            onChange={handleFirstnameChange}
            className="form-input"
          />
          {generateErrorMessage('firstName') && (
            <strong>{generateErrorMessage('firstName')}</strong>
          )}
          <InputField
            label="last name"
            type="text"
            value={lastname}
            onChange={handleLastnameChange}
            className="form-input"
          />
          {generateErrorMessage('lastName') && (
            <strong>{generateErrorMessage('lastName')}</strong>
          )}
          <InputField
            label="username"
            type="text"
            value={userName}
            onChange={handleUserNameChange}
            className="form-input"
          />
          {generateErrorMessage('userName') && (
            <strong>{generateErrorMessage('userName')}</strong>
          )}
          <InputField
            label="password"
            type="text"
            value={password}
            onChange={handlePasswordChange}
            className="form-input"
          />
          {generateErrorMessage('password') && (
            <strong>{generateErrorMessage('password')}</strong>
          )}
          <InputField
            label="repeat password"
            type="text"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            className="form-input"
          />
          {generateErrorMessage('password') && (
            <strong>{generateErrorMessage('password')}</strong>
          )}
          <InputField
            label="person number"
            type="text"
            value={personalNumber}
            onChange={handlePersonalNumberChange}
            className="form-input"
          />
          {generateErrorMessage('personalNumber') && (
            <strong>{generateErrorMessage('personalNumber')}</strong>
          )}
          <InputField
            label="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
            className="form-input"
          />
          {generateErrorMessage('email') && (
            <strong>{generateErrorMessage('email')}</strong>
          )}
        </div>
        <div className="form-buttons">
          <Button
            text="Register"
            onClick={handleRegister}
            className="action-btn"
          />
        </div>
        <span className="result-message">{resultMsg}</span>
        <span className="result-message">{error}</span>
        <div className="registered-user-link">
          Already registered? <a href="/login">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
