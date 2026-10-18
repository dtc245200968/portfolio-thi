
import './App.css'

function App() {
  return (
    <>
      <header className="navbar">
        <a href="#home" className="logo">MyPortfolio</a>

        <nav>
          <a href="#home">Trang chủ</a>
          <a href="#about">Giới thiệu</a>
          <a href="#skills">Kỹ năng</a>
          <a href="#projects">Dự án</a>
          <a href="#contact">Liên hệ</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-content">
            <p className="hello">XIN CHÀO, MÌNH LÀ</p>
           <h1>Chau Thuy Dung</h1>
            <h2>Sinh viên Công nghệ thông tin</h2>
            <p>
              Mình yêu thích lập trình web, thiết kế giao diện
              và xây dựng những sản phẩm hữu ích.
            </p>
            <a href="#projects" className="button">
              Xem dự án của mình
            </a>
          </div>
        </section>

        <section id="about" className="section">
          <h2>Giới thiệu</h2>
          <p>
            Mình là Chau Thuy Dung, sinh viên ngành Công nghệ thông tin
tại Trường Đại học Công nghệ Thông tin và Truyền thông Thái Nguyên.
Mình yêu thích tìm hiểu về công nghệ thông tin và mong muốn
phát triển kỹ năng xây dựng giao diện website.
          </p>
        </section>

        <section id="skills" className="section">
          <h2>Kỹ năng</h2>
          <div className="skills-list">
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
            <span>React</span>
            <span>MySQL</span>
           
          </div>
        </section>

        <section id="projects" className="section">
          <h2>Dự án của mình</h2>
          <div className="project-list">
            <article className="project-card">
              <h3>Website Portfolio</h3>
              <p>
                Website giới thiệu bản thân, kỹ năng,
                các dự án và thông tin liên hệ.
              </p>
              <span>React · CSS · JavaScript</span>
            </article>

          </div>
        </section>

        <section id="contact" className="section">
  <h2>Liên hệ</h2>
  <p>Cậu có thể liên hệ với mình qua email hoặc GitHub.</p>

  <a
    className="button"
    href="mailto:emailcuaban@gmail.com"
  >
    Gửi email
  </a>

  <a
    className="button"
    href="https://github.com/"
    target="_blank"
    rel="noreferrer"
  >
    GitHub của mình
  </a>
</section>
      </main>

      <footer className="footer">
        <p>© 2026 MyPortfolio. Được xây dựng bằng React.</p>
      </footer>
    </>
  )
}

export default App
