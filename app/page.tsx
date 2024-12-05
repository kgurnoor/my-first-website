import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Gurnoor Kaur 
      </h1>
      <p className="mb-4">
        {`I am an aspiring Software Developing Engineer. Here is everything I've made so far :`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
