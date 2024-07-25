| Dosya adı   | Alan Adı                         | Veri Tipi | Uzunluk | Açıklama                                |
|-------------|----------------------------------|-----------|---------|-----------------------------------------|
| users       | ID                               | int       | 4       | kullanıcı no                            |
|             | username                         | varchar   | 20      | kullanıcı adı                           |
|             | email                            | varchar   | 20      | kullanıcı e-mail adresi                 |
|             | password                         | varchar   | 14      | şifre                                   |
|             | accesslevel                      | varchar   | 10      | yetki seviyesi                          |
|             | fullname                         | varchar   | 20      | Kullanıcı adı ve soyadı                 |
| tabs        | ID                               | int       | 4       | sayfa bağlantı (link) no                |
|             | URL                              | varchar   | 50      | link                                    |
|             | accesslevel                      | varchar   | 10      | linklerin erişim seviyeleri             |
| sitename    | heading                          | varchar   | 20      | site adı                                |
| us_stock    | symbol                           | varchar   | 20      | hisse senedi sembolü                    |
|             | status                           | varchar   | 2       | hisse senedi durumu                     |
|             | name                             | varchar   | 100     | hisse senedi adı                        |
|             | last                             | double    |         | son fiyat                               |
|             | change                           | double    |         | fiyat değişimi                          |
|             | percentage_change                | double    |         | yüzde değişimi                          |
|             | volume                           | double    |         | işlem hacmi                             |
| globalCoins | name                             | varchar   | 100     | kripto para adı                         |
|             | current_price                    | double    |         | güncel fiyat                             |
| tr_stock    | id                               | int       | 4       | id                                      |
|             | hisse_senedi_adi                 | varchar   | 100     | hisse senedi adı                        |
|             | son_fiyat                        | double    |         | son fiyat                               |
|             | kar_degisim                      | double    |         | kar değişimi                            |
|             | son_donem_kar                    | double    |         | son dönem kar                           |
|             | gecen_sene_kar                   | double    |         | geçen sene kar                          |
|             | son_donem                        | text      |         | son dönem                               |
|             | fd_favok                         | double    |         | FD/ FAVÖK                               |
|             | sektorun_fd_favok_ortalamasi     | double    |         | sektörün FD/ FAVÖK Ortalaması           |
|             | fd_satislar                      | double    |         | FD/ Satışlar                            |
|             | sektorun_fd_satislar_ortalamasi  | double    |         | sektörün FD/ Satışlar Ortalaması        |
|             | fk                               | double    |         | F/K                                     |
|             | sektorun_fk_ortalamasi           | double    |         | sektörün FK Ortalaması                  |
|             | pd_dd                            | double    |         | PD/DD                                   |
|             | sektorun_pd_dd_ortalamasi        | double    |         | sektörün PD/DD Ortalaması               |
|             | sektor                           | text      |         | sektör                                  |
| comments    | ID                               | int       | 4       | yorum no                                |
|             | post_id                          | int       | 4       | ilgili gönderi ID                       |
|             | user_id                          | int       | 4       | yorum yapan kullanıcı ID                 |
|             | comment                          | text      |         | yorum metni                             |
|             | created_at                       | datetime  |         | yorumun oluşturulma tarihi              |
|             | updated_at                       | datetime  |         | yorumun güncellenme tarihi              |
