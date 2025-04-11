import Link from 'next/link';
import { getAllProjects, Project } from './utils';

export default async function ProjectsOverview() {
    const projects = getAllProjects();

    return (
        <div>
            <h1>My Projects</h1>
            <ul>
                {projects.map((project) => (
                    <li key={project.slug}>
                        <Link href={`/projects/${project.slug}`}>
                            {project.frontmatter.title}
                        </Link>
                        <p>{project.frontmatter.summary}</p>
                        {project.frontmatter.image && (
                            <img src={project.frontmatter.image} alt={project.frontmatter.title} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}