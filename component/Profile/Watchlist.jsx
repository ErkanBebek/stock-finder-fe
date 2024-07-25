import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';  // useDispatch ve useSelector kütüphanelerini react-redux kütüphanesinden içe aktarıyoruz.
import axios from 'axios';
import Table from 'react-bootstrap/Table';  // Table bileşenini react-bootstrap kütüphanesinden içe aktarıyoruz.
import { FaCircleUp, FaCircleDown, FaCircleDot } from "react-icons/fa6";  // FaCircleUp, FaCircleDown ve FaCircleDot ikonlarını react-icons/fa6 kütüphanesinden içe aktarıyoruz.
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

import Link from 'next/link';

const Watchlist = () => {
  const user = useSelector((state) => state.auth.user);
  const trStocksData = useSelector((state) => state.trstocks.data.stockData);  // Redux state'inden trStocks verilerini alıyoruz.
  const usStocksData = useSelector((state) => state.usstocks.data.stockData); // Redux store'dan usStocks verisini seçiyor.
  const globalCoinsData = useSelector((state) => state.globalcoins.data.stockData);  // Redux state'inden globalCoins verilerini alıyoruz.

  const loggedIn = useSelector((state) => state.auth.loggedIn);

  const [watch_list, setWatch_list] = useState([]);  // Kripto paraları saklamak için state tanımlıyoruz.
  const [uWatch_List, setUWatch_list] = useState([])
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
    // console.log(trStocksData.filter((item, index) => item.symbol  == watch_list.));
    // `watch_list` ve `trStocksData`'yi eşleştirerek `uWatch_List`'i güncelle
    console.log(trStocksData);
    console.log(watch_list);
    let updatedWatchList = watch_list?.flatMap(item =>
      trStocksData?.filter(tr_stock => item.stock_symbol === tr_stock.symbol)
    );
    let updatedWatchList2 = watch_list?.flatMap(item =>
      usStocksData?.filter(us_stock => item.stock_symbol === us_stock.symbol)
    );
    let updatedWatchList3 = watch_list?.flatMap(item =>
      globalCoinsData?.filter(us_stock => item.stock_symbol === us_stock.symbol)
    );
    // console.log(updatedWatchList);
    // console.log([...updatedWatchList,...updatedWatchList2]);
    setUWatch_list([...updatedWatchList, ...updatedWatchList2, ...updatedWatchList3]);

    console.log()
  }, [trStocksData]);


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
  const isInWatchList = (item) => {

    const numune = watch_list.some(wl_item => wl_item.stock_symbol === item.symbol);
    // console.log(numune,watch_list);
    return numune
  }


  return (
    <>
      <div>user id: {user.id}</div>
      <Table striped bordered hover>
        {/* // Şeritli, kenarlıklı ve üzerine gelindiğinde vurgulanan bir tablo oluşturuyoruz. */}
        <thead>
          <tr>
            <th>Add watch list</th>

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

          {uWatch_List.map((item, index) => (
            <tr key={index}>
              <td>
                {loggedIn && (
                  isInWatchList(item) ? (
                    <button
                      onClick={() => remove_watclist(item.symbol, item.locale)}
                      className='btn btn-danger justify-content-center rounded-circle fs-1 rotate fw-bold d-flex align-items-center p-1'
                    >
                      <FaMinusCircle className='fs-2' />
                    </button>
                  ) : (
                    <button
                      title={item.symbol}
                      onClick={() => add_watclist(item.symbol, item.stock_locale, item.price)}
                      className='btn btn-success justify-content-center rounded-circle fs-1 rotate fw-bold d-flex align-items-center p-1'
                    >
                      <FaPlusCircle className='fs-2' />
                    </button>
                  )
                )}
              </td>
              <td>
                <img src={item.icon_src != "NaN" ? item.icon_src : "https://placehold.co/32x32?text=/"} className='rounded-circle ' height={"32"} />
              </td>
              <td className='d-flex'>
                {item.locale == "TR" ? (

                  <Link
                    className='nav-link'
                    href={`/stock-detail/${item.locale}/${item.symbol}`}

                  >
                    {item.symbol}
                  </Link>
                ):
                item.locale == "US" ? (

                  <Link
                    className='nav-link'
                    href={`/stock-detail/${item.locale}/${item.symbol}`}

                  >
                    {item.symbol}
                  </Link>
                ): (
                  <Link
                  className='nav-link'
                  href={`/coin-detail/${item.symbol}`}

                >
                  {item.symbol}
                </Link>
                )
                }

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
    </>
  )
}

export default Watchlist