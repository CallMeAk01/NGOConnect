// ============================================================
// NGO CONNECT — Case Detail Page
// ============================================================

function renderCaseDetail(caseId) {
  const c = getCaseById(caseId);
  if (!c) return render404();

  const ngo = c.ngoAssigned ? getNgoById(c.ngoAssigned) : null;
  const totalCredits = c.financials.filter(f => f.type === 'credit').reduce((s, f) => s + f.amount, 0);
  const totalDebits = c.financials.filter(f => f.type === 'debit').reduce((s, f) => s + f.amount, 0);

  return `
    <div class="page-header">
      <div class="container">
        <div style="display:flex; align-items:center; gap:var(--space-md); flex-wrap:wrap; justify-content:center;">
          ${getUrgencyBadge(c.urgency)}
          ${getStatusBadge(c.status)}
        </div>
        <h1 style="margin-top:var(--space-md);">${c.emoji} ${c.title}</h1>
        <p>Case ${c.id} • Reported ${formatDateTime(c.reportedAt)} • ${c.location}</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="grid-2" style="grid-template-columns: 2fr 1fr; gap:2rem;">
          <!-- Left Column -->
          <div>
            <!-- Location & Photo Documentation -->
            <div class="card animate-in" style="margin-bottom:var(--space-xl);">
              <h3 style="margin-bottom:var(--space-lg);">📍 Precise Location</h3>
              <div id="caseDetailMap-${c.id}" style="width:100%; height:300px; border-radius:12px; border:1px solid var(--border-glass); background:var(--bg-glass); display:flex; align-items:center; justify-content:center;">
                <span style="color:var(--text-muted);">Loading Mappls...</span>
              </div>
            </div>

            <!-- Timeline / Activity Log -->
            <div class="card animate-in" style="margin-bottom:var(--space-xl);">
              <h3 style="margin-bottom:var(--space-lg);">📜 Activity Timeline</h3>
              <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:var(--space-lg);">Immutable, timestamped log of all actions</p>
              <div class="timeline">
                ${c.timeline.map((t, i) => `
                  <div class="timeline-item ${i === c.timeline.length - 1 ? 'active' : 'completed'}">
                    <div class="timeline-date">${formatDateTime(t.date)}</div>
                    <div class="timeline-title">${t.title}</div>
                    <div class="timeline-desc">${t.desc}</div>
                    <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">By: ${t.actor}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Financial Breakdown -->
            <div class="card animate-in">
              <h3 style="margin-bottom:var(--space-sm);">💰 Financial Transparency</h3>
              <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:var(--space-lg);">Every rupee documented and publicly verifiable</p>

              ${c.financials.length > 0 ? `
                <div style="display:flex; gap:var(--space-lg); margin-bottom:var(--space-xl);">
                  <div class="ticker-item" style="flex:1;">
                    <div class="ticker-value" style="font-size:1.4rem; color:var(--emerald-light);">${formatCurrency(totalCredits)}</div>
                    <div class="ticker-label">Total Received</div>
                  </div>
                  <div class="ticker-item" style="flex:1;">
                    <div class="ticker-value" style="font-size:1.4rem; color:var(--gold-light);">${formatCurrency(totalDebits)}</div>
                    <div class="ticker-label">Total Spent</div>
                  </div>
                  <div class="ticker-item" style="flex:1;">
                    <div class="ticker-value" style="font-size:1.4rem;">${formatCurrency(totalCredits - totalDebits)}</div>
                    <div class="ticker-label">Balance</div>
                  </div>
                </div>

                <table class="finance-table">
                  <thead>
                    <tr>
                      <th>Timestamp</th>
                      <th>Description</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${c.financials.sort((a, b) => new Date(a.date) - new Date(b.date)).map(f => `
                      <tr>
                        <td style="font-size:0.8rem; color:var(--text-muted);">${formatDateTime(f.date)}</td>
                        <td>${f.desc}</td>
                        <td style="color:${f.type === 'credit' ? 'var(--emerald-light)' : 'var(--gold-light)'}; font-weight:600;">
                          ${f.type === 'credit' ? '+' : '-'} ${formatCurrency(f.amount)}
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              ` : '<p style="color:var(--text-muted);">No financial transactions recorded yet.</p>'}
            </div>
          </div>

          <!-- Right Column - Sidebar -->
          <div>
            <!-- Funding Progress -->
            <div class="card animate-in" style="margin-bottom:var(--space-xl);">
              <h3 style="margin-bottom:var(--space-lg);">🎯 Funding Progress</h3>
              <div class="stat-bar">
                <div class="stat-bar-header">
                  <span style="color:var(--teal-light);">${formatCurrency(c.fundsRaised)}</span>
                  <span style="color:var(--text-muted);">of ${formatCurrency(c.fundsRequired)}</span>
                </div>
                <div class="stat-bar-track">
                  <div class="stat-bar-fill" style="width:${Math.min(100, (c.fundsRaised / c.fundsRequired) * 100)}%;"></div>
                </div>
              </div>
              <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:var(--space-lg);">${Math.round((c.fundsRaised / c.fundsRequired) * 100)}% funded</p>
              ${c.status !== 'resolved' ? `<a href="#/donate" class="btn btn-gold" style="width:100%; justify-content:center;">💰 Donate to This Case</a>` : ''}
            </div>

            <!-- Case Details -->
            <div class="card animate-in" style="margin-bottom:var(--space-xl);">
              <h3 style="margin-bottom:var(--space-lg);">📋 Case Details</h3>
              <div style="display:flex; flex-direction:column; gap:var(--space-md);">
                <div>
                  <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">Case ID</div>
                  <div style="font-weight:600;">${c.id}</div>
                </div>
                <div>
                  <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">Animal</div>
                  <div style="font-weight:600;">${c.emoji} ${c.animal}</div>
                </div>
                <div>
                  <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">Location</div>
                  <div style="font-weight:600;">📍 ${c.location}</div>
                </div>
                <div>
                  <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">Reported By</div>
                  <div style="font-weight:600;">${c.reportedBy}</div>
                </div>
                <div>
                  <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">Reported At</div>
                  <div style="font-weight:600;">${formatDateTime(c.reportedAt)}</div>
                </div>
                <div>
                  <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">Last Updated</div>
                  <div style="font-weight:600;">${formatDateTime(c.timeline[c.timeline.length - 1].date)}</div>
                </div>
              </div>
            </div>

            <!-- Assigned NGO -->
            ${ngo ? `
              <div class="card animate-in" style="margin-bottom:var(--space-xl); cursor:pointer;" onclick="navigate('/ngo/${ngo.id}')">
                <h3 style="margin-bottom:var(--space-lg);">🏢 Assigned NGO</h3>
                <div style="display:flex; align-items:center; gap:var(--space-md);">
                  <div class="ngo-avatar" style="width:50px; height:50px; font-size:1.4rem;">${ngo.emoji}</div>
                  <div>
                    <div style="font-weight:600;">${ngo.name}</div>
                    <div style="font-size:0.85rem; color:var(--text-muted);">📍 ${ngo.city} • ⭐ ${ngo.rating}</div>
                    <span class="badge badge-verified" style="font-size:0.65rem; margin-top:4px;">✅ Verified</span>
                  </div>
                </div>
                ${c.urgency.toLowerCase() === 'critical' && c.status.toLowerCase() !== 'resolved' ? `
                <div class="escalation-timer" id="escalationTimer">
                  <div>
                    <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">⏱️ NGO Response Deadline</div>
                    <div class="timer-display" id="timerDisplay">30:00</div>
                  </div>
                  <div class="timer-label">Auto-escalation if no response</div>
                </div>
                ` : ''}
              </div>
            ` : `
              <div class="card animate-in" style="margin-bottom:var(--space-xl);">
                <h3 style="margin-bottom:var(--space-md);">🏢 NGO Assignment</h3>
                <p style="color:var(--gold-light);">⏳ Awaiting NGO assignment...</p>
                <p style="font-size:0.85rem; color:var(--text-muted); margin-top:var(--space-sm);">Nearby verified NGOs are being notified.</p>
              </div>
            `}

            <!-- Share -->
            <div class="card animate-in">
              <h3 style="margin-bottom:var(--space-md);">📤 Share This Case</h3>
              <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:var(--space-md);">Help amplify this case by sharing</p>
              <div style="display:flex; gap:var(--space-sm);">
                <button class="btn btn-sm btn-secondary" onclick="showToast('Link copied!')">🔗 Copy Link</button>
                <button class="btn btn-sm btn-secondary">🐦 Twitter</button>
                <button class="btn btn-sm btn-secondary">📱 WhatsApp</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

let caseDetailMapInstance = null;

function initCaseDetailPage() {
  const hash = window.location.hash;
  const caseId = hash.split('/')[2];

  if (typeof L !== 'undefined' && caseId) {
    // Clear previous map instance if it exists
    if (caseDetailMapInstance) {
      caseDetailMapInstance.remove();
      caseDetailMapInstance = null;
    }

    // Simulate a location for the demo
    const simLoc = { lat: 19.0760, lng: 72.8777 };

    caseDetailMapInstance = L.map(`caseDetailMap-${caseId}`).setView([simLoc.lat, simLoc.lng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(caseDetailMapInstance);

    const popupText = `<strong>Case ${caseId}</strong>`;
    L.marker([simLoc.lat, simLoc.lng])
      .addTo(caseDetailMapInstance)
      .bindPopup(popupText)
      .openPopup();
  } else {
    const container = document.getElementById(`caseDetailMap-${caseId}`);
    if (container) container.innerHTML = '<span style="color:var(--danger);">Error loading Map library.</span>';
  }

  // --- Escalation Countdown Timer ---
  const timerEl = document.getElementById('timerDisplay');
  const timerContainer = document.getElementById('escalationTimer');
  if (timerEl && timerContainer) {
    let totalSeconds = 30 * 60; // 30 minutes
    // For demo purposes, start at a random point (5-25 min remaining)
    totalSeconds = Math.floor(Math.random() * 20 * 60) + 5 * 60;

    const timerInterval = setInterval(() => {
      totalSeconds--;
      if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        timerEl.textContent = '00:00';
        timerContainer.innerHTML = `
          <div style="text-align:center; width:100%;">
            <div style="font-size:1.1rem; font-weight:700; color:var(--danger); margin-bottom:4px;">🔄 Auto-Escalating...</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">Reassigning case to next nearest NGO</div>
          </div>
        `;
        showToast('⚠️ Case auto-escalated to next nearest NGO', 'warning');
        return;
      }
      const min = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
      const sec = (totalSeconds % 60).toString().padStart(2, '0');
      timerEl.textContent = `${min}:${sec}`;

      // Turn urgent (red) when under 5 minutes
      if (totalSeconds < 5 * 60) {
        timerContainer.classList.add('urgent');
      }
    }, 1000);
  }
}
