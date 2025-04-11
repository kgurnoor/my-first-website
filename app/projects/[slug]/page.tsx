import { notFound } from 'next/navigation';
import { CustomMDX } from 'app/components/mdx'; // Assuming you have this component
import { getProjectBySlug, getProjectSlugs, Project } from 'app/projects/utils';
import { Metadata } from 'next';

export async function generateStaticParams() {
    const slugs = getProjectSlugs();
    return slugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata | undefined {
    const project = getProjectBySlug(params.slug);
    if (!project) {
        return undefined;
    }

    return {
        title: project.frontmatter.title,
        description: project.frontmatter.summary,
        // You can add more metadata here (openGraph, twitter, etc.)
    };
}

interface Props {
    params: {
        slug: string;
    };
}

export default async function ProjectPage({ params }: Props) {
    const project = getProjectBySlug(params.slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="project-page">
            <h1>{project.frontmatter.title}</h1>
            <p className="date">Published: {project.frontmatter.date}</p>
            <div className="content">
                <CustomMDX code={project.content} />
            </div>
            {project.frontmatter.liveUrl && (
                <a href={project.frontmatter.liveUrl} target="_blank" rel="noopener noreferrer">
                    Live Demo
                </a>
            )}
            {project.frontmatter.githubUrl && (
                <a href={project.frontmatter.githubUrl} target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
            )}
            {project.frontmatter.tags && (
                <div className="tags">
                    Tags: {project.frontmatter.tags.join(', ')}
                </div>
            )}
        </div>
    );
}