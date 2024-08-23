import React from 'react';
import Link from "next/link";
import { BiBug } from "react-icons/bi";

const NavBar = () => {
    const links = [
        {href: '/dashboard', label: 'Dashboard'},
        {href: '/issues', label: 'Issues'}
    ]
    return (
        <nav className={'flex space-x-7 border-b h-14 items-center px-5 mb-5'}>
            <Link href={'/'}><BiBug /></Link>
            <ul className={'flex space-x-7'}>
                {links.map(link =>
                    <Link
                        className={'text-zinc-500 hover:text-zinc-800 transition-colors'}
                        key={link.href}
                        href={link.href}>{link.label}</Link>)}
            </ul>
        </nav>
    );
};

export default NavBar;