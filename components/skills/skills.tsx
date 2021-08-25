import Link from 'next/link';

export function Skills({ allSkills }): JSX.Element {
    return (
        <section>
            <ul>
                {allSkills.map(({ node: { path, label } }) => {
                    return (
                        <li key={path}>
                            <Link href={`${path}`}>
                                <a>{label}</a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
