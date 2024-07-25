import React from 'react'
import { Table } from 'react-bootstrap';

const Rasyolar = () => {
    return (
        <div>
            <Table striped>
                <thead>
                    <tr>
                        <th className='justify-content-center' colSpan={10}>Rasyolar</th>

                    </tr>
                    <tr>
                        <th colSpan={2}>(1) fd/ favök</th>
                        <th>(2) fd/ satışlar</th>
                        <th>(3) f/k</th>
                        <th>(4) pd/dd</th>
                        <th>(1) sektör fd/ favök</th>
                        <th>(2) sektör fd/ satışlar</th>
                        <th>(3) sektör f/k</th>
                        <th>(4) sektör pd/dd</th>
                        <th>kapanış</th>
                        <th rowSpan={2}>2023 sonu olması gereken fiyat</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td colSpan={2} className='text-center'>-4,22</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td colSpan={6}>0</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className='text-center'>(5) oranlar</td>
                        <td>2023/6</td>
                        <td>2023/3</td>
                        <td>2023/12</td>
                        <td>puan</td>
                        <td>puan</td>
                        <td>puan</td>
                        <td>ort</td>
                        <td>OLMASI GEREKEN (0)</td>
                        <td>95,74</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className='text-center'>cari</td>
                        <td>2,36</td>
                        <td>1,50</td>
                        <td>1,56</td>
                        <td>10</td>
                        <td>5</td>
                        <td>5</td>
                        <td>₺ 6,67</td>
                        <td rowSpan={3}>OLMASI GEREKEN (0)</td>
                        <td rowSpan={3}>0</td>

                    </tr>
                    <tr>
                        <td colSpan={2} className='text-center'>likidite</td>
                        <td>2,24</td>
                        <td>1,38</td>
                        <td>1,28</td>
                        <td>10</td>
                        <td>5</td>
                        <td>10</td>
                        <td>₺ 8,33</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className='text-center'>nakit</td>
                        <td>0,66</td>
                        <td>0,21</td>
                        <td>0,24</td>
                        <td>10</td>
                        <td>5</td>
                        <td>5</td>
                        <td>₺ 6,67</td>

                    </tr>
                    <tr>
                        <td colSpan={2} className='text-center'>kaldıraç</td>
                        <td>41,76</td>
                        <td>66,33</td>
                        <td>65,34</td>
                        <td>10</td>
                        <td>10</td>
                        <td>5</td>

                        <td>₺ 8,33</td>
                        <td rowSpan={3}>OLMASI GEREKEN (0)</td>

                    </tr>
                    <tr>
                        <td colSpan={2} className='text-center'>borç özkaynak</td>
                        <td>71,69</td>
                        <td>197,04</td>
                        <td>188,53</td>
                        <td>10</td>
                        <td>10</td>
                        <td>5</td>

                        <td>₺ 5,00</td>

                    </tr>
                    <tr>
                        <td colSpan={2} className='text-center'>yatırım</td>
                        <td>48,17</td>
                        <td>47,99</td>
                        <td>50,06</td>
                        <td>5</td>
                        <td>5</td>
                        <td>5</td>

                        <td>₺ 8,33</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className='text-center'>stok devir</td>
                        <td>2,2</td>
                        <td>1</td>
                        <td>2</td>
                        <td>10</td>
                        <td>5</td>
                        <td>5</td>

                        <td>₺ 8,33</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className='text-center'>alacak devir</td>
                        <td>0,2</td>
                        <td>0,2</td>
                        <td>0,4</td>
                        <td>5</td>
                        <td>10</td>
                        <td>5</td>

                        <td>₺ 8,33</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className='text-center'>faaliyet satış</td>
                        <td>3,44</td>
                        <td>5</td>
                        <td>4</td>
                        <td>5</td>
                        <td>10</td>
                        <td>5</td>

                        <td>₺ 8,33</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className='text-center'>rantabilite</td>
                        <td>12,2</td>
                        <td>3,51</td>
                        <td>45,09</td>
                        <td>10</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className='text-center'>hbk</td>
                        <td>5,33</td>
                        <td>1,25</td>
                        <td>14,28</td>
                        <td>10</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className='text-center'>işletme sermayesi</td>
                        <td>1.962,10</td>
                        <td>892,89</td>
                        <td>874,50</td>
                        <td>10</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className='text-center'>devamlı sermaye büyüme</td>
                        <td>129,98</td>
                        <td>10,2</td>
                        <td>25,4</td>
                        <td>10</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className='text-center'>net kar büyüme</td>
                        <td>224,34</td>
                        <td>-88,68</td>
                        <td>35,82</td>
                        <td>10</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className='text-center'>net işletme sermayesi büyüme</td>
                        <td>119,75</td>
                        <td>2,1</td>
                        <td>1</td>
                        <td>10</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className='text-center'>öz sermaye büyüme</td>
                        <td>121,08</td>
                        <td>5,78</td>
                        <td>21,18</td>
                        <td>10</td>
                        <td>5</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Rasyolar