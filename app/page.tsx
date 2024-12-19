import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Gurnoor Kaur 
      </h1>
      <p className="mb-4">
        {`I am an aspiring Software Developing Engineer. This is my website that I created to post weekly blogs and projects. This is the exhibition of my learnings so far and to inspire other women coders to excell in the field of computer science. This website is helping me to keep track of my progress too`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
