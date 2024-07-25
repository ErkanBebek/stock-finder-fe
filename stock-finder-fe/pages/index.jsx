import Head from "next/head";  // Next.js'in Head bileşenini içe aktarıyoruz.
import { Container, Row, Card, Button, Stack, Col } from "react-bootstrap";  // Container, Row, Card, Button, Stack ve Col bileşenlerini react-bootstrap kütüphanesinden içe aktarıyoruz.
import InnerNav from "../component/InnerNav";  // InnerNav bileşenini içe aktarıyoruz.
import Chart from "../component/Chart";  // Chart bileşenini içe aktarıyoruz.
import GlobalMarketsCoins from "../component/GlobalMarketsCoins";  // GlobalMarketsCoins bileşenini içe aktarıyoruz.
import BottomSlider from "../component/BottomSlider";  // BottomSlider bileşenini içe aktarıyoruz.
import Link from 'next/link';  // Link bileşenini next/link kütüphanesinden içe aktarıyoruz.

export default function Home() {  // Home bileşeni tanımlanıyor.
  return (
    <>
      
              <InnerNav />  
       
    </>
  );
}
