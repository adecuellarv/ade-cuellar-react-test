
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
import { useAuth } from '../../../context/AuthContext';
import './styles.scss';



const Header: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showSubMenu, setShowSubmenu] = useState(false);

  const handleLogout = () => {
    logout();
  }
  
  const items = [
    {
      label: 'Productos',
      icon: 'pi pi-list',
      command: () => { navigate('/products') }
    }
  ];

  const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
  const end = (
    <div className="flex align-items-center gap-2 menu-user">
      <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" onClick={() => setShowSubmenu(!showSubMenu)} />
      {showSubMenu &&
        <div className='sub-menu'>
          <div onClick={handleLogout}>
            <p>Cerrar sesión</p>
          </div>
        </div>
      }
    </div>
  );
  return (
    <Menubar model={items} start={start} end={end} />
  )

}

export default Header;