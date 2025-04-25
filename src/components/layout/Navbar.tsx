
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, User } from 'lucide-react';
import Logo from '@/components/shared/Logo';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavbarProps {
  showSearch?: boolean;
  onSearch?: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ showSearch = false, onSearch }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {showSearch && (
              <form onSubmit={handleSearch} className="relative w-64">
                <input
                  type="text"
                  placeholder="Search IPOs..."
                  className="w-full py-1.5 pl-10 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-bluestock-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </form>
            )}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  {user.role === "admin" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/admin">Admin Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/manage-ipo">Manage IPOs</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </Button>
                <Button
                  className="bg-bluestock-600 hover:bg-bluestock-700"
                  size="sm"
                  onClick={() => navigate("/signup")}
                >
                  Sign up now
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-6">
                  <Link to="/" className="text-lg font-medium">
                    Home
                  </Link>
                  {user?.role === 'admin' && (
                    <>
                      <Link to="/admin" className="text-lg font-medium">
                        Admin Dashboard
                      </Link>
                      <Link to="/admin/manage-ipo" className="text-lg font-medium">
                        Manage IPOs
                      </Link>
                    </>
                  )}
                  {user ? (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        logout();
                        navigate("/");
                      }}
                    >
                      Log out
                    </Button>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <Button variant="outline" onClick={() => navigate("/login")}>
                        Sign in
                      </Button>
                      <Button onClick={() => navigate("/signup")}>
                        Sign up
                      </Button>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
