const API_URL: string = process.env.WORDPRESS_API_URL as string;

async function apiRequest<T>(
    query: string,
    { variables }: WPAPI.Variables = {}
): Promise<T> {
    const headers: {
        [header: string]: string;
    } = {
        'Content-Type': 'application/json',
    };

    if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
        headers[
            'Authorization'
        ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
    }

    const response = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    const json: {
        data?: T;
        errors?: [];
    } = await response.json();
    if (json.errors) {
        console.log(json.errors);
        throw new Error('Failed to fetch API');
    }
    return json.data;
}

export async function getAllMenus(): Promise<{
    [menu: string]: WPAPI.MenuProps;
}> {
    const data: {
        menus: {
            edges: WPAPI.MenuProps[];
        };
    } = await apiRequest(/* GraphQL */ `
        query AllMenusQuery {
            menus {
                edges {
                    node {
                        name
                        slug
                        menuItems {
                            edges {
                                node {
                                    path
                                    order
                                    target
                                    label
                                }
                            }
                        }
                    }
                }
            }
        }
    `);

    let mainMenu: WPAPI.MenuProps;
    let socialMenu: WPAPI.MenuProps;
    let skillsMenu: WPAPI.MenuProps;

    data?.menus.edges.forEach((menu: WPAPI.MenuProps) => {
        switch (menu.node.slug) {
            case 'main-menu':
                mainMenu = menu;
                break;
            case 'social-media':
                socialMenu = menu;
                break;
            case 'skills-menu':
                skillsMenu = menu;
                break;
            default:
                break;
        }
    });

    return { mainMenu, socialMenu, skillsMenu };
}

export async function getAuthorBio(): Promise<WPAPI.AuthorBioProps> {
    const data: {
        authosBio: WPAPI.AuthorBioProps;
    } = await apiRequest(/* GraphQL */ `
        query AuthorBioQuery {
            authosBio(id: "authors-name", idType: SLUG) {
                date
                authorBios {
                    bio
                    authorsName
                    authorTagline
                    authorPic {
                        sourceUrl
                    }
                }
                title
                excerpt(format: RENDERED)
            }
        }
    `);
    return data?.authosBio;
}

export async function getAllSkills(): Promise<WPAPI.SkillsProps[]> {
    const data: {
        tags: {
            edges: WPAPI.SkillsProps[];
        };
    } = await apiRequest(/* GraphQL */ `
        query AllSkillsQuery {
            tags(first: 100) {
                edges {
                    node {
                        slug
                        name
                    }
                }
            }
        }
    `);
    return data?.tags.edges;
}

export async function getAllSkillsSlugs(): Promise<WPAPI.Params[]> {
    const data: {
        tags: {
            edges: [
                {
                    node: {
                        slug: string;
                        name: string;
                    };
                }
            ];
        };
    } = await apiRequest(/* GraphQL */ `
        query AllSkillsQuery {
            tags(first: 100) {
                edges {
                    node {
                        slug
                        name
                    }
                }
            }
        }
    `);
    return data?.tags.edges.map((project: WPAPI.ParamsSlug) => {
        return {
            params: {
                skill: project.node.slug,
            },
        };
    });
}

export async function getProjectsBySkill(
    skill: string
): Promise<WPAPI.SingleProject[]> {
    const data: {
        portfolioProjects: {
            edges: WPAPI.SingleProject[];
        };
    } = await apiRequest(
        /* GraphQL */ `
            query MyQuery($tag: String!) {
                portfolioProjects(where: { tag: $tag }) {
                    edges {
                        node {
                            slug
                            tags {
                                edges {
                                    node {
                                        name
                                    }
                                }
                            }
                            projectFields {
                                linkToLiveSite
                                projectDescription
                                projectName
                                repoLink
                            }
                            title
                            featuredImage {
                                node {
                                    sourceUrl
                                }
                            }
                        }
                    }
                }
            }
        `,
        {
            variables: {
                tag: skill,
            },
        }
    );

    return data?.portfolioProjects.edges;
}

