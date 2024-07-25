import React, { useState } from 'react';  // React ve useState kütüphanelerini içe aktarıyoruz.
import Link from 'next/link';  // Link bileşenini next/link kütüphanesinden içe aktarıyoruz.
import axios from 'axios';
import Head from "next/head";  // Head bileşenini next/head kütüphanesinden içe aktarıyoruz.
import { Form, Button, Container, Row, Col, Card, Stack } from "react-bootstrap";  // Form, Button, Container, Row, Col, Card ve Stack bileşenlerini react-bootstrap kütüphanesinden içe aktarıyoruz.
import Navbarcomp from "../component/Navbar";  // Navbar bileşenini içe aktarıyoruz.
import Footercomp from "../component/Footer";  // Footer bileşenini içe aktarıyoruz.
import InnerNav from "../component/InnerNav";  // InnerNav bileşenini içe aktarıyoruz.
import Chart from "../component/Chart";  // Chart bileşenini içe aktarıyoruz.
import GlobalMarketsCoins from "../component/GlobalMarketsCoins";  // GlobalMarketsCoins bileşenini içe aktarıyoruz.
import BottomSlider from "../component/BottomSlider";  // BottomSlider bileşenini içe aktarıyoruz.

export default function Signup() {  // Signup bileşeni tanımlanıyor.
  const [formData, setFormData] = useState({  // Form verilerini saklamak için state tanımlıyoruz.
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {  // Form alanı değiştiğinde çalışacak fonksiyon.
    const { name, value } = e.target;  // Değişen alanın adı ve değerini alıyoruz.
    setFormData({
      ...formData,
      [name]: value  // Form verilerini güncelliyoruz.
    });
  };

   const handleSubmit = async(e) => {  // Form gönderildiğinde çalışacak fonksiyon.
    e.preventDefault();  // Formun varsayılan submit davranışını engelliyoruz.
    // Add form validation and submission logic here
      try {
        const response = await axios.post('http://127.0.0.1:5000/users', formData);
        console.log(response.data);
        alert('User registered successfully!');
    } catch (error) {
        console.error('There was an error!', error);
        alert('Error registering user!');
    }
    console.log(JSON.stringify(formData));  // Form verilerini konsola yazdırıyoruz.
  };

  return (
    <>
     
            <Col>
              {/* // Başlık ekliyoruz. */}
              <h1>Sign Up</h1>  
                {/* // Form bileşenini oluşturuyoruz ve onSubmit özelliğine handleSubmit fonksiyonunu bağlıyoruz. */}
              <Form onSubmit={handleSubmit}>  
              <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formSurname">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control
                                type="text"
                                name="surname"
                                value={formData.surname}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>


                        <Form.Group className='d-flex' controlId="formPhone">
                            <Col>
                            <Form.Label>Phone :</Form.Label>
                            </Col>
                            <Col md={10}>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                />
                          </Col>
                        </Form.Group>

                        <Form.Group className='d-flex' controlId="formPassword">
                            <Col>

                            <Form.Label>Password</Form.Label>
                            </Col>
                            <Col md={10}>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            </Col>
                        </Form.Group>

                  {/* // Form gönderim butonunu oluşturuyoruz. */}
                <Button variant="primary" type="submit">  
                  Sign Up
                </Button>
              </Form>
            </Col>
 
        
    </>
  );
}
