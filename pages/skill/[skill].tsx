import {
    getGeneralSettings,
    getAllSkillsSlugs,
    getProjectsBySkill,
    getAllMenus,
} from '../../lib/api-wp';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import { HomeProjects, Layout } from '../../components';

export default function Skill({
    generalSettings,
    projectsData,
    skillName,
    mainMenu,
    socialMenu,
}: WPAPI.SkillProps): JSX.Element {
    return (
        <Layout
            generalSettings={generalSettings}
            mainMenu={mainMenu}
            socialMenu={socialMenu}
            title={'Skills | Portfolio Sam Villegas'}
        >
            <div>
                <h1>
                    Skill page:{' '}
                    {((skillName) => {
                        return (
                            skillName.charAt(0).toUpperCase() +
                            skillName.slice(1)
                        );
                    })(skillName)}
                </h1>
                <Link href="/">
                    <a>Back to home...</a>
                </Link>
                <HomeProjects homeProjects={projectsData} />
            </div>
        </Layout>
    );
}

export const getStaticPaths: GetStaticPaths = async function () {
    const paths = await getAllSkillsSlugs();

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async function ({
    params,
}: WPAPI.Params): Promise<{
    props: WPAPI.SkillProps;
}> {
    const generalSettings = await getGeneralSettings();
    const projectsData = await getProjectsBySkill(params.skill);
    const { mainMenu, socialMenu } = await getAllMenus();

    return {
        props: {
            generalSettings,
            projectsData,
            skillName: params.skill,
            mainMenu,
            socialMenu,
        },
    };
};
