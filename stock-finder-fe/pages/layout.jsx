import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import Head from "next/head";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Navbarcomp from "../component/Navbar/Navbar";
import Footercomp from "../component/Footer";
import GlobalMarketsCoins from "../component/GlobalMarketsCoins";
import BottomSlider from "../component/BottomSlider";
import { useRouter } from 'next/router'



export default function Layout({ children }) {

    return (
        <>
            <Navbarcomp />
            <Container >
                <Head>
                    <title>Stock Finder</title>
                    <link rel="icon" href="/favicon.png" />
                </Head>

                <Container xl fluid className='p-0'>
                    <Row className="col-12 pt-3">
                        <Col>
                        {children}
                        </Col>

                        <Col xs={12} lg={3} className="pt-2">
                            <GlobalMarketsCoins />
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Footercomp />
            <BottomSlider />
        </>
    );
}
