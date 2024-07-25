import React, { useState } from 'react';  // React ve useState kütüphanelerini içe aktarıyoruz.
import Nav from 'react-bootstrap/Nav';  // Nav bileşenini react-bootstrap kütüphanesinden içe aktarıyoruz.
import Navbar from 'react-bootstrap/Navbar';  // Navbar bileşenini react-bootstrap kütüphanesinden içe aktarıyoruz.
import NavDropdown from 'react-bootstrap/NavDropdown';  // NavDropdown bileşenini react-bootstrap kütüphanesinden içe aktarıyoruz.
import { Container, Col, Stack } from "react-bootstrap";  // Container, Col ve Stack bileşenlerini react-bootstrap kütüphanesinden içe aktarıyoruz.
import { FaPrint, FaHome, FaMobile, FaSearch } from "react-icons/fa";  // FaPrint, FaHome, FaMobile ve FaSearch ikonlarını react-icons/fa kütüphanesinden içe aktarıyoruz.
import { FaCircleUser, FaHouse, FaMobileScreen } from 'react-icons/fa6';  // FaCircleUser, FaHouse ve FaMobileScreen ikonlarını react-icons/fa6 kütüphanesinden içe aktarıyoruz.
import SignInModal from '../SignInModal';  // SignInModal bileşenini içe aktarıyoruz.
import Link from 'next/link';  // Link bileşenini next/link kütüphanesinden içe aktarıyoruz.
import { FaRegUserCircle } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";


// redux import
import { useDispatch, useSelector } from 'react-redux';  // useDispatch ve useSelector kütüphanelerini react-redux kütüphanesinden içe aktarıyoruz.
import { setData } from '../../redux/Auth/authSlice';  // setData fonksiyonunu globalCoinsSlice dosyasından içe aktarıyoruz.
import Searchbox from './Searchbox';


const Navbarcomp = () => {  // Navbarcomp bileşeni tanımlanıyor.
  const loggedIn  = useSelector((state) => state.auth.loggedIn);

  const [signinModals, setsigninModals] = useState(false);  // Giriş modalı için state tanımlıyoruz.
  return (
    <>
    <Navbar collapseOnSelect expand="lg" className="bg-body-light p-0" data-bs-theme="dark" style={{ background: 'linear-gradient(-30deg, #2873db  1%,#003366 99%, #003366 99%)' }}>  
      {/* // Navbar bileşeni oluşturuyoruz ve stil uyguluyoruz. */}
      <Container className='container-fluid p-0'>
        <Col className='d-flex justify-content-start p-0 m-0'>  
        {/* // Sol tarafa hizalanmış bir sütun oluşturuyoruz. */}
          <Link href="/" className='navbar-brand text-light'>
            <img
              alt=""
              src="/favicon.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Stock Finder  
            {/* // Navbar başlığı olarak bir logo ve metin ekliyoruz. */}
          </Link>
        </Col>
        <Col>
        <Searchbox/>
        </Col>

        <Col>
          <Nav className='flex-row justify-content-end align-items-center flex-wrap ms-md-auto'>  
            {/* // Sağ tarafa hizalanmış bir navigasyon menüsü oluşturuyoruz. */}
            <Nav.Link className='text-light' href="/chart/candlestick"><FaMobileScreen /></Nav.Link>
            <Nav.Link className='text-light' href="/chart/candlestick"><FaHouse /></Nav.Link>
            <Nav.Link className='text-light ' href="/chart/2"><FaPrint /></Nav.Link>
            <Nav.Item className='text-light'>
              {/* Giriş modali */}
              {/* <SignInModal/> */}
              {loggedIn && (
                <>
                <Link href="/profile" className='btn btn-light m-1' >Profile <FaRegUserCircle /></Link>
                <Link href="/logout" className='btn btn-danger m-1' ><GrLogout /></Link>
                </>
              )}
              {!loggedIn && (
              <Link href="/signin" className='btn btn-light m-1' >Sign In <FaCircleUser /></Link>
              )}
                </Nav.Item>
          </Nav>
        </Col>
      </Container>
    </Navbar>
    </>
  )
}

export default Navbarcomp;  // Navbarcomp bileşenini dışa aktarıyoruz.
