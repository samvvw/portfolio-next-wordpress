import {
    getAllSkillsSlugs,
    getProjectsBySkill,
    getAllMenus,
} from '../../lib/api-wp';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Layout } from '../../components';

export default function Skill({
    projectsData,
    skillName,
    mainMenu,
    socialMenu,
}: WPAPI.SkillProps): JSX.Element {
    return (
        <Layout
            mainMenu={mainMenu}
            socialMenu={socialMenu}
            title={'Skills | Portfolio Sam Villegas'}
        >
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
                                title,
                                featuredImage: {
                                    node: { sourceUrl },
                                },
                                projectFields: {
                                    linkToLiveSite,
                                    projectDescription,
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
                                        alt={title}
                                    />
                                    <div>
                                        <p>{projectDescription}</p>
                                        <a
                                            href={linkToLiveSite}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Link to LiveSite
                                        </a>
                                        <a
                                            href={repoLink}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Repo Link
                                        </a>
                                    </div>
                                </article>
                            );
                        }
                    )}
                </section>
            </div>
        </Layout>
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
}: WPAPI.Params): Promise<{
    props: WPAPI.SkillProps;
}> {
    const projectsData = await getProjectsBySkill(params.skill);
    const { mainMenu, socialMenu } = await getAllMenus();

    return {
        props: {
            projectsData,
            skillName: params.skill,
            mainMenu,
            socialMenu,
        },
    };
};
