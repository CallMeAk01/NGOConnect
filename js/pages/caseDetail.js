// ============================================================
// NGO CONNECT — Case Detail Page (Live Backend Data)
// ============================================================

function renderCaseDetail(caseId) {
  // Render a loading shell first; initCaseDetailPage() fills it in
  return `
    <div class="page-header">
      <div class="container" id="caseDetailHeader">
        <div style="display:flex;align-items:center;gap:8px;justify-content:center;margin-bottom:8px;">
          <div class="skeleton skeleton-line short" style="width:80px;height:24px;border-radius:20px;"></div>
          <div class="skeleton skeleton-line short" style="width:80px;height:24px;border-radius:20px;"></div>
        </div>
        <div class="skeleton skeleton-line medium" style="width:300px;height:32px;margin:12px auto 8px;border-radius:8px;"></div>
        <div class="skeleton skeleton-line short" style="width:220px;height:16px;margin:0 auto;border-radius:8px;"></div>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="grid-2" style="grid-template-columns: 2fr 1fr; gap:2rem;">
          <!-- Left Column -->
          <div>
            <!-- Map -->
            <div class="card animate-in" style="margin-bottom:var(--space-xl);">
              <h3 style="margin-bottom:var(--space-lg);">📍 Precise Location</h3>
              <div id="caseDetailMap-${caseId}" style="width:100%; height:320px; border-radius:12px; border:1px solid var(--border-glass); background:var(--bg-glass); display:flex; align-items:center; justify-content:center;">
                <span style="color:var(--text-muted);">Loading map...</span>
              </div>
            </div>

            <!-- Proof Photos -->
            <div class="card animate-in" style="margin-bottom:var(--space-xl);" id="proofPhotoCard">
              <!-- Populated after fetch -->
            </div>

            <!-- Activity Timeline -->
            <div class="card animate-in" style="margin-bottom:var(--space-xl);">
              <h3 style="margin-bottom:var(--space-lg);">📜 Activity Timeline</h3>
              <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:var(--space-lg);">Immutable, timestamped log of all actions</p>
              <div class="timeline" id="caseTimeline">
                <div style="color:var(--text-muted);">Loading timeline...</div>
              </div>
            </div>

            <!-- Financial Breakdown -->
            <div class="card animate-in" id="caseFinancials">
              <h3 style="margin-bottom:var(--space-sm);">💰 Financial Transparency</h3>
              <p style="font-size:0.8rem; color:var(--text-muted);">Loading financials...</p>
            </div>
          </div>

          <!-- Right Sidebar -->
          <div>
            <!-- Funding Progress -->
            <div class="card animate-in" style="margin-bottom:var(--space-xl);" id="caseFundingCard">
              <h3 style="margin-bottom:var(--space-lg);">🎯 Funding Progress</h3>
              <div class="skeleton skeleton-line" style="height:8px;border-radius:4px;"></div>
              <div class="skeleton skeleton-line short" style="height:14px;margin-top:8px;width:60%;border-radius:4px;"></div>
            </div>

            <!-- Case Details -->
            <div class="card animate-in" style="margin-bottom:var(--space-xl);" id="caseDetailsCard">
              <h3 style="margin-bottom:var(--space-lg);">📋 Case Details</h3>
              <div style="color:var(--text-muted);font-size:0.85rem;">Loading details...</div>
            </div>

            <!-- Assigned NGO -->
            <div class="card animate-in" style="margin-bottom:var(--space-xl);" id="assignedNgoCard">
              <h3 style="margin-bottom:var(--space-md);">🏢 NGO Assignment</h3>
              <div style="color:var(--text-muted);font-size:0.85rem;">Loading...</div>
            </div>

            <!-- Informed NGOs -->
            <div class="card animate-in" style="margin-bottom:var(--space-xl);" id="informedNgosCard">
              <!-- Populated after fetch -->
            </div>

            <!-- Share -->
            <div class="card animate-in">
              <h3 style="margin-bottom:var(--space-md);">📤 Share This Case</h3>
              <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:var(--space-md);">Help amplify this case by sharing</p>
              <div style="display:flex; gap:var(--space-sm); flex-wrap:wrap;">
                <button class="btn btn-sm btn-secondary" onclick="navigator.clipboard?.writeText(window.location.href);showToast('Link copied!')">🔗 Copy Link</button>
                <button class="btn btn-sm btn-secondary" onclick="window.open('https://twitter.com/intent/tweet?text=Help+this+animal!+' + encodeURIComponent(window.location.href))">🐦 Twitter</button>
                <button class="btn btn-sm btn-secondary" onclick="window.open('https://wa.me/?text=Help+this+animal!+' + encodeURIComponent(window.location.href))">📱 WhatsApp</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

let caseDetailMapInstance = null;

async function initCaseDetailPage() {
  const hash = window.location.hash;
  const caseId = hash.split('/')[2];
  if (!caseId) return;

  let caseData = null;

  // ── Fetch real case data from backend ──────────────────────────
  try {
    const res = await fetch(`http://localhost:3000/api/cases/${caseId}`);
    if (res.ok) {
      caseData = await res.json();
    }
  } catch (e) {
    console.warn('Could not fetch case from backend, using mock data', e);
  }

  // Fallback to mock data if backend unreachable
  if (!caseData) {
    const mock = getCaseById(caseId);
    if (!mock) {
      document.getElementById('caseDetailHeader').innerHTML = '<h1 style="color:var(--danger);">Case not found</h1>';
      return;
    }
    caseData = {
      ...mock,
      latitude: mock.latitude || 19.0760,
      longitude: mock.longitude || 72.8777,
      createdAt: mock.reportedAt,
      assignedNgo: mock.ngoAssigned ? { id: mock.ngoAssigned, orgName: getNgoById(mock.ngoAssigned)?.name || 'NGO' } : null,
      activityLogs: mock.timeline?.map(t => ({
        actionType: 'STATUS_CHANGE',
        timestamp: t.date,
        metadata: JSON.stringify({ note: t.desc }),
        actor: { name: t.actor, email: t.actor }
      })) || [],
      informedNgos: [],
      fundsRaised: mock.fundsRaised || 0,
      fundsRequired: mock.fundsRequired || 0,
    };
  }

  // ── Update page header ──────────────────────────────────────────
  const headerEl = document.getElementById('caseDetailHeader');
  if (headerEl) {
    const title = caseData.title || caseData.description?.slice(0, 60) || 'Animal Rescue Case';
    headerEl.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:8px;">
        ${getUrgencyBadge(caseData.urgency)}
        ${getStatusBadge(caseData.status)}
        ${caseData.aiVerdict && caseData.aiVerdict !== 'PENDING' ? getAiBadge(caseData.aiVerdict, caseData.aiConfidence) : ''}
      </div>
      <h1 style="margin-top:var(--space-md);">🐾 ${title}</h1>
      <p>Case ${caseData.id?.slice(0,8)}... • Reported ${formatDateTime(caseData.createdAt || caseData.reportedAt)} • ${caseData.city || caseData.location || 'Location reported'}</p>
    `;
  }

  // ── Initialize Leaflet Map with REAL coordinates ────────────────
  const lat = caseData.latitude || 20.5937;
  const lng = caseData.longitude || 78.9629;

  if (typeof L !== 'undefined') {
    if (caseDetailMapInstance) {
      caseDetailMapInstance.remove();
      caseDetailMapInstance = null;
    }

    const mapEl = document.getElementById(`caseDetailMap-${caseId}`);
    if (mapEl) mapEl.innerHTML = ''; // clear loading text

    caseDetailMapInstance = L.map(`caseDetailMap-${caseId}`).setView([lat, lng], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(caseDetailMapInstance);

    // Case pin
    const urgencyColors = { CRITICAL: '#DC2626', MODERATE: '#F59E0B', STABLE: '#16A34A' };
    const pinColor = urgencyColors[caseData.urgency?.toUpperCase()] || '#F59E0B';

    const caseIcon = L.divIcon({
      html: `<div style="width:20px;height:20px;border-radius:50%;background:${pinColor};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4);"></div>`,
      className: '',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

    L.marker([lat, lng], { icon: caseIcon })
      .addTo(caseDetailMapInstance)
      .bindPopup(`<strong>🐾 ${caseData.urgency} Case</strong><br/>${caseData.description?.slice(0, 80) || ''}`)
      .openPopup();

    // Assigned NGO pin (if has coordinates)
    if (caseData.assignedNgo?.latitude && caseData.assignedNgo?.longitude) {
      const ngoIcon = L.divIcon({
        html: `<div style="width:16px;height:16px;border-radius:4px;background:#2563EB;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;font-size:8px;">🏢</div>`,
        className: '',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });
      L.marker([caseData.assignedNgo.latitude, caseData.assignedNgo.longitude], { icon: ngoIcon })
        .addTo(caseDetailMapInstance)
        .bindPopup(`<strong>🏢 ${caseData.assignedNgo.orgName}</strong><br/>Assigned NGO`);

      // Line connecting case to NGO
      L.polyline([[lat, lng], [caseData.assignedNgo.latitude, caseData.assignedNgo.longitude]], {
        color: '#2563EB', weight: 2, dashArray: '6,6', opacity: 0.6
      }).addTo(caseDetailMapInstance);
    }
  }

  // ── Proof Photos card ───────────────────────────────────────────
  const proofCard = document.getElementById('proofPhotoCard');
  if (proofCard) {
    // Look for proof images in activity logs
    const resolvedLog = [...(caseData.activityLogs || [])].reverse().find(log => {
      try {
        const m = JSON.parse(log.metadata || '{}');
        return m.proofImage && m.newStatus === 'RESOLVED';
      } catch { return false; }
    });

    // Also check the case images array
    let images = [];
    try { images = JSON.parse(caseData.images || '[]'); } catch {}

    if (resolvedLog || images.length > 0) {
      let meta = {};
      try { meta = JSON.parse(resolvedLog?.metadata || '{}'); } catch {}

      proofCard.innerHTML = `
        <h3 style="margin-bottom:var(--space-lg);">📸 Documentation</h3>
        ${meta.proofImage ? `
          <div style="margin-bottom:var(--space-md);">
            <div style="font-size:0.8rem;color:var(--success);font-weight:600;margin-bottom:8px;">✅ Resolution Proof by NGO</div>
            <img src="${meta.proofImage}" alt="Resolution proof" style="width:100%;border-radius:8px;border:2px solid var(--success);max-height:250px;object-fit:cover;">
            ${meta.resolutionNote ? `<p style="font-size:0.85rem;color:var(--text-secondary);margin-top:8px;font-style:italic;">"${meta.resolutionNote}"</p>` : ''}
          </div>` : ''}
        ${images.length > 0 ? `
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;">
            ${images.map(img => `<img src="${img}" alt="Case photo" style="width:100%;border-radius:6px;height:90px;object-fit:cover;border:1px solid var(--border-glass);">`).join('')}
          </div>` : ''}
      `;
    } else {
      proofCard.innerHTML = `
        <h3 style="margin-bottom:var(--space-md);">📸 Documentation</h3>
        <p style="color:var(--text-muted);font-size:0.85rem;">No photos uploaded yet. ${caseData.status === 'RESOLVED' ? '' : 'NGO will upload proof when resolved.'}</p>
      `;
    }
  }

  // ── Activity Timeline ───────────────────────────────────────────
  const timelineEl = document.getElementById('caseTimeline');
  if (timelineEl) {
    const logs = caseData.activityLogs || [];
    if (logs.length === 0) {
      timelineEl.innerHTML = '<p style="color:var(--text-muted);">No activity logged yet.</p>';
    } else {
      timelineEl.innerHTML = logs.map((log, i) => {
        let meta = {};
        try { meta = JSON.parse(log.metadata || '{}'); } catch {}
        const isLast = i === logs.length - 1;
        const actionLabel = {
          'CASE_CREATED': '📋 Case Reported',
          'STATUS_CHANGE': `🔄 Status → ${meta.newStatus || ''}`,
        }[log.actionType] || log.actionType;

        return `
          <div class="timeline-item ${isLast ? 'active' : 'completed'}">
            <div class="timeline-date">${formatDateTime(log.timestamp)}</div>
            <div class="timeline-title">${actionLabel}</div>
            ${meta.resolutionNote ? `<div class="timeline-desc" style="font-style:italic;">"${meta.resolutionNote}"</div>` : ''}
            ${meta.note ? `<div class="timeline-desc">${meta.note}</div>` : ''}
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">By: ${log.actor?.name || log.actor?.email || 'System'}</div>
            ${meta.proofImage ? `<div style="margin-top:6px;"><img src="${meta.proofImage}" alt="Proof" style="width:80px;height:60px;object-fit:cover;border-radius:6px;border:1px solid var(--success);cursor:pointer;" onclick="this.style.width=this.style.width==='80px'?'100%':'80px'"></div>` : ''}
          </div>`;
      }).join('');
    }
  }

  // ── Funding Card ────────────────────────────────────────────────
  const fundCard = document.getElementById('caseFundingCard');
  if (fundCard) {
    const raised = caseData.fundsRaised || 0;
    const required = caseData.fundsRequired || 0;
    const pct = required > 0 ? Math.min(100, (raised / required) * 100) : 0;
    fundCard.innerHTML = `
      <h3 style="margin-bottom:var(--space-lg);">🎯 Funding Progress</h3>
      <div class="stat-bar">
        <div class="stat-bar-header">
          <span style="color:var(--teal-light);">${formatCurrency(raised)}</span>
          <span style="color:var(--text-muted);">of ${formatCurrency(required)}</span>
        </div>
        <div class="stat-bar-track"><div class="stat-bar-fill" style="width:${pct}%;"></div></div>
      </div>
      <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:var(--space-lg);">${Math.round(pct)}% funded</p>
      ${caseData.status !== 'RESOLVED' ? `<a href="#/donate" class="btn btn-gold" style="width:100%; justify-content:center;">💰 Donate to This Case</a>` : '<p style="color:var(--success);font-weight:600;text-align:center;">✅ Case Resolved</p>'}
    `;
  }

  // ── Case Details Card ───────────────────────────────────────────
  const detailsCard = document.getElementById('caseDetailsCard');
  if (detailsCard) {
    detailsCard.innerHTML = `
      <h3 style="margin-bottom:var(--space-lg);">📋 Case Details</h3>
      <div style="display:flex; flex-direction:column; gap:var(--space-md);">
        <div><div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;">Case ID</div><div style="font-weight:600;font-size:0.85rem;">${caseData.id}</div></div>
        <div><div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;">Description</div><div style="font-weight:500;font-size:0.85rem;">${caseData.description}</div></div>
        <div><div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;">Location</div><div style="font-weight:600;">📍 ${caseData.city || caseData.location || 'Unknown'}</div></div>
        <div><div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;">Coordinates</div><div style="font-weight:500;font-size:0.8rem;">${lat.toFixed(5)}, ${lng.toFixed(5)}</div></div>
        <div><div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;">Reported By</div><div style="font-weight:600;">${caseData.reporter?.name || caseData.reporter?.email || 'Anonymous'}</div></div>
        <div><div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;">Reported At</div><div style="font-weight:600;">${formatDateTime(caseData.createdAt || caseData.reportedAt)}</div></div>
      </div>
    `;
  }

  // ── Assigned NGO Card ───────────────────────────────────────────
  const ngoCard = document.getElementById('assignedNgoCard');
  if (ngoCard) {
    if (caseData.assignedNgo) {
      ngoCard.innerHTML = `
        <h3 style="margin-bottom:var(--space-lg);">🏢 Assigned NGO</h3>
        <div style="display:flex;align-items:center;gap:var(--space-md);cursor:pointer;" onclick="navigate('/ngo/${caseData.assignedNgo.id}')">
          <div class="ngo-avatar" style="width:50px;height:50px;font-size:1.4rem;">🏢</div>
          <div>
            <div style="font-weight:600;">${caseData.assignedNgo.orgName}</div>
            <span class="badge badge-verified" style="font-size:0.65rem;margin-top:4px;">✅ Verified & Assigned</span>
          </div>
        </div>
        ${(caseData.urgency?.toUpperCase() === 'CRITICAL' && caseData.status?.toUpperCase() !== 'RESOLVED') ? `
        <div class="escalation-timer" id="escalationTimer">
          <div>
            <div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;">⏱️ NGO Response Deadline</div>
            <div class="timer-display" id="timerDisplay">30:00</div>
          </div>
          <div class="timer-label">Auto-escalation if no response</div>
        </div>` : ''}
      `;
    } else {
      ngoCard.innerHTML = `
        <h3 style="margin-bottom:var(--space-md);">🏢 NGO Assignment</h3>
        <p style="color:var(--gold-light);">⏳ Awaiting NGO assignment...</p>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-top:var(--space-sm);">Nearby verified NGOs are being notified.</p>
      `;
    }
  }

  // ── Informed NGOs Card ──────────────────────────────────────────
  const informedCard = document.getElementById('informedNgosCard');
  if (informedCard) {
    const informed = caseData.informedNgos || [];
    if (informed.length > 0) {
      informedCard.innerHTML = `
        <h3 style="margin-bottom:var(--space-md);">📡 Informed NGOs</h3>
        <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:var(--space-md);">These nearby NGOs have been notified and are on standby:</p>
        ${informed.map(ngo => `
          <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border-glass);cursor:pointer;" onclick="navigate('/ngo/${ngo.id}')">
            <div style="font-size:1.2rem;">🏢</div>
            <div style="flex:1;">
              <div style="font-weight:600;font-size:0.9rem;">${ngo.orgName}</div>
              ${ngo.rating ? `<div style="font-size:0.75rem;color:var(--text-muted);">⭐ ${ngo.rating}</div>` : ''}
            </div>
            <span style="display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:20px;font-size:0.65rem;font-weight:700;background:rgba(37,99,235,0.12);color:#2563EB;border:1px solid rgba(37,99,235,0.2);">📡 Informed</span>
          </div>`).join('')}
      `;
    } else {
      informedCard.style.display = 'none'; // hide if no informed NGOs
    }
  }

  // ── Escalation Countdown Timer ──────────────────────────────────
  const timerEl = document.getElementById('timerDisplay');
  const timerContainer = document.getElementById('escalationTimer');
  if (timerEl && timerContainer) {
    let totalSeconds = Math.floor(Math.random() * 20 * 60) + 5 * 60;
    const timerInterval = setInterval(() => {
      totalSeconds--;
      if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        timerEl.textContent = '00:00';
        timerContainer.innerHTML = `<div style="text-align:center;width:100%;"><div style="font-size:1.1rem;font-weight:700;color:var(--danger);margin-bottom:4px;">🔄 Auto-Escalating...</div><div style="font-size:0.8rem;color:var(--text-muted);">Reassigning to next nearest NGO</div></div>`;
        showToast('⚠️ Case auto-escalated to next nearest NGO', 'warning');
        return;
      }
      const min = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
      const sec = (totalSeconds % 60).toString().padStart(2, '0');
      timerEl.textContent = `${min}:${sec}`;
      if (totalSeconds < 5 * 60) timerContainer.classList.add('urgent');
    }, 1000);
  }
}
