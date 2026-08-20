// ============================================================
// NGO CONNECT — Explore Cases Page
// ============================================================

function renderCases() {
  const skeletonCards = Array(4).fill('').map(() => `
    <div class="skeleton-card">
      <div class="skeleton skeleton-img"></div>
      <div class="skeleton skeleton-line medium"></div>
      <div class="skeleton skeleton-line short"></div>
      <div class="skeleton skeleton-line xshort"></div>
    </div>
  `).join('');

  return `
    <div class="page-header">
      <div class="container">
        <h1>📋 Explore Cases</h1>
        <p>Browse all reported animal rescue cases. Filter by location, urgency, or status.</p>
      </div>
    </div>
    <section class="section">
      <div class="container" id="casesPageContainer">
         <div class="grid-4">${skeletonCards}</div>
      </div>
    </section>
  `;
}

function generateCasesContent(cases) {
  const cities = [...new Set(cases.map(c => c.city || 'Unknown'))];
  // Filter variables from UI
  return `
        <!-- Filter Bar -->
        <div class="filter-bar animate-in">
          <input type="text" class="form-input" placeholder="🔍 Search cases..." id="caseSearch" oninput="filterCases()">
          <select class="form-select" id="filterCity" onchange="filterCases()">
            <option value="">📍 All Cities</option>
            ${cities.map(c => `<option value="${c}">${c}</option>`).join('')}
          </select>
          <select class="form-select" id="filterUrgency" onchange="filterCases()">
            <option value="">⚠️ All Urgency</option>
            <option value="CRITICAL">🔴 Critical</option>
            <option value="MODERATE">🟡 Moderate</option>
            <option value="STABLE">🟢 Stable</option>
          </select>
          <select class="form-select" id="filterStatus" onchange="filterCases()">
            <option value="">📊 All Status</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>

        <!-- Results count -->
        <p id="caseCount" style="color:var(--text-muted); margin-bottom:var(--space-lg); font-size:0.9rem;">Showing ${cases.length} cases</p>

        <!-- Map Container -->
        <div id="casesMap" style="width:100%; height:400px; border-radius:12px; margin-bottom:var(--space-md); background:var(--bg-glass); display:flex; align-items:center; justify-content:center; border:1px solid var(--border-glass);">
          <span style="color:var(--text-muted);">Loading Live Rescue Map...</span>
        </div>
        <!-- Map Legend -->
        <div id="mapLegend" style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:var(--space-2xl);font-size:0.8rem;color:var(--text-muted);">
          <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:10px;height:10px;border-radius:50%;background:#DC2626;display:inline-block;"></span>Critical</span>
          <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:10px;height:10px;border-radius:50%;background:#F59E0B;display:inline-block;"></span>Moderate</span>
          <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:10px;height:10px;border-radius:50%;background:#16A34A;display:inline-block;"></span>Stable</span>
          <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:8px;height:8px;border-radius:50%;background:#2563EB;display:inline-block;opacity:0.6;"></span>In Progress</span>
          <span style="color:var(--text-muted);">(Resolved cases are hidden)</span>
        </div>

        <!-- Cases Grid -->
        <div class="grid-4" id="casesGrid">
          ${renderCaseCards(cases)}
        </div>
  `;
}

function getAiBadge(verdict, confidence) {
  if (!verdict || verdict === 'PENDING') return '';
  const map = {
    'LIKELY_REAL':  { color: '#16a34a', bg: 'rgba(22,163,74,0.12)', icon: '🟢', label: 'AI: Verified' },
    'SUSPICIOUS':   { color: '#d97706', bg: 'rgba(217,119,6,0.12)',  icon: '🟡', label: 'AI: Suspicious' },
    'LIKELY_FAKE':  { color: '#dc2626', bg: 'rgba(220,38,38,0.12)',  icon: '🔴', label: 'AI: Flagged' },
  };
  const s = map[verdict];
  if (!s) return '';
  return `<span style="display:inline-flex;align-items:center;gap:3px;padding:2px 7px;border-radius:50px;font-size:0.65rem;font-weight:700;background:${s.bg};color:${s.color};border:1px solid ${s.color}30;">${s.icon} ${s.label} ${confidence ? `(${confidence}%)` : ''}</span>`;
}

