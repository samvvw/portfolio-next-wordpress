import { GetStaticProps } from 'next';
import { Layout } from '../components';
import { ContactForm } from '../components/';
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
            title={'Contact me | Portfolio Sam Villegas'}
            generalSettings={generalSettings}
        >
            <ContactForm />
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
