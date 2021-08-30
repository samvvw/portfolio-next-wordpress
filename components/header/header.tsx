import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import style from './header.module.scss';
import LogoHome from './logoHome';
import { setThemeColors } from '../utils/themeSelector';

export function Header({
    generalSettings,
    mainMenu,
    socialMenu,
    isHome,
}: WPAPI.HeaderProps): JSX.Element {
    const [drawerState, setDrawerState] = useState<string | null>(null);
    const [theme, setTheme] = useState<string | null>(null);

    function changeTheme() {
        if (theme === null) {
            setTheme('dark');
        } else if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem('theme-mode')) {
            setTheme(sessionStorage.getItem('theme-mode'));
        } else {
            setTheme('dark');
        }
    }, []);

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

    useEffect(() => {
        if (theme !== null) {
            setThemeColors(theme);
            sessionStorage.setItem('theme-mode', theme);
        }
    }, [theme]);

    function handleDrawer() {
        return drawerState === null || drawerState === style.menuClose
            ? setDrawerState(style.menuOpen)
            : setDrawerState(style.menuClose);
    }

    return (
        <header className={style.outerHeader}>
            <div className={style.headerWrapper}>
                <LogoHome
                    isHome={isHome}
                    style={style}
                    generalSettings={generalSettings}
                    theme={theme}
                />

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
                    <div className={style.closeWrapper}>
                        <FontAwesomeIcon
                            icon={['fas', 'times']}
                            onClick={handleDrawer}
                            className={style.closeButton}
                        />
                    </div>
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
                            <li onClick={changeTheme}>
                                {theme !== 'light' ? (
                                    <FontAwesomeIcon
                                        icon={['fas', 'sun']}
                                        size="2x"
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={['fas', 'moon']}
                                        size="2x"
                                    />
                                )}
                            </li>
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
