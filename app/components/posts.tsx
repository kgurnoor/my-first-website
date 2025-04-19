import Link from 'next/link';
import { formatDate, getBlogPosts } from 'app/blog/utils';
import { getAllProjects, Project } from 'app/projects/utils';
import { getAllAchievements, formatAchievementDate } from 'app/achievements/utils'; // Import achievement functions

export function BlogPosts() {
    let allBlogs = getBlogPosts();

    return (
        <div>
            {allBlogs
                .sort((a, b) => {
                    if (
                        new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
                    ) {
                        return -1;
                    }
                    return 1;
                })
                .map((post) => (
                    <Link
                        key={post.slug}
                        className="flex flex-col space-y-1 mb-4"
                        href={`/blog/${post.slug}`}
                    >
                        <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
                            <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
                                {formatDate(post.metadata.publishedAt, false)}
                            </p>
                            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                                {post.metadata.title}
                            </p>
                        </div>
                    </Link>
                ))}
        </div>
    );
}

export function ProjectPosts() {
    const allProjects = getAllProjects();

    return (
        <div>
            {allProjects
                .sort((a, b) => {
                    if (new Date(a.frontmatter.date) > new Date(b.frontmatter.date)) {
                        return -1;
                    }
                    return 1;
                })
                .map((project) => (
                    <Link
                        key={project.slug}
                        className="flex flex-col space-y-1 mb-4"
                        href={`/projects/${project.slug}`}
                    >
                        <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
                            <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
                                {formatDate(project.frontmatter.date, false)}
                            </p>
                            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                                {project.frontmatter.title}
                            </p>
                        </div>
                    </Link>
                ))}
        </div>
    );
}

export function AchievementPosts() {
    const allAchievements = getAllAchievements();

    return (
        <div>
            {allAchievements
                .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
                .map((achievement) => (
                    <Link
                        key={achievement.slug}
                        className="flex flex-col md:flex-row space-y-1 md:space-x-4 mb-4"
                        href={`/achievements/${achievement.slug}`}
                    >
                        <p className="text-neutral-600 dark:text-neutral-400 w-[120px] tabular-nums">
                            {formatAchievementDate(achievement.frontmatter.date)}
                        </p>
                        <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                            {achievement.frontmatter.title}
                        </p>
                    </Link>
                ))}
        </div>
    );
}