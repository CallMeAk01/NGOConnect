// ============================================================
// NGO CONNECT — NGO Dashboard (Live Backend Data)
// ============================================================

function renderDashboardNgo() {
    const user = (() => { try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch { return null; } })();
    const orgName = user?.name || 'Your NGO';

    return `
    <section class="section" style="padding-top:2rem;"><div class="container">
      <div class="dashboard-layout">
        <div class="dashboard-sidebar">
          <div style="text-align:center;margin-bottom:2rem;">
            <div class="ngo-avatar" style="width:60px;height:60px;font-size:1.5rem;margin:0 auto 0.5rem;">🐾</div>
            <h3 style="font-size:1rem;">${orgName}</h3>
            <span class="badge badge-verified" style="font-size:0.6rem;">✅ Verified NGO</span>
          </div>
          <nav class="sidebar-nav">
            <a href="#/dashboard/ngo" class="active">📥 Cases Dashboard</a>
            <a href="#/impact">📊 Platform Impact</a>
            <a href="#/ngos">🏢 NGO Directory</a>
            <a href="#/" onclick="logout()">🚪 Logout</a>
          </nav>
        </div>

        <div class="dashboard-main">
          <div class="dashboard-header">
            <div>
              <h2>🏢 NGO Dashboard</h2>
              <p style="color:var(--text-muted);font-size:0.9rem;">Manage assigned cases and track your impact</p>
            </div>
            <div id="ngoLiveIndicator" style="display:flex;align-items:center;gap:6px;font-size:0.8rem;color:var(--text-muted);">
              <span style="width:8px;height:8px;border-radius:50%;background:var(--warning);display:inline-block;"></span>
              Loading...
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="grid-4 animate-in" style="margin-bottom:2rem;" id="ngoDashStats">
            <div class="ticker-item"><div class="ticker-value" style="font-size:1.4rem;" id="statOpen">—</div><div class="ticker-label">Open Cases</div></div>
            <div class="ticker-item"><div class="ticker-value" style="font-size:1.4rem;" id="statActive">—</div><div class="ticker-label">In Progress</div></div>
            <div class="ticker-item"><div class="ticker-value" style="font-size:1.4rem;" id="statResolved">—</div><div class="ticker-label">Resolved</div></div>
            <div class="ticker-item"><div class="ticker-value" style="font-size:1.4rem;" id="statTotal">—</div><div class="ticker-label">Total Cases</div></div>
          </div>

          <!-- Open / Incoming Cases -->
          <div class="card animate-in" style="margin-bottom:2rem;padding:1.5rem;">
            <h3 style="margin-bottom:1rem;">📥 Open Cases <span class="badge badge-critical" style="font-size:0.6rem;" id="openBadge">Loading...</span></h3>
            <div id="ngoOpenCases"><div style="color:var(--text-muted);padding:1rem;">Loading cases from server...</div></div>
          </div>

          <!-- Active / In Progress Cases -->
          <div class="card animate-in" style="padding:1.5rem;">
            <h3 style="margin-bottom:1rem;">🔄 In Progress Cases</h3>
            <div id="ngoActiveCases"><div style="color:var(--text-muted);padding:1rem;">Loading cases from server...</div></div>
          </div>
        </div>
      </div>
    </div></section>`;
}

