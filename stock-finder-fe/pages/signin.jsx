import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import Head from "next/head";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import GlobalMarketsCoins from "../component/GlobalMarketsCoins";
import BottomSlider from "../component/BottomSlider";
import { useRouter } from 'next/router'

// redux import
import { useDispatch, useSelector } from 'react-redux';  // useDispatch ve useSelector kütüphanelerini react-redux kütüphanesinden içe aktarıyoruz.
import { setData,login } from '../redux/Auth/authSlice';  // setData fonksiyonunu globalCoinsSlice dosyasından içe aktarıyoruz.


export default function Signin() {
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const dispatch = useDispatch();
    const router = useRouter()

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', formData);
            console.log(response.data);
            localStorage.setItem("access-token", response.data.hash);
            localStorage.setItem("local-id", response.data.id);
            dispatch(login(response.data)); // Verileri Redux store'a gönderiyor

            alert('User login successfully!');
            router.push('/profile')
        } catch (error) {
            console.error('There was an error!', error);
            alert('Error login user!');
        }
        console.log(JSON.stringify(formData));
    };

    return (
        <>
           <Col>
                            <h1>Sign Up</h1>
                            <Form onSubmit={handleSubmit} method="post">
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter email"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Button variant="success" className='mx-1' type="submit">
                                    Sign In <FaSignInAlt />
                                </Button>
                                <Link href="/signup" className='btn btn-primary'>
                                    {/* // Kayıt ol butonunu oluşturuyoruz ve handleClose fonksiyonunu bağlıyoruz. */}
                                    Sign Up <FaUserPlus />
                                </Link>

                            </Form>
                        </Col>

        </>
    );
}
