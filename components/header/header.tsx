import Link from 'next/link';

export interface MenuProps {
    node: {
        name: string;
        slug: string;
        menuItems: {
            edges: [
                {
                    node: {
                        order: number;
                        label: string;
                        path: string;
                        target: null | string;
                    };
                }
            ];
        };
    };
}

interface HeaderProps {
    mainMenu: MenuProps;
    socialMenu: MenuProps;
}

export function Header({ mainMenu, socialMenu }: HeaderProps) {
    return (
        <header>
            <div className="logo-wrapper"></div>
            <div className="main-menu-wrapper">
                <ul>
                    {mainMenu.node.menuItems.edges.map(
                        ({ node: { order, label, path } }) => {
                            return (
                                <li key={order}>
                                    <Link href={path}>
                                        <a>{label}</a>
                                    </Link>
                                </li>
                            );
                        }
                    )}
                </ul>
            </div>
            <div className="social-menu-wrapper">
                <ul>
                    {socialMenu.node.menuItems.edges.map(
                        ({ node: { order, label, path } }) => {
                            return (
                                <li key={order}>
                                    <a href={path}>{label}</a>
                                </li>
                            );
                        }
                    )}
                </ul>
            </div>
        </header>
    );
}
