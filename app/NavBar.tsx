'use client';
import React from 'react';
import Link from "next/link";
import { BiBug } from "react-icons/bi";
import {usePathname} from "next/navigation";
import classNames from "classnames";

const NavBar = () => {
    const currentPath = usePathname();
    console.log(currentPath);

    const links = [
        {href: '/', label: 'Dashboard'},
        {href: '/issues', label: 'Issues'}
    ]
    return (
        <nav className={'flex space-x-7 border-b h-14 items-center px-5 mb-5'}>
            <Link href={'/'}><BiBug /></Link>
            <ul className={'flex space-x-7'}>
                {links.map(link =>
                    <Link
                        // className={'text-zinc-500 hover:text-zinc-800 transition-colors'}
                        className={classNames(
                            'text-zinc-900', link.href === currentPath,
                            'text-zinc-500', link.href !== currentPath,
                            'hover:text-zinc-800 transition-colors', true,
                        )}
                        key={link.href}
                        href={link.href}>{link.label}</Link>)}
            </ul>
        </nav>
    );
};

export default NavBar;