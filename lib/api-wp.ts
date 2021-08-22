const API_URL = process.env.WORDPRESS_API_URL;

interface Variables {
    variables?: {
        [variable: string]: string;
    };
}

interface ProjectSlug {
    node: { slug: string };
}

async function apiRequest(query: string, { variables }: Variables = {}) {
    const headers = {
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

    const json = await response.json();
    if (json.errors) {
        console.log(json.errors);
        throw new Error('Failed to fetch API');
    }
    return json.data;
}

export async function getAuthorBio() {
    const data = await apiRequest(`
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

export async function getAllSkills() {
    const data = await apiRequest(`
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
export async function getAllSkillsSlugs() {
    const data = await apiRequest(`
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
    return data?.tags.edges.map((project: ProjectSlug) => {
        return {
            params: {
                skill: project.node.slug,
            },
        };
    });
}

export async function getProjectsBySkill(skill: string) {
    const data = await apiRequest(
        `
        query MyQuery($tag: String!) {
            portfolioProjects(where: {tag: $tag}) {
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

export async function getAllProjects() {
    const data = await apiRequest(
        `query AllProjectsQuery {
  portfolioProjects(first: 10, where: {orderby: {field: SLUG, order: DESC}}) {
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
}`
    );
    return data?.portfolioProjects.edges;
}

export async function getAllProjectsSlugs() {
    const data = await apiRequest(`
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

    return data?.portfolioProjects.edges.map((project: ProjectSlug) => {
        return {
            params: {
                project: project.node.slug,
            },
        };
    });
}

export async function getProjectData(slug: string) {
    const data = await apiRequest(
        `query ProjectDataQuery ($id: ID!, $idType: PortfolioProjectIdType = SLUG) {
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
