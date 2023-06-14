import React from 'react';
import Logo from '../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { MenuList } from './FooterItems/MenuList';
import { SocialIcon } from './FooterItems/SocialIcon';
import { SocialHandles } from './FooterItems/SocialHandles';
import { FooterMenus } from './FooterItems/FooterMenus';

export class Footer extends React.Component{
    render() {
        return (
        <footer className="bg-sky-100">
            {/* <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8"> */}
                <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 md:flex md:justify-between">
                <div className="mb-6 md:mb-0">
                    <Link href="/frontend" className="flex items-center">
                        <Image src={Logo} className="h-9 w-5 mr-3" alt="Logo" style={{objectFit: "contain"}}/>
                        <span className="self-center text-xl font-semibold whitespace-nowrap ">Frontend UI</span>
                    </Link>
                    <p className='mt-5 text-sm text-slate-600 sm:mr-16'>
                        Design amazing digital experiences that create more happy users.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-8 sm:gap-14 sm:grid-cols-5">
                    <MenuList menuItems={FooterMenus["Products"]}>Products</MenuList>
                    <MenuList menuItems={FooterMenus["Company"]}>Company</MenuList>
                    <MenuList menuItems={FooterMenus["Resources"]}>Resources</MenuList>
                    <MenuList menuItems={FooterMenus["Social"]}>Social</MenuList>
                    <MenuList menuItems={FooterMenus["Legal"]}>Legal</MenuList>
                </div>
            </div>
            <div className="bg-white w-full">
                <div className='mx-auto w-full max-w-screen-xl flex sm:items-center sm:justify-between py-6 lg:py-8 px-4 flex-col-reverse sm:flex-row xl:px-0'>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-4 sm:mt-0">&copy; 2023 <Link href="/frontend" className="hover:underline">Frontend UI</Link>. All Rights Reserved. Made by <Link href="https://github.com/AVDiv" className="hover:underline" target='_'>AVDiv</Link>.</span>
                    <div className="flex space-x-6 sm:justify-center">
                        {SocialHandles.map((menu, index: number) => {
                            return <SocialIcon key={index} {...menu}/>
                        })}
                    </div>
                </div>
            </div>
        </footer>
        )
    }
}
