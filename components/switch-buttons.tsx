"use client"
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { Button } from "./ui/button";


function SwitchButtons(){
    const currentRoute = usePathname();

    return(
        <div className='flex flex-row gap-7 mb-7'>
     
            <Link href='/conversations' >
                <Button className={currentRoute === '/conversations'? "bg-gray-500 hover:bg-gray-600" : "" }>PRIVATE</Button> 
            </Link>
            <Link href='/groups'>
                <Button className={currentRoute === '/groups'? "bg-gray-500 hover:bg-gray-600" : "" }> GROUP </Button>
            </Link>
        </div>
    )
}

export default SwitchButtons;

