// ============================================================
// NGO CONNECT — NGO Profile Page
// ============================================================

function renderNgoProfile(ngoId) {
  const ngo = getNgoById(ngoId);
  if (!ngo) return render404();

  const ngoCases = MOCK_DATA.cases.filter(c => c.ngoAssigned === ngoId);

  return `
    <div class="page-header">
      <div class="container">
        <div class="ngo-avatar" style="width:100px; height:100px; font-size:2.5rem; margin:0 auto var(--space-lg);">${ngo.emoji}</div>
        <h1>${ngo.name}</h1>
        <div style="display:flex; gap:var(--space-md); justify-content:center; align-items:center; margin-top:var(--space-sm);">
          <span class="badge badge-verified">✅ Verified since ${formatDate(ngo.verifiedDate)}</span>
          <span style="color:var(--text-muted);">📍 ${ngo.city}</span>
          <span style="color:var(--gold-light);">⭐ ${ngo.rating} (${ngo.reviewCount} reviews)</span>
        </div>
        <p style="margin-top:var(--space-md);">${ngo.description}</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <!-- Performance Metrics -->
        <div class="grid-4 animate-in" style="margin-bottom:var(--space-2xl);">
          <div class="metric-card">
            <div class="metric-icon">🐾</div>
            <div class="metric-value text-gradient">${ngo.totalRescues.toLocaleString()}</div>
            <div class="metric-label">Total Rescues</div>
          </div>
          <div class="metric-card">
            <div class="metric-icon">✅</div>
            <div class="metric-value text-gradient">${ngo.successRate}%</div>
            <div class="metric-label">Success Rate</div>
          </div>
          <div class="metric-card">
            <div class="metric-icon">⚡</div>
            <div class="metric-value text-gradient">${ngo.avgResponseTime}</div>
            <div class="metric-label">Avg. Response Time</div>
          </div>
          <div class="metric-card">
            <div class="metric-icon">📅</div>
            <div class="metric-value text-gradient">${formatDate(ngo.memberSince)}</div>
            <div class="metric-label">Member Since</div>
          </div>
        </div>

        <div class="grid-2" style="grid-template-columns:2fr 1fr; gap:2rem;">
          <div>
            <!-- Financial Transparency -->
            <div class="card animate-in" style="margin-bottom:var(--space-xl);">
              <h3 style="margin-bottom:var(--space-lg);">💰 Financial Transparency</h3>
              <div style="display:flex; gap:var(--space-lg); margin-bottom:var(--space-lg);">
                <div class="ticker-item" style="flex:1;">
                  <div class="ticker-value" style="font-size:1.3rem; color:var(--emerald-light);">${formatCurrency(ngo.totalFundsReceived)}</div>
                  <div class="ticker-label">Total Received</div>
                </div>
                <div class="ticker-item" style="flex:1;">
                  <div class="ticker-value" style="font-size:1.3rem; color:var(--gold-light);">${formatCurrency(ngo.totalFundsSpent)}</div>
                  <div class="ticker-label">Total Spent</div>
                </div>
                <div class="ticker-item" style="flex:1;">
                  <div class="ticker-value" style="font-size:1.3rem;">${Math.round((ngo.totalFundsSpent / ngo.totalFundsReceived) * 100)}%</div>
                  <div class="ticker-label">Utilization Rate</div>
                </div>
              </div>
            </div>

            <!-- Activity History -->
            <div class="card animate-in">
              <h3 style="margin-bottom:var(--space-lg);">📜 Case Activity History</h3>
              ${ngoCases.length > 0 ? ngoCases.map(c => `
                <div style="display:flex; align-items:center; gap:var(--space-md); padding:var(--space-md); border-bottom:1px solid var(--border-glass); cursor:pointer;" onclick="navigate('/case/${c.id}')">
                  <div style="font-size:1.5rem;">${c.emoji}</div>
                  <div style="flex:1;">
                    <div style="font-weight:600; font-size:0.9rem;">${c.title}</div>
                    <div style="font-size:0.8rem; color:var(--text-muted);">📅 ${formatDate(c.reportedAt)} • 📍 ${c.city}</div>
                  </div>
                  ${getStatusBadge(c.status)}
                </div>
              `).join('') : '<p style="color:var(--text-muted);">No cases on this platform yet.</p>'}
            </div>
          </div>

          <!-- Right Sidebar -->
          <div>
            <!-- Credibility Score -->
            <div class="card animate-in" style="margin-bottom:var(--space-xl); text-align:center;">
              <h3 style="margin-bottom:var(--space-lg);">🛡️ Credibility Score</h3>
              <div id="credibilityScoreContainer">
                <div class="credibility-ring">
                  <svg viewBox="0 0 140 140">
                    <circle class="ring-bg" cx="70" cy="70" r="60"></circle>
                    <circle class="ring-fill excellent" cx="70" cy="70" r="60"
                      stroke-dasharray="377" stroke-dashoffset="60" id="credRingFill"></circle>
                  </svg>
                  <div class="ring-score">
                    <div class="score-value" id="credScoreValue" style="color:var(--success);">84</div>
                    <div class="score-label">Excellent</div>
                  </div>
                </div>
                <div class="credibility-breakdown" id="credBreakdown">
                  <div class="cred-item">
                    <div class="cred-label">⚡ Speed</div>
                    <div class="cred-bar"><div class="cred-bar-fill skeleton" style="width:85%;background:var(--success);"></div></div>
                    <div class="cred-percent">85%</div>
                  </div>
                  <div class="cred-item">
                    <div class="cred-label">✅ Success</div>
                    <div class="cred-bar"><div class="cred-bar-fill skeleton" style="width:92%;background:var(--primary);"></div></div>
                    <div class="cred-percent">92%</div>
                  </div>
                  <div class="cred-item">
                    <div class="cred-label">💰 Transparency</div>
                    <div class="cred-bar"><div class="cred-bar-fill skeleton" style="width:78%;background:var(--warning);"></div></div>
                    <div class="cred-percent">78%</div>
                  </div>
                  <div class="cred-item">
                    <div class="cred-label">⭐ Community</div>
                    <div class="cred-bar"><div class="cred-bar-fill skeleton" style="width:90%;background:var(--gold);"></div></div>
                    <div class="cred-percent">90%</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Specializations -->
            <div class="card animate-in" style="margin-bottom:var(--space-xl);">
              <h3 style="margin-bottom:var(--space-md);">🏥 Specializations</h3>
              <div style="display:flex; flex-wrap:wrap; gap:var(--space-sm);">
                ${ngo.specialization.map(s => `<span class="ngo-tag">${s}</span>`).join('')}
              </div>
            </div>

            <!-- Community Reviews -->
            <div class="card animate-in" style="margin-bottom:var(--space-xl);">
              <h3 style="margin-bottom:var(--space-lg);">⭐ Community Reviews</h3>
              <div id="reviewsSummary" style="text-align:center; margin-bottom:var(--space-lg);">
                <div style="font-size:2.5rem; font-weight:800; color:var(--gold-light);">${ngo.rating}</div>
                <div style="color:var(--gold-light);">⭐⭐⭐⭐⭐</div>
                <div style="font-size:0.85rem; color:var(--text-muted);">Loading reviews...</div>
              </div>

              <!-- Submit Review Form (only if logged in) -->
              <div id="reviewForm" style="background:var(--bg-glass);border:1px solid var(--border-glass);border-radius:var(--radius-md);padding:var(--space-md);margin-bottom:var(--space-lg);">
                <div style="font-weight:600;font-size:0.9rem;margin-bottom:var(--space-sm);">✍️ Leave a Review</div>
                <!-- Star Rating Picker -->
                <div id="starPicker" style="display:flex;gap:6px;margin-bottom:var(--space-sm);font-size:1.6rem;cursor:pointer;">
                  <span data-star="1" onclick="setReviewStar(1)" style="opacity:0.3;">⭐</span>
                  <span data-star="2" onclick="setReviewStar(2)" style="opacity:0.3;">⭐</span>
                  <span data-star="3" onclick="setReviewStar(3)" style="opacity:0.3;">⭐</span>
                  <span data-star="4" onclick="setReviewStar(4)" style="opacity:0.3;">⭐</span>
                  <span data-star="5" onclick="setReviewStar(5)" style="opacity:0.3;">⭐</span>
                </div>
                <textarea id="reviewComment" class="form-textarea" placeholder="Share your experience with this NGO..." style="min-height:70px;margin-bottom:var(--space-sm);"></textarea>
                <button class="btn btn-primary" style="width:100%;justify-content:center;" onclick="submitNgoReview()">Submit Review</button>
                <p id="reviewLoginNote" style="font-size:0.8rem;color:var(--text-muted);margin-top:6px;display:none;">Please <a href="#/login" style="color:var(--primary);">log in</a> to submit a review.</p>
              </div>

              <div id="reviewsList"><div style="color:var(--text-muted);font-size:0.85rem;">Loading reviews...</div></div>
            </div>

            <!-- Contact -->
            <div class="card animate-in">
              <h3 style="margin-bottom:var(--space-md);">📞 Contact</h3>
              <button class="btn btn-primary" style="width:100%; justify-content:center; margin-bottom:var(--space-sm);" onclick="showToast('Contact details sent to your email!')">
                📧 Get in Touch
              </button>
              <button class="btn btn-secondary" style="width:100%; justify-content:center;" onclick="showToast('Coordination request sent!')">
                🤝 Request Coordination
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

let _reviewNgoId = null;
let _selectedReviewStar = 0;

function setReviewStar(n) {
  _selectedReviewStar = n;
  document.querySelectorAll('#starPicker span').forEach((s, i) => {
    s.style.opacity = i < n ? '1' : '0.3';
    s.style.transform = i < n ? 'scale(1.15)' : 'scale(1)';
  });
}

async function submitNgoReview() {
  if (!isLoggedIn()) {
    document.getElementById('reviewLoginNote').style.display = 'block';
    showToast('Please log in to submit a review', 'error');
    return;
  }
  if (!_selectedReviewStar) {
    showToast('Please select a star rating', 'error');
    return;
  }
  const comment = document.getElementById('reviewComment')?.value || '';
  const btn = document.querySelector('#reviewForm button');
  if (btn) { btn.disabled = true; btn.textContent = 'Submitting...'; }

  try {
    const res = await fetch(`http://localhost:3000/api/ngos/${_reviewNgoId}/reviews`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ rating: _selectedReviewStar, comment })
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Failed');
    showToast('✅ Review submitted! Thank you.');
    loadNgoReviews(_reviewNgoId); // Refresh reviews list
    setReviewStar(0);
    if (document.getElementById('reviewComment')) document.getElementById('reviewComment').value = '';
  } catch (e) {
    showToast('Failed to submit review: ' + e.message, 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Submit Review'; }
  }
}

