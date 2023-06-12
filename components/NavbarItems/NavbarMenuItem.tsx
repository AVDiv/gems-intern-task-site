
import Link from 'next/link'

export const NavbarMenuItem = (props: any) => {
    return(
    <div>
        <Link href={props.href}>
            <span className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-2xl md:text-sm font-normal">
                {props.children} 
            </span>
        </Link>
    </div>
    )
}