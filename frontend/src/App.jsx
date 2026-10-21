
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [personalInfo, setPersonalInfo] = useState(null)
  const [skills, setSkills] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchPortfolioData() {
      try {
        const [personalRes, skillsRes, projectsRes] = await Promise.all([
          fetch('/api/personal-info'),
          fetch('/api/skills'),
          fetch('/api/projects'),
        ])

        if (!personalRes.ok || !skillsRes.ok || !projectsRes.ok) {
          throw new Error('Không thể tải dữ liệu từ máy chủ.')
        }

        const [personalJson, skillsJson, projectsJson] = await Promise.all([
          personalRes.json(),
          skillsRes.json(),
          projectsRes.json(),
        ])

        if (
          !personalJson.success ||
          !skillsJson.success ||
          !projectsJson.success
        ) {
          throw new Error('API trả về dữ liệu không hợp lệ.')
        }

        setPersonalInfo(personalJson.data)
        setSkills(skillsJson.data || [])
        setProjects(projectsJson.data || [])
      } catch (err) {
        console.error('Lỗi tải dữ liệu Portfolio:', err)
        setError(
          'Chưa tải được dữ liệu. Cậu hãy kiểm tra kết nối rồi tải lại trang nhé.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolioData()
  }, [])

  if (loading) {
    return <p className="loading">Đang tải dữ liệu Portfolio...</p>
  }

  if (error) {
    return <p className="error">{error}</p>
  }

  return (
    <>
      <header className="navbar">
        <a href="#home" className="logo">
          MyPortfolio
        </a>

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

            <h1>
              {personalInfo?.full_name || 'Chưa cập nhật họ tên'}
            </h1>

            <h2>
              {personalInfo?.title || 'Sinh viên Công nghệ thông tin'}
            </h2>

            <p>
              Mình yêu thích lập trình web, thiết kế giao diện và xây dựng
              những sản phẩm hữu ích.
            </p>

            <a href="#projects" className="button">
              Xem dự án của mình
            </a>
          </div>
        </section>

        <section id="about" className="section">
          <h2>Giới thiệu về mình</h2>

          <div className="about-content">
            <p>
              Mình là {personalInfo?.full_name || 'sinh viên Công nghệ thông tin'},
              hiện đang học tập tại Trường Đại học Công nghệ Thông tin và
              Truyền thông Thái Nguyên. Mình yêu thích tìm hiểu công nghệ
              và mong muốn tạo ra những sản phẩm website hữu ích.
            </p>

            <p>
              Trong quá trình học tập, mình từng bước trau dồi kiến thức
              về HTML, CSS, JavaScript và React để xây dựng giao diện
              website thân thiện, dễ sử dụng và phù hợp với nhiều thiết bị.
            </p>

            <p>
              Bên cạnh phát triển giao diện, mình cũng tìm hiểu MySQL để
              quản lý dữ liệu, đồng thời thực hành Git, Docker và Nginx
              nhằm hiểu thêm về quy trình quản lý mã nguồn, triển khai
              và vận hành một ứng dụng web.
            </p>

            <p>
              Mục tiêu của mình là phát triển theo định hướng Frontend
              Developer, tiếp tục học hỏi công nghệ mới, tích lũy kinh
              nghiệm qua các dự án và nâng cao khả năng làm việc nhóm.
            </p>
          </div>
        </section>

        <section id="skills" className="section">
          <h2>Kỹ năng</h2>

          <div className="skills-list">
            {skills.map((skill) => (
              <span key={skill.id}>{skill.skill_name}</span>
            ))}
          </div>

          {skills.length === 0 && (
            <p>Chưa có kỹ năng nào được cập nhật.</p>
          )}
        </section>

        <section id="projects" className="section">
          <h2>Dự án của mình</h2>

          <div className="project-list">
            {projects.map((project) => (
              <article className="project-card" key={project.id}>
                <h3>{project.project_name}</h3>
                <p>{project.description}</p>

                {project.project_url && (
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Xem dự án
                  </a>
                )}
              </article>
            ))}
          </div>

          {projects.length === 0 && (
            <p>Chưa có dự án nào được cập nhật.</p>
          )}
        </section>

        <section id="contact" className="section">
          <h2>Liên hệ</h2>

          <p>Cậu có thể liên hệ với mình qua email hoặc GitHub.</p>

          {personalInfo?.email && (
            <a className="button" href={`mailto:${personalInfo.email}`}>
              Gửi email
            </a>
          )}

          {personalInfo?.github_url && (
            <a
              className="button"
              href={personalInfo.github_url}
              target="_blank"
              rel="noreferrer"
            >
              GitHub của mình
            </a>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 MyPortfolio. Được xây dựng bằng React.</p>
      </footer>
    </>
  )
}

export default App
