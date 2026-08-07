// ============================================================
// NGO CONNECT — Reporter Dashboard
// ============================================================

function renderDashboardReporter() {
    const myCases = MOCK_DATA.cases.slice(0, 3);
    return `
    <section class="section" style="padding-top:2rem;">
      <div class="container">
        <div class="dashboard-layout">
          <div class="dashboard-sidebar">
            <div style="text-align:center;margin-bottom:2rem;">
              <div style="font-size:3rem;margin-bottom:0.5rem;">👤</div>
              <h3 style="font-size:1rem;">Rahul Sharma</h3>
              <p style="color:var(--text-muted);font-size:0.8rem;">Reporter</p>
            </div>
            <nav class="sidebar-nav">
              <a href="#/dashboard/reporter" class="active">📋 My Reports</a>
              <a href="#/dashboard/reporter">🔔 Notifications</a>
              <a href="#/dashboard/reporter">⚙️ Settings</a>
              <a href="#/" onclick="showToast('Logged out')">🚪 Logout</a>
            </nav>
          </div>
          <div class="dashboard-main">
            <div class="dashboard-header">
              <div><h2>📋 My Reports</h2><p style="color:var(--text-muted);font-size:0.9rem;">Track all your submitted reports</p></div>
              <a href="#/report" class="btn btn-primary">🚨 New Report</a>
            </div>
            <!-- Notifications -->
            <div class="card animate-in" style="margin-bottom:2rem;padding:1.5rem;">
              <h3 style="margin-bottom:1rem;">🔔 Recent Notifications</h3>
              ${[
            { msg: 'Your case CASE-1001 has been picked up by Paws & Care Foundation', time: '2h ago' },
            { msg: 'Treatment started for case CASE-1001 — X-ray completed', time: '4h ago' },
            { msg: 'Rescue team dispatched for your report', time: '6h ago' },
        ].map(n => `<div style="display:flex;justify-content:space-between;padding:0.75rem 0;border-bottom:1px solid var(--border-glass);">
                <span style="font-size:0.9rem;">${n.msg}</span>
                <span style="font-size:0.75rem;color:var(--text-muted);white-space:nowrap;margin-left:1rem;">${n.time}</span>
              </div>`).join('')}
            </div>
            <!-- My Reports List -->
            ${myCases.map(c => `
              <div class="card animate-in" style="margin-bottom:1rem;padding:1.5rem;cursor:pointer;" onclick="navigate('/case/${c.id}')">
                <div style="display:flex;align-items:center;gap:1rem;">
                  <div style="font-size:2rem;">${c.emoji}</div>
                  <div style="flex:1;">
                    <div style="font-weight:600;">${c.title}</div>
                    <div style="font-size:0.8rem;color:var(--text-muted);">📍 ${c.location} • 📅 ${formatDateTime(c.reportedAt)}</div>
                  </div>
                  <div style="text-align:right;">
                    ${getStatusBadge(c.status)}
                    <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">${c.id}</div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>`;
}
function initDashboardReporterPage() { }
