import React from 'react'
import Navbar from '../components/Navbar'
import BlogList from '../components/BlogList'
import Header from '../components/Header'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
        <Navbar />
        <Header />
        <BlogList/>
        <NewsLetter/>
        <Footer/>
    </>
  )
}

export default Home