import { GetStaticProps } from 'next';
import { AuthorBio, HomeProjects, Skills, Layout } from '../components/';
import {
    getGeneralSettings,
    getAllHomeProjects,
    getAuthorBio,
    getAllSkills,
    getAllMenus,
} from '../lib/api-wp';

export default function Home({
    generalSettings,
    homeProjects,
    authorBio,
    mainMenu,
    socialMenu,
    skillsMenu,
}: WPAPI.HomeProps): JSX.Element {
    // console.log(document);
    return (
        <Layout
            mainMenu={mainMenu}
            socialMenu={socialMenu}
            title={'Portfolio Sam Villegas'}
            isHome
            generalSettings={generalSettings}
        >
            <h1>Portfolio Website</h1>

            <AuthorBio {...authorBio} />
            <Skills allSkills={skillsMenu.node.menuItems.edges} />
            <HomeProjects homeProjects={homeProjects} />
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async function () {
    const generalSettings = await getGeneralSettings();
    const homeProjects = await getAllHomeProjects();
    const authorBio = await getAuthorBio();
    const allSkills = await getAllSkills();
    const { mainMenu, socialMenu, skillsMenu } = await getAllMenus();

    return {
        props: {
            generalSettings,
            homeProjects,
            authorBio,
            allSkills,
            mainMenu,
            socialMenu,
            skillsMenu,
        },
    };
};
