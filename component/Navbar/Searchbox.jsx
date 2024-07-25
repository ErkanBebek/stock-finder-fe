import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';  // Form bileşenini react-bootstrap kütüphanesinden içe aktarıyoruz.
import Button from 'react-bootstrap/Button';  // Button bileşenini react-bootstrap kütüphanesinden içe aktarıyoruz.
import { FaSearch } from "react-icons/fa";  // FaPrint, FaHome, FaMobile ve FaSearch ikonlarını react-icons/fa kütüphanesinden içe aktarıyoruz.
import { useDispatch, useSelector } from 'react-redux'; // Redux hook'larını içe aktarıyor.
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';

const Searchbox = () => {
    const usStocksData = useSelector((state) => state.usstocks.data.stockData); // Redux store'dan usStocks verisini seçiyor.
    const trStocksData = useSelector((state) => state.trstocks.data.stockData);  // Redux state'inden trStocks verilerini alıyoruz.
    const [filtered_symbols, setFiltered_symbols] = useState([]); // Filtrelenmiş semboller için bir state tanımlıyor.
    const [allStocks, setAllStocks] = useState([]);
    const [search_result_active, setSearch_result_active] = useState("d-none");
    //  console.log("tr:",trStocksData);
    //  console.log("us:",usStocksData);
    useEffect(() => {
        if (trStocksData != undefined && usStocksData != undefined) {
            setAllStocks([...trStocksData, ...usStocksData])

        }
    }, [usStocksData, trStocksData])

    const handleSymbolChange = (e) => {
        e.preventDefault();  // Formun varsayılan submit davranışını engelliyoruz.

        const searchResults = allStocks.filter(item => {
            // Burada "symbol" alanına göre arama yapıyor
            return item.symbol.toUpperCase().includes(e.target.value.toUpperCase());
        });
        setFiltered_symbols(searchResults); // Filtrelenmiş semboller state'ini güncelliyor.
        console.log(filtered_symbols);

    };

    // console.log(allStocks);
    return (
        <>
            <Form className="d-flex gap-2">
                {/* // Arama formu oluşturuyoruz. */}
                <Form.Control
                    type="search"
                    placeholder="Search"
                    onChange={handleSymbolChange}
                    onKeyDown={(e) => {
                        if (e.target.value.length > 0) {
                            setSearch_result_active("d-initial")

                        }
                    }}
                    onBlur={(e) => setSearch_result_active("d-none")}
                    className="me-2"
                    aria-label="Search"
                />
                <Button variant="light" className='ms-2'>
                    <FaSearch />
                </Button>
            </Form>
            <div className={'bg-white rounded position-absolute w-100 mt-1 p-1 shadow ' + search_result_active} style={{ "zIndex": 9999 }}>
                {filtered_symbols.slice(0, 10).map((item, index) => (
                    <>
                        <Link
                            className='nav-link m-0 p-0 d-inline'
                            href={"/stock-detail/" + item.locale + "/" +
                                item.symbol}>
                            <div className='p-1 m-0 grid  justify-content-start btn btn-light  w-100 border-bottom'>
                                <div className='row'>
                                <div className='col'>
                                <img src={item.icon_src != "NaN" ? item.icon_src : "https://placehold.co/32x32?text=/"} className='rounded-circle ' height={"32"} />

                                </div>
                                <div className='col d-flex align-items-center'>
                                {item.symbol}</div>
                                </div>
                            </div>
                        </Link><br />
                    </>
                ))}
            </div>
        </>
    )
}

export default Searchbox