// ============================================================
// NGO CONNECT — Homepage
// ============================================================

function renderHome() {
  const stats = MOCK_DATA.stats;
  // Initially render with mock cases, then replace with real data after mount
  const cases = MOCK_DATA.cases.filter(c => c.status !== 'resolved' && c.status !== 'RESOLVED').slice(0, 6);
  const ngos = MOCK_DATA.ngos.slice(0, 3);
  const testimonials = MOCK_DATA.testimonials;

  return `
    <!-- Hero Section -->
    <section class="hero">
      <div class="container" style="display:flex; align-items:center; gap:4rem; width:100%;">
        <div class="hero-content animate-in">
          <div class="hero-eyebrow">
            <span class="dot"></span>
            <span>Live Platform — ${stats.citiesCovered} Cities Active</span>
          </div>
          <h1>
            Every Life<br>
            <span class="highlight">Counts.</span><br>
            Report. Rescue. Restore.
          </h1>
          <p>India's most transparent animal rescue platform. Report animals in distress, connect with verified NGOs, and track every rupee — all in real time.</p>
          <div class="hero-actions">
            <a href="#/report" class="btn btn-lg btn-primary">🚨 Report an Animal</a>
            <a href="#/how-it-works" class="btn btn-lg btn-secondary">Learn How It Works →</a>
          </div>
        </div>
        <div class="hero-stats animate-in animate-delay-2">
          <div class="hero-stat-card">
            <div class="stat-number" data-count="${stats.totalRescues}">0</div>
            <div class="stat-label">Animals Rescued</div>
          </div>
          <div class="hero-stat-card">
            <div class="stat-number" data-count="${stats.successRate}">0</div>
            <div class="stat-label">Success Rate %</div>
          </div>
          <div class="hero-stat-card">
            <div class="stat-number" data-count="${stats.ngosRegistered}">0</div>
            <div class="stat-label">Verified NGOs</div>
          </div>
          <div class="hero-stat-card">
            <div class="stat-number" data-count="${stats.citiesCovered}">0</div>
            <div class="stat-label">Cities Covered</div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="section" style="background: var(--bg-secondary);">
      <div class="container text-center">
        <h2 class="section-title animate-in">How NGO CONNECT Works</h2>
        <p class="section-subtitle animate-in">Three simple steps to save a life</p>
        <div class="steps">
          <div class="step animate-in animate-delay-1">
            <div class="step-number">1</div>
            <h3>📱 Report</h3>
            <p>Spot an animal in distress? Upload its location, photo, and urgency level — even without an account.</p>
          </div>
          <div class="step animate-in animate-delay-2">
            <div class="step-number">2</div>
            <h3>🏥 Rescue</h3>
            <p>Verified NGOs review and dispatch rescue teams. Real-time coordination with veterinary professionals.</p>
          </div>
          <div class="step animate-in animate-delay-3">
            <div class="step-number">3</div>
            <h3>❤️ Restore</h3>
            <p>Track treatment progress, see every rupee spent, and watch the animal recover — all transparently.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact Ticker -->
    <section class="section">
      <div class="container text-center">
        <h2 class="section-title animate-in">Real-Time Impact</h2>
        <p class="section-subtitle animate-in">Our community's impact — updated live</p>
        <div class="impact-ticker">
          <div class="ticker-item animate-in animate-delay-1">
            <div class="ticker-icon">🐾</div>
            <div class="ticker-value" data-count="${stats.totalRescues}">0</div>
            <div class="ticker-label">Animals Rescued</div>
          </div>
          <div class="ticker-item animate-in animate-delay-2">
            <div class="ticker-icon">💰</div>
            <div class="ticker-value" data-count="${stats.totalFundsRaised / 100000}">0</div>
            <div class="ticker-label">Lakhs Raised (₹)</div>
          </div>
          <div class="ticker-item animate-in animate-delay-3">
            <div class="ticker-icon">💊</div>
            <div class="ticker-value" data-count="${stats.medicinesRedistributed}">0</div>
            <div class="ticker-label">Medicines Shared</div>
          </div>
          <div class="ticker-item animate-in animate-delay-4">
            <div class="ticker-icon">🤝</div>
            <div class="ticker-value" data-count="${stats.activeVolunteers}">0</div>
            <div class="ticker-label">Active Volunteers</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Case Feed -->
    <section class="section" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="flex-between" style="margin-bottom: var(--space-2xl);">
          <div>
            <h2 class="section-title animate-in">🚨 Active Cases — Help Needed</h2>
            <p class="section-subtitle animate-in" style="margin-bottom:0;">These animals need your support right now. Every contribution matters.</p>
          </div>
          <a href="#/cases" class="btn btn-secondary animate-in">View All Cases →</a>
        </div>
        <div class="grid-3" id="homeCaseFeed">
          ${renderHomeCaseCards(cases)}
        </div>
      </div>
    </section>

    <!-- Featured NGOs -->
    <section class="section">
      <div class="container text-center">
        <h2 class="section-title animate-in">Featured Verified NGOs</h2>
        <p class="section-subtitle animate-in">Trusted organizations making a difference</p>
        <div class="grid-3" id="homeNgoFeed">
          ${ngos.map((ngo, i) => `
            <div class="ngo-card animate-in animate-delay-${i + 1}" onclick="navigate('/ngo/${ngo.id}')">
              <div class="ngo-avatar">${ngo.emoji}</div>
              <h3>${ngo.name} <span class="badge badge-verified" style="font-size:0.65rem;">✅ Verified</span></h3>
              <div class="ngo-location">📍 ${ngo.city}</div>
              <div class="ngo-card-stats">
                <div>
                  <div class="value">${ngo.totalRescues.toLocaleString()}</div>
                  <div class="label">Rescues</div>
                </div>
                <div>
                  <div class="value">${ngo.successRate}%</div>
                  <div class="label">Success</div>
                </div>
                <div>
                  <div class="value">⭐ ${ngo.rating}</div>
                  <div class="label">${ngo.reviewCount} reviews</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <br>
        <a href="#/ngos" class="btn btn-secondary">Explore All NGOs →</a>
      </div>
    </section>

    <!-- Trust Banner -->
    <section class="section" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="trust-section animate-in">
          <h2 style="font-size:1.8rem; margin-bottom: var(--space-md);">🔒 Every Rupee Tracked. Every Rescue Recorded.</h2>
          <p style="color: var(--text-secondary); max-width: 700px; margin: 0 auto var(--space-xl);">
            NGO CONNECT's Complete Transparency System ensures immutable, timestamped records for every action — from report to rescue to recovery. All financial transactions are publicly verifiable.
          </p>
          <div class="grid-4" style="max-width:800px; margin: 0 auto;">
            <div style="text-align:center;">
              <div style="font-size:2rem;">⏱️</div>
              <div style="font-size:0.85rem; color: var(--text-secondary); margin-top:4px;">Timestamped Logs</div>
            </div>
            <div style="text-align:center;">
              <div style="font-size:2rem;">🔗</div>
              <div style="font-size:0.85rem; color: var(--text-secondary); margin-top:4px;">Immutable Records</div>
            </div>
            <div style="text-align:center;">
              <div style="font-size:2rem;">💰</div>
              <div style="font-size:0.85rem; color: var(--text-secondary); margin-top:4px;">Financial Tracking</div>
            </div>
            <div style="text-align:center;">
              <div style="font-size:2rem;">✅</div>
              <div style="font-size:0.85rem; color: var(--text-secondary); margin-top:4px;">Verified NGOs</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Medicine Exchange Promo -->
    <section class="section">
      <div class="container">
        <div class="card" style="display:flex; align-items:center; gap:3rem; padding:3rem;">
          <div style="flex:1;">
            <div style="font-size:3rem; margin-bottom:var(--space-md);">💊</div>
            <h2 style="font-size:1.8rem; margin-bottom:var(--space-md);">Medicine Exchange</h2>
            <p style="color:var(--text-secondary); margin-bottom:var(--space-lg);">Have unused, unexpired animal medicines? Someone's pet might need them right now. Our medicine exchange connects donors with those in need — reducing waste and saving lives.</p>
            <div style="display:flex; gap:var(--space-md);">
              <a href="#/medicine" class="btn btn-primary">Donate Medicines</a>
              <a href="#/medicine" class="btn btn-secondary">Request Medicines</a>
            </div>
          </div>
          <div style="flex:0 0 auto; display:flex; gap:var(--space-md); flex-wrap:wrap; max-width:280px;">
            <div class="ticker-item" style="flex:1; min-width:120px;">
              <div class="ticker-value" style="font-size:1.4rem;">${stats.medicinesRedistributed.toLocaleString()}</div>
              <div class="ticker-label">Medicines Shared</div>
            </div>
            <div class="ticker-item" style="flex:1; min-width:120px;">
              <div class="ticker-value" style="font-size:1.4rem; color:var(--emerald-light);">92%</div>
              <div class="ticker-label">Match Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section" style="background: var(--bg-secondary);">
      <div class="container text-center">
        <h2 class="section-title animate-in">What Our Community Says</h2>
        <p class="section-subtitle animate-in">Real stories from real people making a difference</p>
        <div class="grid-3">
          ${testimonials.map((t, i) => `
            <div class="testimonial-card animate-in animate-delay-${i + 1}">
              <div class="quote">"${t.quote}"</div>
              <div class="author">
                <div class="author-avatar">${t.emoji}</div>
                <div>
                  <div class="author-name">${t.name}</div>
                  <div class="author-role">${t.role}</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="section">
      <div class="container text-center">
        <h2 style="font-size:2.5rem; margin-bottom:var(--space-md);" class="animate-in">
          Ready to <span class="text-gradient">Save a Life?</span>
        </h2>
        <p style="color:var(--text-secondary); font-size:1.1rem; margin-bottom:var(--space-2xl); max-width:500px; margin-left:auto; margin-right:auto;" class="animate-in">
          Whether you report, donate, or volunteer — every action matters. Join thousands making a difference.
        </p>
        <div style="display:flex; gap:var(--space-md); justify-content:center; flex-wrap:wrap;" class="animate-in">
          <a href="#/report" class="btn btn-lg btn-primary">🚨 Report an Animal</a>
          <a href="#/donate" class="btn btn-lg btn-gold">💰 Donate Now</a>
          <a href="#/ngos" class="btn btn-lg btn-secondary">🏢 Find NGOs</a>
        </div>
      </section>
    </div>
  `;
}

// ─── Shared card renderer (used for both mock & live data) ─────────────────
function renderHomeCaseCards(cases) {
  if (!cases || cases.length === 0) {
    return `<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--text-muted);">No active cases right now.</div>`;
  }
  return cases.map((c, i) => {
    const pct = c.fundsRequired > 0 ? Math.min(100, ((c.fundsRaised || 0) / c.fundsRequired) * 100) : 0;
    const needsHelp = (c.fundsRaised || 0) < (c.fundsRequired || 0);
    const title = c.title || c.description?.slice(0, 50) || 'Animal in Distress';
    const location = c.city || c.location || 'Location reported';
    const time = timeAgo(c.createdAt || c.reportedAt);
    return `
      <div class="case-card animate-in visible animate-delay-${(i % 3) + 1}" onclick="navigate('/case/${c.id}')">
        <div class="case-card-img">
          <span class="emoji">${c.emoji || '🐾'}</span>
          ${getUrgencyBadge(c.urgency)}
          ${needsHelp ? '<span class="badge badge-needs-help">💛 Needs Help</span>' : ''}
        </div>
        <div class="case-card-body">
          <div class="case-card-title">${title}</div>
          <div class="case-card-meta">
            <span>📍 ${location}</span>
            <span>🕐 ${time}</span>
          </div>
          <p style="font-size:0.8rem;color:var(--text-muted);margin:var(--space-sm) 0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${c.description || ''}</p>
          <div class="case-card-status">
            ${getStatusBadge(c.status)}
            <div class="case-card-ngo">${c.assignedNgo?.orgName || (c.assignedNgoId ? 'NGO Assigned' : '⏳ Awaiting NGO')}</div>
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
          </div>` : ''}
          ${needsHelp ? `<a href="#/donate" class="btn btn-sm btn-donate-card" onclick="event.stopPropagation();">💰 Donate to Help</a>` : ''}
        </div>
      </div>`;
  }).join('');
}

function initHomePage() {
  setTimeout(() => { initCounters(); }, 200);

  // Fetch Live Cases from backend — replace mock feed when available
  fetch('http://localhost:3000/api/cases?limit=6&status=OPEN')
    .then(res => res.json())
    .then(json => {
      const feed = document.getElementById('homeCaseFeed');
      if (!feed) return;
      const liveCases = json.data || json;
      if (Array.isArray(liveCases) && liveCases.length > 0) {
        feed.innerHTML = renderHomeCaseCards(liveCases);
      }
    })
    .catch(() => { /* Keep mock data already rendered */ });

  // Fetch Live NGOs from backend
  fetch('http://localhost:3000/api/ngos?limit=3')
    .then(res => res.json())
    .then(json => {
      const ngoFeed = document.getElementById('homeNgoFeed');
      if (!ngoFeed) return;
      const liveNgos = json.data || json;
      if (Array.isArray(liveNgos) && liveNgos.length > 0) {
        ngoFeed.innerHTML = liveNgos.map((ngo, i) => `
          <div class="ngo-card animate-in visible animate-delay-${i + 1}" onclick="navigate('/ngo/${ngo.id}')">
            <div class="ngo-avatar">🏢</div>
            <h3>${ngo.orgName || ngo.name} <span class="badge badge-verified" style="font-size:0.65rem">✅ Verified</span></h3>
            <div class="ngo-location">📍 ${ngo.city || 'Available'}</div>
            <div class="ngo-card-stats">
              <div><div class="value">${(() => { try { const s = typeof ngo.rescueStats === 'string' ? JSON.parse(ngo.rescueStats) : (ngo.rescueStats || {}); return s.totalRescues || 0; } catch { return 0; } })()}</div><div class="label">Rescues</div></div>
              <div><div class="value">${(() => { try { const s = typeof ngo.rescueStats === 'string' ? JSON.parse(ngo.rescueStats) : (ngo.rescueStats || {}); return (s.successRate || 0) + '%'; } catch { return '0%'; } })()}</div><div class="label">Success</div></div>
              <div><div class="value">⭐ ${ngo.rating || 0}</div><div class="label">rating</div></div>
            </div>
          </div>`).join('');
      }
    })
    .catch(() => { /* Keep mock NGOs */ });
}