async function initDashboardNgoPage() {
    // Load real cases from backend
    try {
        const res = await fetch('http://localhost:3000/api/cases?limit=100', {
            headers: typeof getAuthHeaders === 'function' ? getAuthHeaders() : {}
        });

        if (!res.ok) throw new Error('Failed to fetch');

        const json = await res.json();
        const allCases = json.data || json || [];

        const openCases     = allCases.filter(c => c.status === 'OPEN');
        const activeCases   = allCases.filter(c => c.status === 'IN_PROGRESS');
        const resolvedCases = allCases.filter(c => c.status === 'RESOLVED');

        // Update stats
        const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
        setEl('statOpen', openCases.length);
        setEl('statActive', activeCases.length);
        setEl('statResolved', resolvedCases.length);
        setEl('statTotal', allCases.length);

        // Update badge
        const badge = document.getElementById('openBadge');
        if (badge) badge.textContent = `${openCases.length} new`;

        // Update live indicator
        const indicator = document.getElementById('ngoLiveIndicator');
        if (indicator) indicator.innerHTML = `<span style="width:8px;height:8px;border-radius:50%;background:var(--success);display:inline-block;animation:pulse 2s infinite;"></span> Live — ${allCases.length} cases loaded`;

        // Render open cases
        const openEl = document.getElementById('ngoOpenCases');
        if (openEl) {
            openEl.innerHTML = openCases.length > 0
                ? openCases.map(c => renderNgoCaseRow(c, 'open')).join('')
                : '<p style="color:var(--text-muted);">No open cases right now. 🎉</p>';
        }

        // Render active cases
        const activeEl = document.getElementById('ngoActiveCases');
        if (activeEl) {
            activeEl.innerHTML = activeCases.length > 0
                ? activeCases.map(c => renderNgoCaseRow(c, 'active')).join('')
                : '<p style="color:var(--text-muted);">No cases in progress right now.</p>';
        }

    } catch (err) {
        console.warn('Backend unreachable — using mock data', err);

        // Fallback to mock data
        const openCases   = MOCK_DATA.cases.filter(c => c.status === 'open');
        const activeCases = MOCK_DATA.cases.filter(c => c.status === 'in-progress');

        const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
        setEl('statOpen', openCases.length);
        setEl('statActive', activeCases.length);
        setEl('statResolved', MOCK_DATA.cases.filter(c => c.status === 'resolved').length);
        setEl('statTotal', MOCK_DATA.cases.length);

        const badge = document.getElementById('openBadge');
        if (badge) badge.textContent = `${openCases.length} (demo)`;

        const indicator = document.getElementById('ngoLiveIndicator');
        if (indicator) indicator.innerHTML = `<span style="width:8px;height:8px;border-radius:50%;background:var(--warning);display:inline-block;"></span> Offline — showing demo data`;

        document.getElementById('ngoOpenCases').innerHTML = openCases.length > 0
            ? openCases.map(c => `
                <div style="display:flex;align-items:center;gap:1rem;padding:1rem 0;border-bottom:1px solid var(--border-glass);">
                  <div style="font-size:1.5rem;">${c.emoji || '🐾'}</div>
                  <div style="flex:1;">
                    <div style="font-weight:600;">${c.title}</div>
                    <div style="font-size:0.8rem;color:var(--text-muted);">📍 ${c.location} • 🕐 ${timeAgo(c.reportedAt)}</div>
                  </div>
                  ${getUrgencyBadge(c.urgency)}
                  <button class="btn btn-sm btn-primary" onclick="showToast('✅ Case accepted! (Demo mode)')">Accept</button>
                </div>`).join('')
            : '<p style="color:var(--text-muted);">No open cases.</p>';

        document.getElementById('ngoActiveCases').innerHTML = activeCases.length > 0
            ? activeCases.map(c => `
                <div style="display:flex;align-items:center;gap:1rem;padding:1rem 0;border-bottom:1px solid var(--border-glass);cursor:pointer;" onclick="navigate('/case/${c.id}')">
                  <div style="font-size:1.5rem;">${c.emoji || '🐾'}</div>
                  <div style="flex:1;">
                    <div style="font-weight:600;">${c.title}</div>
                    <div style="font-size:0.8rem;color:var(--text-muted);">${formatDateTime(c.reportedAt)}</div>
                  </div>
                  ${getStatusBadge(c.status)}
                  <button class="btn btn-sm btn-secondary" onclick="event.stopPropagation();showToast('✅ Marked resolved! (Demo mode)')">✓ Resolve</button>
                </div>`).join('')
            : '<p style="color:var(--text-muted);">No active cases.</p>';
    }
}

