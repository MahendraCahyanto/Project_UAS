import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
// import styles from '@/styles/form.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Home Page</title>
        <meta name="description" content="Welcome to my home page" />
        {/* Tambahkan tag <link> atau <style> untuk menggunakan font Inter */}
      </Head>
      
      <nav className="bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="logo">
                <img src="/download.png" alt="Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PT.BINAYASA PUTRA BATARA></span>
              </a>
            </div>
            <div className="hidden sm:flex sm:items-center sm:ml-6">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Header 1">Data 1</td>
            <td data-label="Header 2">Data 2</td>
            <td data-label="Header 3">Data 3</td>
          </tr>
          <tr>
            <td data-label="Header 1">Data 4</td>
            <td data-label="Header 2">Data 5</td>
            <td data-label="Header 3">Data 6</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
