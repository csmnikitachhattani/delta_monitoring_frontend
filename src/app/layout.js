import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
                <span>Δ</span> Delta
              </span>
            </a>

            {/* Live status pill */}
            <div className="navbar-center">
              <div className="status-dot" />
              <span className="status-label">Live · 24 streams</span>
            </div>

            {/* Actions */}
            <div className="navbar-actions">
              <button className="btn btn-create">
                <svg
                  width="13" height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Create
              </button>

              <button className="btn btn-logout">
                <svg
                  width="13" height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </div>
          </nav>

          {/* ── BODY ── */}
          <div className="layout-body">
            {/* Sidebar */}
            <aside className="sidebar">
              <span className="sidebar-section-label">Monitor</span>

              <a href="/dashboard" className="sidebar-item active">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                </svg>
                Dashboard
              </a>

              <a href="/streams" className="sidebar-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                Streams
              </a>

              <a href="/alerts" className="sidebar-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                Alerts
              </a>

              <span className="sidebar-section-label">Analyze</span>

              <a href="/reports" className="sidebar-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
                Reports
              </a>

              <a href="/logs" className="sidebar-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                </svg>
                Event Logs
              </a>

              <span className="sidebar-section-label">System</span>

              <a href="/settings" className="sidebar-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                Settings
              </a>
            </aside>

            {/* Page content slot */}
            <div className="page-content">
              <div className="page-topbar">
                <span className="page-title">Dashboard</span>
                <span className="page-meta">Last sync: just now</span>
              </div>
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