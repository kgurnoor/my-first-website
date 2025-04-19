// app/achievements/page.tsx
import { AchievementPosts } from 'app/components/posts';

export const metadata = {
    title: 'Achievements',
    description: 'My Achievements',
};

export default function AchievementsPage() {
    return (
        <section>
            <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Achievements</h1>
            <AchievementPosts />
        </section>
    );
}