// app/achievements/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { CustomMDX } from 'app/components/mdx';
import { getAchievementBySlug, getAchievementSlugs } from 'app/achievements/utils';
import { Metadata } from 'next';
import { formatAchievementDate } from 'app/achievements/utils';
import { baseUrl } from 'app/sitemap'; // Assuming you have a baseUrl defined

export async function generateStaticParams() {
    const slugs = getAchievementSlugs();
    return slugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata | undefined {
    const achievement = getAchievementBySlug(params.slug);
    if (!achievement) {
        return undefined;
    }

    const { title, date, summary } = achievement.frontmatter;
    const description = summary || `Read more about ${title} achieved on ${formatAchievementDate(date)}`;
    const ogImage = `${baseUrl}/og?title=${encodeURIComponent(title)}`; // Adapt as needed

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime: date, // Use achievement date as published time
            url: `${baseUrl}/achievements/${params.slug}`,
            images: [
                {
                    url: ogImage,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
        },
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
        <section>
            <h1 className="title font-semibold text-2xl tracking-tighter">
                {achievement.frontmatter.title}
            </h1>
            <div className="flex justify-between items-center mt-2 mb-8 text-sm">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Achieved on {formatAchievementDate(achievement.frontmatter.date)}
                </p>
            </div>
            {achievement.frontmatter.summary && (
                <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">
                    {achievement.frontmatter.summary}
                </p>
            )}
            <article className="prose dark:prose-invert max-w-3xl">
                <CustomMDX source={achievement.content} />
            </article>
        </section>
    );
}