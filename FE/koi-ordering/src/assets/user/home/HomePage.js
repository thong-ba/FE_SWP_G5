import React from 'react';
import './HomePage.css'; // Đảm bảo tạo file CSS đi kèm

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Phần thông tin về cá Koi */}
      <section className="koi-info">
        <h2>Về Cá Koi</h2>
        <p>
          Cá Koi là một loài cá cảnh nổi tiếng có nguồn gốc từ Nhật Bản. Chúng
          được nuôi để làm cảnh trong các hồ ngoài trời và thường được xem là
          biểu tượng của sự may mắn và thịnh vượng. Cá Koi có nhiều màu sắc đa
          dạng như đỏ, vàng, trắng và đen, với những hoa văn độc đáo trên cơ thể.
        </p>
        <ul>
          <li>Phân loại: Cá chép Nhật</li>
          <li>Màu sắc: Đa dạng (đỏ, trắng, vàng, đen, cam)</li>
          <li>Tuổi thọ: Lên đến 25-30 năm nếu được chăm sóc tốt</li>
          <li>Ý nghĩa phong thủy: Mang lại may mắn, tài lộc</li>
        </ul>
        <img
          src="koi-login.png"
          alt="Beautiful Koi Fish"
          className="koi-image"
        />
      </section>

      {/* Phần thông tin về đơn vị vận chuyển */}
      <section className="shipping-info">
        <h2>Đơn Vị Vận Chuyển</h2>
        <p>
          Chúng tôi hợp tác với các đơn vị vận chuyển uy tín để đảm bảo cá Koi
          được vận chuyển an toàn đến tay khách hàng. Các đơn vị vận chuyển
          đảm bảo tiêu chuẩn khắt khe về bảo quản và nhiệt độ thích hợp trong
          suốt quá trình vận chuyển.
        </p>
        <ul>
          <li>Đơn vị vận chuyển: Giao Hàng Nhanh, Viettel Post</li>
          <li>Thời gian giao hàng: 2-3 ngày làm việc</li>
          <li>Chính sách bảo hành: Đổi trả trong vòng 24 giờ nếu có sự cố</li>
        </ul>
        <img
          src="koi-login.png"
          alt="Shipping Process"
          className="shipping-image"
        />
      </section>
    </div>
  );
};

export default HomePage;