function renderCaseCards(cases) {
  if (!cases || cases.length === 0) {
    return `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted);">No cases found matching your filters.</div>`;
  }
  const mySubmittedIds = (() => { try { return JSON.parse(localStorage.getItem('mySubmittedCases')||'[]'); } catch { return []; } })();
  const currentUser = (() => { try { return JSON.parse(localStorage.getItem('user')||'null'); } catch { return null; } })();

  return cases.map((c, i) => {
    const pct = c.fundsRequired > 0 ? Math.min(100, ((c.fundsRaised || 0) / c.fundsRequired) * 100) : 0;
    const needsHelp = (c.fundsRaised || 0) < (c.fundsRequired || 0) && c.status !== 'resolved' && c.status !== 'RESOLVED';
    const displayTitle = c.title || c.description?.slice(0, 50) || 'Animal in Distress';
    const ngoLabel = c.assignedNgo?.orgName || (c.assignedNgoId ? '🏢 NGO Assigned' : '⏳ Awaiting NGO');
    const isMyCase = mySubmittedIds.includes(c.id) || (currentUser && c.reporterId === currentUser.id);

    // Try to show a real photo from the case
    let photoHtml = `<span class="emoji">🐾</span>`;
    try {
      const imgs = JSON.parse(c.images || '[]');
      if (imgs.length > 0 && imgs[0].startsWith('data:')) {
        photoHtml = `<img src="${imgs[0]}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" alt="Case photo">`;
      }
    } catch {}

    return `
    <div class="case-card animate-in animate-delay-${(i % 4) + 1}" data-city="${c.city || ''}" data-urgency="${c.urgency}" data-status="${c.status}" onclick="navigate('/case/${c.id}')">
      <div class="case-card-img">
        ${photoHtml}
        ${getUrgencyBadge(c.urgency)}
        ${isMyCase ? '<span class="badge" style="background:rgba(20,184,166,0.85);color:#fff;font-size:0.6rem;font-weight:700;">📱 Your Case</span>' : ''}
        ${needsHelp && !isMyCase ? '<span class="badge badge-needs-help">💛 Needs Help</span>' : ''}
      </div>
      <div class="case-card-body">
        <div class="case-card-title">${displayTitle}</div>
        <div class="case-card-meta">
          <span>📍 ${c.city || c.location || 'Location reported'}</span>
          <span>🕐 ${timeAgo(c.createdAt || c.reportedAt)}</span>
        </div>
        <p style="font-size:0.8rem; color:var(--text-muted); margin:var(--space-sm) 0; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${c.description}</p>
        <div style="margin:4px 0;">${getAiBadge(c.aiVerdict, c.aiConfidence)}</div>
        <div class="case-card-status">
          ${getStatusBadge(c.status)}
          <div class="case-card-ngo" style="font-size:0.75rem;">${ngoLabel}</div>
        </div>
        ${c.fundsRequired > 0 ? `
          <div class="case-fund-progress">
            <div class="stat-bar-track">
              <div class="stat-bar-fill ${pct >= 100 ? 'funded' : ''}" style="width:${pct}%;"></div>
            </div>
            <div class="case-fund-labels">
              <span class="case-fund-raised">${formatCurrency(c.fundsRaised || 0)} raised</span>
              <span class="case-fund-goal">${formatCurrency(c.fundsRequired)} needed</span>
            </div>
          </div>
        ` : ''}
        ${needsHelp ? `<a href="#/donate" class="btn btn-sm btn-donate-card" onclick="event.stopPropagation();">💰 Donate to Help</a>` : ''}
      </div>
    </div>
  `}).join('');
}

