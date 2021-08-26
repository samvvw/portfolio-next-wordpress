import {
    getAllProjectsSlugs,
    getProjectData,
    getAllMenus,
} from '../../lib/api-wp';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Layout } from '../../components';

export default function Project({
    projectData: {
        portfolioProject: {
            title,
            featuredImage: {
                node: { sourceUrl },
            },
            projectFields: { linkToLiveSite, projectDescription, repoLink },
            tags: { edges },
        },
    },
    mainMenu,
    socialMenu,
}: {
    projectData: WPAPI.ProjectData;
    mainMenu: WPAPI.MenuProps;
    socialMenu: WPAPI.MenuProps;
}): JSX.Element {
    return (
        <Layout
            mainMenu={mainMenu}
            socialMenu={socialMenu}
            title={`${title} | Portfolio Sam Villegas`}
        >
            <div>
                <h1>{title}</h1>
                <Image
                    src={sourceUrl}
                    width={400}
                    height={300}
                    objectFit={'cover'}
                    alt={title}
                />

                <a href={linkToLiveSite} target={'_blank'} rel="noreferrer">
                    linkToLiveSite
                </a>

                <a href={repoLink} target={'_blank'} rel="noreferrer">
                    repoLink
                </a>

                <p>{projectDescription}</p>
                <ul>
                    {edges.map(({ node: { tagId, name, slug } }) => {
                        return (
                            <li key={tagId}>
                                <Link href={`/skill/${slug}`}>
                                    <a>{name}</a>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <Link href="/">
                    <a>Back to home...</a>
                </Link>
            </div>
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

export const getStaticProps: GetStaticProps = async function ({
    params,
}: WPAPI.Params): Promise<{
    props: {
        projectData: WPAPI.ProjectData;
        mainMenu: WPAPI.MenuProps;
        socialMenu: WPAPI.MenuProps;
    };
}> {
    const projectData = await getProjectData(params.project);
    const { mainMenu, socialMenu } = await getAllMenus();

    return {
        props: {
            projectData,
            mainMenu,
            socialMenu,
        },
    };
};
