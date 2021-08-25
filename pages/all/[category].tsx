import {
    getCategories,
    getProjectsByCategory,
    getAllMenus,
} from '../../lib/api-wp';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { Header } from '../../components';

export default function Category({
    categoryData,
    categoryName,
    mainMenu,
    socialMenu,
}: WPAPI.CategoryProps): JSX.Element {
    console.log(categoryData);
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
