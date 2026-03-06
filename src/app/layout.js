import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Logout from '@/components/LogoutButton'
import Create from '@/components/CreateButton'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Delta Monitor",
  description: "Real-time delta monitoring dashboard",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');

          *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          :root {
            --bg-base:       #f5f6f8;
            --bg-surface:    #ffffff;
            --bg-elevated:   #eef0f4;
            --border:        #dde0e8;
            --border-glow:   #c4c9d8;
            --accent:        #2563eb;
            --accent-dim:    #1d4ed8;
            --accent-glow:   rgba(37,99,235,0.10);
            --text-primary:  #0f1623;
            --text-secondary:#4b5672;
            --text-muted:    #9aa0b4;
            --danger:        #dc2626;
            --success:       #16a34a;
            --font-display:  'Syne', sans-serif;
            --font-mono:     'Space Mono', monospace;
          }

          html, body {
            height: 100%;
            background: var(--bg-base);
            color: var(--text-primary);
          }

          /* ── APP SHELL ── */
          .app-shell {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            font-family: var(--font-display);
          }

          /* ── NAVBAR ── */
          .navbar {
            position: sticky;
            top: 0;
            z-index: 100;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 2rem;
            height: 60px;
            background: rgba(255,255,255,0.92);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--border);
          }

          .navbar::after {
            content: '';
            position: absolute;
            bottom: 0; left: 0; right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--accent), transparent);
            opacity: 0.5;
          }

          /* Logo */
          .navbar-brand {
            display: flex;
            align-items: center;
            gap: 0.65rem;
            text-decoration: none;
          }

          .brand-icon {
            width: 30px;
            height: 30px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .brand-icon svg {
            width: 100%;
            height: 100%;
          }

          .brand-wordmark {
            font-family: var(--font-display);
            font-weight: 800;
            font-size: 1.1rem;
            letter-spacing: 0.05em;
            color: var(--text-primary);
            text-transform: uppercase;
          }

          .brand-wordmark span {
            color: var(--accent);
          }

          /* Center pill nav (optional status) */
          .navbar-center {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            background: var(--bg-elevated);
            border: 1px solid var(--border);
          }

          .status-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: var(--success);
            box-shadow: 0 0 6px var(--success);
            animation: pulse-dot 2.4s ease-in-out infinite;
          }

          @keyframes pulse-dot {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0.4; }
          }

          .status-label {
            font-family: var(--font-mono);
            font-size: 0.7rem;
            color: var(--text-secondary);
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          /* Right actions */
          .navbar-actions {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }

          /* ── BUTTONS ── */
          .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.45rem 1.1rem;
            border-radius: 6px;
            font-family: var(--font-display);
            font-size: 0.82rem;
            font-weight: 600;
            letter-spacing: 0.03em;
            cursor: pointer;
            transition: all 0.18s ease;
            border: none;
            outline: none;
            white-space: nowrap;
          }

          .btn-create {
            background: var(--accent);
            color: #ffffff;
            box-shadow: 0 1px 3px rgba(37,99,235,0.25);
          }

          .btn-create:hover {
            background: var(--accent-dim);
            box-shadow: 0 4px 14px rgba(37,99,235,0.3), 0 1px 4px rgba(0,0,0,0.1);
            transform: translateY(-1px);
          }

          .btn-create:active {
            transform: translateY(0);
            box-shadow: none;
          }

          .btn-create svg {
            stroke: #ffffff;
          }

          .btn-logout {
            background: transparent;
            color: var(--text-secondary);
            border: 1px solid var(--border);
          }

          .btn-logout:hover {
            color: var(--danger);
            border-color: var(--danger);
            background: rgba(224,82,82,0.07);
            transform: translateY(-1px);
          }

          .btn-logout:active {
            transform: translateY(0);
          }

          /* ── SIDEBAR + MAIN ── */
          .layout-body {
            display: flex;
            flex: 1;
          }

          .sidebar {
            width: 220px;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            padding: 1.25rem 0.75rem;
            border-right: 1px solid var(--border);
            background: var(--bg-surface);
          }

          .sidebar-section-label {
            padding: 0.35rem 0.6rem;
            font-family: var(--font-mono);
            font-size: 0.62rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.12em;
            margin-bottom: 0.15rem;
            margin-top: 0.5rem;
          }

          .sidebar-section-label:first-child {
            margin-top: 0;
          }

          .sidebar-item {
            display: flex;
            align-items: center;
            gap: 0.65rem;
            padding: 0.5rem 0.75rem;
            border-radius: 6px;
            font-size: 0.84rem;
            font-weight: 600;
            color: var(--text-secondary);
            cursor: pointer;
            transition: all 0.15s ease;
            border: 1px solid transparent;
            text-decoration: none;
          }

          .sidebar-item:hover {
            color: var(--text-primary);
            background: var(--bg-elevated);
            border-color: var(--border);
          }

          .sidebar-item.active {
            color: var(--accent);
            background: var(--accent-glow);
            border-color: rgba(37,99,235,0.2);
          }

          .sidebar-item svg {
            width: 15px;
            height: 15px;
            flex-shrink: 0;
          }

          .sidebar-item.active svg {
            stroke: var(--accent);
          }

          /* ── PAGE CONTENT ── */
          .page-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }

          /* ── TOPBAR (breadcrumb / page title) ── */
          .page-topbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.9rem 2rem;
            border-bottom: 1px solid var(--border);
            background: var(--bg-surface);
          }

          .page-title {
            font-weight: 800;
            font-size: 1.05rem;
            letter-spacing: 0.02em;
            color: var(--text-primary);
          }

          .page-meta {
            font-family: var(--font-mono);
            font-size: 0.7rem;
            color: var(--text-muted);
          }

          /* ── MAIN SLOT ── */
          .page-main {
            flex: 1;
            padding: 2rem;
            overflow-y: auto;
          }

          /* Scrollbar */
          .page-main::-webkit-scrollbar { width: 6px; }
          .page-main::-webkit-scrollbar-track { background: var(--bg-base); }
          .page-main::-webkit-scrollbar-thumb {
            background: var(--border-glow);
            border-radius: 3px;
          }

          /* ── SCAN LINE OVERLAY ── */
          .scan-lines {
            pointer-events: none;
            position: fixed;
            inset: 0;
            z-index: 999;
            background: repeating-linear-gradient(
              0deg,
              transparent,
              transparent 3px,
              rgba(0,0,0,0.012) 3px,
              rgba(0,0,0,0.012) 4px
            );
          }

          /* ── RESPONSIVE ── */
          @media (max-width: 768px) {
            .sidebar { display: none; }
            .navbar-center { display: none; }
            .btn { padding: 0.42rem 0.85rem; }
          }
        `}</style>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="scan-lines" aria-hidden="true" />

        <div className="app-shell">
          {/* ── NAVBAR ── */}
          <nav className="navbar">
            {/* Brand */}
            <a href="/" className="navbar-brand">
              <div className="brand-icon">
                <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon
                    points="15,3 27,24 3,24"
                    stroke="#2563eb"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    fill="rgba(37,99,235,0.08)"
                  />
                  <line x1="9" y1="24" x2="21" y2="24" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="15" cy="14" r="2" fill="#2563eb" />
                </svg>
              </div>
              <span className="brand-wordmark">
                 Delta Monitoring
              </span>
            </a>

            {/* Live status pill */}
            {/* <div className="navbar-center">
              <div className="status-dot" />
              <span className="status-label">Live · 24 streams</span>
            </div> */}

            {/* Actions */}
            <div className="navbar-actions">
         
              <Create />


              <Logout />
            </div>
          </nav>

          {/* ── BODY ── */}
          <div className="layout-body">
            {/* Sidebar */}
            <aside className="sidebar">
              <span className="sidebar-section-label">Monitor</span>
              <a href="/" className="sidebar-item active">
                Dashboard
              </a>

            </aside>

            {/* Page content slot */}
            <div className="page-content">
         
              <main className="page-main">
                {children}
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}