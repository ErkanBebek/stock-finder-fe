import React, { useState, useEffect } from 'react';  // React, useState ve useEffect kütüphanelerini içe aktarıyoruz.
import { Nav, NavDropdown } from 'react-bootstrap';  // Nav ve NavDropdown bileşenlerini react-bootstrap kütüphanesinden içe aktarıyoruz.
import Dropdown from 'react-bootstrap/Dropdown';  // Dropdown bileşenini react-bootstrap kütüphanesinden içe aktarıyoruz.
import DropdownButton from 'react-bootstrap/DropdownButton';  // DropdownButton bileşenini react-bootstrap kütüphanesinden içe aktarıyoruz.
import Chart from './Chart';  // Chart bileşenini içe aktarıyoruz.
import News from './News';  // News bileşenini içe aktarıyoruz.
import Calendar from './Calendar';  // Calendar bileşenini içe aktarıyoruz.
import Stocks from './Stocks';  // Stocks bileşenini içe aktarıyoruz.
import ContactUs from './ContactUs';  // ContactUs bileşenini içe aktarıyoruz.
import Fundamentals from './Fundamentals';  // Fundamentals bileşenini içe aktarıyoruz.
import { Container, Row, Card, Button, Stack, Col } from "react-bootstrap";  // Container, Row, Card, Button, Stack ve Col bileşenlerini react-bootstrap kütüphanesinden içe aktarıyoruz.
import ReactBoostrap from "react-bootstrap"
import axios from 'axios';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';  // useDispatch ve useSelector kütüphanelerini react-redux kütüphanesinden içe aktarıyoruz.

function InnerNav() {  // InnerNav bileşeni tanımlanıyor.
    const [activeTab, setactiveTab] = useState("USStocks");  // Aktif sekmeyi saklamak için state tanımlıyoruz.
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

        // const fetchSymbols = async () => {  // Asenkron veri çekme fonksiyonu.
        //     try {
        //         const response = await fetch('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=cpt67ghr01qpk40rs4c0cpt67ghr01qpk40rs4cg');
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');  // Hata kontrolü yapıyoruz.
        //         }
        //         const data = await response.json();  // Gelen veriyi JSON formatına çeviriyoruz.
        //         setSymbols(data);  // Hisse sembollerini state'e kaydediyoruz.
        //     } catch (error) {
        //         console.error('Error fetching data:', error);  // Hata varsa konsola yazdırıyoruz.
        //     }
        // };
        // fetchSymbols();  // Veri çekme fonksiyonunu çağırıyoruz.
    }, []);  // useEffect'in bağımlılık dizisi boş olduğunda, bu kod bileşen yüklendiğinde çalışır.

    return (
        <>
            <div className="container justify-content-center px-0">
                <Nav className="nav nav-tabs">
                    {/* // Navigasyon menüsü için bir Nav bileşeni oluşturuyoruz. */}
                    {/* <Nav.Item >
                        <Nav.Link href="#Home">Home</Nav.Link>
                    </Nav.Item> */}

                    <Nav.Item>
                        <NavDropdown title="Coins" className='d-flex' id="basic-nav-dropdown">
                            {/* // Kripto paraları listelemek için bir NavDropdown bileşeni oluşturuyoruz. */}
                            {globalCoinsData?.stockData?.slice(0,20).map((crypto, index) => (  // Redux store'dan alınan kripto verilerini listeye ekliyoruz.
                                 <Link
                                    key={crypto.symbol}
                                        className='dropdown-item'
                                        href={"/coin-detail/" +
                                            crypto.symbol}
                                    >

                                    <img src={crypto.icon_src} className='rounded-circle' height={"32"} />

                                    <span className='px-2'>{crypto.name}</span>
                                    </Link>
                                
                            ))}
                        </NavDropdown>
                    </Nav.Item>
                    <Nav.Item>
                        <NavDropdown title="Stocks & Coins"
                            href="#USStocks"
                            className={(activeTab === "USStocks" || activeTab === "TRStocks" || activeTab === "Coins") ? "active" : ""}
                            id="basic-nav-dropdown">
                            {/* // Hisse senetlerini listelemek için bir NavDropdown bileşeni oluşturuyoruz. */}
                            <NavDropdown.Item onClick={() => setactiveTab("USStocks")} href="#USStocks">US Stocks</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setactiveTab("TRStocks")} href="#TRStocks">TR Stocks (Live)</NavDropdown.Item>
                            {/* <NavDropdown.Item onClick={() => setactiveTab("WorldMarkets")} href="#WorldMarkets">World Markets</NavDropdown.Item> */}
                            <NavDropdown.Item onClick={() => setactiveTab("Coins")} href="#Coins">Coins</NavDropdown.Item>
                        </NavDropdown>
                    </Nav.Item>
                    {/* <Nav.Item>
                        <Nav.Link onClick={() => setactiveTab("Chart")} className={(activeTab === "Chart" ? "active" : "")} href="#Charts">Charts</Nav.Link>
                    </Nav.Item> */}
                    <Nav.Item>
                        <Nav.Link onClick={() => setactiveTab("Fundamentals")} href="#Fundamentals">Fundamentals</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => setactiveTab("Calendar")} href="#Calendar">Calendar</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => setactiveTab("News")} className={(activeTab === "News" ? "active" : "")} href="#News">News</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => setactiveTab("ContactUs")} href="#ContactUs">Contact Us</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
            <Col xs={12} lg={9} className="pt-2">
                {/* // İçerikleri göstermek için bir Col bileşeni oluşturuyoruz. */}
                {activeTab === "Chart" && <Chart />}
                {/* // Aktif sekme Chart ise Chart bileşenini render ediyoruz. */}
                {activeTab === "News" && <News />}
                {/* // Aktif sekme News ise News bileşenini render ediyoruz. */}
                {activeTab === "Calendar" && <Calendar />}
                {/* // Aktif sekme Calendar ise Calendar bileşenini render ediyoruz. */}
                {activeTab === "USStocks" && <Stocks stocktype="USStocks" />}
                {/* // Aktif sekme USStocks ise USStocks bileşenini render ediyoruz. */}
                {activeTab === "TRStocks" && <Stocks stocktype="TRStocks" />}
                {/* // Aktif sekme TRStocks ise TRStocks bileşenini render ediyoruz. */}
                {activeTab === "WorldMarkets" && <Stocks stocktype="WorldMarkets" />}
                {activeTab === "Coins" && <Stocks stocktype="Coins" />}
                {/* // Aktif sekme WorldMarkets ise WorldMarkets bileşenini render ediyoruz. */}
                {activeTab === "ContactUs" && <ContactUs />}
                {/* // Aktif sekme ContactUs ise ContactUs bileşenini render ediyoruz. */}
                {activeTab === "Fundamentals" && <Fundamentals />}
                {/* // Aktif sekme Fundamentals ise Fundamentals bileşenini render ediyoruz. */}
            </Col>
        </>
    );
}

export default InnerNav;  // InnerNav bileşenini dışa aktarıyoruz.
