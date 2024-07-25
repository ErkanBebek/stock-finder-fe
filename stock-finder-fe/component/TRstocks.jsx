import { useState, useEffect } from 'react';  // React kütüphanesini içe aktarıyoruz.
import Table from 'react-bootstrap/Table';  // Table bileşenini react-bootstrap kütüphanesinden içe aktarıyoruz.
import { useDispatch, useSelector } from 'react-redux';  // useDispatch ve useSelector kütüphanelerini react-redux kütüphanesinden içe aktarıyoruz.
import { FaCircleUp, FaCircleDown, FaCircleDot } from "react-icons/fa6";  // FaCircleUp, FaCircleDown ve FaCircleDot ikonlarını react-icons/fa6 kütüphanesinden içe aktarıyoruz.
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import Link from 'next/link';
import axios from 'axios';

const TRstocks = () => {  // TRstocks bileşeni tanımlanıyor.
  // redux kısmı
  const trStocksData = useSelector((state) => state.trstocks.data);  // Redux state'inden trStocks verilerini alıyoruz.
  const user = useSelector((state) => state.auth.user);
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  console.log(trStocksData);

  const add_watclist = async (symbol, locale, watched_price) => {
    // console.log(symbol,locale,user.id);
    const pre_post = {
      "stock_symbol": symbol,
      "stock_locale": locale,
      "watched_price": watched_price,
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
 
  return (
    <Table striped bordered hover>
      {/* // Şeritli, kenarlıklı ve üzerine gelindiğinde vurgulanan bir tablo oluşturuyoruz. */}
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
        {trStocksData != null && trStocksData.stockData.map((item, index) => (  // trStocksData null değilse ve veriler varsa tabloya ekliyoruz.
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
            <td className='d-flex'>
              <Link
                className='nav-link'
                href={"/stock-detail/" + "TR/" +
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
  );
}

export default TRstocks;  // TRstocks bileşenini dışa aktarıyoruz.
