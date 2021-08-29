import {
    getGeneralSettings,
    getCategories,
    getProjectsByCategory,
    getAllMenus,
} from '../../lib/api-wp';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Layout, HomeProjects } from '../../components';

export default function Category({
    generalSettings,
    categoryData,
    categoryName,
    mainMenu,
    socialMenu,
}: WPAPI.CategoryProps): JSX.Element {
    return (
        <Layout
            generalSettings={generalSettings}
            mainMenu={mainMenu}
            socialMenu={socialMenu}
            title={`${((categoryName) => {
                return (
                    categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
                );
            })(categoryName)} | Portfolio Sam Villegas`}
        >
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
                <HomeProjects homeProjects={categoryData} />
            </div>
            <Link href="/">
                <a>Back to home...</a>
            </Link>
        </Layout>
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
    const generalSettings = await getGeneralSettings();
    const categoryData = await getProjectsByCategory(params.category);
    const { mainMenu, socialMenu } = await getAllMenus();

    return {
        props: {
            generalSettings,
            categoryData,
            categoryName: params.category,
            mainMenu,
            socialMenu,
        },
    };
};
