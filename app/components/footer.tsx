function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="mb-16">
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-zinc-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-zinc-300">
        <li>
          <a
            className="flex items-center transition-all hover:text-zinc-800 dark:hover:text-zinc-100"
            rel="noopener noreferrer"
            target="_blank"
            href="/rss"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">rss</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-zinc-800 dark:hover:text-zinc-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/kgurnoor"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">github</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-zinc-800 dark:hover:text-zinc-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/public-profile/settings?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact-info%3BnkIb603nTI%2BgggCvr55bog%3D%3D"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">linkedIn</p>
          </a>
        </li>
      </ul>

      {/* Contact Information Section */}
      <div className="mt-8 text-zinc-600 dark:text-zinc-300">
        <p>Email: gurnoorkaur0349@gmail.com</p> 
      </div>

      <p className="mt-8 text-zinc-600 dark:text-zinc-300">
        © {new Date().getFullYear()} MIT Licensed
      </p>
    </footer>
  )
}