import { useState } from 'react'
// import './App.scss'
import { Landing } from './pages/Landing'
import { Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import { Explore } from './pages/Explore'
import { Tours } from './pages/Tours'
import TourDetails from './pages/TourDetails/TourDetails'
import { AddBooking } from './pages/AddBooking'
import { MyTours } from './pages/MyTours'
import { UpdateBooking } from './pages/UpdateBooking'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path='explore' element={<Explore />} />
          <Route path='tours'>
            <Route index element={<Tours />} />
            <Route path=':id' element={<TourDetails />} />
          </Route>
          <Route path='book-tour' element={<AddBooking />} />
          <Route path='my-tours' element={<MyTours />} />
          <Route path='update-booking'>
            <Route index element={<Tours />} />
            <Route path=':id' element={<UpdateBooking />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
