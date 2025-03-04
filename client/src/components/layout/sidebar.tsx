import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import {
  Users,
  Phone,
  CheckSquare,
  LogOut,
  LayoutDashboard,
  ShieldCheck
} from "lucide-react";

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/contacts", label: "Contacts", icon: Phone },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
];

export default function Sidebar() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  if (!user) return null;

  return (
    <div className="flex flex-col h-screen border-r bg-card">
      <div className="p-6">
        <h1 className="text-2xl font-bold">CRM</h1>
      </div>

      <nav className="flex-1 px-4">
        {links.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}>
            <a
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md mb-1 hover:bg-accent",
                location === href && "bg-accent"
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </a>
          </Link>
        ))}
        {/* Only show admin link to the first admin user (you) */}
        {user.isAdmin && user.id === 1 && (
          <Link href="/admin">
            <a
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md mb-1 hover:bg-accent",
                location === "/admin" && "bg-accent"
              )}
            >
              <ShieldCheck className="h-5 w-5" />
              Admin
            </a>
          </Link>
        )}
      </nav>

      <div className="p-4 border-t">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Logged in as</p>
          <p className="font-medium">{user.username}</p>
        </div>
        <Button
          variant="destructive"
          className="w-full"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
        >
          {logoutMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4 mr-2" />
          )}
          Logout
        </Button>
      </div>
    </div>
  );
}