
import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../shared/Logo';
import { LayoutDashboard, Package, BookOpen, Users, Settings, HelpCircle } from 'lucide-react';

const sidebarItems = [
  {
    title: 'Dashboard',
    path: '/admin',
    icon: <LayoutDashboard className="h-5 w-5" />
  },
  {
    title: 'Manage IPO',
    path: '/admin/manage-ipo',
    icon: <Package className="h-5 w-5" />
  },
  {
    title: 'IPO Subscription',
    path: '/admin/ipo-subscription',
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    title: 'IPO Allotment',
    path: '/admin/ipo-allotment',
    icon: <Package className="h-5 w-5" />
  }
];

const otherItems = [
  {
    title: 'Settings',
    path: '/admin/settings',
    icon: <Settings className="h-5 w-5" />
  },
  {
    title: 'API Manager',
    path: '/admin/api-manager',
    icon: <Package className="h-5 w-5" />
  },
  {
    title: 'Accounts',
    path: '/admin/accounts',
    icon: <Users className="h-5 w-5" />
  },
  {
    title: 'Help',
    path: '/admin/help',
    icon: <HelpCircle className="h-5 w-5" />
  }
];

const AdminSidebar = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-100 border-r border-gray-200 w-64 fixed left-0 top-0">
      <div className="p-4 flex items-center">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-bluestock-600 flex items-center justify-center text-white font-bold text-xl">
            BF
          </div>
          <div className="ml-2">
            <span className="text-sm font-semibold">Bluestock Fintech</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col flex-1 overflow-y-auto py-5">
        <div className="px-4 mb-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">MENU</h2>
          <nav className="mt-2 space-y-1">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive 
                      ? 'bg-bluestock-100 text-bluestock-600' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.title}
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="px-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">OTHERS</h2>
          <nav className="mt-2 space-y-1">
            {otherItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive 
                      ? 'bg-bluestock-100 text-bluestock-600' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.title}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
