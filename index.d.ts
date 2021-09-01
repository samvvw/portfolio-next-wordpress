declare namespace WPAPI {
    interface Variables {
        variables?: {
            [variable: string]: string;
        };
    }

    interface ParamsSlug {
        node: { slug: string };
    }

    interface GeneralSettingsProps {
        title: string;
        description: string;
    }

    interface HomeProps {
        generalSettings: GeneralSettingsProps;
        homeProjects: SingleProject[];
        authorBio: AuthorBioProps;
        allSkills: SkillsProps;
        mainMenu: MenuProps;
        socialMenu: MenuProps;
        skillsMenu: MenuProps;
    }

    interface HeaderProps {
        mainMenu: MenuProps;
        socialMenu: MenuProps;
        isHome?: boolean;
        generalSettings: GeneralSettingsProps;
    }

    interface MenuProps {
        node: {
            name: string;
            slug: string;
            menuItems: {
                edges: [
                    {
                        node: {
                            order: number;
                            label: string;
                            path: string;
                            target: string | undefined;
                        };
                    }
                ];
            };
        };
    }

    interface AuthorBioProps {
        authorBios: {
            bio: string;
            authorsName: string;
            authorTagline: string;
            authorPic: {
                sourceUrl: string;
            };
        };
        title: string;
        excerpt: string;
    }

    interface HomeProjectsProps {
        homeProjects: SingleProject[];
    }

    interface SkillsProps {
        allSkills: [
            {
                node: {
                    path: string;
                    label: string;
                };
            }
        ];
    }

    interface CategoryProps {
        generalSettings: GeneralSettingsProps;
        categoryData: SingleProject[];
        categoryName: string;
        mainMenu: MenuProps;
        socialMenu: MenuProps;
    }

    interface Params {
        params: {
            [param: string]: string;
        };
    }

    interface ProjectData {
        portfolioProject: {
            title: string;
            featuredImage: {
                node: {
                    sourceUrl: string;
                };
            };
            projectFields: {
                fieldGroupName: string;
                linkToLiveSite: string;
                projectDescription: string;
                projectName: string;
                repoLink: string;
            };
            tags: {
                edges: [
                    {
                        node: {
                            tagId: string;
                            name: string;
                            slug: string;
                        };
                    }
                ];
            };
        };
    }

    interface SingleProject {
        node: {
            slug: string;
            tags?: {
                edges: [
                    {
                        node: {
                            name: string;
                            slug: string;
                        };
                    }
                ];
            };
            title: string;
            featuredImage: {
                node: { sourceUrl: string };
            };
            projectFields: {
                linkToLiveSite: string;
                projectDescription: string;
                projectName: string;
                repoLink: string;
            };
        };
    }

    interface SkillProps {
        generalSettings: GeneralSettingsProps;
        projectsData: SingleProject[];
        skillName: string;
        mainMenu: MenuProps;
        socialMenu: MenuProps;
    }
}
