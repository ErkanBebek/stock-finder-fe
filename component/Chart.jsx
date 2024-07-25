import React,{useState} from 'react'  // React ve useState'i React kütüphanesinden içe aktarıyoruz.
import Button from 'react-bootstrap/Button';  // Button bileşenini react-bootstrap kütüphanesinden içe aktarıyoruz.
import ButtonGroup from 'react-bootstrap/ButtonGroup';  // ButtonGroup bileşenini react-bootstrap kütüphanesinden içe aktarıyoruz.

import { MdCandlestickChart } from "react-icons/md";  // MdCandlestickChart ikonunu react-icons/md kütüphanesinden içe aktarıyoruz.
import CandleChart from './Graph/CandleChart';  // CandleChart bileşenini içe aktarıyoruz.
import AreaChart from './Graph/AreaChart';  // AreaChart bileşenini içe aktarıyoruz.
import { MdAreaChart } from "react-icons/md";  // MdAreaChart ikonunu react-icons/md kütüphanesinden içe aktarıyoruz.
import { MdLineAxis } from "react-icons/md";  // MdLineAxis ikonunu react-icons/md kütüphanesinden içe aktarıyoruz.
import initialData from './chartdata';  // initialData'yı chartdata dosyasından içe aktarıyoruz.

const Chart = () => {  // Chart bileşeni tanımlanıyor.

  const [activeChartType, setactiveChartType] = useState("Candle")  // Aktif grafik türünü belirlemek için bir state kullanıyoruz.

  return (
    <>
    <span>Chart Type:  </span>
  {/* // Grafik türü seçimi için bir başlık ekliyoruz. */}
    <ButtonGroup className="mb-2">
  {/* // Grafik türü seçim butonları için bir grup oluşturuyoruz. */}
    <Button onClick={() => setactiveChartType("Candle")}>Candle <MdCandlestickChart /></Button>
  {/* // Mum grafiği seçimi için buton. */}
    <Button onClick={() => setactiveChartType("Area")}>Area <MdAreaChart /></Button>
  {/* // Alan grafiği seçimi için buton. */}
    <Button onClick={() => setactiveChartType("Line")}>Line <MdLineAxis /></Button>
  {/* // Çizgi grafiği seçimi için buton. */}
  </ButtonGroup>
  {activeChartType == "Candle" && <CandleChart data={initialData} />}
  {/* // Aktif grafik türü mum grafiği ise CandleChart bileşenini render ediyoruz. */}
  {activeChartType == "Area" && <AreaChart data={initialData} />}
  {/* // Aktif grafik türü alan grafiği ise AreaChart bileşenini render ediyoruz. */}
  {/* {activeChartType == "Line" && <LineChart data={initialData} />} */}
    </>
  )
}

export default Chart  // Chart bileşenini dışa aktarıyoruz.

/*
Kullanılan Kütüphaneler:
1. React: Kullanıcı arayüzü oluşturmak için kullanılan bir JavaScript kütüphanesidir.
2. react-bootstrap: Bootstrap bileşenlerini React projelerinde kullanmak için kullanılan bir kütüphanedir.
3. react-icons: Popüler ikon kütüphanelerindeki ikonları React projelerinde kullanmak için kullanılan bir kütüphanedir.
*/
