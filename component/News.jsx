import React, { useState, useEffect } from 'react';  // React, useState ve useEffect kütüphanelerini içe aktarıyoruz.
import { Button, Card, Container, Row, Col } from 'react-bootstrap';  // Button, Card, Container, Row ve Col bileşenlerini react-bootstrap kütüphanesinden içe aktarıyoruz.
import Spinner from 'react-bootstrap/Spinner';  // Spinner bileşenini react-bootstrap kütüphanesinden içe aktarıyoruz.

const NewsComponent = () => {  // NewsComponent bileşeni tanımlanıyor.
    const [news, setNews] = useState([]);  // Haberleri saklamak için state tanımlıyoruz.
    const [loading, setLoading] = useState(true);  // Yüklenme durumunu saklamak için state tanımlıyoruz.
    const [error, setError] = useState(null);  // Hata durumunu saklamak için state tanımlıyoruz.

    useEffect(() => {  // useEffect kancası, bileşen yüklendiğinde ve güncellendiğinde çalışır.
        const fetchNews = async () => {  // Asenkron veri çekme fonksiyonu.
            try {
                const response = await fetch('https://finnhub.io/api/v1/news?category=general&token=cpt67ghr01qpk40rs4c0cpt67ghr01qpk40rs4cg');  // Finnhub API'sine istek yapıyoruz.
                if (!response.ok) {
                    throw new Error('Network response was not ok');  // Hata kontrolü yapıyoruz.
                }
                const data = await response.json();  // Gelen veriyi JSON formatına çeviriyoruz.
                setNews(data);  // Haberleri state'e kaydediyoruz.
            } catch (error) {
                console.error('Error fetching data:', error);  // Hata varsa konsola yazdırıyoruz.
                setError(error);  // Hata durumunu state'e kaydediyoruz.
            } finally {
                setLoading(false);  // Yüklenme durumunu false yapıyoruz.
            }
        };

        fetchNews();  // Veri çekme fonksiyonunu çağırıyoruz.
    }, []);  // useEffect'in bağımlılık dizisi boş olduğunda, bu kod bileşen yüklendiğinde çalışır.

    if (loading) {  // Yüklenme durumu true ise yüklenme spinner'ı gösteriyoruz.
        return <span>Loading... <Spinner animation="border" variant="primary" /></span>;
    }

    if (error) {  // Hata durumu varsa hata mesajını gösteriyoruz.
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <h2>Latest News</h2>
            {/* // Haber başlığını ekliyoruz. */}
            <ul>
                <Container fluid>
                    {/* // İçerikleri kapsayan bir Container bileşeni oluşturuyoruz. */}
                    <Row>
                        {/* // Satır bileşeni oluşturuyoruz. */}
                        {news.map((item, index) => (  // Haber verilerini map ile dolaşıyoruz.
                            <Card key={index + "card"} style={{ width: '13rem' }} className='mx-1'>
                                {/* // Her bir haber için bir Card bileşeni oluşturuyoruz. */}
                                <Card.Img variant="top" src={item.image} />
                                {/* // Haber görselini ekliyoruz. */}
                                <Card.Body>
                                    <Card.Title>{item.headline}</Card.Title>
                                    {/* // Haber başlığını ekliyoruz. */}
                                    <Card.Text>
                                        {item.summary}
                                        {/* // Haber özetini ekliyoruz. */}
                                    </Card.Text>
                                    <a href={item.url} className='btn btn-primary'>Go Details</a>
                                    {/* // Haber detaylarına yönlendiren bir buton ekliyoruz. */}
                                </Card.Body>
                            </Card>
                        ))}
                    </Row>
                </Container>
            </ul>
        </div>
    );
};

export default NewsComponent;  // NewsComponent bileşenini dışa aktarıyoruz.
