import React from 'react'
import Link from 'next/link'


const Navbar = () => {
  return (
    <div>
        <header className="flex items-center justify-between border-b border-[#f0f2f5] px-10 py-3 bg-white">
      <div className="flex items-center gap-4  text-[#111418]">
        <div className="size-4">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="48" height="48" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
          BookMark
        </h2>
      </div>
      <nav className="w-full  px-10 py-3 bg-white">
      <div className="flex items-center justify-center gap-8">
        <Link
          href="/"
          className="text-[#111418] text-sm font-bold tracking-wide hover:text-[#60758a] transition-colors"
        >
          Home
        </Link>
        <Link
          href="/dashboard"
          className="text-[#111418] text-sm font-bold tracking-wide hover:text-[#60758a] transition-colors"
        >
          Dashboard
        </Link>
      </div>
    </nav>
    </header>
    </div>
  )
}

export default Navbar