import { getAllSkillsSlugs, getProjectsBySkill } from '../../lib/api-wp';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';

interface SkillProps {
    projectsData: [
        {
            node: {
                slug: string;
                tags: string[];
                title: string;
                featuredImage: {
                    node: { sourceUrl: string };
                };
                projectFields: {
                    linkToLiveSite: string;
                    projectDescription: string;
                    projectName: string;
                    repoLink: string;
                };
            };
        }
    ];
    skillName: string;
}

interface Params {
    params: {
        [param: string]: string;
    };
}

export default function Skill({
    projectsData,
    skillName,
}: SkillProps): JSX.Element {
    return (
        <>
            <div>
                <h1>
                    Skill page:{' '}
                    {((skillName) => {
                        return (
                            skillName.charAt(0).toUpperCase() +
                            skillName.slice(1)
                        );
                    })(skillName)}
                </h1>
                <Link href="/">
                    <a>Back to home...</a>
                </Link>
                <section>
                    {projectsData.map(
                        ({
                            node: {
                                slug,
                                tags,
                                title,
                                featuredImage: {
                                    node: { sourceUrl },
                                },
                                projectFields: {
                                    linkToLiveSite,
                                    projectDescription,
                                    projectName,
                                    repoLink,
                                },
                            },
                        }) => {
                            return (
                                <article key={slug}>
                                    <h2>{title}</h2>
                                    <Image
                                        src={sourceUrl}
                                        width={300}
                                        height={250}
                                        objectFit={'cover'}
                                        objectPosition={'top center'}
                                    />
                                    <div>
                                        <p>{projectDescription}</p>
                                        <a
                                            href={linkToLiveSite}
                                            target="_blank"
                                        >
                                            Link to LiveSite
                                        </a>
                                        <a href={repoLink} target="_blank">
                                            Repo Link
                                        </a>
                                    </div>
                                </article>
                            );
                        }
                    )}
                </section>
            </div>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async function () {
    const paths = await getAllSkillsSlugs();

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async function ({
    params,
}: Params) {
    const projectsData = await getProjectsBySkill(params.skill);

    return {
        props: {
            projectsData,
            skillName: params.skill,
        },
    };
};
