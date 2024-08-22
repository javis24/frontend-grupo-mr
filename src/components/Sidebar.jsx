import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoPerson, IoPricetag, IoHome, IoLogOut, IoMenu, IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset } from '../features/authSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="h-full">
    <aside className={`flex-grow h-screen ${isCollapsed ? 'w-20' : 'w-44'} transition-width duration-300`}>
      <div className="h-full bg-gray-800 text-white shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between p-4">
          <img src="/logo_mr.png" alt="Logo" className="h-12 w-12" />
          {!isCollapsed && <span className="text-sm font-bold">{user && user.name}</span>}
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none text-white">
            {isCollapsed ? <IoMenu /> : <IoClose />}
          </button>
        </div>

        <div className="flex flex-col flex-grow">
          <p className={`text-lg font-semibold ${isCollapsed ? 'hidden' : 'block'}`}>General</p>
          <ul className="space-y-2 mt-2">
            <li>
              <NavLink
                to="/dashboard"
                className="flex items-center p-2 rounded hover:bg-gray-600 transition duration-300"
                activeClassName="bg-gray-700"
              >
                <IoHome className="mr-2" /> {!isCollapsed && 'Dashboard'}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className="flex items-center p-2 rounded hover:bg-gray-600 transition duration-300"
                activeClassName="bg-gray-700"
              >
                <IoPricetag className="mr-2" /> {!isCollapsed && 'Products'}
              </NavLink>
            </li>
          </ul>
          <hr className="border-t-2 border-gray-600 my-4" />

          {user && user.role === 'admin' && (
            <>
              <p className={`text-lg font-semibold mt-6 ${isCollapsed ? 'hidden' : 'block'}`}>Admin</p>
              <ul className="space-y-2 mt-2">
                <li>
                  <NavLink
                    to="/users"
                    className="flex items-center p-2 rounded hover:bg-gray-600 transition duration-300"
                    activeClassName="bg-gray-700"
                  >
                    <IoPerson className="mr-2" /> {!isCollapsed && 'Users'}
                  </NavLink>
                </li>
              </ul>
              <hr className="border-t-2 border-gray-600 my-4" />

              <p className={`text-lg font-semibold mt-6 ${isCollapsed ? 'hidden' : 'block'}`}>Clientes</p>
              <ul className="space-y-2 mt-2">
                <li>
                  <NavLink
                    to="/clients"
                    className="flex items-center p-2 rounded hover:bg-gray-600 transition duration-300"
                    activeClassName="bg-gray-700"
                  >
                    <IoPerson className="mr-2" /> {!isCollapsed && 'Clientes'}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/calendar"
                    className="flex items-center p-2 rounded hover:bg-gray-600 transition duration-300"
                    activeClassName="bg-gray-700"
                  >
                    <IoPerson className="mr-2" /> {!isCollapsed && 'Citas Agendadas'}
                  </NavLink>
                </li>
              </ul>
              <hr className="border-t-2 border-gray-600 my-4" />
              </>
          )}
          <>
          <p className={`text-lg font-semibold mt-6 ${isCollapsed ? 'hidden' : 'block'}`}>Settings</p>
          <ul className="space-y-2 mt-2">
            <li>
              <button
                onClick={logout}
                className="flex items-center w-full p-2 rounded hover:bg-gray-600 transition duration-300"
              >
                <IoLogOut className="mr-2" /> {!isCollapsed && 'Logout'}
              </button>
            </li>
          </ul>
          </>
        </div>
      </div>
    </aside>
    </div>
  );
};

export default Sidebar;
