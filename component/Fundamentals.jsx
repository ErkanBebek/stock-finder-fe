import React, { useState } from 'react';  // React ve useState kütüphanelerini içe aktarıyoruz.
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';  // Container, Row, Col, Form, Button ve Table bileşenlerini react-bootstrap kütüphanesinden içe aktarıyoruz.
import Rasyolar from "./Rasyolar";  // Rasyolar bileşenini içe aktarıyoruz.

const Fundamentals = () => {  // Fundamentals bileşeni tanımlanıyor.
  const [symbol, setSymbol] = useState('');  // Hisse senedi sembolü için bir state tanımlıyoruz.
  const [analysisResults, setAnalysisResults] = useState(null);  // Analiz sonuçları için bir state tanımlıyoruz.

  const handleSymbolChange = (e) => {  // Hisse senedi sembolü değiştiğinde çalışacak fonksiyon.
    setSymbol(e.target.value.toUpperCase());  // Tüm semboller büyük harfe dönüştürülüyor.
  };

  const handleFormSubmit = async (e) => {  // Form gönderildiğinde çalışacak fonksiyon.
    e.preventDefault();  // Formun varsayılan submit davranışını engelliyoruz.
    // Analiz işlemleri burada yapılacak (örneğin, API çağrısı veya hesaplama)
    // Bu örnekte analiz sonuçlarını sabit bir değerle simüle ediyoruz.
    const results = await fetchAnalysisResults(symbol);  // Analiz sonuçları burada alınacak.
    setAnalysisResults(results);  // Alınan analiz sonuçlarını state'e kaydediyoruz.
  };

  const fetchAnalysisResults = async (symbol) => {  // Analiz sonuçlarını getiren fonksiyon.
    // Burada gerçek bir analiz API'si kullanılabilir veya hesaplama yapılabilir.
    // Bu örnekte sabit bir sonuç döndürüyoruz.
    return {
      symbol: symbol,
      price: '$150.25',
      peRatio: '15.5',
      dividendYield: '2.3%',
      marketCap: '$250B',
    };
  };

  return (
    <Container> 
  {/* // Tüm içerikleri kapsayan bir Container bileşeni oluşturuyoruz. */}
      <Row className="mt-4"> 
  {/* // Üstten margin ekleyen bir Row bileşeni oluşturuyoruz. */}
        <Col>
          <h3>Hisse Senedi Analizi</h3> 
  {/* // Başlık ekliyoruz. */}
        </Col>
      </Row>
      <Row className="mt-3"> 
  {/* // Üstten margin ekleyen bir Row bileşeni oluşturuyoruz. */}
        <Col md={6}> 
  {/* // Orta boyutlu ekranlarda 6 sütun kaplayan bir Col bileşeni oluşturuyoruz. */}
          <Form onSubmit={handleFormSubmit}> 
  {/* // Form bileşeni oluşturuyoruz ve onSubmit özelliğine handleFormSubmit fonksiyonunu bağlıyoruz. */}
            <Form.Group controlId="formSymbol"> 
  {/* // Form grubu oluşturuyoruz ve controlId atıyoruz. */}
              <Form.Label>Hisse Senedi Sembolu</Form.Label> 
  {/* // Form etiketi ekliyoruz. */}
              <Form.Control
                type="text"
                placeholder="Örn. AAPL"
                value={symbol}
                onChange={handleSymbolChange}
                required  // Bu alanın doldurulmasının zorunlu olduğunu belirtiyoruz.
              />
            </Form.Group>
            <Button variant="primary" type="submit"> 
  {/* // Formu göndermek için bir buton ekliyoruz. */}
              Analiz Yap
            </Button>
          </Form>
        </Col>
      </Row>
      {analysisResults && (  // Eğer analiz sonuçları varsa bu bloğu render ediyoruz.
        <Row className="mt-4"> 
  {/* // Üstten margin ekleyen bir Row bileşeni oluşturuyoruz. */}
          <Col>
            <h5>{analysisResults.symbol} Analiz Sonuçları</h5> 
  {/* // Analiz sonuçları başlığı ekliyoruz. */}
            <Table striped bordered hover> 
  {/* // Şeritli, kenarlıklı ve üzerine gelindiğinde vurgulanan bir tablo oluşturuyoruz. */}
              <tbody>
                <tr>
                  <td>Fiyat</td>
                  <td>{analysisResults.price}</td> 
  {/* // Fiyat bilgisini tabloya ekliyoruz. */}
                </tr>
                <tr>
                  <td>PE Oranı</td>
                  <td>{analysisResults.peRatio}</td> 
  {/* // PE Oranı bilgisini tabloya ekliyoruz. */}
                </tr>
                <tr>
                  <td>Temettü Verimi</td>
                  <td>{analysisResults.dividendYield}</td> 
  {/* // Temettü Verimi bilgisini tabloya ekliyoruz. */}
                </tr>
                <tr>
                  <td>Piyasa Değeri</td>
                  <td>{analysisResults.marketCap}</td> 
  {/* // Piyasa Değeri bilgisini tabloya ekliyoruz. */}
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
      <Rasyolar/> 
  {/* // Rasyolar bileşenini render ediyoruz. */}
    </Container>
  );
};

export default Fundamentals;  // Fundamentals bileşenini dışa aktarıyoruz.
