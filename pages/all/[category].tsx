import {
    getCategories,
    getProjectsByCategory,
    getAllMenus,
} from '../../lib/api-wp';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '../../components';

export default function Category({
    categoryData,
    categoryName,
    mainMenu,
    socialMenu,
}: WPAPI.CategoryProps): JSX.Element {
    return (
        <>
            <Header mainMenu={mainMenu} socialMenu={socialMenu} />
            <div>
                Category:{' '}
                {((categoryName) => {
                    return (
                        categoryName.charAt(0).toUpperCase() +
                        categoryName.slice(1)
                    );
                })(categoryName)}
            </div>
            <div>
                {categoryData.map(
                    ({
                        node: {
                            slug,
                            title,
                            projectFields: {
                                linkToLiveSite,
                                projectDescription,
                                repoLink,
                            },
                            featuredImage: {
                                node: { sourceUrl },
                            },
                        },
                    }) => {
                        return (
                            <div key={slug}>
                                <h2>{title}</h2>
                                <Image
                                    src={sourceUrl}
                                    width={380}
                                    height={250}
                                    objectFit={'contain'}
                                    objectPosition={'top center'}
                                    alt={title}
                                />
                                <p>{projectDescription}</p>
                                <a href={repoLink}> repo link</a>
                                <a href={linkToLiveSite}>link to live site</a>
                            </div>
                        );
                    }
                )}
            </div>
            <Link href="/">
                <a>Back to home...</a>
            </Link>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async function () {
    const paths = await getCategories();

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async function ({
    params,
}: WPAPI.Params): Promise<{
    props: WPAPI.CategoryProps;
}> {
    const categoryData = await getProjectsByCategory(params.category);
    const { mainMenu, socialMenu } = await getAllMenus();

    return {
        props: {
            categoryData,
            categoryName: params.category,
            mainMenu,
            socialMenu,
        },
    };
};
