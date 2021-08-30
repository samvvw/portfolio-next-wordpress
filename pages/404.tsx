import { GetStaticProps } from 'next';
import Link from 'next/link';
import { Layout } from '../components/';
import { getGeneralSettings, getAllMenus } from '../lib/api-wp';

export default function Home({
    generalSettings,

    mainMenu,
    socialMenu,
}: WPAPI.HomeProps): JSX.Element {
    return (
        <Layout
            mainMenu={mainMenu}
            socialMenu={socialMenu}
            title={'404 | Portfolio Sam Villegas'}
            generalSettings={generalSettings}
        >
            <div
                style={{
                    height: '30vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '2rem',
                    flexDirection: 'column',
                }}
            >
                <div>
                    <h2>
                        404 <span style={{ color: 'gray' }}> | </span> Page not
                        found
                    </h2>
                    <hr />
                </div>
                <div>
                    <Link href="/">
                        <a>Back to home...</a>
                    </Link>
                </div>
            </div>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async function () {
    const generalSettings = await getGeneralSettings();
    const { mainMenu, socialMenu } = await getAllMenus();

    return {
        props: {
            generalSettings,
            mainMenu,
            socialMenu,
        },
    };
};
