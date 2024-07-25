import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import axios from 'axios';

// Zaman damgasına göre veriyi sıralayan ve Unix zaman damgasına çeviren fonksiyon
const prepareData = (data) => {
    // Verileri zamana göre sırala
    const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.time.year, a.time.month - 1, a.time.day, a.time.hour, a.time.minute);
        const dateB = new Date(b.time.year, b.time.month - 1, b.time.day, b.time.hour, b.time.minute);
        return dateA - dateB;
    });

    // Unix zaman damgasına çevir
    const preparedData = sortedData.map(item => ({
        ...item,
        time: Math.floor(new Date(item.time.year, item.time.month - 1, item.time.day, item.time.hour, item.time.minute).getTime() / 1000),
        value: item.close // Line chart için close değerini kullanıyoruz
    }));

    console.log(preparedData); // Veri setini kontrol edin
    return preparedData;
};

// CandleChart bileşeni tanımlanıyor
const CandleChart = ({ locale, symbol }) => {
    const [graph_data, setGraph_data] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCandle_data = async (fn_locale, fn_symbol) => {
            setLoading(true); // Asenkron veri çekme fonksiyonu.
            try {
                const response = await axios.get(`http://127.0.0.1:5000/candle/${fn_locale}/${fn_symbol}`, {
                    // API'den veri çekiyoruz ve kripto paraları state'e kaydediyoruz.
                });
                setGraph_data(response.data);
                // veri bastır
                console.log(graph_data);

            } catch (error) {
                console.error('Error fetching data:', error); // Hata varsa konsola yazdırıyoruz.
            } finally {
                setLoading(false);
            }
        };
        fetchCandle_data(locale, symbol);
    }, [locale, symbol]);

    const colors = {
        backgroundColor: 'white', // Arka plan rengi
        textColor: 'black', // Metin rengi
        lineColor: '#2962FF', // Çizgi rengi
    };

    const [preparedData, setPreparedData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = prepareData(graph_data);
            setPreparedData(data);
        };

        fetchData();
    }, [graph_data]);

    const chartContainerRef = useRef();

    useEffect(() => {
        if (preparedData.length === 0) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: colors.backgroundColor }, // Arka plan rengi ayarlanıyor
                textColor: colors.textColor, // Metin rengi ayarlanıyor
            },
            width: chartContainerRef.current.clientWidth, // Grafik genişliği
            height: 300, // Grafik yüksekliği
        });

        const lineSeries = chart.addLineSeries({
            color: colors.lineColor,
            lineWidth: 2,
        });

        lineSeries.setData(preparedData);

        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        };

        chart.timeScale().fitContent();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [preparedData, colors.backgroundColor, colors.textColor, colors.lineColor]);

    return (
        <div>
            <div ref={chartContainerRef} style={{ width: '100%', height: '300px' }} />
            {/* <ButtonGroup aria-label="Basic example">
                <Button variant="secondary">1D</Button>
                <Button variant="secondary">1W</Button>
                <Button variant="secondary">1M</Button>
            </ButtonGroup> */}
        </div>
    );
};

export default CandleChart;
