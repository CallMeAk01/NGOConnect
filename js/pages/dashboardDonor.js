// ============================================================
// NGO CONNECT — Donor Dashboard
// ============================================================

function renderDashboardDonor() {
    const donations = [
        { caseId: 'CASE-1001', caseName: 'Injured Dog Near Railway', amount: 5000, date: '2026-02-18T11:00:00+05:30', status: 'Treatment ongoing' },
        { caseId: 'CASE-1002', caseName: 'Kitten in Storm Drain', amount: 2000, date: '2026-02-17T17:00:00+05:30', status: 'Resolved ✅' },
        { caseId: 'CASE-1003', caseName: 'Cow with Plastic Ingestion', amount: 10000, date: '2026-02-18T09:00:00+05:30', status: 'Treatment ongoing' },
        { caseId: null, caseName: 'General Rescue Fund', amount: 3000, date: '2026-02-10T08:00:00+05:30', status: 'Allocated' },
    ];
    const totalDonated = donations.reduce((s, d) => s + d.amount, 0);

    return `
    <section class="section" style="padding-top:2rem;"><div class="container">
      <div class="dashboard-layout">
        <div class="dashboard-sidebar">
          <div style="text-align:center;margin-bottom:2rem;">
            <div style="font-size:3rem;margin-bottom:0.5rem;">💰</div>
            <h3 style="font-size:1rem;">Kavita Mehra</h3>
            <p style="color:var(--text-muted);font-size:0.8rem;">Regular Donor</p>
          </div>
          <nav class="sidebar-nav">
            <a href="#/dashboard/donor" class="active">📋 My Donations</a>
            <a href="#/dashboard/donor">📊 Impact Summary</a>
            <a href="#/dashboard/donor">🧾 Tax Receipts</a>
            <a href="#/dashboard/donor">⚙️ Settings</a>
            <a href="#/" onclick="showToast('Logged out')">🚪 Logout</a>
          </nav>
        </div>
        <div class="dashboard-main">
          <div class="dashboard-header">
            <div><h2>💰 Donor Dashboard</h2><p style="color:var(--text-muted);font-size:0.9rem;">Track your donations and impact</p></div>
            <a href="#/donate" class="btn btn-gold">💰 Donate More</a>
          </div>
          <!-- Impact Summary -->
          <div class="grid-4 animate-in" style="margin-bottom:2rem;">
            <div class="ticker-item"><div class="ticker-value" style="font-size:1.4rem;">${formatCurrency(totalDonated)}</div><div class="ticker-label">Total Donated</div></div>
            <div class="ticker-item"><div class="ticker-value" style="font-size:1.4rem;">12</div><div class="ticker-label">Animals Helped</div></div>
            <div class="ticker-item"><div class="ticker-value" style="font-size:1.4rem;">${donations.length}</div><div class="ticker-label">Transactions</div></div>
            <div class="ticker-item"><div class="ticker-value" style="font-size:1.4rem;">100%</div><div class="ticker-label">Tracked & Verified</div></div>
          </div>
          <!-- Donation History -->
          <div class="card animate-in" style="padding:1.5rem;margin-bottom:2rem;">
            <h3 style="margin-bottom:1rem;">📋 Donation History</h3>
            <table class="finance-table">
              <thead><tr><th>Timestamp</th><th>Case</th><th>Amount</th><th>Status</th><th>Receipt</th></tr></thead>
              <tbody>
                ${donations.map(d => `
                  <tr ${d.caseId ? `style="cursor:pointer;" onclick="navigate('/case/${d.caseId}')"` : ''}>
                    <td style="font-size:0.8rem;color:var(--text-muted);">${formatDateTime(d.date)}</td>
                    <td style="font-weight:600;">${d.caseName}</td>
                    <td style="color:var(--emerald-light);font-weight:600;">${formatCurrency(d.amount)}</td>
                    <td><span style="font-size:0.85rem;">${d.status}</span></td>
                    <td><button class="btn btn-sm btn-secondary" onclick="event.stopPropagation();showToast('📥 Receipt downloaded!')">🧾</button></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <!-- Transparency Note -->
          <div class="trust-section animate-in" style="padding:1.5rem;">
            <p style="color:var(--teal-light);font-size:0.9rem;">🔒 All transactions are timestamped, recorded on-chain, and publicly verifiable. You can track every rupee on the case detail page.</p>
          </div>
        </div>
      </div>
    </div></section>`;
}
function initDashboardDonorPage() { }
