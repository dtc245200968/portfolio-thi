# Website Portfolio Cá Nhân

## 1. Giới thiệu

Đây là dự án xây dựng website Portfolio cá nhân nhằm giới thiệu thông tin, kỹ năng, các dự án đã thực hiện và thông tin liên hệ. Dự án được phát triển trong khuôn khổ bài tập cuối kỳ.

## 2. Công nghệ sử dụng

- **React:** xây dựng giao diện người dùng.
- **Vite:** khởi tạo và chạy môi trường phát triển.
- **HTML, CSS, JavaScript:** xây dựng cấu trúc, giao diện và chức năng website.
- **Git và GitHub:** quản lý phiên bản mã nguồn.

## 3. Chức năng hiện có

- Hiển thị phần giới thiệu cá nhân.
- Hiển thị các kỹ năng công nghệ thông tin.
- Giới thiệu dự án cá nhân.
- Cung cấp thông tin và liên kết liên hệ.
- Hỗ trợ hiển thị trên các kích thước màn hình khác nhau.

## 4. Cấu trúc thư mục

```text
portfolio-thi/
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── .gitignore
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## 5. Cách chạy dự án

### Yêu cầu

- Đã cài đặt Node.js và npm.

### Các bước thực hiện

Mở Terminal tại thư mục gốc dự án và chạy:

```bash
cd frontend
npm install
npm run dev
```

Sau đó mở địa chỉ localhost được hiển thị trong Terminal bằng trình duyệt.

## 6. Quản lý mã nguồn

Mã nguồn được lưu trữ trên GitHub:

https://github.com/dtc245200968/portfolio-thi

## 7. Định hướng phát triển

- Hoàn thiện giao diện và nội dung Portfolio.
- Bổ sung các thành phần triển khai bằng Docker Compose.
- Cấu hình Nginx và HTTPS.
- Tích hợp Prometheus và Grafana để giám sát.
- Tích hợp Loki và Promtail để thu thập, truy vấn nhật ký hệ thống.
- Bổ sung các biện pháp bảo mật và tài liệu hướng dẫn triển khai.
