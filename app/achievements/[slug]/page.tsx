// app/achievements/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { CustomMDX } from 'app/components/mdx'; // Assuming you'll reuse your MDX component
import { getAchievementBySlug, getAchievementSlugs, Achievement } from 'app/achievements/utils';
import { Metadata } from 'next';
import { formatAchievementDate } from 'app/achievements/utils'; // Import the date formatting function

export async function generateStaticParams() {
    const slugs = getAchievementSlugs();
    return slugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata | undefined {
    const achievement = getAchievementBySlug(params.slug);
    if (!achievement) {
        return undefined;
    }

    return {
        title: achievement.frontmatter.title,
        description: achievement.frontmatter.summary,
        // You can add more metadata here
    };
}

interface Props {
    params: {
        slug: string;
    };
}

export default async function AchievementPage({ params }: Props) {
    const achievement = getAchievementBySlug(params.slug);

    if (!achievement) {
        notFound();
    }

    return (
        <article className="prose dark:prose-invert max-w-3xl"> {/* Use similar styling as blog/projects */}
            <h1 className="font-bold text-3xl md:text-5xl mb-4 tracking-tight">
                {achievement.frontmatter.title}
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                Achieved on {formatAchievementDate(achievement.frontmatter.date)}
            </p>
            {achievement.frontmatter.summary && (
                <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">
                    {achievement.frontmatter.summary}
                </p>
            )}
            <CustomMDX source={achievement.content} /> {/* Reuse your CustomMDX component */}
            {/* You can add other relevant information or links here */}
        </article>
    );
}