import React, { PropsWithChildren } from 'react'

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className='bg-black w-full h-screen flex flex-col items-center justify-center'>
        {children}
    </div>
  )
}

export default AuthLayout