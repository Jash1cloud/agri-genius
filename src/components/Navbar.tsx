import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link, useLocation } from "react-router-dom";
import { Tractor, Home, Plus, User, LogOut, Users, Search, Award } from "lucide-react";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/equipment", icon: Tractor, label: "Equipment" },
    { path: "/farmers", icon: Users, label: "Farmers" },
    { path: "/requests", icon: Search, label: "Requests" },
    { path: "/export-quality", icon: Award, label: "Export Quality" },
    { path: "/add-equipment", icon: Plus, label: "Add Equipment" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            🌾 Farm Helper
          </Link>
          
          {user && (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm transition-colors ${
                      location.pathname === item.path
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
              
              <Button
                onClick={signOut}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;