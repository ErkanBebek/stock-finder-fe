// React kütüphanesinden gerekli modüller ithal ediliyor
import React, { useState, useEffect } from 'react';

// Bootstrap bileşenleri ithal ediliyor
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card';
import { FaCircleUp, FaCircleDown, FaCircleDot } from "react-icons/fa6";
import { Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Link from 'next/link';

// Redux kütüphanesinden gerekli modüller ithal ediliyor
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../redux/TRstocks/trStocksSlice';

// BottomSlider bileşeni tanımlanıyor
const BottomSlider = () => {
    // Bileşenin state'leri tanımlanıyor
    //const [bist, setBist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Redux state ve dispatch fonksiyonları tanımlanıyor
    const trStocksData = useSelector((state) => state.trstocks.data);
    //console.log(trStocksData);
    const dispatch = useDispatch();

    // useEffect hook'u, bileşen yüklendiğinde ve her render olduğunda çalışır
    useEffect(() => {
        // BIST verilerini çeken asenkron fonksiyon tanımlanıyor
        const fetchBist = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/bist_tw');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                //setBist(data.stockData);
                //console.log(data);
                dispatch(setData(data)); // Verileri Redux store'a gönderiyor
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        // BIST verilerini çekme fonksiyonu çağrılıyor
        fetchBist();

        // Her 3000 milisaniyede bir fetchBist fonksiyonunu çağıran bir interval oluşturuluyor
        const interval = setInterval(() => {
            fetchBist();
        }, 3000);

        // Bileşen unmount olduğunda interval temizleniyor
        return () => clearInterval(interval);
    }, []);

    function checkChange(change) {
        // Remove the "%" sign and parse the value as a float
        let value = parseFloat(change.replace('%', ''));

        // Check if the value is positive, negative or zero
        if (value > 0) {
            return <span className='text-success'> <FaCircleUp /></span>
        } else if (value < 0) {
            return <span className='text-danger'> <FaCircleDown /></span>
        } else {
            return <span className='text-primary'> <FaCircleDot /></span>
        }
    }
    // Yüklenme durumu varsa Spinner ile yüklenme ekranı gösteriliyor
    if (loading) {
        return (
            <Navbar fixed="bottom" className='p-0' style={{ height: '75px' }} bg="light">
                <span>Loading... <Spinner animation="border" variant="primary" /></span>
            </Navbar>
        );
    }

    // Hata durumu varsa hata mesajı gösteriliyor
    if (error) {
        return <p>Error: {error}</p>;
    }

    // Ana döndürme fonksiyonu; Navbar bileşeni ve içindeki marquee etiketi ile veriler gösteriliyor
    return (
        <Navbar fixed="bottom" className='p-0' style={{ height: '75px' }} bg="light">
            <Container className='m-0 col-12' style={{ height: "100%" }}>
                <marquee className="d-flex col-12">
                    {trStocksData != null && trStocksData?.stockData?.map((item, index) => (
                        <div key={index} className='btn p-0 justify-content-center  align-items-center'>
                                <Link
                                    className='btn btn-outline-secondary m-1 justify-content-center  align-items-center'
                                    href={"/stock-detail/" + "TR/" +
                                        item.symbol}
                                >
                                              <img src={item.icon_src != "NaN"  ? item.icon_src : "https://placehold.co/32x32?text=/"} className='rounded-circle ' height={"32"} />


                                <span className='mx-1'>{item.symbol} | {item.price}</span>
                                {checkChange(item.change)}
                        </Link>
                            </div>
                    ))}
                </marquee>
            </Container>
        </Navbar>
    );
};

export default BottomSlider;
/*
Kullanılan Kütüphaneler
React: Kullanıcı arayüzü bileşenleri oluşturmak için kullanılır.
react-bootstrap: Bootstrap'in React versiyonu. Kullanıcı arayüzünü oluşturmak için hazır bileşenler sağlar.
react-icons: Popüler ikonları React projelerinde kullanmak için bir kütüphane.
react-redux: Redux ile React arasında entegrasyon sağlar. Verilerin merkezi olarak yönetilmesini sağlar.
*/
