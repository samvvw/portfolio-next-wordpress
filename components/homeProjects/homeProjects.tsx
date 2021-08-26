import Image from 'next/image';
import Link from 'next/link';

export function HomeProjects({
    homeProjects,
}: WPAPI.HomeProjectsProps): JSX.Element {
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
                                    alt={title}
                                />
                            </div>
                            <div className="description-wrapper">
                                <p>{projectDescription}</p>
                            </div>
                            <div className="links-wrapper">
                                <a
                                    href={linkToLiveSite}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    linkTo LiveSite
                                </a>
                                <a
                                    href={repoLink}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    repo Link
                                </a>
                            </div>

                            <Link href={`/projects/${slug}`}>
                                <a>{slug}</a>
                            </Link>
                        </li>
                    )
                )}
            </ul>
        </section>
    );
}
