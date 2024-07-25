import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import Head from "next/head";
import { Form, Button, Container, Row, Col, ButtonGroup } from "react-bootstrap";

import GlobalMarketsCoins from "../../component/GlobalMarketsCoins";
import BottomSlider from "../../component/BottomSlider";
import { useRouter } from 'next/router'
import { Card } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';  // Spinner bileşenini react-bootstrap kütüphanesinden içe aktarıyoruz.
import { MdLineAxis, MdCandlestickChart, MdAreaChart } from "react-icons/md";  // MdLineAxis ikonunu react-icons/md kütüphanesinden içe aktarıyoruz.


// redux import
import { useDispatch, useSelector } from 'react-redux';  // useDispatch ve useSelector kütüphanelerini react-redux kütüphanesinden içe aktarıyoruz.
import { setData, login } from '../../redux/Auth/authSlice';  // setData fonksiyonunu globalCoinsSlice dosyasından içe aktarıyoruz.
import CandleChart from '../../component/Graph/CandleChart';  // CandleChart bileşenini içe aktarıyoruz.
import AreaChart from '../../component/Graph/AreaChart';  // CandleChart bileşenini içe aktarıyoruz.
import LineChart from '../../component/Graph/LineChart';  // CandleChart bileşenini içe aktarıyoruz.


export default function Stock_symbol() {
    const dispatch = useDispatch();
    const router = useRouter()
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const user = useSelector((state) => state.auth.user);

    const globalCoinsData = useSelector((state) => state.globalcoins.data);  // Redux state'inden globalCoins verilerini alıyoruz.
    const locale = "World"
    const coin_symbol = router.query.coin_symbol
    console.log(coin_symbol);
    const [currentStock, setCurrentStock] = useState({})
    const [comments, setComments] = useState([])
    const [candle_data, setCandle_data] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeChartType, setactiveChartType] = useState("Area")  // Aktif grafik türünü belirlemek için bir state kullanıyoruz.

    useEffect(() => {
        const fetchCandle_data = async () => {  // Asenkron veri çekme fonksiyonu.
            try {
                const response = await axios.get(`http://127.0.0.1:5000/candle/${locale}/${currentStock.symbol}`, {
                    // API'den veri çekiyoruz ve kripto paraları state'e kaydediyoruz.
                });
                setCandle_data(response.data);
                // veri bastır
                console.log(candle_data);

            } catch (error) {
                console.error('Error fetching data:', error);  // Hata varsa konsola yazdırıyoruz.
            } finally {
                setLoading(false)
            }
        };
        fetchCandle_data();
        const fetchComments = async () => {  // Asenkron veri çekme fonksiyonu.
            try {
                const response = await axios.get(`http://127.0.0.1:5000/comments/${locale}/${coin_name}`, {
                    // API'den veri çekiyoruz ve kripto paraları state'e kaydediyoruz.
                });
                setComments(response.data);
                // veri bastır
                console.log(comments);

            } catch (error) {
                console.error('Error fetching data:', error);  // Hata varsa konsola yazdırıyoruz.
            }
        };
        fetchComments();
        let get_current_stock = globalCoinsData.stockData?.find((element) => element.symbol == coin_symbol);
        console.log(get_current_stock);
        setCurrentStock(get_current_stock)
    }, [globalCoinsData])

    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            handleCommentSubmit(comment);
            setComment('');
        }
    };
    const handleCommentSubmit = async (newComment) => {
        // console.log(symbol,locale,user.id);
        const pre_post = {
            "stock_symbol": coin_symbol,
            "stock_locale": locale,
            "comment": newComment,
            "user_id": user.id
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/comment',
                pre_post);
            console.log(response.data);
            alert('User registered successfully!');
        } catch (error) {
            console.error('There was an error!', error);
            alert('Error registering user!');
        }
    };


    return (
        <>

            <Container className="mt-3">

                <Card style={{
                    width: '40rem',
                    background: 'linear-gradient(-45deg, #66a6ff 10%, #003366 90%)',
                    // 030 Happy FisherGet .PNG#89f7fe→#66a6ff
                    color: 'white',
                    padding: '20px',
                    borderRadius: '10px'
                }}>
                    <Card.Body>

                        <h1> {currentStock.name} <img src={currentStock.icon_src != "NaN" ? currentStock.icon_src : "https://placehold.co/32x32?text=/"} className='rounded-circle ' height={"32"} /></h1>
                        <span>{currentStock.symbol + " | " + locale}</span><br />
                        <span>price: {currentStock.price}</span><br />
                        <span>sector: {currentStock.category}</span><br />
                        <span>change: {currentStock.change}</span><br />
                    </Card.Body>
                </Card>

            </Container>

            <Container className="mt-3">
                {comments.map((f_comment, index) => (
                    <Card className='mb-1'>
                        <Card.Body>
                            <Row className='p-0'>
                                <Col className='col-1'>
                                    <img src='https://placehold.co/32x32?text=/' className='rounded-circle ' height={"32"} />
                                </Col>
                                <Col className='col-8'>
                                    comment by : {f_comment.user_id}<br />
                                    {f_comment.comment}
                                </Col>
                                <Col className='col-3'>
                                    {f_comment.created_at}
                                </Col>
                            </Row>


                        </Card.Body>
                    </Card>
                ))}
                {comments.length == 0 && (<p>Hiç yorum yok ilk yorumu sen at</p>)}
            </Container>
            <Container>
            <ButtonGroup className="mb-2">
                    {/* // Grafik türü seçim butonları için bir grup oluşturuyoruz. */}
                    <Button onClick={() => setactiveChartType("Area")}>Area <MdAreaChart /></Button>
                    <Button onClick={() => setactiveChartType("Candle")}>Candle <MdCandlestickChart /></Button>
                    <Button onClick={() => setactiveChartType("Line")}>Line <MdAreaChart /></Button>
                    {/* // Alan grafiği seçimi için buton. */}
                    {/* // Çizgi grafiği seçimi için buton. */}
                </ButtonGroup>
                {loading ? (
                    <span>Loading... <Spinner animation="border" variant="primary" /></span>
                ) : (
                    activeChartType === "Candle" ? (
                        <CandleChart locale={locale} symbol={currentStock.symbol} />
                    ) : activeChartType === "Area" ? (
                        <AreaChart locale={locale} symbol={currentStock.symbol} />
                    ) : activeChartType === "Line" ? (
                        <LineChart locale={locale} symbol={currentStock.symbol} />
                    ) : null
                )}
            </Container>
            {loggedIn && (

                <Container className="mt-3">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="comment">
                            <Form.Label>Leave a Comment</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write your comment here..."
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-2">
                            Submit
                        </Button>
                    </Form>
                </Container>
            )}

            {/* </Card.Body>
             </Card> */}
        </>
    );
}
