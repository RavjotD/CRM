import { useAuth } from "@/hooks/use-auth";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <header className="border-b bg-card">
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-xl font-semibold">Welcome back, {user.username}</h2>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
