import React, { useState, useEffect } from 'react';  // React, useState ve useEffect kütüphanelerini içe aktarıyoruz.
import { Nav, NavDropdown } from 'react-bootstrap';  // Nav ve NavDropdown bileşenlerini react-bootstrap kütüphanesinden içe aktarıyoruz.
import Dropdown from 'react-bootstrap/Dropdown';  // Dropdown bileşenini react-bootstrap kütüphanesinden içe aktarıyoruz.
import DropdownButton from 'react-bootstrap/DropdownButton';  // DropdownButton bileşenini react-bootstrap kütüphanesinden içe aktarıyoruz.
import { Container, Row, Card, Button, Stack, Col } from "react-bootstrap";  // Container, Row, Card, Button, Stack ve Col bileşenlerini react-bootstrap kütüphanesinden içe aktarıyoruz.
import ReactBoostrap from "react-bootstrap"
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import ProfileDetail from './ProfileDetail';
import Watchlist from './Watchlist';
import ContactMessages from './ContactMessages';
const ProfileNav = () => {
    const [activeTab, setactiveTab] = useState("Watchlist");  // Aktif sekmeyi saklamak için state tanımlıyoruz.
    const [symbols, setSymbols] = useState([]);  // Hisse sembollerini saklamak için state tanımlıyoruz.
    const [cryptos, setCryptos] = useState([]);  // Kripto paraları saklamak için state tanımlıyoruz.
    const globalCoinsData = useSelector((state) => state.globalcoins.data);  // Redux state'inden globalCoins verilerini alıyoruz.

    useEffect(() => {  // useEffect kancası, bileşen yüklendiğinde ve güncellendiğinde çalışır.
        const fetchCryptos = async () => {  // Asenkron veri çekme fonksiyonu.
            try {
                const response = await axios.get('http://127.0.0.1:5000/cryptocurrencies', {
                    // API'den veri çekiyoruz ve kripto paraları state'e kaydediyoruz.
                });
                setCryptos(response.data);
                // veri bastır
                //console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);  // Hata varsa konsola yazdırıyoruz.
            }
        };
        fetchCryptos();  // Veri çekme fonksiyonunu çağırıyoruz.

        const fetchSymbols = async () => {  // Asenkron veri çekme fonksiyonu.
            try {
                const response = await fetch('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=cpt67ghr01qpk40rs4c0cpt67ghr01qpk40rs4cg');
                if (!response.ok) {
                    throw new Error('Network response was not ok');  // Hata kontrolü yapıyoruz.
                }
                const data = await response.json();  // Gelen veriyi JSON formatına çeviriyoruz.
                setSymbols(data);  // Hisse sembollerini state'e kaydediyoruz.
            } catch (error) {
                console.error('Error fetching data:', error);  // Hata varsa konsola yazdırıyoruz.
            }
        };
        fetchSymbols();  // Veri çekme fonksiyonunu çağırıyoruz.
    }, []);  // useEffect'in bağımlılık dizisi boş olduğunda, bu kod bileşen yüklendiğinde çalışır.

    return (
        <>
            <div className="container justify-content-center px-0">
                <Nav className="nav nav-tabs">



                    <Nav.Item>
                        <Nav.Link onClick={() => setactiveTab("Watchlist")} className={(activeTab === "Watchlist" ? "active" : "")} href="#Watchlist">Watch list</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => setactiveTab("Profile")} className={(activeTab === "Profile" ? "active" : "")} href="#Profile">Profile</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => setactiveTab("ContactMessages")} className={(activeTab === "ContactMessages" ? "active" : "")} href="#ContactMessages">Contact Messages</Nav.Link>
                    </Nav.Item>

                </Nav>
            </div>
            <Col xs={12} lg={9} className="pt-2">
                {activeTab === "Profile" && <ProfileDetail />}
                {activeTab === "Watchlist" && <Watchlist />}
                {activeTab === "ContactMessages" && <ContactMessages />}
            </Col>
        </>
    )
}

export default ProfileNav