export async function getCategories(): Promise<WPAPI.Params[]> {
    const data: {
        categories: {
            edges: [
                {
                    node: {
                        name: string;
                        slug: string;
                    };
                }
            ];
        };
    } = await apiRequest(/* GraphQL */ `
        query CategoriesQuery {
            categories {
                edges {
                    node {
                        name
                        slug
                    }
                }
            }
        }
    `);
    return data?.categories.edges.map((category: WPAPI.ParamsSlug) => {
        return {
            params: {
                category: category.node.slug,
            },
        };
    });
}

export async function getProjectsByCategory(
    categoryName: string
): Promise<WPAPI.SingleProject[]> {
    const data: {
        portfolioProjects: {
            edges: WPAPI.SingleProject[];
        };
    } = await apiRequest(
        /* GraphQL */ `
            query ProjectsByCategoryQuery($categoryName: String!) {
                portfolioProjects(where: { categoryName: $categoryName }) {
                    edges {
                        node {
                            slug
                            tags {
                                edges {
                                    node {
                                        name
                                    }
                                }
                            }
                            projectFields {
                                linkToLiveSite
                                projectDescription
                                projectName
                                repoLink
                            }
                            title
                            featuredImage {
                                node {
                                    sourceUrl
                                }
                            }
                        }
                    }
                }
            }
        `,
        {
            variables: {
                categoryName,
            },
        }
    );

    return data?.portfolioProjects.edges;
}

export async function getAllHomeProjects(): Promise<WPAPI.SingleProject[]> {
    const data: {
        portfolioProjects: {
            edges: WPAPI.SingleProject[];
        };
    } = await apiRequest(/* GraphQL */ `
        query AllProjectsQuery {
            portfolioProjects(
                first: 3
                where: { orderby: { field: SLUG, order: DESC } }
            ) {
                edges {
                    node {
                        slug
                        title
                        projectFields {
                            fieldGroupName
                            linkToLiveSite
                            projectDescription
                            projectName
                            repoLink
                        }
                        featuredImage {
                            node {
                                sourceUrl
                            }
                        }
                    }
                }
            }
        }
    `);
    return data?.portfolioProjects.edges;
}

export async function getAllProjects(): Promise<WPAPI.SingleProject[]> {
    const data: {
        portfolioProjects: {
            edges: WPAPI.SingleProject[];
        };
    } = await apiRequest(/* GraphQL */ `
        query AllProjectsQuery {
            portfolioProjects(
                first: 10
                where: { orderby: { field: SLUG, order: DESC } }
            ) {
                edges {
                    node {
                        slug
                        title
                        projectFields {
                            fieldGroupName
                            linkToLiveSite
                            projectDescription
                            projectName
                            repoLink
                        }
                        featuredImage {
                            node {
                                sourceUrl
                            }
                        }
                    }
                }
            }
        }
    `);
    return data?.portfolioProjects.edges;
}

export async function getAllProjectsSlugs(): Promise<WPAPI.Params[]> {
    const data: {
        portfolioProjects: { edges: WPAPI.ParamsSlug[] };
    } = await apiRequest(/* GraphQL */ `
        {
            portfolioProjects {
                edges {
                    node {
                        slug
                    }
                }
            }
        }
    `);

    return data?.portfolioProjects.edges.map((project: WPAPI.ParamsSlug) => {
        return {
            params: {
                project: project.node.slug,
            },
        };
    });
}

export async function getProjectData(slug: string): Promise<WPAPI.ProjectData> {
    const data: WPAPI.ProjectData = await apiRequest(
        /* GraphQL */ `
            query ProjectDataQuery(
                $id: ID!
                $idType: PortfolioProjectIdType = SLUG
            ) {
                portfolioProject(id: $id, idType: $idType) {
                    title
                    slug
                    projectFields {
                        fieldGroupName
                        linkToLiveSite
                        projectDescription
                        projectName
                        repoLink
                    }
                    tags {
                        edges {
                            node {
                                tagId
                                name
                            }
                        }
                    }
                    featuredImage {
                        node {
                            sourceUrl
                        }
                    }
                }
            }
        `,
        {
            variables: {
                id: slug,
            },
        }
    );
    return data;
}
