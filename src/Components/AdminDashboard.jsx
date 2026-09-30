import "./AdminDashboard.css";

const navItems = [
  { icon: "▦", label: "Dashboard", active: true },
  { icon: "◉", label: "Tasks" },
  { icon: "▣", label: "Calendar" },
  { icon: "▥", label: "Analytics" },
  { icon: "♣", label: "Team" },
];

const generalItems = [
  { icon: "⚙", label: "Settings" },
  { icon: "☷", label: "Help" },
  { icon: "◧", label: "Logout" },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">
          <span>▾</span>
        </div>
        <div className="brand-name">NUNES AUTO</div>
      </div>

      <div className="menu-section">
        <h4>Menu</h4>

        <nav>
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${item.active ? "active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="menu-section general">
        <h4>General</h4>

        <nav>
          {generalItems.map((item) => (
            <button className="nav-item" key={item.label}>
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="topbar">
      <div className="search-box">
        <span className="search-icon">⌕</span>
        <span>Search</span>
      </div>

      <div className="profile">
        <div className="avatar">👩🏻</div>

        <div className="profile-info">
          <strong>Melly Note</strong>
          <span>mellynote@gmail.com</span>
        </div>
      </div>
    </header>
  );
}

function DashboardCard({ dark = false, className = "" }) {
  return (
    <div
      className={`dashboard-card ${dark ? "dark" : ""} ${className}`}
    />
  );
}

export default function AdminDashboard() {
  return (
    <div className="app">
      <div className="app-shell">
        <Sidebar />

        <div className="content">
          <Topbar />

          <main className="dashboard">
            <div className="dashboard-header">
              <div>
                <h1>Dashboard</h1>
                <p>
                  plan, prioritize, and accomplish your tasks with ease.
                </p>
              </div>

              <div className="actions">
                <button className="add-project">
                  <span>+</span>
                  Add Project
                </button>

                <button className="import-button">
                  Import Data
                </button>
              </div>
            </div>

            <section className="card-grid">
              <DashboardCard dark />
              <DashboardCard />
              <DashboardCard />
              <DashboardCard />

              <DashboardCard />
              <DashboardCard />
              <DashboardCard />

              <DashboardCard />
              <DashboardCard />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}