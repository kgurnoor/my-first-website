import { notFound } from 'next/navigation';
import { CustomMDX } from 'app/components/mdx';
import { getProjectBySlug, getProjectSlugs, Project } from 'app/projects/utils';
import { Metadata } from 'next';
import { formatDate } from 'app/blog/utils';

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
        // You can add more metadata here
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
        <article className="prose dark:prose-invert max-w-3xl"> {/* Example Tailwind styling */}
            <h1 className="font-bold text-3xl md:text-5xl mb-4 tracking-tight">
                {project.frontmatter.title}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                Published on {formatDate(project.frontmatter.date, true)}
            </p>
            {project.frontmatter.summary && (
                <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6">
                    {project.frontmatter.summary}
                </p>
            )}
            {project.frontmatter.liveUrl && (
                <p>
                    <a href={project.frontmatter.liveUrl} target="_blank" rel="noopener noreferrer" className="underline">
                        Live Demo
                    </a>
                </p>
            )}
            {project.frontmatter.githubUrl && (
                <p>
                    <a href={project.frontmatter.githubUrl} target="_blank" rel="noopener noreferrer" className="underline">
                        GitHub Repository
                    </a>
                </p>
            )}
            {project.frontmatter.tags && (
                <div className="mb-4">
                    Tags: {project.frontmatter.tags.join(', ')}
                </div>
            )}
            <CustomMDX source={project.content} /> {/* Pass 'project.content' as 'source' */}
        </article>
    );
}