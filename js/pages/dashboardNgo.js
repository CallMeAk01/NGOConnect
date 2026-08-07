// ============================================================
// NGO CONNECT — NGO Dashboard
// ============================================================

function renderDashboardNgo() {
    const incoming = MOCK_DATA.cases.filter(c => c.status === 'open');
    const active = MOCK_DATA.cases.filter(c => c.status === 'in-progress');
    return `
    <section class="section" style="padding-top:2rem;"><div class="container">
      <div class="dashboard-layout">
        <div class="dashboard-sidebar">
          <div style="text-align:center;margin-bottom:2rem;">
            <div class="ngo-avatar" style="width:60px;height:60px;font-size:1.5rem;margin:0 auto 0.5rem;">🐾</div>
            <h3 style="font-size:1rem;">Paws & Care Foundation</h3>
            <span class="badge badge-verified" style="font-size:0.6rem;">✅ Verified</span>
          </div>
          <nav class="sidebar-nav">
            <a href="#/dashboard/ngo" class="active">📥 Incoming Cases <span class="notification-dot"></span></a>
            <a href="#/dashboard/ngo">🔄 Active Cases</a>
            <a href="#/dashboard/ngo">💰 Financials</a>
            <a href="#/dashboard/ngo">📊 Analytics</a>
            <a href="#/dashboard/ngo">🤝 Coordination</a>
            <a href="#/" onclick="showToast('Logged out')">🚪 Logout</a>
          </nav>
        </div>
        <div class="dashboard-main">
          <div class="dashboard-header">
            <div><h2>🏢 NGO Dashboard</h2><p style="color:var(--text-muted);font-size:0.9rem;">Manage cases, track finances, and view analytics</p></div>
          </div>
          <!-- Quick Stats -->
          <div class="grid-4 animate-in" style="margin-bottom:2rem;">
            <div class="ticker-item"><div class="ticker-value" style="font-size:1.4rem;">${incoming.length}</div><div class="ticker-label">Incoming</div></div>
            <div class="ticker-item"><div class="ticker-value" style="font-size:1.4rem;">${active.length}</div><div class="ticker-label">Active</div></div>
            <div class="ticker-item"><div class="ticker-value" style="font-size:1.4rem;">96%</div><div class="ticker-label">Success Rate</div></div>
            <div class="ticker-item"><div class="ticker-value" style="font-size:1.4rem;">23 min</div><div class="ticker-label">Avg Response</div></div>
          </div>
          <!-- Incoming Cases -->
          <div class="card animate-in" style="margin-bottom:2rem;padding:1.5rem;">
            <h3 style="margin-bottom:1rem;">📥 Incoming Cases <span class="badge badge-critical" style="font-size:0.6rem;">${incoming.length} new</span></h3>
            ${incoming.length > 0 ? incoming.map(c => `
              <div style="display:flex;align-items:center;gap:1rem;padding:1rem 0;border-bottom:1px solid var(--border-glass);">
                <div style="font-size:1.5rem;">${c.emoji}</div>
                <div style="flex:1;">
                  <div style="font-weight:600;">${c.title}</div>
                  <div style="font-size:0.8rem;color:var(--text-muted);">📍 ${c.location} • 🕐 ${timeAgo(c.reportedAt)}</div>
                </div>
                ${getUrgencyBadge(c.urgency)}
                <button class="btn btn-sm btn-primary" onclick="showToast('✅ Case accepted!')">Accept</button>
              </div>
            `).join('') : '<p style="color:var(--text-muted);">No incoming cases.</p>'}
          </div>
          <!-- Active Cases -->
          <div class="card animate-in" style="padding:1.5rem;">
            <h3 style="margin-bottom:1rem;">🔄 Active Cases</h3>
            ${active.map(c => `
              <div style="display:flex;align-items:center;gap:1rem;padding:1rem 0;border-bottom:1px solid var(--border-glass);cursor:pointer;" onclick="navigate('/case/${c.id}')">
                <div style="font-size:1.5rem;">${c.emoji}</div>
                <div style="flex:1;">
                  <div style="font-weight:600;">${c.title}</div>
                  <div style="font-size:0.8rem;color:var(--text-muted);">📅 ${formatDateTime(c.reportedAt)}</div>
                </div>
                ${getStatusBadge(c.status)}
                <div style="text-align:right;">
                  <div style="font-size:0.85rem;color:var(--teal-light);">${formatCurrency(c.fundsRaised)}</div>
                  <div style="font-size:0.7rem;color:var(--text-muted);">of ${formatCurrency(c.fundsRequired)}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div></section>`;
}
function initDashboardNgoPage() { }
