declare namespace WPAPI {
    interface Variables {
        variables?: {
            [variable: string]: string;
        };
    }

    interface ParamsSlug {
        node: { slug: string };
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
                            target: null | string;
                        };
                    }
                ];
            };
        };
    }

    interface AuthorBioProps {
        authorBios: {
            authorsName: string;
            authorTagLine: string;
            authorPic: {
                sourceUrl: string;
            };
        };
        excerpt: string;
    }

    interface HomeProjectsProps {
        homeProjects: [
            {
                node: {
                    title: string;
                    slug: string;
                    featuredImage: {
                        node: {
                            sourceUrl: string;
                        };
                    };
                    projectFields: {
                        projectDescription: string;
                        linkToLiveSite: string;
                        repoLink: string;
                    };
                };
            }
        ];
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
        categoryData: WPAPI.SingleProject[];
        categoryName: string;
        mainMenu: WPAPI.MenuProps;
        socialMenu: WPAPI.MenuProps;
    }

    interface Params {
        params: {
            [param: string]: string;
        };
    }

    interface ProjectData {
        projectData: {
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
            };
        };
    }

    interface SingleProject {
        node: {
            slug: string;
            tags?: [
                {
                    node: {
                        name: string;
                    };
                }
            ];
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
        projectsData: SingleProject[];
        skillName: string;
        mainMenu: MenuProps;
        socialMenu: MenuProps;
    }

    interface HomeProps {
        homeProjects: HomeProjectsProps;
        authorBio: AuthorBioProps;
        allSkills: SkillsProps;
        mainMenu: MenuProps;
        socialMenu: MenuProps;
        skillsMenu: MenuProps;
    }

    interface HeaderProps {
        mainMenu: MenuProps;
        socialMenu: MenuProps;
    }
}
