import {
    getGeneralSettings,
    getAllProjectsSlugs,
    getProjectData,
    getAllMenus,
} from '../../lib/api-wp';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Layout } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from '../../components/homeProjects/homeProjects.module.scss';
import { ParsedUrlQuery } from 'querystring';

export default function Project({
    generalSettings,
    projectData: {
        portfolioProject: {
            title,
            featuredImage: {
                node: { sourceUrl },
            },
            projectFields: { linkToLiveSite, projectDescription, repoLink },
            tags,
        },
    },
    mainMenu,
    socialMenu,
}: {
    generalSettings: WPAPI.GeneralSettingsProps;
    projectData: WPAPI.ProjectData;
    mainMenu: WPAPI.MenuProps;
    socialMenu: WPAPI.MenuProps;
}): JSX.Element {
    return (
        <Layout
            generalSettings={generalSettings}
            mainMenu={mainMenu}
            socialMenu={socialMenu}
            title={`${title} | Portfolio Sam Villegas`}
        >
            <section className={style.projectsSectionWrapper}>
                <article className={style.portfolioProject}>
                    <div className={style.projectDescription}>
                        <div className={style.projectName}>
                            <h3>{title}</h3>
                        </div>
                        <p>{projectDescription}</p>
                        <div className={style.projectLinks}>
                            <a href={repoLink} target="_blank" rel="noreferrer">
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
                        {tags.edges.map(({ node: { name, slug } }) => {
                            return (
                                <Link key={slug} href={`/skill/${slug}`}>
                                    <a>{name}</a>
                                </Link>
                            );
                        })}
                    </div>

                    <hr />
                </article>
            </section>
        </Layout>
    );
}

export const getStaticPaths: GetStaticPaths = async function getStaticPaths() {
    const paths = await getAllProjectsSlugs();

    return {
        paths,
        fallback: false,
    };
};

interface Params extends ParsedUrlQuery {
    [param: string]: string;
}

export const getStaticProps: GetStaticProps = async function (context) {
    const params = context.params as Params;
    const generalSettings = await getGeneralSettings();
    const projectData = await getProjectData(params.project);
    const { mainMenu, socialMenu } = await getAllMenus();

    return {
        props: {
            generalSettings,
            projectData,
            mainMenu,
            socialMenu,
        },
    };
};
