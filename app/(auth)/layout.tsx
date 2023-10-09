import React, { PropsWithChildren } from 'react'

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className='bg-red-500 w-full h-full flex flex-col'>
        {children}
    </div>
  )
}

export default AuthLayout