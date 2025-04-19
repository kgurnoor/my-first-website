import React from 'react';
import { AchievementPosts } from 'app/components/posts'; // Adjust the import path if necessary

export const metadata = {
  title: 'Achievements',
  description: 'My achievements and certifications.',
};

export default function Page() {
  return (
    <section className="max-w-3xl mx-auto py-8">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Achievements</h1>
      <AchievementPosts />
    </section>
  );
}