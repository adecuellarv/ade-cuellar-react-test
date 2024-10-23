import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import { useAuth } from '../../context/AuthContext';
import './styles.scss';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const firstInput = 1, successInput = 2, errorInput = 3;
const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [pwd1, setPwd1] = useState('');
  const [pwd1Valid, setPwd1Valid] = useState(true);
  const [pwd2, setPwd2] = useState('');
  const [pwd2Valid, setPwd2Valid] = useState(true);
  const [conditionMin, setConditionMinValid] = useState(firstInput);
  const [conditionMax, setConditionMaxValid] = useState(firstInput);
  const [conditionLettCap, setConditionLettCapValid] = useState(firstInput);
  const [conditionLettLow, setConditionLettLowValid] = useState(firstInput);
  const [conditionLettChar, setConditionLettCharValid] = useState(firstInput);
  const [conditionNumber, setConditionNumberValid] = useState(firstInput);
  const [showConditions, setShowConditions] = useState(false);

  const handleLogin = () => {
    console.log('llave', process.env.REACT_APP_SECRET_KEY)
    if (email && pwd1 && pwd2 && emailValid && pwd1Valid && pwd2Valid) {
      const secretKey: any = process.env.REACT_APP_SECRET_KEY;
      const encryptedPassword = CryptoJS.AES.encrypt(pwd1, secretKey).toString();
      alert('success')
    }
    //login();
  };

  useEffect(() => {
    setEmailValid(true);
  }, [email]);

  useEffect(() => {
    if (pwd1) {
      setPwd1Valid(true)
      if (pwd1.length >= 6) setConditionMinValid(successInput)
      else {
        setConditionMinValid(errorInput)
        setPwd1Valid(false)
      }

      if (pwd1.length <= 12) setConditionMaxValid(successInput)
      else {
        setConditionMaxValid(errorInput)
        setPwd1Valid(false)
      }

      if (/[A-Z]/.test(pwd1)) setConditionLettCapValid(successInput)
      else {
        setConditionLettCapValid(errorInput)
        setPwd1Valid(false)
      }

      if (/[a-z]/.test(pwd1)) setConditionLettLowValid(successInput)
      else {
        setConditionLettLowValid(errorInput)
        setPwd1Valid(false)
      }

      if (/[^a-zA-Z0-9]/.test(pwd1)) setConditionLettCharValid(successInput)
      else {
        setConditionLettCharValid(errorInput)
        setPwd1Valid(false)
      }

      if (/\d/.test(pwd1)) setConditionNumberValid(successInput)
      else {
        setConditionNumberValid(errorInput)
        setPwd1Valid(false)
      }

    } else {
      setConditionMinValid(firstInput)
      setConditionMaxValid(firstInput)
      setConditionLettCapValid(firstInput)
      setConditionLettLowValid(firstInput)
      setConditionLettCharValid(firstInput)
      setConditionNumberValid(firstInput)
    }
  }, [pwd1]);

  return (
    <div className='container-login'>
      <div className='text-center'>
        <h1>Crear cuenta</h1>
      </div>
      <div className='div-login'>
        <div className='container-input'>
          <label>Correo</label>
          <input
            type='email'
            placeholder='Ej ade@gmail.com'
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailValid(emailRegex.test(email))}
            className={!emailValid ? 'border-error' : ''}
          />
          {!emailValid &&
            <span className='color-error'>Correo no valido</span>
          }
        </div>
        <div className='container-input'>
          <label>Contraseña</label>
          <input
            type='password'
            placeholder='*******'
            onChange={(e) => setPwd1(e.target.value)}
            onFocus={() => setShowConditions(true)}
          />
          {showConditions &&
            <div className='div-conditions'>
              <div>
                <span
                  className={conditionMin === errorInput ? 'color-error' : conditionMin === successInput ? 'color-success' : ''}
                >
                  Mínimo 6 caracteres
                </span>
              </div>
              <div>
                <span
                  className={conditionMax === errorInput ? 'color-error' : conditionMax === successInput ? 'color-success' : ''}
                >
                  Máximo 12 caracteres
                </span>
              </div>
              <div>
                <span
                  className={conditionLettCap === errorInput ? 'color-error' : conditionLettCap === successInput ? 'color-success' : ''}
                >
                  Una letra mayúscula
                </span>
              </div>
              <div>
                <span
                  className={conditionLettLow === errorInput ? 'color-error' : conditionLettLow === successInput ? 'color-success' : ''}
                >
                  Una letra minúscula
                </span>
              </div>
              <div>
                <span
                  className={conditionLettChar === errorInput ? 'color-error' : conditionLettChar === successInput ? 'color-success' : ''}
                >
                  Un carácter especial
                </span>
              </div>
              <div>
                <span
                  className={conditionNumber === errorInput ? 'color-error' : conditionNumber === successInput ? 'color-success' : ''}
                >
                  Un número
                </span>
              </div>
            </div>
          }
        </div>
        <div className='container-input'>
          <label>Repetir Contraseña</label>
          <input
            type='password'
            placeholder='*******'
            onChange={(e) => setPwd2(e.target.value)}
            onBlur={() => setPwd2Valid(pwd1 === pwd2)}
            className={!pwd2Valid ? 'border-error' : ''}
          />
          {!pwd2Valid &&
            <span className='color-error'>Las contraseñas no coinciden</span>
          }
        </div>
        <div className='container-button'>
          <div className='d-right'>
            <button
              className='button b-blue'
              onClick={handleLogin}
            >Crear</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
