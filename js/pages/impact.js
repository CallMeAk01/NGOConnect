// ============================================================
// NGO CONNECT — Impact Dashboard Page
// ============================================================

function renderImpact() {
  const stats = MOCK_DATA.stats;
  const ngos = MOCK_DATA.ngos.sort((a, b) => b.totalRescues - a.totalRescues);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const rescues = [420, 510, 630, 580, 710, 850, 920, 1050, 1180, 1340, 1420, 1560];
  const maxR = Math.max(...rescues);

  return `
    <div class="page-header">
      <div class="container">
        <h1>📊 Impact Dashboard</h1>
        <p>Real-time metrics tracking our community's impact</p>
        <div style="font-size:0.8rem;color:var(--text-muted);margin-top:8px;">🔄 Last updated: ${formatDateTime(new Date().toISOString())}</div>
      </div>
    </div>
    <section class="section"><div class="container">
      <div class="grid-4 animate-in" style="margin-bottom:3rem;">
        <div class="metric-card"><div class="metric-icon">🐾</div><div class="metric-value text-gradient" id="metricTotalCases" data-count="${stats.totalRescues}">0</div><div class="metric-label">Total Rescues</div></div>
        <div class="metric-card"><div class="metric-icon">✅</div><div class="metric-value text-gradient" id="metricSuccessRate" data-count="${stats.successRate}">0</div><div class="metric-label">Success Rate %</div></div>
        <div class="metric-card"><div class="metric-icon">💰</div><div class="metric-value text-gradient" id="metricFunds" data-count="${Math.round(stats.totalFundsRaised / 100000)}">0</div><div class="metric-label">Lakhs Raised (₹)</div></div>
        <div class="metric-card"><div class="metric-icon">⏱️</div><div class="metric-value text-gradient" id="metricAvgTime" data-count="32">0</div><div class="metric-label">Avg Resolution (min)</div></div>
      </div>

      <!-- Case Heatmap -->
      <div class="card animate-in" style="margin-bottom:3rem; padding:0; overflow:hidden;">
        <div style="padding:var(--space-lg) var(--space-xl) 0;">
          <h3>🗺️ Rescue Heatmap</h3>
          <p style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">Case locations colored by urgency: 🔴 Critical · 🟡 Moderate · 🟢 Stable</p>
        </div>
        <div id="impactHeatmap" style="width:100%; height:380px; margin-top:var(--space-md);"></div>
      </div>

      <div class="grid-2" style="gap:2rem;margin-bottom:3rem;">
        <div class="chart-container animate-in">
          <h3 style="margin-bottom:1rem;">📈 Rescues Over Time (2026)</h3>
          <div class="chart-bars">${rescues.map((v, i) => `<div style="flex:1;display:flex;flex-direction:column;align-items:center;"><div class="chart-bar" style="height:${(v / maxR) * 200}px;width:100%;"></div><div class="chart-bar-label">${months[i]}</div></div>`).join('')}</div>
        </div>
        <div class="card animate-in">
          <h3 style="margin-bottom:1.5rem;">🏙️ City-wise Breakdown</h3>
          ${[{ c: 'Mumbai', r: 3420, p: 27 }, { c: 'Delhi', r: 2890, p: 22 }, { c: 'Bangalore', r: 2100, p: 16 }, { c: 'Jaipur', r: 1560, p: 12 }, { c: 'Kolkata', r: 1230, p: 10 }, { c: 'Others', r: 1647, p: 13 }].map(x => `<div class="stat-bar"><div class="stat-bar-header"><span>${x.c}</span><span style="color:var(--text-muted);">${x.r.toLocaleString()} (${x.p}%)</span></div><div class="stat-bar-track"><div class="stat-bar-fill" style="width:${x.p}%;"></div></div></div>`).join('')}
        </div>
      </div>
      <div class="grid-2" style="gap:2rem;margin-bottom:3rem;">
        <div class="card animate-in"><h3 style="margin-bottom:1.5rem;">🌍 Social Impact</h3><div class="grid-2" style="gap:1rem;">
          <div class="ticker-item"><div class="ticker-value" style="font-size:1.4rem;">1,284</div><div class="ticker-label">Saved This Month</div></div>
          <div class="ticker-item"><div class="ticker-value" style="font-size:1.4rem;">32 min</div><div class="ticker-label">Avg Rescue Time</div></div>
          <div class="ticker-item"><div class="ticker-value" style="font-size:1.4rem;">18%</div><div class="ticker-label">Monthly Growth</div></div>
          <div class="ticker-item"><div class="ticker-value" style="font-size:1.4rem;">4.7 ⭐</div><div class="ticker-label">Avg NGO Rating</div></div>
        </div></div>
        <div class="card animate-in"><h3 style="margin-bottom:1.5rem;">💰 Financial Summary</h3>
          <div style="display:flex;gap:1.5rem;margin-bottom:1.5rem;">
            <div class="ticker-item" style="flex:1;"><div class="ticker-value" style="font-size:1.3rem;color:var(--emerald-light);">${formatCurrency(stats.totalFundsRaised)}</div><div class="ticker-label">Raised</div></div>
            <div class="ticker-item" style="flex:1;"><div class="ticker-value" style="font-size:1.3rem;color:var(--gold-light);">${formatCurrency(stats.totalFundsSpent)}</div><div class="ticker-label">Spent</div></div>
          </div>
          <div class="stat-bar"><div class="stat-bar-header"><span>Utilization</span><span style="color:var(--emerald-light);">${Math.round((stats.totalFundsSpent / stats.totalFundsRaised) * 100)}%</span></div><div class="stat-bar-track" style="height:12px;"><div class="stat-bar-fill" style="width:${Math.round((stats.totalFundsSpent / stats.totalFundsRaised) * 100)}%;"></div></div></div>
        </div>
      </div>
      <div class="card animate-in" style="margin-bottom:3rem;">
        <div class="flex-between" style="margin-bottom:1.5rem;"><h3>🏆 NGO Leaderboard</h3><span style="font-size:0.8rem;color:var(--text-muted);">🔄 Real-time</span></div>
        <table class="finance-table"><thead><tr><th>Rank</th><th>NGO</th><th>City</th><th>Rescues</th><th>Rate</th><th>Rating</th></tr></thead><tbody id="impactNgoTable">
        ${ngos.map((n, i) => `<tr style="cursor:pointer;" onclick="navigate('/ngo/${n.id}')"><td style="font-weight:700;color:${i < 3 ? 'var(--gold-light)' : 'var(--text-muted)'};">${i < 3 ? ['🥇', '🥈', '🥉'][i] : i + 1}</td><td><span>🏢 <strong>${n.name}</strong></span></td><td style="color:var(--text-muted);">${n.city}</td><td style="color:var(--teal-light);font-weight:600;">${n.totalRescues.toLocaleString()}</td><td>${n.successRate}%</td><td style="color:var(--gold-light);">⭐${n.rating}</td></tr>`).join('')}
        </tbody></table>
      </div>
      <div class="text-center animate-in"><h3 style="margin-bottom:1rem;">📥 Transparency Reports</h3><p style="color:var(--text-secondary);margin-bottom:1.5rem;">Date-stamped PDFs for public verification</p><div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;"><button class="btn btn-secondary" onclick="showToast('📥 Downloading...')">📄 Feb 2026</button><button class="btn btn-secondary" onclick="showToast('📥 Downloading...')">📄 Jan 2026</button><button class="btn btn-secondary" onclick="showToast('📥 Downloading...')">📄 Annual 2025</button></div></div>
    </div></section>`;
}

