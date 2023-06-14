import React from 'react'
import Image from 'next/image'
import Logo from '../public/logo.png'
import { HiMenu } from 'react-icons/hi'
import { MdClose } from 'react-icons/md'
import { ToggleButton } from './Buttons/ToggleButton'
import { NavbarMenuItem } from './NavbarItems/NavbarMenuItem'
import { NavbarDropdownMenuItem } from './NavbarItems/NavbarDropdownMenuItem'
import { DropdownMenus } from './NavbarItems/DropdownMenus'

export class Navbar extends React.Component<{}, {isMenuOpen: boolean, DropdownMenus: any}>{
    constructor(props: any) {
        super(props);
        this.state = {
            isMenuOpen: false,
            DropdownMenus: DropdownMenus,
        }
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState({
          isMenuOpen: !this.state.isMenuOpen,
        });
    }

    render() {
        return (
            <nav className="fixed bg-white shadow-sm shadow-slate-200 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <div className='flex items-center'>
                                    <Image
                                        className="block h-6 w-auto"
                                        src={Logo}
                                        alt="Workflow"
                                        width={24}
                                        height={24}
                                    />
                                    <span className='ml-3 text-lg font-medium'>Frontend UI</span>
                                </div>
                                <div className="hidden md:block ml-6">
                                    <div className="flex space-x-2 relative">
                                        <NavbarMenuItem href="/frontend">Home</NavbarMenuItem>
                                        <NavbarDropdownMenuItem menus={this.state.DropdownMenus.Products}>Products</NavbarDropdownMenuItem>
                                        <NavbarDropdownMenuItem menus={this.state.DropdownMenus.Resources}>Resources</NavbarDropdownMenuItem>
                                        <NavbarMenuItem href="/frontend/pricing">Pricing</NavbarMenuItem>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="-mr-2 flex items-center md:hidden">
                        <button className="p-2 rounded-md text-gray-600 hover:text-gray-800" onClick={this.toggleMenu} aria-label="Toggle menu">
                            <HiMenu className="h-6 w-6" />
                        </button>
                        {this.state.isMenuOpen && (
                            <div className="flex md:hidden w-screen h-screen absolute left-0 top-0 text-lg bg-white flex-col">
                                <div className='flex mx-5 my-3 justify-between'>
                                    <div className='flex items-center'>
                                        <Image
                                            className="block h-9 w-auto"
                                            src={Logo}
                                            alt="Logo"
                                        />
                                        <span className='ml-3 text-3xl font-medium'>Frontend UI</span>
                                    </div>
                                    <div>
                                        <button className="p-2 rounded-md text-gray-600 hover:text-gray-800" onClick={this.toggleMenu} aria-label="Toggle menu">
                                            <MdClose className="h-9 w-9" />
                                        </button>
                                    </div>
                                </div>
                                <div className="px-2 pt-2 pb-3 space-y-4 md:space-y-0 sm:px-3">
                                    <NavbarMenuItem href="/frontend">Home</NavbarMenuItem>
                                    <NavbarDropdownMenuItem menus={this.state.DropdownMenus.Products}>Products</NavbarDropdownMenuItem>
                                    <NavbarDropdownMenuItem menus={this.state.DropdownMenus.Resources}>Resources</NavbarDropdownMenuItem>
                                    <NavbarMenuItem href="/frontend/pricing">Pricing</NavbarMenuItem>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Mobile menu */}
            </nav>
        )
    }
}