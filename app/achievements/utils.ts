import path from 'path';
import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';

const achievementsDirectory = path.join(process.cwd(), 'content/achievements');

export interface Achievement {
    slug: string;
    frontmatter: {
        title: string;
        date: string;
        summary?: string;
        // Add other frontmatter properties as needed
    };
    content: string;
}

let fs: typeof import('fs') | null = null;

async function loadFs() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        fs = await import('fs');
    }
}

loadFs(); // Immediately invoke the function to load 'fs' if in Node.js environment

export function getAchievementSlugs(): string[] {
    if (!fs) return []; // Return empty array if 'fs' hasn't loaded

    try {
        const fileNames = fs.readdirSync(achievementsDirectory);
        return fileNames.map((fileName) => fileName.replace(/\.mdx$/, ''));
    } catch (error) {
        console.error("Error reading achievements directory:", error);
        return [];
    }
}

export function getAchievementBySlug(slug: string): Achievement | null {
    if (!fs) return null;

    try {
        const fullPath = path.join(achievementsDirectory, `${slug}.mdx`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            frontmatter: data as Achievement['frontmatter'],
            content,
        };
    } catch (error) {
        console.error(`Error reading achievement with slug "${slug}":`, error);
        return null;
    }
}

export function getAllAchievements(): Achievement[] {
    const slugs = getAchievementSlugs();
    return slugs
        .map((slug) => getAchievementBySlug(slug))
        .filter((achievement): achievement is Achievement => !!achievement);
}

export function formatAchievementDate(dateString: string, includeTime = false): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    if (includeTime) {
        options.hour = 'numeric';
        options.minute = '2-digit';
        options.second = '2-digit';
        options.timeZoneName = 'short';
    }
    return new Intl.DateTimeFormat('en-US', options).format(date);
}