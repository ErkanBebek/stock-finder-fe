import React from 'react'  // React kütüphanesini içe aktarıyoruz.
import { Container, Row, Card, Button, Stack, Col } from "react-bootstrap";  // Container, Row, Card, Button, Stack ve Col bileşenlerini react-bootstrap kütüphanesinden içe aktarıyoruz.

const Footer = () => {  // Footer bileşeni tanımlanıyor.
  return (

    <footer className="cntr-footer"> 
  {/* // Footer bileşenini oluşturuyoruz ve cntr-footer sınıfını ekliyoruz. */}
        <Container className='justify-content-center'> 

  {/* // İçerikleri ortalamak için Container bileşeni ekliyoruz. */}

        <Row className='justify-content-center pt-5'> 
  {/* // İçerikleri ortalamak ve padding-top eklemek için Row bileşeni ekliyoruz. */}
            
           <ul className="nav"> 
  {/* // Navigasyon menüsü için bir ul oluşturuyoruz ve nav sınıfını ekliyoruz. */}
            <li className="nav-item"><a href="/" className="nav-link px-2 text-body-secondary">Home</a></li> 
  {/* // Home sayfasına yönlendiren bir nav item ekliyoruz. */}
            <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Features</a></li> 
  {/* // Features sayfasına yönlendiren bir nav item ekliyoruz. */}
            <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Pricing</a></li> 
  {/* // Pricing sayfasına yönlendiren bir nav item ekliyoruz. */}
            <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">FAQs</a></li> 
  {/* // FAQs sayfasına yönlendiren bir nav item ekliyoruz. */}
            <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">About</a></li> 
  {/* // About sayfasına yönlendiren bir nav item ekliyoruz. */}
        </ul>
        
        </Row>
        <Row className='justify-content-center'> 
  {/* // İçerikleri ortalamak için Row bileşeni ekliyoruz. */}

        <p className="text-center text-body-secondary">© 2024 Company, Inc</p> 
  {/* // Telif hakkı bilgilerini ekliyoruz. */}
        </Row>
        </Container>
    </footer>
  )
}

export default Footer  // Footer bileşenini dışa aktarıyoruz.
