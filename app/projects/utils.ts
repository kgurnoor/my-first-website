import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const projectsDirectory = path.join(process.cwd(), 'app', 'projects', 'posts');

export interface Project {
    slug: string;
    frontmatter: {
        title: string;
        date: string;
        summary: string;
        image?: string;
        liveUrl?: string;
        githubUrl?: string;
        tags?: string[];
    };
    content: string;
}

export function getProjectSlugs(): string[] {
    const fileNames = fs.readdirSync(projectsDirectory);
    return fileNames.map((fileName) => fileName.replace('.mdx', ''));
}

export function getProjectBySlug(slug: string): Project | undefined {
    const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            frontmatter: data as Project['frontmatter'],
            content,
        };
    } catch (error) {
        console.error(`Error reading project with slug "${slug}":`, error);
        return undefined;
    }
}

export function getAllProjects(): Project[] {
    const slugs = getProjectSlugs();
    return slugs
        .map((slug) => getProjectBySlug(slug))
        .filter((project): project is Project => !!project) // Filter out undefined values
        .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()); // Sort by date (optional)
}