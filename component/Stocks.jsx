import React, { useState, useEffect } from 'react';  // React, useState ve useEffect kütüphanelerini içe aktarıyoruz.
import { Col, Row, InputGroup, Form, Button, Navbar } from 'react-bootstrap';  // Col, Row, InputGroup, Form, Button ve Navbar bileşenlerini react-bootstrap kütüphanesinden içe aktarıyoruz.
import Spinner from 'react-bootstrap/Spinner';  // Spinner bileşenini react-bootstrap kütüphanesinden içe aktarıyoruz.
import TRstocks from './TRstocks';  // TRstocks bileşenini içe aktarıyoruz.
import USstocks from './USstocks';  // USstocks bileşenini içe aktarıyoruz.
import Coins from './Coins';  // USstocks bileşenini içe aktarıyoruz.
import WorldMarkets from './WorldMarkets';  // WorldMarkets bileşenini içe aktarıyoruz.

const Stocks = ({ stocktype }) => {  // Stocks bileşeni tanımlanıyor ve stocktype adlı bir prop alıyor.
  const [symbols, setSymbols] = useState([]);  // Hisse sembollerini saklamak için state tanımlıyoruz.
  const [filtered_symbols, setFiltered_symbols] = useState([]);  // Filtrelenmiş sembolleri saklamak için state tanımlıyoruz.
  const [loading, setLoading] = useState(true);  // Yüklenme durumunu saklamak için state tanımlıyoruz.
  const [error, setError] = useState(null);  // Hata durumunu saklamak için state tanımlıyoruz.

  useEffect(() => {  // useEffect kancası, bileşen yüklendiğinde ve güncellendiğinde çalışır.
    // const fetchSymbols = async () => {
    //   try {
    //     const response = await fetch('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=cpt67ghr01qpk40rs4c0cpt67ghr01qpk40rs4cg');
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     const data = await response.json();
    //     setSymbols(data);
    //     setFiltered_symbols(data);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchSymbols();
  }, []);  // useEffect'in bağımlılık dizisi boş olduğunda, bu kod bileşen yüklendiğinde çalışır.

  const handleSymbolChange = (e) => {  // Sembol değişikliği için handleSymbolChange fonksiyonu.
    const searchResults = symbols.filter(item => {  // Sembolleri filtreliyoruz.
      return item.symbol.toUpperCase().includes(e.target.value.toUpperCase());  // Sembolleri büyük harf yapıp karşılaştırıyoruz.
    });
    setFiltered_symbols(searchResults);  // Filtrelenmiş sembolleri state'e kaydediyoruz.
  };

  // if (loading) {
  //   return <span>Loading... <Spinner animation="border" variant="primary" /></span>;
  // }

  // if (error) {
  //   return <p>Error: {error}</p>;
  // }
  return (
    <>
      <div>
        <div>Stocks : {stocktype}</div> 
        {/* // Seçilen stok türünü gösteriyoruz. */}
        {stocktype == "TRStocks" && <TRstocks />}  
        {/* // TRStocks seçiliyse TRstocks bileşenini render ediyoruz. */}
        {stocktype == "USStocks" && <USstocks />}  
        {/* // USStocks seçiliyse USstocks bileşenini render ediyoruz. */}
        {stocktype == "WorldMarkets" && <WorldMarkets />} 
        {stocktype == "Coins" && <Coins />} 
         {/* // WorldMarkets seçiliyse WorldMarkets bileşenini render ediyoruz. */}
      </div>
    </>
  )
}

export default Stocks;  // Stocks bileşenini dışa aktarıyoruz.
