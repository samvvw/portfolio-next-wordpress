import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import style from './header.module.scss';

export function Header({
    mainMenu,
    socialMenu,
}: WPAPI.HeaderProps): JSX.Element {
    const [drawerState, setDrawerState] = useState<string | null>(null);
    useEffect(() => {
        function updateWindow() {
            if (window.innerWidth > 700) {
                setDrawerState(null);
            }
        }
        window.addEventListener('resize', updateWindow);
        return () => {
            window.removeEventListener('resize', updateWindow);
        };
    }, []);

    function handleDrawer() {
        return drawerState === null || drawerState === style.menuClose
            ? setDrawerState(style.menuOpen)
            : setDrawerState(style.menuClose);
    }

    return (
        <header className={style.outerHeader}>
            <div className={style.headerWrapper}>
                <div className={style.logosWrapper}>
                    <span className={style.overLine}></span>
                </div>
                <div className={style.hamburgerMenu}>
                    <FontAwesomeIcon
                        icon={['fas', 'bars']}
                        onClick={handleDrawer}
                    />
                </div>
                <div
                    className={`${style.mainMenuWrapper} ${
                        drawerState ? drawerState : ''
                    }`}
                >
                    <FontAwesomeIcon
                        icon={['fas', 'times']}
                        onClick={handleDrawer}
                        className={style.closeButton}
                    />
                    <nav className={style.menuMainContainer}>
                        <ul className="main-menu">
                            {mainMenu.node.menuItems.edges.map(
                                ({ node: { order, label, path } }) => {
                                    return (
                                        <li key={order}>
                                            <Link href={path}>
                                                <a>
                                                    {label}
                                                    <hr />
                                                </a>
                                            </Link>
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                    </nav>
                    <div className={`menu-container ${style.headerSocialMenu}`}>
                        <ul className="social-menu">
                            {socialMenu.node.menuItems.edges.map(
                                ({ node: { order, label, path, target } }) => {
                                    return (
                                        <li key={order}>
                                            <a
                                                href={path}
                                                target={target}
                                                rel={target ? 'noreferrer' : ''}
                                            >
                                                <span className="visually-hidden">
                                                    {label}
                                                </span>
                                                <FontAwesomeIcon
                                                    icon={[
                                                        'fab',
                                                        label.toLocaleLowerCase() as IconName,
                                                    ]}
                                                    size="2x"
                                                />
                                            </a>
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}
