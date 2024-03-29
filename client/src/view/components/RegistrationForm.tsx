import '../styles/RegistrationForm.css';

import * as React from 'react';
import {useTranslation} from 'react-i18next';
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
import {errorPlacer} from '../../util/error_handler';

/**
 * RegistrationForm component responsible for rendering a registration form and handling user interactions with the form
 * related to user registration.
 *
 * @returns JSX.Element that renders the registration form.
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

  const {t, i18n} = useTranslation();

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

  /**
   * This helper function assign errors to particular fields.
   * @param field the field name
   */

  return (
    <div className="registration-container">
      <div>
        <h2>{t('registration.registration')}</h2>
        <div className="reg-inputs">
          <InputField
            label={t('registration.first-name')}
            type="text"
            value={firstname}
            onChange={handleFirstnameChange}
            className="form-input"
          />
          <strong>
            {t('server-messages.' + errorPlacer('firstName', backendError))}
          </strong>
          <InputField
            label={t('registration.last-name')}
            type="text"
            value={lastname}
            onChange={handleLastnameChange}
            className="form-input"
          />
          <strong>
            {t('server-messages.' + errorPlacer('lastName', backendError))}
          </strong>
          <InputField
            label={t('registration.username')}
            type="text"
            value={userName}
            onChange={handleUserNameChange}
            className="form-input"
          />
          <strong>
            {t('server-messages.' + errorPlacer('userName', backendError))}
          </strong>
          <InputField
            label={t('registration.password')}
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="form-input"
          />
          <strong>
            {t('server-messages.' + errorPlacer('password', backendError))}
          </strong>
          <InputField
            label={t('registration.repeat-password')}
            type="password"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            className="form-input"
          />
          <strong>
            {t('server-messages.' + errorPlacer('password', backendError))}
          </strong>
          <InputField
            label={t('registration.person-number')}
            type="text"
            value={personalNumber}
            onChange={handlePersonalNumberChange}
            className="form-input"
          />
          <strong>
            {t(
              'server-messages.' + errorPlacer('personalNumber', backendError)
            )}
          </strong>
          <InputField
            label={t('registration.email')}
            type="text"
            value={email}
            onChange={handleEmailChange}
            className="form-input"
          />
          <strong>
            {t('server-messages.' + errorPlacer('email', backendError))}
          </strong>
        </div>
        <div className="form-buttons">
          <Button
            text={t('registration.register')}
            onClick={handleRegister}
            className="action-btn"
          />
        </div>
        <span className="result-message">
          {resultMsg ? t('server-messages.' + resultMsg) : ''}
        </span>
        <span className="result-message">
          {error.length > 0 ? error.map(e => <div>{e}</div>) : ''}
        </span>
        <div className="registered-user-link">
          {t('registration.login-question')}
          <a href="/login">{t('registration.login')}</a>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