let casesMapInstance = null;
let mapMarkers = [];
window.LIVE_CASES = [];

async function initCasesPage() {
  try {
    // Fetch all cases (no hard limit so newly submitted ones appear)
    const res = await fetch('http://localhost:3000/api/cases?limit=500&sortBy=createdAt&order=desc');

    const json = await res.json();
    window.LIVE_CASES = json.data;
  } catch (e) {
    console.error("Error fetching cases, using mock data for map", e);
    // Fallback: use MOCK_DATA cases with coordinates for the map demo
    const cityCoords = {
      'Mumbai': { lat: 19.0760, lng: 72.8777 },
      'Bangalore': { lat: 12.9716, lng: 77.5946 },
      'Jaipur': { lat: 26.9124, lng: 75.7873 },
      'Kolkata': { lat: 22.5726, lng: 88.3639 },
      'Hyderabad': { lat: 17.3850, lng: 78.4867 },
      'Delhi': { lat: 28.7041, lng: 77.1025 },
      'Noida': { lat: 28.5355, lng: 77.3910 },
      'Pune': { lat: 18.5204, lng: 73.8567 },
      'Kerala': { lat: 10.8505, lng: 76.2711 },
      'Chennai': { lat: 13.0827, lng: 80.2707 },
      'Lucknow': { lat: 26.8467, lng: 80.9462 },
      'Guwahati': { lat: 26.1445, lng: 91.7362 },
    };
    window.LIVE_CASES = MOCK_DATA.cases.map(c => {
      const coords = cityCoords[c.city] || { lat: 20.5937, lng: 78.9629 };
      // Add slight randomization so pins don't overlap in same city
      return {
        ...c,
        latitude: coords.lat + (Math.random() - 0.5) * 0.15,
        longitude: coords.lng + (Math.random() - 0.5) * 0.15,
        createdAt: c.reportedAt,
        fundsRaised: c.fundsRaised || 0,
        fundsRequired: c.fundsRequired || 0,
      };
    });
  }

  const container = document.getElementById('casesPageContainer');
  if (container) {
    container.innerHTML = generateCasesContent(window.LIVE_CASES);
  }

  if (typeof L === 'undefined') {
    document.getElementById('casesMap').innerHTML = '<span style="color:var(--danger);">Error loading Map library.</span>';
    return;
  }

  // Clear existing map instance if navigating back and forth
  if (casesMapInstance) {
    casesMapInstance.remove();
    casesMapInstance = null;
  }

  // Initialize Leaflet Map
  casesMapInstance = L.map('casesMap').setView([20.5937, 78.9629], 5); // Center of India

  // Add OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(casesMapInstance);

  // Add markers for current filtered cases
  plotCasesOnMap(window.LIVE_CASES);
}

