// import { useAuth } from "@/hooks/use-auth.hook"
import { Card } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"
import { useAuth } from "@/hooks/api"
import { useUser } from "@/store/user.store"

function UserCard() {
  const {user} = useUser()
  const { logout } = useAuth()
  const handleLogout = async () => {
    await logout()
    // navigate("/auth/login")
  }

  return (
    <Card className='m-4 flex items-center justify-between gap-3 p-3'>
      <div className='flex items-center gap-3'>
        <Avatar>
          <AvatarImage src='/placeholder-avatar.jpg' alt='User Avatar' />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <span className='font-medium'>{user?.name}</span>
          <span className='text-sm text-gray-500'>{user?.position}</span>
        </div>
      </div>
      <Button variant='ghost' size='icon' onClick={handleLogout}>
        <LogOut className='h-5 w-5' />
      </Button>
    </Card>
  );
}

export default UserCard
