import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useRouter } from 'next/router'
import { Card } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';  // Spinner bileşenini react-bootstrap kütüphanesinden içe aktarıyoruz.

// redux import
import { useDispatch, useSelector } from 'react-redux';  // useDispatch ve useSelector kütüphanelerini react-redux kütüphanesinden içe aktarıyoruz.

const ProfileDetail = () => {
    
    const user = useSelector((state) => state.auth.user);
    

  return (
    <Card style={{
        width: '20rem',
        background: 'linear-gradient(-45deg, #66a6ff 10%, #003366 90%)',
        // 030 Happy FisherGet .PNG#89f7fe→#66a6ff
        color: 'white',
        padding: '20px',
        borderRadius: '10px'
    }}>
        <Card.Body>
            <h1>Profile</h1>
            <p>{user.email}</p>
            <p>{user.name}</p>
            <p>{user.surname}</p>
            <p>{user.phone}</p>
            <p>{user.role == 0 ? "admin" : ""}</p>
            <p>{user.name}</p>
        </Card.Body>
    </Card>
  )
}

export default ProfileDetail