import React from 'react';
import './styles.scss';

const Login: React.FC = () => {
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
          />
        </div>
        <div className='container-input'>
          <label>Contraseña</label>
          <input
            type='password'
            placeholder='*******'
          />
        </div>
        <div className='container-input'>
          <label>Repetir Contraseña</label>
          <input
            type='password'
            placeholder='*******'
          />
        </div>
        <div className='container-button'>
          <div className='d-right'>
            <button className='button b-blue'>Crear</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
