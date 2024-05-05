'use client'

import { useRouter } from 'next/navigation'

interface LoginButtonProps {
  children: React.ReactNode
  mode?: 'modal' | 'redirect'
  asChild?: boolean
}

function LoginButton({ children, mode, asChild }: LoginButtonProps) {
  const router = useRouter()

  const onHandleClick = () => {
    router.push('/auth/login')
  }
  return (
    <span onClick={onHandleClick} className='cursor-pointer'>
      {children}
    </span>
  )
}

export default LoginButton
