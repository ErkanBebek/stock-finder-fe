import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import Head from "next/head";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import GlobalMarketsCoins from "../component/GlobalMarketsCoins";
import BottomSlider from "../component/BottomSlider";
import { useRouter } from 'next/router'
import { Card } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';  // Spinner bileşenini react-bootstrap kütüphanesinden içe aktarıyoruz.

// redux import
import { useDispatch, useSelector } from 'react-redux';  // useDispatch ve useSelector kütüphanelerini react-redux kütüphanesinden içe aktarıyoruz.
import { setData, login } from '../redux/Auth/authSlice';  // setData fonksiyonunu globalCoinsSlice dosyasından içe aktarıyoruz.
import ProfileNav from '../component/Profile/ProfileNav';


export default function Profile() {
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const dispatch = useDispatch();
    const router = useRouter()

    
    useEffect(() => {
        if (!loggedIn) {
            console.log(loggedIn);
            router.push('/signin');
        }
    }, []);

    if (!loggedIn) {
        return (
            <span>Loading... <Spinner animation="border" variant="primary" /></span>
            
        ); // Ya da yükleniyor ekranı gösterebilirsiniz
    }
    return (
        <>
            
                     <ProfileNav/>   
                     

        </>
    );
}
