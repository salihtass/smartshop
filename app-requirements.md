# SpendSmart Uygulama Gereksinimleri Analizi

## 1. Genel Bakış

SpendSmart, kullanıcıların kişisel harcamalarını takip etmelerine, gerçek zamanlı indirim bildirimlerini almalarına ve alışveriş kararlarını daha bilinçli bir şekilde vermelerine yardımcı olan bir mobil uygulamadır. Uygulama, kullanıcıların harcama alışkanlıklarını analiz ederek kişiselleştirilmiş öneriler sunar ve bütçe yönetiminde yardımcı olur.

## 2. Hedef Kullanıcılar

- Günlük tüketiciler
- Bütçe bilincine sahip alışverişçiler
- Kişisel finans yönetim araçları arayan bireyler

## 3. Paydaşlar

- Kullanıcılar
- Market zincirleri (Lidl, Aldi vb.)
- Finans danışmanları
- Uygulama geliştiricileri
- Pazarlamacılar

## 4. Tanımlanan Problemler

- Alışveriş sırasında mevcut indirimler hakkında zamanında bildirim alma zorluğu
- Kişisel harcamaların hangi ürünlerde yoğunlaştığını bilmeme ve bu ürünlerin market indirimlerini takip edememe
- Geçmiş harcama alışkanlıklarına dayalı kişiselleştirilmiş önerilerin eksikliği

## 5. Mevcut Hedefler

- Gerçek zamanda bilinçli harcama kararları vermek
- Alışveriş sırasında tasarrufları maksimize etmek
- Planlı tüketim için öneriler sunmak
- Bütçe yönetiminde kullanıcılara huzur ve güven sağlamak

## 6. İyileştirme İstekleri

- Alışveriş sırasında gerçek zamanlı indirim bildirimleri
- Tüketim öğelerine göre ürün satın alma önerileri
- Hızlı veri erişimi için kullanıcı dostu arayüz
- Çeşitli süpermarket zincirlerinin indirim listelerine erişim

## 7. Uygulama Konsepti

SpendSmart Kişisel Harcama Takip Uygulaması, kullanıcıların alışveriş sırasında daha uygun fiyatlı kararlar vermelerine ve para tasarrufu yapmalarına yardımcı olmak için tasarlanmıştır. Mevcut kişisel finans uygulamaları ve market zincirlerinin uygulamaları, kişisel harcama verileri etrafında tasarlanmamış ve indirimler ve harcama içgörüleri hakkında gerçek zamanlı bilgi ihtiyacını karşılamamaktadır.

## 8. Temel Özellikler

1. **Kişisel harcama alışkanlıklarının analizi**
   - Harcama kategorilerine göre analiz
   - En çok tüketilen ürünlerin takibi
   - Toplam harcama görünümü

2. **Gerçek zamanlı ve planlanabilir indirim bildirimleri**
   - Yaklaşan indirimler listesi
   - Ürün bazlı indirim takibi
   - Süre ve mağaza bilgisi

3. **Kullanıcı davranışına dayalı kişiselleştirilmiş harcama içgörüleri**
   - Harcama kategorilerine göre dağılım
   - En çok harcama yapılan ürünler
   - Tasarruf önerileri

4. **Alışveriş platformlarıyla kolay entegrasyon**
   - Fiş tarama özelliği
   - Barkod tarama özelliği
   - Market zincirleriyle entegrasyon

5. **İpuçları ve öneriler için sosyal paylaşım özellikleri**
   - Tasarruf ipuçlarını paylaşma
   - Arkadaşlarla deneyim paylaşımı

6. **Harcama modellerinin görsel analizleri**
   - Kategori bazlı pasta grafikleri
   - Zaman içindeki harcama trendleri
   - Karşılaştırmalı analizler

7. **Profil ve Ayarlar**
   - Kullanıcı bilgileri yönetimi
   - Günlük harcama limiti belirleme
   - İndirim bildirimleri kontrolü
   - Dil seçenekleri

## 9. Benzersiz Değer Önerisi

SpendSmart, kullanıcıların harcamalarını takip etmelerini, gerçek zamanlı indirimler almalarını, harcama alışkanlıklarına göre gelecekteki harcamalarını planlamalarını ve satın alma tercihlerinde güvenlerini artırırken bilinçli tüketim kararları vermelerini sağlayan bir uygulamadır.

## 10. UI Tasarım Gereksinimleri

UI tasarımı, SpentSmart-canvas.pdf dosyasında belirtilen aşağıdaki ekranları içermelidir:

1. **Ana Ekran**
   - En çok tüketilen 5 ürün listesi
   - Yaklaşan indirimler bölümü
   - SpendSmart logosu ve profil erişimi

2. **Fiş Tarayıcı**
   - Kamera erişimi
   - "Fiş Tara" butonu
   - Kullanıcı yönlendirme metni

3. **Ürün Barkod Tarayıcı**
   - Kamera erişimi
   - "Ürün Tara" butonu
   - Taranan ürün bilgisi görüntüleme

4. **Teklifler Ekranı**
   - Ürün arama çubuğu
   - Kategori filtreleme (Tümü, Süt Ürünleri, Kahvaltı, Et, Fırın)
   - Sıralama seçenekleri
   - İndirimli ürün kartları (ürün adı, mağaza, indirim oranı, son kullanma tarihi)
   - "Kaydet" butonu

5. **Harcama Analizi**
   - Toplam harcama tutarı
   - Kategoriye göre harcama pasta grafiği
   - En çok harcama yapılan 10 ürün listesi
   - Ürün ve tutar detayları

6. **Profil ve Ayarlar**
   - Kullanıcı bilgileri (isim, e-posta)
   - Hedefler (günlük harcama limiti)
   - İndirim bildirimleri açma/kapama
   - Dil seçenekleri (İngilizce, Almanca)

## 11. Teknik Gereksinimler

1. **Mobil Uygulama Geliştirme**
   - Next.js kullanılarak web uygulaması olarak geliştirilecek
   - Responsive tasarım ile mobil cihazlara uyumlu olacak
   - PWA (Progressive Web App) özellikleri ile mobil deneyim sağlanacak

2. **Veritabanı**
   - Kullanıcı verileri için veritabanı entegrasyonu
   - Harcama kayıtları ve ürün bilgileri depolama
   - İndirim bilgilerini saklama

3. **Kamera Entegrasyonu**
   - Fiş tarama özelliği
   - Barkod tarama özelliği

4. **Veri Analizi**
   - Harcama verilerinin kategorilere ayrılması
   - Görsel grafik oluşturma
   - Kişiselleştirilmiş öneriler için veri işleme

5. **Bildirim Sistemi**
   - İndirim bildirimleri gönderme
   - Günlük harcama limiti uyarıları

6. **Çoklu Dil Desteği**
   - İngilizce
   - Almanca (ve potansiyel olarak diğer diller)

7. **Google Play Store Yayını**
   - Store listeleme gereksinimleri
   - Uygulama paketleme
   - Tanıtım materyalleri
