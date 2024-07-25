import React, { useState, useEffect } from 'react';  // React, useState ve useEffect kütüphanelerini içe aktarıyoruz.
import { Container, Row, Col, ListGroup } from 'react-bootstrap';  // Container, Row, Col ve ListGroup bileşenlerini react-bootstrap kütüphanesinden içe aktarıyoruz.
import axios from 'axios';  // axios kütüphanesini içe aktarıyoruz.
import Table from 'react-bootstrap/Table';  // Table bileşenini react-bootstrap kütüphanesinden içe aktarıyoruz.
import Spinner from 'react-bootstrap/Spinner';  // Spinner bileşenini react-bootstrap kütüphanesinden içe aktarıyoruz.

// redux import
import { useDispatch, useSelector } from 'react-redux';  // useDispatch ve useSelector kütüphanelerini react-redux kütüphanesinden içe aktarıyoruz.
import { setData } from '../redux/GlobalCoins/globalCoinsSlice';  // setData fonksiyonunu globalCoinsSlice dosyasından içe aktarıyoruz.

const GlobalMarketsCoins = () => {  // GlobalMarketsCoins bileşeni tanımlanıyor.
    const [cryptos, setCryptos] = useState([]);  // Kripto para verilerini saklamak için state tanımlıyoruz.
    const [loading, setLoading] = useState(true);  // Yüklenme durumunu saklamak için state tanımlıyoruz.
    const [error, setError] = useState(null);  // Hata durumunu saklamak için state tanımlıyoruz.

    // redux kısmı
    const globalCoinsData = useSelector((state) => state.globalcoins.data);  // Redux state'inden globalCoins verilerini alıyoruz.
    //console.log(globalCoinsData);
    const dispatch = useDispatch();  // Redux dispatch fonksiyonunu alıyoruz.

    useEffect(() => {  // useEffect kancası, bileşen yüklendiğinde ve güncellendiğinde çalışır.
        const fetchData = async () => {  // Asenkron veri çekme fonksiyonu.
            try {
                const response = await axios.get('http://127.0.0.1:5000/cryptocurrencies');
                //setCryptos(response.data);
                //console.log(response.data);
                dispatch(setData(response.data));  // Alınan verileri Redux store'a dispatch ediyoruz.
            } catch (error) {
                console.error('Error fetching data:', error);  // Hata varsa konsola yazdırıyoruz.
                setError(error);  // Hata durumunu state'e kaydediyoruz.
            } finally {
                setLoading(false);  // Yüklenme durumunu false yapıyoruz.
            }
        };

        fetchData();  // Veri çekme fonksiyonunu çağırıyoruz.

        const interval = setInterval(() => {  // Her 10 saniyede bir veri çekmek için interval tanımlıyoruz.
            fetchData();
        }, 10000);

        // ComponentWillUnmount benzeri temizleme
        return () => clearInterval(interval);  // Bileşen unmount olduğunda interval'i temizliyoruz.
    }, [dispatch]);

    if (loading) {  // Yüklenme durumu true ise yüklenme spinner'ı gösteriyoruz.
        return (
            <span>Loading... <Spinner animation="border" variant="primary" /></span>
        );
    }
    
    if (error) {  // Hata durumu varsa hata mesajını gösteriyoruz.
        return <p>Error: {error.message}</p>;
    }

    return (
        <Container className='p-0'>  
        {/* // Tüm içerikleri kapsayan bir Container bileşeni oluşturuyoruz. */}
            <Row>
                <Col>
                    <h4>Global Coins</h4>  
                    {/* // Başlık ekliyoruz. */}
                    <ListGroup>
                        <Table striped bordered hover>  
                            {/* // Şeritli, kenarlıklı ve üzerine gelindiğinde vurgulanan bir tablo oluşturuyoruz. */}
                            <thead>
                                <tr>
                                    <th>Coin</th>
                                    <th>Current Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {globalCoinsData?.stockData?.slice(0, 10).map(crypto => (  // Redux store'dan alınan verileri tabloya ekliyoruz.
                                    <tr key={crypto.symbol}>
                                        <td className='p-1'>{crypto.name}</td>
                                        <td className='p-1'>{crypto.price} $</td>
                                        {/* <td>${crypto.market_cap.toLocaleString()}</td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default GlobalMarketsCoins;  // GlobalMarketsCoins bileşenini dışa aktarıyoruz.
