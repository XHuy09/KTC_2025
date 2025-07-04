import './App.css';
import { useState } from 'react';
import AccessoryList from './components/AccessoryList';
import ArticlesList from './components/ArticlesList';
import StarRating from './components/StarRating';
import AttrItem from './components/Attributes';
import DeleteProduct from './components/DeleteProduct';

const articles = [
  {id: 1, title: 'Ấn tượng đầu tiên Samsung Galaxy A32 4G: Với hơn 6 triệu đã có màn hình Super AMOLED 90Hz', thumbnail: 'images/SSA32.png', addTime: '4 năm trước'},
  {id: 2, title: 'Google Pixel 5a dự kiến sẽ được ra mắt cùng thời điểm với Android 12', thumbnail: 'images/GG-Pixel5a.png', addTime: '4 năm trước'},
  {id: 3, title: 'Galaxy A52 4G lộ diện trên Google Play Console Xác nhận dùng chip Snapdragon 720', thumbnail: 'images/GalaxyA52.png', addTime: '4 năm trước'},
  {id: 4, title: 'Galaxy A82 5G chuẩn bị ra mắt với chip flagship và màn hình trượt độc đáo, Samfans gom lúa đi là vừa', thumbnail: 'images/GalaxyA82.png', addTime: '4 năm trước'}
]
const accessory = [
  {id: 5, title: 'Cáp chuyển đổi USB-C sang SD', thumbnail: 'images/Apple-USBC-To-SDCard-A.jpg', price: '1.290.000đ', oldPrice: '790.000đ', discount: '-25%'},
  {id: 6, title: 'Adapter sạc Apple Type C 20W', thumbnail: 'images/cap-lightning-to-usb-cable-md818zma-1.jpg', price: '520.000đ'},
  {id: 7, title: 'Cáp sạc Lingtning 2m', thumbnail: 'images/type-c-20-w.png', price: '840.000đ' },
  {id: 8, title: 'AirPods 3', thumbnail: 'images/airpod-3.png', price: '890.000đ', oldPrice: '1.450.000đ', discount: '-20%'},
]

const attributes = [
  {id: 1, label: 'Đen'},
  {id: 2, label: 'Hồng'},
  {id: 3, label: 'Xanh'}
]

const initiaProducts = [
  {id: 1,title: 'Điện thoại iPhone 16 Pro Max 256GB', price: '30.290.000đ', thumbnail: '/images/iphone.jpg',},
  {id: 2,title: 'Đồng hồ ELIO 41 mm Nam EC012-01',price: '307.000₫',thumbnail: '/images/dongho.jpg',},
  {id: 3,title: 'Máy in laser trắng đen đơn năng HP 108a (4ZB79A)',price: '2.490.000đ',thumbnail: '/images/mayin.jpg',},
  {id: 4,title: 'Ốp lưng MagSafe iPhone 16 Pro Max Nhựa cứng viền dẻo JK5316 Jincase',price: '280.000₫',thumbnail: '/images/oplung.jpg',},
];





function App() {

  const [products, setProducts] = useState(initiaProducts);

    const handleRemoveProduct = (id: number) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const handleClearHistory = () => {
    setProducts([]); // 👈 Xóa tất cả sản phẩm đã xem
  };

  return (
    <main className='container'>
     <section className='section'>
        <div className="section_header">
            <h2 className="section_title">Tin tức</h2>
            <div className="section_extra">
              <a href="#">Xem tất cả</a>
            </div>
        </div>
        <div className="section_body">
          <ArticlesList data={articles} />
        </div>     
     </section>

     <section className='section'>
        <div className="section_header">
            <h2 className="section_title">Phụ kiện tương thích</h2>
        </div>
        <div className="section_body">
          <AccessoryList dataa={accessory} />
        </div>     
     </section>

     <section className='section'>
      <div style={{ padding: 20 }}>
        <StarRating />
      </div>
     </section>

     <section className='section'>
      <div style={{ padding: 20 }}>
        <AttrItem  data={attributes}/>
      </div>
     </section>

     <section className='section'>
        <div className="section_header">
        <h2 className="section_title">Sản phẩm đã xem</h2>
        <div className="section_extra">
          <a href="#" onClick={handleClearHistory}>Xóa lịch sử</a>
        </div>
      </div>
      <div className="section_body">
        <DeleteProduct data={products} onRemove={handleRemoveProduct} />
      </div>
     </section>

    </main>
  );
}

export default App;