async function loadNgoReviews(ngoId) {
  const listEl = document.getElementById('reviewsList');
  const summaryEl = document.getElementById('reviewsSummary');
  if (!listEl) return;

  try {
    const res = await fetch(`http://localhost:3000/api/ngos/${ngoId}/reviews`);
    const data = await res.json();
    const { reviews, avgRating, total } = data;

    if (summaryEl) {
      const stars = Math.round(avgRating);
      summaryEl.innerHTML = `
        <div style="font-size:2.5rem;font-weight:800;color:var(--gold-light);">${avgRating || 0}</div>
        <div style="color:var(--gold-light);font-size:1.1rem;">${'⭐'.repeat(stars)}${'☆'.repeat(5 - stars)}</div>
        <div style="font-size:0.85rem;color:var(--text-muted);">${total} review${total !== 1 ? 's' : ''}</div>`;
    }

    if (!reviews || reviews.length === 0) {
      listEl.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">No reviews yet. Be the first to review!</p>';
      return;
    }

    listEl.innerHTML = reviews.map(r => `
      <div style="border-top:1px solid var(--border-glass);padding:var(--space-md) 0;">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
          <span style="font-weight:600;font-size:0.9rem;">${r.user?.name || 'Anonymous'}</span>
          <span style="color:var(--gold-light);font-size:0.85rem;">${'⭐'.repeat(r.rating)}</span>
        </div>
        ${r.comment ? `<p style="font-size:0.85rem;color:var(--text-secondary);margin:4px 0;">${r.comment}</p>` : ''}
        <div style="font-size:0.75rem;color:var(--text-muted);">📅 ${timeAgo(r.createdAt)}</div>
      </div>
    `).join('');
  } catch (e) {
    if (listEl) listEl.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">Could not load reviews.</p>';
  }
}