function renderNgoCaseRow(c, type) {
    const title = c.title || c.description?.slice(0, 50) || 'Animal in Distress';
    const time   = timeAgo(c.createdAt || c.reportedAt);
    const loc    = c.city || c.location || 'Location reported';

    if (type === 'open') {
        return `
        <div style="display:flex;align-items:center;gap:1rem;padding:1rem 0;border-bottom:1px solid var(--border-glass);">
          <div style="font-size:1.5rem;">${c.emoji || '🐾'}</div>
          <div style="flex:1;">
            <div style="font-weight:600;">${title}</div>
            <div style="font-size:0.8rem;color:var(--text-muted);">📍 ${loc} • 🕐 ${time}</div>
            <div style="font-size:0.75rem;margin-top:2px;color:var(--text-muted);">ID: ${c.id?.slice(0,8)}...</div>
          </div>
          ${getUrgencyBadge(c.urgency)}
          <div style="display:flex;gap:6px;">
            <button class="btn btn-sm btn-primary" onclick="acceptCase('${c.id}', this)">Accept</button>
            <button class="btn btn-sm btn-secondary" onclick="navigate('/case/${c.id}')">View</button>
          </div>
        </div>`;
    }

    // type === 'active'
    return `
    <div style="display:flex;align-items:center;gap:1rem;padding:1rem 0;border-bottom:1px solid var(--border-glass);">
      <div style="font-size:1.5rem;">${c.emoji || '🐾'}</div>
      <div style="flex:1;">
        <div style="font-weight:600;">${title}</div>
        <div style="font-size:0.8rem;color:var(--text-muted);">📍 ${loc} • 📅 ${time}</div>
        <div style="font-size:0.75rem;margin-top:2px;color:var(--text-muted);">ID: ${c.id?.slice(0,8)}...</div>
      </div>
      ${getStatusBadge(c.status)}
      <div style="display:flex;gap:6px;">
        <button class="btn btn-sm btn-secondary" style="background:var(--success);color:#fff;border-color:var(--success);" onclick="markCaseResolved('${c.id}', this)">✓ Resolve</button>
        <button class="btn btn-sm btn-secondary" onclick="navigate('/case/${c.id}')">View</button>
      </div>
    </div>`;
}

async function acceptCase(caseId, btn) {
    btn.disabled = true;
    btn.textContent = 'Accepting...';
    try {
        const res = await fetch(`http://localhost:3000/api/cases/${caseId}/status`, {
            method: 'PATCH',
            headers: typeof getAuthHeaders === 'function' ? getAuthHeaders() : { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'IN_PROGRESS' })
        });
        if (!res.ok) throw new Error('Failed');
        showToast('✅ Case accepted and marked In Progress!');
        // Refresh the dashboard
        setTimeout(() => initDashboardNgoPage(), 500);
    } catch (e) {
        showToast('Could not accept case: ' + e.message, 'error');
        btn.disabled = false;
        btn.textContent = 'Accept';
    }
}

async function markCaseResolved(caseId, btn) {
    // Show proof upload modal instead of direct confirm
    showResolveModal(caseId);
}

