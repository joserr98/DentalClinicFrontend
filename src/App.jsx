import { useState } from 'react'
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Body } from './layouts/Body/Body'


export const App = () => {

  return (
    <div className='appDesign'>
      <Header />
      <Body />
      <Footer />      
    </div>
  )
}