'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'

const AddBook = () => {

  
  const [form, setForm] = useState({
    title: '',
    author: '',
    date: '',
    imagelink: '',
    genre: '',
    summary: '',
  })
  
  const router = useRouter()


  const handleSubmit = async () => {
    try {
  
      // No need to parse and convert - form.date is already in YYYY-MM-DD format
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          ...form,
          date: form.date // This is already in YYYY-MM-DD format
        })
      })
      
      if (!res.ok) {
        throw Error('failed to create book')
      }
        router.push('/dashboard')
        toast.success('Book created successfully')
    } catch (error) {
      toast.error('Something went wrong');
    }
  }
  

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="layout-content-container flex flex-col w-[512px] py-5 max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">Add a New Book</p>
        </div>

        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Title</p>
            <input
              placeholder="Enter the title"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-14 placeholder:text-[#60758a] p-[15px] text-base font-normal leading-normal"
              value={form.title}
              onChange={(e) => setForm({...form, title:e.target.value})}
            />
          </label>
        </div>

        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Author</p>
            <input
              placeholder="Enter the author"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-14 placeholder:text-[#60758a] p-[15px] text-base font-normal leading-normal"
              value={form.author}
              onChange={(e) => setForm({...form, author: e.target.value})}
            />
          </label>
        </div>

        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Date</p>
            <input
              placeholder="Enter the date"
              type='date'
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-14 placeholder:text-[#60758a] p-[15px] text-base font-normal leading-normal"
              value={form.date}
              onChange={(e) => setForm({...form, date: e.target.value})}
            />
          </label>
        </div>

        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Image Link</p>
            <input
              placeholder="Enter the image link"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-14 placeholder:text-[#60758a] p-[15px] text-base font-normal leading-normal"
              value={form.imagelink}
              onChange={(e) => setForm({...form, imagelink: e.target.value})}
            />
          </label>
        </div>

        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Genre</p>
            <select value={form.genre} onChange={(e) => setForm({...form, genre: e.target.value})} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg  text-[#111418] outline-none focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-14 bg-[image:--select-button-svg] placeholder:text-[#60758a] p-[15px] text-base font-normal leading-normal">
            <option value="">Select a genre</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Horror">Horror</option>
            <option value="Adventure">Adventure</option>
            <option value="Thriller">Thriller</option>
            <option value="Biography">Biography</option>  
            </select>
          </label>
        </div>

        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Summary</p>
            <textarea
              value={form.summary}
              onChange={(e) => setForm({...form, summary: e.target.value})}
              placeholder="Write a brief summary of the book"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] min-h-36 placeholder:text-[#60758a] p-[15px] text-base font-normal leading-normal"
            ></textarea>
          </label>
        </div>

        <div className="flex px-4 py-3 justify-end">
          <button onClick={handleSubmit} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#0d80f2] text-white text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Add Book</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddBook
