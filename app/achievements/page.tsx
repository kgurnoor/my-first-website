// app/achievements/page.tsx
import Link from 'next/link';
import { getAllAchievements, formatAchievementDate } from 'app/achievements/utils';

export default function AchievementsPage() {
    const allAchievements = getAllAchievements();

    return (
        <section className="max-w-3xl mx-auto py-8">
            <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
                Achievements
            </h1>
            <div>
                {allAchievements
                    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()) // Sort by date (newest first)
                    .map((achievement) => (
                        <Link
                            key={achievement.slug}
                            className="flex flex-col md:flex-row space-y-1 md:space-x-4 mb-4" // Similar flexbox as blog
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
        </section>
    );
}