import Link from 'next/link'

export const MenuList = (props: any) => {
    return(
        <div>
            <h2 className="mb-6 text-sm text-gray-600">{props.children}</h2>
            <ul className="text-sm text-gray-800 font-medium">
                    {props.menuItems.map((menu: any, index: number) => {
                        return (
                        <li className="mb-4 flex items-center" key={index}>
                            <Link href={menu.path} className="hover:underline">{menu.title}</Link> {menu.isNew?<div className='inline text-[10px] ml-1 px-2 rounded-full bg-green-200 text-green-800'>New</div>:null}
                        </li>
                    )})}
            </ul>
        </div>
    )
}