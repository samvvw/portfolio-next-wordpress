import style from './homeProjects.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function HomeProjects({
    homeProjects,
}: WPAPI.HomeProjectsProps): JSX.Element {
    return (
        <section className={style.projectsSectionWrapper}>
            <h2>My Projects</h2>

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
                        tags,
                    },
                }) => (
                    <article
                        key={slug}
                        id={slug}
                        className={style.portfolioProject}
                    >
                        <div className={style.projectDescription}>
                            <div className={style.projectName}>
                                <h3>
                                    <Link href={`/projects/${slug}`}>
                                        <a>{title}</a>
                                    </Link>
                                </h3>
                            </div>
                            <p>{projectDescription}</p>
                            <div className={style.projectLinks}>
                                <a
                                    href={repoLink}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <span className="visually-hidden">
                                        Link to repo
                                    </span>
                                    <FontAwesomeIcon icon={['fab', 'github']} />
                                </a>
                                <a
                                    href={linkToLiveSite}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <span className="visually-hidden">
                                        Link to live site
                                    </span>
                                    <FontAwesomeIcon
                                        icon={['fas', 'window-maximize']}
                                    />
                                </a>
                            </div>
                        </div>
                        <div className={style.entryThumbnail}>
                            <Image
                                src={sourceUrl}
                                // layout="fill"
                                height={300}
                                width={380}
                                objectFit={'cover'}
                                objectPosition={'top left'}
                                alt={title}
                            />
                        </div>
                        <div className={style.projectTags}>
                            {tags?.edges.map(({ node: { name, slug } }) => {
                                return (
                                    <Link key={slug} href={`/skill/${slug}`}>
                                        <a>{name}</a>
                                    </Link>
                                );
                            })}
                        </div>

                        <hr />
                    </article>
                )
            )}
        </section>
    );
}
