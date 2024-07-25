import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaCircleUser, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import Link from 'next/link';

export default function SignInModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({  // Form verilerini saklamak için state tanımlıyoruz.
    email: '',
    password: '',
  });

  const handleChange = (e) => {  // Form alanı değiştiğinde çalışacak fonksiyon.
    const { email, value } = e.target;  // Değişen alanın adı ve değerini alıyoruz.
    setFormData({
      ...formData,
      [email]: value  // Form verilerini güncelliyoruz.
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
      <Button onClick={handleShow} variant="light">Sign In <FaCircleUser /></Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email"  placeholder="Enter email" name="email" required />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" required />
            </Form.Group>

            <Button variant="success" className='mx-1' type="submit">
              Sign In <FaSignInAlt />
            </Button>
            <Link href="/signup" passHref>
              <Button variant="primary" onClick={handleClose} className='mx-1'>
                Sign Up <FaUserPlus />
              </Button>
            </Link>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

