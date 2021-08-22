import Link from 'next/link';

export interface SkillsProps {
    allSkills: [
        {
            node: {
                slug: string;
                name: string;
            };
        }
    ];
}

export default function Skills({ allSkills }) {
    return (
        <section>
            <ul>
                {allSkills.map(({ node: { slug, name } }) => {
                    return (
                        <li key={slug}>
                            <Link href={`/skills/${slug}`}>
                                <a>{name}</a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
