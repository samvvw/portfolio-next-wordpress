import Image from 'next/image';
import Link from 'next/link';

export interface HomeProjectsProps {
    homeProjects: [
        {
            node: {
                title: string;
                slug: string;
                featuredImage: {
                    node: {
                        sourceUrl: string;
                    };
                };
                projectFields: {
                    projectDescription: string;
                    linkToLiveSite: string;
                    repoLink: string;
                };
            };
        }
    ];
}

export default function HomeProjects({ homeProjects }) {
    return (
        <section>
            <ul>
                {homeProjects.map(
                    ({
                        node: {
                            title,
                            slug,
                            featuredImage: {
                                node: { sourceUrl },
                            },
                            projectFields: {
                                projectDescription,
                                linkToLiveSite,
                                repoLink,
                            },
                        },
                    }) => (
                        <li key={slug} id={slug}>
                            <h2>{title}</h2>

                            <div
                                style={{
                                    position: 'relative',
                                    height: '22vh',
                                    width: '400px',
                                }}
                            >
                                <Image
                                    src={sourceUrl}
                                    layout="fill"
                                    objectFit={'cover'}
                                    objectPosition={'top left'}
                                />
                            </div>
                            <p>{projectDescription}</p>
                            <b>{slug}</b>
                            <a href={linkToLiveSite} target="_blank">
                                {linkToLiveSite}
                            </a>
                            <a href={repoLink} target="_blank">
                                {repoLink}
                            </a>
                            <div>
                                <Link href={`/projects/${slug}`}>
                                    <a>{slug}</a>
                                </Link>
                            </div>
                        </li>
                    )
                )}
            </ul>
        </section>
    );
}
