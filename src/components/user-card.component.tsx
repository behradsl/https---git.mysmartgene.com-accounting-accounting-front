import { useAuth } from "@/hooks/use-auth.hook";
import { useRouter } from "next/navigation";
import React from "react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useUser } from "@/store/user.store";

function UserCard() {
    const currentUser = useUser(({user})=>(user))
    const { logout ,user } = useAuth();
    const router = useRouter();
    const [error, setError] = React.useState("");
    const handleLogout = async () => {
      try {
        await logout();
        router.replace("/login");
      } catch (err) {
        setError("logout failed!");
      }
    };
    
  
    return (
      <Card className="m-4 p-3 flex items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{currentUser?.name}</span>
            <span className="text-sm text-gray-500">{currentUser?.position}</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="w-5 h-5" />
        </Button>
      </Card>
    );
  }

  export default UserCard;