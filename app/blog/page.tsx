// app/blogs/page.tsx
import { BlogPosts } from 'app/components/posts'; // Make sure this component exists and lists blog posts!

export const metadata = {
  title: 'Blogs',
  description: 'My Blog Posts',
};

export default function BlogsPage() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blogs</h1>
      <BlogPosts />
    </section>
  );
}
