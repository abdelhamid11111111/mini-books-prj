'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/page'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'



interface Book {
  id: number
  title: string
  author: string
  genre: string
  date: string
  imagelink?: string
  summary?: string
}


const Dashboard = () => {

  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    const res = await fetch('/api/book')
    const data = await res.json()
    setBooks(data)
  }

  const handleDelete = async (id: number) => {
    await fetch(`/api/book/${id}`, {
      method: 'DELETE'
    })
    toast.error('Deleted successfully')
    fetchAllData()
  }

  return (
    <div>
      <div
        className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
        style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
      >
      <ToastContainer position="top-right" autoClose={3000} />

        <div className="layout-container flex h-full grow flex-col">
          <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">
                  My Books
                </p>
                <Link href="/dashboard/addbook">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-medium leading-normal">
                    <span className="truncate">Add Book</span>
                  </button>
                </Link>
              </div>
              <div className="px-4 py-3 @container">
                <div className="flex overflow-hidden rounded-lg border border-[#dbe0e6] bg-white">
                  <table className="flex-1">
                    <thead>
                      <tr className="bg-white">
                        <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                          Title
                        </th>
                        <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                          Author
                        </th>
                        <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                          Genre
                        </th>
                        <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-[#60758a] w-60 text-sm font-medium leading-normal">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        books.map((book: any) => (
                          <tr key={book.id} className="border-t border-t-[#dbe0e6]">
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">
                            {book.title}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#60758a] text-sm font-normal leading-normal">
                            {book.author}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#60758a] text-sm font-normal leading-normal">
                            {book.genre}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#60758a] text-sm font-normal leading-normal">
                            {book.date}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-60 text-[#60758a] text-sm font-bold leading-normal tracking-[0.015em]">
                            <div className="flex items-center gap-3">
                            <Link href={`/dashboard/edit/${book.id}`}>
                              <button className="group cursor-pointer flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 rounded-lg transition-all duration-200 ">
                                <span className="font-medium">Edit</span>
                              </button>
                            </Link>
                              
                              <button onClick={() => handleDelete(book.id)} className="group cursor-pointer flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg transition-all duration-200 ">
                                <span className="font-medium">Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                        ))
                      }

                    
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
