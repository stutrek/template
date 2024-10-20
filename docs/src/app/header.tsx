import React from 'react';
import navStyles from './nav.module.scss';
import Link from 'next/link';

type HeaderProps = {
    showLogo?: boolean;
};

export function Header({ showLogo = true }: HeaderProps) {
    return (
        <header className="p-4y border-b border-gray-300">
            <div className="container max-w-3xl mx-auto flex justify-between items-center whitespace-nowrap">
                <nav className={navStyles.header}>
                    <ul className="flex">
                        {showLogo ? (
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                        ) : null}
                        <li>
                            <button type="button">Menu Item</button>
                            <ul className="shadow-lg rounded-lg">
                                <li>
                                    <Link href="/docs">Popup Item</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <nav>
                    <a href="https://github.com/stutrek">GitHub</a>
                </nav>
            </div>
        </header>
    );
}
