import { GetStaticProps } from 'next';
import { AuthorBio, HomeProjects, Skills, Layout } from '../components/';
import {
    getAllHomeProjects,
    getAuthorBio,
    getAllSkills,
    getAllMenus,
} from '../lib/api-wp';

export default function Home({
    homeProjects,
    authorBio,
    mainMenu,
    socialMenu,
    skillsMenu,
}: WPAPI.HomeProps): JSX.Element {
    return (
        <Layout
            mainMenu={mainMenu}
            socialMenu={socialMenu}
            title={'Portfolio Sam Villegas'}
        >
            <h1>Portfolio Website</h1>

            <AuthorBio {...authorBio} />
            <Skills allSkills={skillsMenu.node.menuItems.edges} />
            <HomeProjects homeProjects={homeProjects} />
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async function () {
    const homeProjects = await getAllHomeProjects();
    const authorBio = await getAuthorBio();
    const allSkills = await getAllSkills();
    const { mainMenu, socialMenu, skillsMenu } = await getAllMenus();

    return {
        props: {
            homeProjects,
            authorBio,
            allSkills,
            mainMenu,
            socialMenu,
            skillsMenu,
        },
    };
};
