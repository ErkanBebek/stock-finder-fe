import React, { useState, useEffect } from 'react'; // React kütüphanesinden useState ve useEffect hook'larını içe aktarıyor.
import { Col, Row, InputGroup, Form, Button, Navbar } from 'react-bootstrap'; // react-bootstrap kütüphanesinden gerekli bileşenleri içe aktarıyor.
import Spinner from 'react-bootstrap/Spinner'; // Yüklenme animasyonu için Spinner bileşenini içe aktarıyor.
import TRstocks from './TRstocks'; // TRstocks bileşenini içe aktarıyor.
import Table from 'react-bootstrap/Table'; // Tablo yapısı için gerekli bileşeni içe aktarıyor.
import { FaCircleUp, FaCircleDown, FaCircleDot } from "react-icons/fa6"; // İkonlar için gerekli bileşenleri içe aktarıyor.
import axios from 'axios'; // HTTP istekleri yapmak için axios kütüphanesini içe aktarıyor.
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

import Link from 'next/link';


//redux import
import { useDispatch, useSelector } from 'react-redux'; // Redux hook'larını içe aktarıyor.
import { setData } from '../redux/USstocks/usStocksSlice'; // Redux diliminden setData eylemini içe aktarıyor.

const Stocks = ({ stocktype }) => {
  const [symbols, setSymbols] = useState([]); // Semboller için bir state tanımlıyor.
  const [filtered_symbols, setFiltered_symbols] = useState([]); // Filtrelenmiş semboller için bir state tanımlıyor.
  const [loading, setLoading] = useState(true); // Yüklenme durumunu takip etmek için bir state tanımlıyor.
  const [error, setError] = useState(null); // Hata durumunu takip etmek için bir state tanımlıyor.

  //redux kısmı
  const user = useSelector((state) => state.auth.user);
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  const usStocksData = useSelector((state) => state.usstocks.data); // Redux store'dan usStocks verisini seçiyor.
  const dispatch = useDispatch(); // Redux eylemlerini göndermek için useDispatch hook'unu kullanıyor.
  
  const add_watclist = async (symbol, locale, watched_price) => {
    // console.log(symbol,locale,user.id);
    const pre_post = {
      "stock_symbol": symbol,
      "stock_locale": locale,
      "watched_price": parseFloat(watched_price.replace(',', '.')),
      "user_id": user.id
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/watch_list',
        pre_post);
      console.log(response.data);
      alert('User registered successfully!');
    } catch (error) {
      console.error('There was an error!', error);
      alert('Error registering user!');
    }
  }
  const remove_watclist = async (symbol, locale) => {
    // console.log(symbol,locale,user.id);
    const pre_post = {
      "stock_symbol": symbol,
      "stock_locale": locale,
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/watched_item',
        pre_post);
      console.log(response.data);
      alert('User registered successfully!');
    } catch (error) {
      console.error('There was an error!', error);
      alert('Error registering user!');
    }
  }
  
  const checkChange = (change) => {
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
  const isInWatchList=(item) =>{
    
    const numune = watch_list.some(wl_item => wl_item.stock_symbol === item.symbol);
    // console.log(numune,watch_list);
    return numune
  } 
  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/dow_jones'); // API'den sembolleri almak için bir istek yapıyor.
        if (!response.ok) {
          throw new Error('Network response was not ok'); // Eğer istek başarısız olursa bir hata fırlatıyor.
        }
        const data = await response.json(); // JSON formatında yanıtı işliyor.
        setSymbols(data); // Semboller state'ini güncelliyor.
        setFiltered_symbols(data); // Filtrelenmiş semboller state'ini güncelliyor.
      } catch (error) {
        console.error('Error fetching data:', error); // Hata varsa konsola yazdırıyor.
      } finally {
        setLoading(false); // Yüklenme durumunu false yapıyor.
      }
    };
    fetchSymbols(); // Sembolleri getiren fonksiyonu çağırıyor.

    const fetchUsStocks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/dow_jones'); // Axios ile US hisse senetleri verilerini alıyor.
        const data = response.data; // Gelen veriyi işliyor.
        dispatch(setData(data)); // Veriyi Redux store'a dispatch ediyor.
      } catch (error) {
        console.error('Error fetching data:', error); // Hata varsa konsola yazdırıyor.
      } finally {
        setLoading(false); // Yüklenme durumunu false yapıyor.
      }
    };

    fetchUsStocks(); // US hisse senetlerini getiren fonksiyonu çağırıyor.

    const interval = setInterval(() => {
      fetchUsStocks(); // US hisse senetlerini belirli aralıklarla güncelliyor.
    }, 3000);

    return () => clearInterval(interval); // Bileşen unmount edildiğinde interval'i temizliyor.
  }, []); // Sadece bileşen mount edildiğinde ve unmount edildiğinde çalışıyor.

  const handleSymbolChange = (e) => {
    const searchResults = symbols.filter(item => {
      // Burada "symbol" alanına göre arama yapıyor
      return item.symbol.toUpperCase().includes(e.target.value.toUpperCase());
    });
    setFiltered_symbols(searchResults); // Filtrelenmiş semboller state'ini güncelliyor.
  };
  const [watch_list, setWatch_list] = useState([]);  // Kripto paraları saklamak için state tanımlıyoruz.
  useEffect(() => {  // useEffect kancası, bileşen yüklendiğinde ve güncellendiğinde çalışır.
    const fetchWatchlist = async () => {  // Asenkron veri çekme fonksiyonu.
      try {
        const response = await axios.get(`http://127.0.0.1:5000/watch_list/${user.id}`, {
          // API'den veri çekiyoruz ve kripto paraları state'e kaydediyoruz.
        });
        setWatch_list(response.data);
        // veri bastır
        // console.log(response.data);

      } catch (error) {
        console.error('Error fetching data:', error);  // Hata varsa konsola yazdırıyoruz.
      }
    };
    fetchWatchlist();  // Veri çekme fonksiyonunu çağırıyoruz.
    const interval = setInterval(() => {
      fetchWatchlist(); // US hisse senetlerini belirli aralıklarla güncelliyor.
    }, 3000);

    return () => clearInterval(interval); 
  }, []);
 

  if (loading) {
    return <span>Loading... <Spinner animation="border" variant="primary" /></span>; // Yüklenme durumunda spinner gösteriyor.
  }

  if (error) {
    return <p>Error: {error}</p>; // Hata durumunda hata mesajı gösteriyor.
  }
  return (
    <>
      <div>
        {/* <Form inline className='mt-2'>
          <Row>
            <Col xs="auto" className='p-0'>
              <Form.Control
                type="text"
                onChange={handleSymbolChange}
                placeholder="Search"
                className="mr-sm-2"
              />
            </Col>
            <Col xs="auto" className='p-0'>
              <Button type="submit">Search</Button>
            </Col>
          </Row>
        </Form> */}
        {/* {filtered_symbols.map((item, index) => (
          <>
            <Button key={index} className='btn btn-light border m-1' >{item.symbol}</Button>
          </>
        ))} */}
        <hr />
        <Table striped bordered hover>
          <thead>
            <tr>
            {loggedIn && (<th>Add watch list</th>)}


              <th>Logo</th>
              <th>Symbol</th>
              <th>Name</th>
              <th>market cap</th>
              <th>last</th>
              <th>change </th>
              <th>volume</th>
              <th>rel volume</th>
              <th>P/E</th>
              <th>EPS dil</th>
              <th>EPS dil growt</th>
              <th>div yield</th>
              <th>sector</th>
            </tr>
          </thead>
          <tbody>
            {usStocksData.stockData != null && usStocksData.stockData.map((item, index) => (
              <tr key={index}>
              <>
                {loggedIn && (
                  isInWatchList(item) ? (
                    <td>
                    <button
                      onClick={() => remove_watclist(item.symbol, item.locale)}
                      className='btn btn-danger justify-content-center rounded-circle fs-1 rotate fw-bold d-flex align-items-center p-1'
                    >
                      <FaMinusCircle className='fs-2' />
                    </button>
                    </td>
                  ) : (
                    <td>
                    <button
                    title={item.symbol}
                    onClick={() => add_watclist(item.symbol, item.locale, item.price)}
                    className='btn btn-success justify-content-center rounded-circle fs-1 rotate fw-bold d-flex align-items-center p-1'
                    >
                      <FaPlusCircle className='fs-2' />
                    </button>
  
                      </td>
                  )
                )}
              </>
                <td>
                  <img src={item.icon_src != "NaN" ? item.icon_src : "https://placehold.co/32x32?text=/"} className='rounded-circle ' height={"32"} />

                </td>
                <td><Link
                className='nav-link'
                href={"/stock-detail/" + "US/" +
                  item.symbol}
              >
                {item.symbol}
              </Link>
                  {checkChange(item.change)}

                </td>
                <td>{item.name}</td>
                <td>{item.market_cap}</td>
                <td>{item.price} <span >USD</span></td>
                <td>{item.change}</td>
                <td>{item.volume}</td>
                <td>{item.percentage_volume}</td>
                <td>{item.p_e}</td>
                <td>{item.eps_dil}</td>
                <td>{item.eps_dil_growt}</td>
                <td>{item.div_yield}</td>
                <td>{item.sector}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Stocks;

/*Kullanılan Kütüphaneler ve Ne İşe Yaradıkları:
React: Kullanıcı arayüzü oluşturmak için kullanılan bir kütüphane. useState ve useEffect gibi hook'lar, 
bileşenlerde durum ve yan etkileri yönetmek için kullanılır.

react-bootstrap: React ile Bootstrap bileşenlerini kullanmayı kolaylaştıran bir kütüphane. 
Col, Row, InputGroup, Form, Button, Navbar, Spinner ve Table gibi bileşenler içerir.

react-icons: Popüler ikon paketlerini React bileşenleri olarak kullanmayı sağlayan bir kütüphane. 
FaCircleUp, FaCircleDown ve FaCircleDot gibi ikonları içerir.

axios: HTTP istekleri yapmak için kullanılan bir kütüphane. 
API'lere istek göndermek ve yanıtları işlemek için kullanılır.

react-redux: Redux ile React bileşenleri arasında bağlantı kurmayı sağlayan kütüphane. 
useDispatch ve useSelector hook'ları, Redux store ile etkileşim kurmak için kullanılır.

Redux: Uygulama durumunu yönetmek için kullanılan bir kütüphane. 
Durumları merkezi bir yerde saklayarak uygulamanın farklı bileşenleri arasında tutarlılık sağlar.*/