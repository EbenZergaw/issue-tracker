'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {AiFillBug} from 'react-icons/ai'
import classnames from 'classnames'

const NavBar = () => {

    const currentPath = usePathname()

    const links = [
        {label : 'Dashboard', href: '/'},
        {label : 'Issues', href: '/issues'},
    ]
  return (
    <nav className='flex space-x-6 mb-5 px-5 h-14 items-center bg-[#251340]'>
        <Link className='text-purple-400' href='/'><AiFillBug/></Link>
        <ul className='flex space-x-6'>
            {links.map((link) => (
                <li><Link key={link.href} 
                className={classnames({
                    'text-purple-500' : link.href === currentPath,
                    'text-zinc-300' : link.href !== currentPath,
                    'hover:text-purple-800 transition-colors' : true
                })} href={link.href}>{link.label}
                </Link>
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default NavBar