
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../public/logo.png'
import { HiMenu } from 'react-icons/hi'
import { ToggleButton } from './buttons/ToggleButton'

export const Navbar = () => {
    return (
        <nav className="bg-white dark:bg-black/80 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 relative">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Image
                                className="block h-8 w-auto"
                                src={Logo}
                                alt="Workflow"
                                width={32}
                                height={32}
                            />
                            <div className="hidden lg:block ml-2">
                                <div className="flex space-x-4">
                                    <Link href="/">
                                        <span className="text-gray-900 dark:text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                            Home
                                        </span>
                                    </Link>
                                    <Link href="/about">
                                        <span className="text-gray-900 dark:text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                            About
                                        </span>
                                    </Link>
                                    <Link href="/contact">
                                        <span className="text-gray-900 dark:text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                            Contact
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className='absolute right-0'>
                              <ToggleButton />
                            </div>
                        </div>
                    </div>
                    <div className="-mr-2 flex items-center lg:hidden">
                        {/* <MobileMenuButton /> */}
                    </div>
                </div>
            </div>
            {/* <MobileMenu /> */}
        </nav>
    )
};