// app/achievements/utils.ts
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Update this path to point to the new 'posts' subdirectory within 'achievements'
const achievementsDirectory = path.join(__dirname, 'posts');

export interface AchievementFrontmatter {
    title: string;
    date: string;
    summary?: string;
    certificateLink?: string;
    thumbnail?: string;
    [key: string]: any; // Allow other frontmatter fields
}

export interface Achievement {
    slug: string;
    frontmatter: AchievementFrontmatter;
    content: string;
}

let fs: typeof import('fs') | null = null;
if (process.env.NEXT_RUNTIME === 'nodejs') {
    fs = await import('fs');
}

export function getAchievementSlugs(): string[] {
    if (!fs) return [];
    try {
        const fileNames = fs.readdirSync(achievementsDirectory);
        return fileNames.map((fileName) => fileName.replace(/\.mdx?$/, ''));
    } catch (error) {
        console.error("Error reading achievements directory:", error);
        return [];
    }
}

export function getAchievementBySlug(slug: string): Achievement | undefined {
    if (!fs) return undefined;
    const fullPath = path.join(achievementsDirectory, `${slug}.mdx`);
    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            frontmatter: data as AchievementFrontmatter,
            content,
        };
    } catch (error) {
        console.error(`Error reading achievement with slug "${slug}":`, error);
        return undefined;
    }
}

export function getAllAchievements(): Achievement[] {
    const slugs = getAchievementSlugs();
    return slugs.map((slug) => getAchievementBySlug(slug)).filter((achievement) => achievement !== undefined) as Achievement[];
}

export function formatAchievementDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}