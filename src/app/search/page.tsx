'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  date: string;
  imagelink?: string;
  summary?: string;
}

const Search = () => {


  const route = useRouter()

  // Use Next.js router for navigation
  const searchParams = useSearchParams();

  // State to hold search input
  const [search, setSearch] = useState<string>('')

  // EXTRACT QUERY PARAMETER FROM URL
  const query = searchParams.get('query') || '';

  // State to hold search results
  const [books, setBooks] = useState<Book[]>([]);



  // FETCH SEARCH RESULTS ON PAGE LOAD
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      try {
        const res = await fetch(`/api/bookSearch?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error('Failed to fetch search results:', err);
      }
    };
    fetchSearchResults();
  }, [query]);


  // SEARCH FUNCTIONALITY
  const handleSearch = async () => {
    
    if (!search.trim()) return;
    const encoded = encodeURIComponent(search.trim());
    route.push(`/search?query=${encoded}`);

  }

  return (

    <div>
        <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="px-4 py-3">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
      
                    {/* Search Icon */}
                    <div className="text-[#60758a] flex border-none bg-[#f0f2f5] items-center justify-center pl-4 rounded-l-lg border-r-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                      </svg>
                    </div>

                    {/* Input Field */}
                    <input
                     placeholder="Search for books"
                     className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-full placeholder:text-[#60758a] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                     type="text"
                     value={search}                                                                      
                     onChange={(e) => setSearch(e.target.value)}
                    />

                    {/* Search Button */}
                    <button
                    onClick={handleSearch}
                        className="px-4 text-[#60758a] bg-[#e2e4e7] rounded-r-lg border-none rounded-lg ml-1 cursor-pointer font-medium text-base hover:bg-[#f0f2f5] transition-colors duration-150"
                    >
                    Search
                    </button>

                </div>
              </label>
            </div>
            <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Search Results
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(158px,1fr))] gap-4  p-4">
                {
                  books.map((book) => (
                    <div key={book.id} className="flex w-[170px] flex-col pb-3">
                    <div
                      className="w-full bg-center bg-no-repeat h-[270px] aspect-[3/4] bg-cover rounded-lg"
                      style={{ backgroundImage: `url(${book.imagelink})` }}
                    ></div>
                    <div>
                      <p className="text-[#111418] text-base font-medium leading-normal">{book.title}</p>
                      <p className="text-[#60758a] text-sm font-normal leading-normal">{book.author}</p>
                    </div>
                  </div>
                 ))
                } 


              </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Search;
