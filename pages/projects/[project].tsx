import { getAllProjectsSlugs, getProjectData } from '../../lib/api-wp';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';

export default function Project({
    projectData: {
        portfolioProject: {
            title,
            featuredImage: {
                node: { sourceUrl },
            },
            projectFields: {
                fieldGroupName,
                linkToLiveSite,
                projectDescription,
                projectName,
                repoLink,
            },
        },
    },
}: WPAPI.ProjectData): JSX.Element {
    return (
        <div>
            <h1>{title}</h1>
            <Image
                src={sourceUrl}
                width={400}
                height={300}
                objectFit={'cover'}
            />

            <a href={linkToLiveSite} target={'_blank'}>
                linkToLiveSite
            </a>

            <a href={repoLink} target={'_blank'}>
                repoLink
            </a>

            <p>{projectDescription}</p>
            <Link href="/">
                <a>Back to home...</a>
            </Link>
        </div>
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
}: WPAPI.Params): Promise<{ props: { projectData: WPAPI.ProjectData } }> {
    const projectData = await getProjectData(params.project);

    return {
        props: {
            projectData,
        },
    };
};