function plotCasesOnMap(casesToRender) {
  if (!casesMapInstance) return;

  // Clear existing markers
  mapMarkers.forEach(m => m.remove());
  mapMarkers = [];

  const urgencyColors = { critical: '#DC2626', CRITICAL: '#DC2626', moderate: '#F59E0B', MODERATE: '#F59E0B', stable: '#16A34A', STABLE: '#16A34A' };

  casesToRender.forEach((c) => {
    if (!c.latitude || !c.longitude) return;

    const status = (c.status || '').toUpperCase();

    // RESOLVED cases disappear from the map completely
    if (status === 'RESOLVED') return;

    let color, radius, fillOpacity, label;

    if (status === 'IN_PROGRESS') {
      // Being handled — show as smaller blue dot
      color = '#2563EB';
      radius = 7;
      fillOpacity = 0.55;
      label = '🔵 In Progress';
    } else {
      // OPEN — urgency colored
      color = urgencyColors[c.urgency] || '#F59E0B';
      radius = 10;
      fillOpacity = 0.85;
      label = `● ${(c.urgency || '').toUpperCase()}`;
    }

    const marker = L.circleMarker([c.latitude, c.longitude], {
      radius, fillColor: color, color: '#fff', fillOpacity, weight: 2, opacity: 0.9
    }).addTo(casesMapInstance);

    marker.bindPopup(`
      <div style="min-width:200px;">
        <strong>${c.title || c.description?.slice(0, 40) || 'Animal in Distress'}</strong><br/>
        <span style="color:${color};font-weight:600;">${label}</span>
        <span style="margin-left:8px;font-size:0.8em;">${status === 'IN_PROGRESS' ? '🔄 Being handled' : ''}</span>
        <br/><small>📍 ${c.city || c.location || ''}</small>
        ${c.aiVerdict && c.aiVerdict !== 'PENDING' ? `<br/><small style="color:${c.aiVerdict === 'LIKELY_REAL' ? '#16a34a' : c.aiVerdict === 'SUSPICIOUS' ? '#d97706' : '#dc2626'};">🤖 AI: ${c.aiVerdict.replace('_', ' ')}</small>` : ''}
        ${c.id ? `<br/><a href="#/case/${c.id}" style="color:#2563EB;font-size:0.85em;">View Details →</a>` : ''}
      </div>
    `);
    mapMarkers.push(marker);
  });

  // Update the map legend
  const legend = document.getElementById('mapLegend');
  const openCount = casesToRender.filter(c => (c.status || '').toUpperCase() === 'OPEN').length;
  const activeCount = casesToRender.filter(c => (c.status || '').toUpperCase() === 'IN_PROGRESS').length;
  if (legend) {
    legend.innerHTML = `
      <span style="display:inline-flex;align-items:center;gap:4px;margin-right:10px;"><span style="width:10px;height:10px;border-radius:50%;background:#DC2626;display:inline-block;"></span>Critical (${casesToRender.filter(c => c.urgency?.toUpperCase()==='CRITICAL' && c.status?.toUpperCase()!=='RESOLVED').length})</span>
      <span style="display:inline-flex;align-items:center;gap:4px;margin-right:10px;"><span style="width:10px;height:10px;border-radius:50%;background:#F59E0B;display:inline-block;"></span>Moderate</span>
      <span style="display:inline-flex;align-items:center;gap:4px;margin-right:10px;"><span style="width:10px;height:10px;border-radius:50%;background:#16A34A;display:inline-block;"></span>Stable</span>
      <span style="display:inline-flex;align-items:center;gap:4px;margin-right:10px;"><span style="width:8px;height:8px;border-radius:50%;background:#2563EB;display:inline-block;opacity:0.6;"></span>In Progress (${activeCount})</span>
      <span style="color:var(--text-muted);font-size:0.8rem;">${openCount} open pins shown</span>
    `;
  }
}


function filterCases() {
  const search = document.getElementById('caseSearch').value.toLowerCase();
  const city = document.getElementById('filterCity').value;
  const urgency = document.getElementById('filterUrgency').value;
  const status = document.getElementById('filterStatus').value;

  let filtered = window.LIVE_CASES.filter(c => {
    const matchSearch = !search || (c.description || '').toLowerCase().includes(search) || (c.title || '').toLowerCase().includes(search);
    const matchCity = !city || (c.city && c.city === city);
    const matchUrgency = !urgency || c.urgency === urgency || c.urgency?.toUpperCase() === urgency;
    const matchStatus = !status || c.status === status || c.status?.toUpperCase().replace('-', '_') === status;
    return matchSearch && matchCity && matchUrgency && matchStatus;
  });

  document.getElementById('casesGrid').innerHTML = renderCaseCards(filtered);
  document.getElementById('caseCount').textContent = `Showing ${filtered.length} case${filtered.length !== 1 ? 's' : ''}`;
  // Re-plot filtered cases on map
  plotCasesOnMap(filtered);
}
