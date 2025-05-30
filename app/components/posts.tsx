import Link from 'next/link';
import { formatDate, getBlogPosts } from 'app/blog/utils';
import { getAllProjects, Project } from 'app/projects/utils';
import { getAchievements, formatAchievementDate, AchievementMetadata } from 'app/achievements/utils'; // Ensure correct import path

export function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <div>
      {allBlogs
        .sort((a, b) => (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1))
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
        .sort((a, b) => (new Date(a.frontmatter.date) > new Date(b.frontmatter.date) ? -1 : 1))
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
  const allAchievements = getAchievements();

  return (
    <div>
      {allAchievements
        .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())
        .map((achievement) => (
          <div key={achievement.slug} className="flex flex-col md:flex-row space-y-1 md:space-x-4 mb-4">
            <p className="text-neutral-600 dark:text-neutral-400 w-[120px] tabular-nums">
              {formatAchievementDate(achievement.metadata.date)}
            </p>
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              {achievement.metadata.title}
            </p>
            <Link
              href={achievement.metadata.certificateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-1 md:mt-0" // Added some basic styling
            >
              View Certificate
            </Link>
          </div>
        ))}
    </div>
  );
}