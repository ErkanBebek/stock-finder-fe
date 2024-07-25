import React from 'react'
import Lottie from 'react-lottie';

import animationData from '../public/animation.json'; // Lottie animasyon dosyanızın yolu

const error = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };


  return (
    <>
     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
      <h1>404 - Sayfa Bulunamadı</h1>
      <Lottie options={defaultOptions} height={400} width={400} />
      <p>Aradığınız sayfa bulunamadı. Lütfen başka bir sayfaya gidin.</p>
    </div>
    </>
  )
}

export default error