function initNgoProfilePage() {
  const hash = window.location.hash;
  const ngoId = hash.split('/ngo/')[1];
  if (!ngoId) return;
  _reviewNgoId = ngoId;

  // Show/hide review form based on login state
  const loginNote = document.getElementById('reviewLoginNote');
  if (!isLoggedIn() && loginNote) loginNote.style.display = 'block';

  // Load live reviews
  loadNgoReviews(ngoId);

  // Credibility score
  const circumference = 2 * Math.PI * 60;
  const mockScore = Math.floor(Math.random() * 20) + 75;
  const offset = circumference - (mockScore / 100) * circumference;
  const ringFill = document.getElementById('credRingFill');
  const scoreValue = document.getElementById('credScoreValue');
  if (ringFill) {
    setTimeout(() => {
      ringFill.setAttribute('stroke-dasharray', circumference.toString());
      ringFill.setAttribute('stroke-dashoffset', offset.toString());
    }, 300);
  }

  fetch(`http://localhost:3000/api/ngos/${ngoId}/credibility`)
    .then(res => res.json())
    .then(data => {
      if (data.overallScore !== undefined) {
        const score = data.overallScore;
        const grade = data.grade;
        const cls = score >= 80 ? 'excellent' : score >= 60 ? 'good' : 'developing';
        const color = score >= 80 ? 'var(--success)' : score >= 60 ? 'var(--primary)' : 'var(--warning)';
        const newOffset = circumference - (score / 100) * circumference;
        if (ringFill) {
          ringFill.className.baseVal = `ring-fill ${cls}`;
          ringFill.setAttribute('stroke-dashoffset', newOffset.toString());
        }
        if (scoreValue) {
          scoreValue.textContent = score;
          scoreValue.style.color = color;
          scoreValue.nextElementSibling.textContent = grade;
        }
        const breakdown = data.breakdown;
        const bd = document.getElementById('credBreakdown');
        if (bd && breakdown) {
          bd.innerHTML = Object.values(breakdown).map(b => `
            <div class="cred-item">
              <div class="cred-label">${b.label}</div>
              <div class="cred-bar"><div class="cred-bar-fill" style="width:${b.score}%;background:${b.score >= 80 ? 'var(--success)' : b.score >= 60 ? 'var(--primary)' : 'var(--warning)'};"></div></div>
              <div class="cred-percent">${b.score}%</div>
            </div>
          `).join('');
        }
      }
    })
    .catch(() => {});
}
