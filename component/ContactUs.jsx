import React, { useState } from 'react';  // React ve useState kütüphanelerini içe aktarıyoruz.
// React kütüphanesini içe aktarıyoruz.
import { Container, Form, Button } from 'react-bootstrap';  // Container, Form ve Button bileşenlerini react-bootstrap kütüphanesinden içe aktarıyoruz.
import axios from 'axios';

const ContactUs = () => {  // ContactUs bileşeni tanımlanıyor.

      const [formData, setFormData] = useState({  // Form verilerini saklamak için state tanımlıyoruz.
            user_id: 1,
            reciever_id: 1,
            name: '',
            email: '',
            message: '',
      });

      const handleChange = (e) => {  // Form alanı değiştiğinde çalışacak fonksiyon.
            const { name, value } = e.target;  // Değişen alanın adı ve değerini alıyoruz.
            setFormData({
                  ...formData,
                  [name]: value  // Form verilerini güncelliyoruz.
            });
      };

      const handleSubmit = async (e) => {  // Form gönderildiğinde çalışacak fonksiyon.
            e.preventDefault();  // Formun varsayılan submit davranışını engelliyoruz.
            // Add form validation and submission logic here

            try {
                  const response = await axios.post('http://127.0.0.1:5000/message', formData);
                  console.log(response.data);
                  alert('User registered successfully!');
            } catch (error) {
                  console.error('There was an error!', error);
                  alert('Error registering user!');
            }
            console.log(JSON.stringify(formData));  // Form verilerini konsola yazdırıyoruz.
      };
      return (
            <Container>
                  {/* // Formu ve diğer içerikleri kapsayacak bir Container bileşeni oluşturuyoruz. */}
                  <h1>Contact Us</h1>
                  {/* // Başlık ekliyoruz. */}
                  <Form onSubmit={handleSubmit}>
                        {/* // Form bileşeni oluşturuyoruz ve onSubmit özelliğine handleSubmit fonksiyonunu bağlıyoruz. */}
                        <Form.Group className="mb-3" controlId="formName">
                              {/* // Form grubu oluşturuyoruz. Bu grup isim alanını içeriyor. */}
                              <Form.Label>Name</Form.Label>
                              {/* // İsim etiketi ekliyoruz. */}
                              <Form.Control type="text" value={formData.name}
                               onChange={handleChange} name="name" placeholder="Enter your name" />
                              {/* // İsim girişi için bir kontrol alanı ekliyoruz. */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                              {/* // Form grubu oluşturuyoruz. Bu grup e-posta alanını içeriyor. */}
                              <Form.Label>Email address</Form.Label>
                              {/* // E-posta etiketi ekliyoruz. */}
                              <Form.Control 
                              type="email"
                               name="email"
                               value={formData.email}
                               onChange={handleChange}
                               placeholder="Enter your email" />
                              {/* // E-posta girişi için bir kontrol alanı ekliyoruz. */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formMessage">
                              {/* // Form grubu oluşturuyoruz. Bu grup mesaj alanını içeriyor. */}
                              <Form.Label>Message</Form.Label>
                              {/* // Mesaj etiketi ekliyoruz. */}
                              <Form.Control name="message" value={formData.message}
                               onChange={handleChange} as="textarea" rows={3} placeholder="Enter your message" />
                              {/* // Mesaj girişi için bir kontrol alanı ekliyoruz. */}
                        </Form.Group>

                        <Button variant="primary" type="submit">
                              {/* // Formu göndermek için bir buton ekliyoruz. */}
                              Submit
                        </Button>
                  </Form>

                  <hr />
                  {/* // Yatay bir çizgi ekliyoruz. */}

                  <div>
                        {/* // İletişim bilgilerini içeren bir div oluşturuyoruz. */}
                        <h2>Reach Us</h2>
                        {/* // Alt başlık ekliyoruz. */}
                        <p>You can reach us via the following methods:</p>
                        {/* // Ulaşım bilgileri için bir açıklama ekliyoruz. */}
                        <ul>
                              {/* // Ulaşım bilgilerini listeleyen bir ul oluşturuyoruz. */}
                              <li>Email: example@example.com</li>
                              {/* // E-posta adresi */}
                              <li>Phone: +1234567890</li>
                              {/* // Telefon numarası */}
                              <li>Address: 1234 Street Name, City, Country</li>
                              {/* // Adres bilgisi */}
                        </ul>
                  </div>
            </Container>
      )
}

export default ContactUs  // ContactUs bileşenini dışa aktarıyoruz.
