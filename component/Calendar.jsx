// React kütüphanesinden gerekli modüller ithal ediliyor
import React, { useState, useEffect } from 'react';
// Axios kütüphanesi HTTP istekleri yapmak için ithal ediliyor
import axios from 'axios';
// Bootstrap bileşenleri ithal ediliyor
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

// Calendar bileşeni tanımlanıyor
const Calendar = () => {
    // Bileşenin state'leri tanımlanıyor
    const [calendar, setCalendar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect hook'u, bileşen yüklendiğinde ve her render olduğunda çalışır
    useEffect(() => {
        // Ekonomik takvim verilerini çeken asenkron fonksiyon tanımlanıyor
        const fetchCalendar = async () => {
            try {
                const response = await fetch('/api/economic-calendar'); // Veriler fetch ile çekiliyor
                if (!response.ok) {
                    throw new Error('Network response was not ok'); // Eğer yanıt başarısızsa hata fırlatılıyor
                }
                const data = await response.json(); // Yanıt JSON formatında parse ediliyor
                console.log(data); // Veriler konsola yazdırılıyor
                setCalendar(data); // Veriler state'e kaydediliyor
            } catch (error) {
                console.error('Error fetching data:', error); // Hata konsola yazdırılıyor
                setError(error.message); // Hata state'e kaydediliyor
            } finally {
                setLoading(false); // Yüklenme durumu sona eriyor
            }
        };

        fetchCalendar(); // Ekonomik takvim verilerini çekme fonksiyonu çağrılıyor
    }, []);

    // Yüklenme durumu varsa Spinner ile yüklenme ekranı gösteriliyor
    if (loading) {
        return <span>Loading... <Spinner animation="border" variant="primary" /></span>;
    }

    // Hata durumu varsa hata mesajı gösteriliyor
    if (error) {
        return <p>Error: {error}</p>;
    }

    // Tarih anahtarını dinamik olarak almak
    const dateKey = Object.keys(calendar.dates[0])[0]; // İlk tarihin anahtarı alınıyor
    const events = calendar.dates[0][dateKey]; // Bu tarihteki etkinlikler alınıyor

    return (
        <>
            <Table striped bordered hover> {/* Bootstrap tablo bileşeni */}
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>{dateKey} Events</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event, index) => (
                        <tr key={index}> {/* Her etkinlik için bir satır oluşturuluyor */}
                            <td>{event.time}</td>
                            <td>{event.event}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default Calendar;
/*
Kullanılan Kütüphaneler
React: Kullanıcı arayüzü bileşenleri oluşturmak için kullanılır.

axios: HTTP istekleri yapmak için kullanılır, özellikle API çağrıları için kullanışlıdır.

react-bootstrap: Bootstrap'in React versiyonu. Kullanıcı arayüzünü oluşturmak için hazır bileşenler sağlar.

react-bootstrap/Table: Bootstrap'in tablo bileşeni. Verileri tablo formatında göstermek için kullanılır.

react-bootstrap/Spinner: Bootstrap'in yüklenme göstergesi bileşeni. Yüklenme durumu için görsel bir gösterge sağlar.

*/