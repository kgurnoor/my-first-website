// utils.ts
import fs from 'fs';
import path from 'path';

export type AchievementMetadata = {
  title: string;
  date: string;
  summary: string;
  certificateLink: string;
};

function parseAchievementFrontmatter(fileContent: string): { metadata: AchievementMetadata; content: string } {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match || !match[1]) {
    return {
      metadata: {
        title: '',
        date: '',
        summary: '',
        certificateLink: '',
      },
      content: fileContent,
    };
  }

  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, '').trim();
  const frontMatterLines = frontMatterBlock.trim().split('\n');
  const metadata: Partial<AchievementMetadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ');
    const value = valueArr.join(': ').trim();
    metadata[key.trim() as keyof AchievementMetadata] = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
  });

  return { metadata: metadata as AchievementMetadata, content };
}

function getAchievementMDXFiles(dir: string): string[] {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx' || path.extname(file) === '.md');
}

function readAchievementMDXFile(filePath: string): { metadata: AchievementMetadata; content: string } {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseAchievementFrontmatter(rawContent);
}

function getAchievementData(dir: string): { metadata: AchievementMetadata; slug: string; content: string }[] {
  const mdxFiles = getAchievementMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readAchievementMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getAchievements() {
  return getAchievementData(path.join(process.cwd(), 'app', 'achievements', 'posts'));
}

export function formatAchievementDate(date: string): string {
  if (!date.includes('T')) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);
  return targetDate.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}