function initImpactPage() {
  setTimeout(() => initCounters(), 200);

  // --- Initialize Case Heatmap ---
  if (typeof L !== 'undefined') {
    const heatmap = L.map('impactHeatmap').setView([20.5937, 78.9629], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '© OpenStreetMap'
    }).addTo(heatmap);

    // Plot case locations from mock data as colored circles
    const urgencyColors = { critical: '#DC2626', moderate: '#F59E0B', stable: '#16A34A' };

    // Try fetching from backend analytics
    fetch('http://localhost:3000/api/cases/analytics/overview')
      .then(res => res.json())
      .then(data => {
        // Update stat cards with live data
        if (data.summary) {
          const s = data.summary;
          const el = document.getElementById('metricTotalCases');
          if (el) { el.setAttribute('data-count', s.totalCases); el.textContent = s.totalCases; }
          const el2 = document.getElementById('metricSuccessRate');
          if (el2) { el2.setAttribute('data-count', s.successRate); el2.textContent = s.successRate; }
        }

        // Plot case locations on heatmap
        if (data.caseLocations && data.caseLocations.length > 0) {
          data.caseLocations.forEach(c => {
            const color = urgencyColors[c.urgency?.toLowerCase()] || '#2563EB';
            L.circleMarker([c.latitude, c.longitude], {
              radius: 8, fillColor: color, color: color, fillOpacity: 0.6, weight: 1, opacity: 0.8
            }).addTo(heatmap);
          });
        }
      })
      .catch(() => {
        // Fallback: plot mock case locations from MOCK_DATA
        const mockLocations = [
          { lat: 19.0760, lng: 72.8777, urgency: 'critical' },
          { lat: 19.0330, lng: 73.0297, urgency: 'moderate' },
          { lat: 28.7041, lng: 77.1025, urgency: 'critical' },
          { lat: 28.5355, lng: 77.3910, urgency: 'stable' },
          { lat: 12.9716, lng: 77.5946, urgency: 'moderate' },
          { lat: 13.0827, lng: 80.2707, urgency: 'critical' },
          { lat: 22.5726, lng: 88.3639, urgency: 'stable' },
          { lat: 26.9124, lng: 75.7873, urgency: 'moderate' },
          { lat: 23.0225, lng: 72.5714, urgency: 'critical' },
          { lat: 17.3850, lng: 78.4867, urgency: 'stable' },
          { lat: 18.5204, lng: 73.8567, urgency: 'moderate' },
          { lat: 21.1702, lng: 72.8311, urgency: 'critical' },
          { lat: 15.2993, lng: 74.1240, urgency: 'stable' },
          { lat: 30.7333, lng: 76.7794, urgency: 'moderate' },
          { lat: 25.4358, lng: 81.8463, urgency: 'critical' },
        ];
        mockLocations.forEach(c => {
          const color = urgencyColors[c.urgency] || '#2563EB';
          L.circleMarker([c.lat, c.lng], {
            radius: 8, fillColor: color, color: color, fillOpacity: 0.6, weight: 1, opacity: 0.8
          }).addTo(heatmap);
        });
      });
  }

  // --- Fetch NGO Leaderboard ---
  fetch('http://localhost:3000/api/ngos?limit=10')
    .then(res => res.json())
    .then(json => {
      if (json.data && json.data.length > 0) {
        let liveNgos = json.data;
        const getRescues = (n) => n.rescueStats && typeof n.rescueStats === 'string' ? JSON.parse(n.rescueStats).totalRescues : (n.rescueStats?.totalRescues || 0);
        const getRate = (n) => n.rescueStats && typeof n.rescueStats === 'string' ? JSON.parse(n.rescueStats).successRate : (n.rescueStats?.successRate || 0);

        liveNgos.sort((a, b) => getRescues(b) - getRescues(a));

        document.getElementById('impactNgoTable').innerHTML = liveNgos.map((n, i) => `
          <tr style="cursor:pointer;" onclick="navigate('/ngo/${n.id}')">
            <td style="font-weight:700;color:${i < 3 ? 'var(--gold-light)' : 'var(--text-muted)'};">${i < 3 ? ['🥇', '🥈', '🥉'][i] : i + 1}</td>
            <td><span>🏢 <strong>${n.orgName || n.name}</strong></span></td>
            <td style="color:var(--text-muted);">${n.city || 'India'}</td>
            <td style="color:var(--teal-light);font-weight:600;">${getRescues(n).toLocaleString()}</td>
            <td>${getRate(n)}%</td>
            <td style="color:var(--gold-light);">⭐${n.rating || 0}</td>
          </tr>
        `).join('');
      }
    })
    .catch(err => console.error("Error fetching NGO leaderboard", err));
}

