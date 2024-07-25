import React, { useState, useEffect } from 'react';  // React, useState ve useEffect kütüphanelerini içe aktarıyoruz.
import Card from 'react-bootstrap/Card';

import { useDispatch, useSelector } from 'react-redux'; // Redux hook'larını içe aktarıyor.
import axios from 'axios'; // HTTP istekleri yapmak için axios kütüphanesini içe aktarıyor.

const Messages = () => {

    const user = useSelector((state) => state.auth.user);
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const [messages, setMessages] = useState([])
    useEffect(() => {
        const fetchMessages = async () => {  // Asenkron veri çekme fonksiyonu.
            try {
                const response = await axios.get(`http://127.0.0.1:5000/messages/reciever/${user.id}`, {
                    // API'den veri çekiyoruz ve kripto paraları state'e kaydediyoruz.
                });
                setMessages(response.data);
                // veri bastır
                //console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);  // Hata varsa konsola yazdırıyoruz.
            }
        };
        fetchMessages();
    }, [])

    return (
        <div>
            <h1>Messages</h1>
            {messages.map((message,index)=>(
                <Card className='mb-1' style={{ width: '100%' }}>
                <Card.Body>
                    <Card.Title>
                        {message.name} | {message.email}
                    </Card.Title>
                  <Card.Text>
                    {message.message}
                    <footer className="blockquote-footer">
            {message.created_at}
          </footer>
                  </Card.Text>
                </Card.Body>
               
                
              </Card>
            ))}
        </div>
    )
}

export default Messages