function showResolveModal(caseId) {
    // Remove any existing modal
    const existing = document.getElementById('resolveModal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'resolveModal';
    modal.style.cssText = `
        position:fixed;top:0;left:0;right:0;bottom:0;
        background:rgba(0,0,0,0.7);backdrop-filter:blur(6px);
        z-index:9999;display:flex;align-items:center;justify-content:center;
        padding:1rem;
    `;
    modal.innerHTML = `
        <div style="background:var(--bg-card);border-radius:16px;padding:2rem;max-width:480px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.5);border:1px solid var(--border-glass);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
                <h3 style="margin:0;">✅ Resolve Case</h3>
                <button onclick="document.getElementById('resolveModal').remove()" style="background:none;border:none;color:var(--text-muted);font-size:1.5rem;cursor:pointer;line-height:1;">&times;</button>
            </div>

            <p style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:1.5rem;">Upload a proof photo showing the animal has been rescued, and add a resolution note for transparency.</p>

            <!-- Photo Upload -->
            <div style="margin-bottom:1rem;">
                <label style="font-weight:600;font-size:0.85rem;display:block;margin-bottom:6px;">📸 Proof Photo <span style="color:var(--text-muted);font-weight:400;">(required)</span></label>
                <div id="photoDropArea" onclick="document.getElementById('proofPhotoInput').click()" style="
                    border:2px dashed var(--border-glass);border-radius:10px;padding:1.5rem;
                    text-align:center;cursor:pointer;transition:all 0.2s;
                    background:var(--bg-glass);" 
                    onmouseover="this.style.borderColor='var(--primary)'" 
                    onmouseout="this.style.borderColor='var(--border-glass)'">
                    <div id="photoPreview" style="display:none;">
                        <img id="proofPhotoPreviewImg" src="" alt="Preview" style="max-width:100%;max-height:150px;border-radius:8px;">
                        <p style="font-size:0.8rem;color:var(--success);margin-top:6px;">✅ Photo selected. Click to change.</p>
                    </div>
                    <div id="photoPlaceholder">
                        <div style="font-size:2rem;">📷</div>
                        <p style="color:var(--text-muted);font-size:0.85rem;margin-top:4px;">Click to upload proof photo</p>
                        <p style="color:var(--text-muted);font-size:0.75rem;">JPG, PNG, WebP supported</p>
                    </div>
                </div>
                <input id="proofPhotoInput" type="file" accept="image/*" style="display:none;" onchange="previewProofPhoto(this)">
            </div>

            <!-- Resolution Note -->
            <div style="margin-bottom:1.5rem;">
                <label style="font-weight:600;font-size:0.85rem;display:block;margin-bottom:6px;">📝 Resolution Note <span style="color:var(--text-muted);font-weight:400;">(optional)</span></label>
                <textarea id="resolveNote" class="form-textarea" placeholder="Describe how the animal was rescued, its current condition, where it was taken, etc." style="min-height:80px;"></textarea>
            </div>

            <div style="display:flex;gap:10px;">
                <button class="btn btn-secondary" style="flex:1;justify-content:center;" onclick="document.getElementById('resolveModal').remove()">Cancel</button>
                <button class="btn btn-primary" style="flex:1;justify-content:center;background:var(--success);border-color:var(--success);" id="confirmResolveBtn" onclick="confirmResolveCase('${caseId}')">
                    ✅ Mark as Resolved
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    // Close on backdrop click
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
}

function previewProofPhoto(input) {
    if (!input.files || !input.files[0]) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = e => {
        const preview = document.getElementById('photoPreview');
        const placeholder = document.getElementById('photoPlaceholder');
        const img = document.getElementById('proofPhotoPreviewImg');
        if (img) img.src = e.target.result;
        if (preview) preview.style.display = 'block';
        if (placeholder) placeholder.style.display = 'none';
    };
    reader.readAsDataURL(file);
}

async function confirmResolveCase(caseId) {
    const photoInput = document.getElementById('proofPhotoInput');
    const note = document.getElementById('resolveNote')?.value || '';
    const btn = document.getElementById('confirmResolveBtn');

    if (!photoInput?.files?.[0]) {
        showToast('Please upload a proof photo before resolving', 'error');
        return;
    }

    btn.disabled = true;
    btn.textContent = 'Resolving...';

    // Convert image to base64
    let proofImage = null;
    try {
        proofImage = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(photoInput.files[0]);
        });
    } catch {
        showToast('Failed to process photo', 'error');
        btn.disabled = false;
        btn.textContent = '✅ Mark as Resolved';
        return;
    }

    try {
        const res = await fetch(`http://localhost:3000/api/cases/${caseId}/status`, {
            method: 'PATCH',
            headers: typeof getAuthHeaders === 'function' ? getAuthHeaders() : { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'RESOLVED', proofImage, resolutionNote: note })
        });
        if (!res.ok) throw new Error((await res.json()).message || 'Failed');
        document.getElementById('resolveModal').remove();
        showToast('🎉 Case marked as Resolved! Proof saved to timeline.');
        setTimeout(() => initDashboardNgoPage(), 600);
    } catch (e) {
        showToast('Could not resolve case: ' + e.message, 'error');
        btn.disabled = false;
        btn.textContent = '✅ Mark as Resolved';
    }
}
