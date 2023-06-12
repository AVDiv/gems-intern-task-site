
import Link from 'next/link'
// Dropdown carret icon
// import { FaCaretDown } from 'react-icons/fa'
import * as Icons from 'react-icons/fa'

export const NavbarDropdownMenuItem = (props: any) => {
    return(
    <div>
        <span className="text-gray-500 md:hover:bg-gray-700 md:hover:text-white px-3 py-2 rounded-md text-2xl md:text-sm font-normal peer">
            {props.children} <Icons.FaCaretDown className='inline-block' />
        </span>
        <div className="hidden peer-hover:block hover:block md:absolute md:bg-white text-gray-700 md:shadow-md rounded-md mt-2 text-2xl md:text-sm">
            {props.menus.map((item: any, index: number) => {
                const IconComponent = Icons[item.icon];
                return(
                    <Link href={item.path} key={index}>
                        <span className="flex items-center px-5 py-2 text-gray-500 hover:bg-gray-100 ">{IconComponent?<IconComponent/>:null}&nbsp;&nbsp;{item.title}</span>
                    </Link>
                    )
                }
            )}
            </div>
    </div>
    )
}