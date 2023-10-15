import { Input } from '@/components/ui/input'

function PrivateContainer(){
    return (
        <div className='flex flex-col flex-1 w-full'>
        <div className='flex flex-row items-center h-[50px] px-10 bg-zinc-900 w-full'>
          <p className='text-white flex-1'>Message</p>
        </div>
        <div className='bg-zinc-500 h-full p-4 flex flex-col justify-between w-full'>
          <div className="flex flex-grow flex-col justify-end py-7 space-y-5">
                  <div className='flex flex-row gap-5 items-center'>
                  <div className="w-16 h-16 bg-zinc-300 rounded-full overflow-hidden"/>
                  <div>
                      <p className='text-lg font-semibold text-white mb-1'>Name</p>
                      <p className='text-sm text-gray-400'>Message</p>
                  </div>    
              </div>
              <div className='flex flex-row gap-5 items-center'>
                  <div className="w-16 h-16 bg-zinc-300 rounded-full overflow-hidden"/>
                  <div>
                      <p className='text-lg font-semibold text-white mb-1'>Name</p>
                      <p className='text-sm text-gray-400'>Message</p>
                  </div>    
              </div>
          </div>
          <div className="mt-auto">
            <Input />
          </div>
        </div>
      </div>
    )
}

export default PrivateContainer;