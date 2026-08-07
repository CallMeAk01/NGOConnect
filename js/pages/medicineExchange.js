// ============================================================
// NGO CONNECT — Medicine Exchange Page
// ============================================================

function renderMedicineExchange() {
  const meds = MOCK_DATA.medicines;
  const stats = MOCK_DATA.stats;

  return `
    <div class="page-header">
      <div class="container">
        <h1>💊 Medicine Exchange</h1>
        <p>Donate unused medicines or request what you need — reducing waste, saving lives</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <!-- Impact Stats -->
        <div class="grid-4 animate-in" style="margin-bottom:var(--space-2xl);">
          <div class="ticker-item">
            <div class="ticker-icon">💊</div>
            <div class="ticker-value">${stats.medicinesRedistributed.toLocaleString()}</div>
            <div class="ticker-label">Medicines Shared</div>
          </div>
          <div class="ticker-item">
            <div class="ticker-icon">🤝</div>
            <div class="ticker-value">892</div>
            <div class="ticker-label">Successful Matches</div>
          </div>
          <div class="ticker-item">
            <div class="ticker-icon">🌍</div>
            <div class="ticker-value">12</div>
            <div class="ticker-label">Cities Active</div>
          </div>
          <div class="ticker-item">
            <div class="ticker-icon">♻️</div>
            <div class="ticker-value">94%</div>
            <div class="ticker-label">Waste Reduced</div>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div style="display:flex; gap:var(--space-lg); margin-bottom:var(--space-2xl); justify-content:center;" class="animate-in">
          <button class="btn btn-lg btn-primary" onclick="showMedTab('donate')">💊 Donate Medicine</button>
          <button class="btn btn-lg btn-gold" onclick="showMedTab('request')">📋 Request Medicine</button>
        </div>

        <!-- Tabs -->
        <div data-tab-group="medicine">
          <div class="tabs">
            <div class="tab active" data-tab="available" onclick="switchTab('medicine','available')">Available Medicines</div>
            <div class="tab" data-tab="requests" onclick="switchTab('medicine','requests')">Active Requests</div>
            <div class="tab" data-tab="donate" onclick="switchTab('medicine','donate')">Donate Form</div>
            <div class="tab" data-tab="request" onclick="switchTab('medicine','request')">Request Form</div>
          </div>

          <!-- Available Medicines -->
          <div class="tab-content active" data-tab-content="available">
            <div class="filter-bar" style="margin-bottom:var(--space-lg);">
              <input type="text" class="form-input" placeholder="🔍 Search medicines...">
              <select class="form-select">
                <option value="">📍 All Locations</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Pune">Pune</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>
              <select class="form-select">
                <option value="">💊 All Types</option>
                <option value="Antibiotic">Antibiotic</option>
                <option value="Anti-inflammatory">Anti-inflammatory</option>
                <option value="Anti-parasitic">Anti-parasitic</option>
                <option value="Topical">Topical</option>
              </select>
            </div>
            <div class="grid-3" id="medAvailableGrid">
              ${meds.available.map(m => `
                <div class="medicine-card animate-in">
                  <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div class="med-name">💊 ${m.name}</div>
                    <span class="badge badge-stable" style="font-size:0.65rem;">${m.type}</span>
                  </div>
                  <div class="med-detail">📦 Quantity: ${m.quantity}</div>
                  <div class="med-detail">📍 Location: ${m.location}</div>
                  <div class="med-detail">👤 Donor: ${m.donor}</div>
                  <div class="med-expiry">⏰ Expires: ${formatDate(m.expiry)}</div>
                  <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">📅 Listed: ${formatDateTime(m.listedAt)}</div>
                  <div class="med-actions">
                    <button class="btn btn-sm btn-primary" onclick="showToast('Request sent to donor!')">Request This Medicine</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Active Requests -->
          <div class="tab-content" data-tab-content="requests">
            <div class="grid-3">
              ${meds.requests.map(r => `
                <div class="medicine-card animate-in">
                  <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div class="med-name">📋 ${r.name}</div>
                    ${getUrgencyBadge(r.urgency)}
                  </div>
                  <div class="med-detail">📦 Needed: ${r.quantity}</div>
                  <div class="med-detail">📍 Location: ${r.location}</div>
                  <div class="med-detail">🏢 Requested by: ${r.requestedBy}</div>
                  ${r.caseId ? `<div class="med-detail">🔗 Case: <a href="#/case/${r.caseId}" style="color:var(--teal-light);">${r.caseId}</a></div>` : ''}
                  <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">📅 Requested: ${formatDateTime(r.requestedAt)}</div>
                  <div class="med-actions">
                    <button class="btn btn-sm btn-gold" onclick="showToast('Thank you! Your donation offer has been sent.')">I Can Donate This</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Donate Form -->
          <div class="tab-content" data-tab-content="donate">
            <div style="max-width:600px; margin:0 auto;">
              <div class="card" style="padding:2rem;">
                <h3 style="margin-bottom:var(--space-lg);">💊 Donate Medicine</h3>
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">Medicine Name *</label>
                    <input type="text" class="form-input" placeholder="e.g., Amoxicillin 250mg">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Type</label>
                    <select class="form-select">
                      <option value="">Select type...</option>
                      <option>Antibiotic</option>
                      <option>Anti-inflammatory</option>
                      <option>Anti-parasitic</option>
                      <option>Topical</option>
                      <option>Supplement</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">Quantity *</label>
                    <input type="text" class="form-input" placeholder="e.g., 30 tablets">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Expiry Date *</label>
                    <input type="date" class="form-input">
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">📸 Photo of Packaging</label>
                  <div class="upload-zone" style="padding:1.5rem;">
                    <p>Click to upload photo</p>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">📍 Your Location</label>
                  <input type="text" class="form-input" placeholder="City or area">
                </div>
                <div class="form-group">
                  <label class="form-label">Pickup Preference</label>
                  <select class="form-select">
                    <option>Pickup from my location</option>
                    <option>I'll drop at collection point</option>
                  </select>
                </div>
                <div style="padding:var(--space-sm); background:rgba(20,184,166,0.08); border-radius:var(--radius-sm); margin-bottom:var(--space-lg); font-size:0.8rem; color:var(--teal-light);">
                  ⏱️ Submission will be auto-timestamped
                </div>
                <button class="btn btn-primary" style="width:100%; justify-content:center;" onclick="showToast('✅ Medicine listed successfully!')">Submit Donation</button>
              </div>
            </div>
          </div>

          <!-- Request Form -->
          <div class="tab-content" data-tab-content="request">
            <div style="max-width:600px; margin:0 auto;">
              <div class="card" style="padding:2rem;">
                <h3 style="margin-bottom:var(--space-lg);">📋 Request Medicine</h3>
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">Medicine Needed *</label>
                    <input type="text" class="form-input" placeholder="e.g., Metronidazole 400mg">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Quantity *</label>
                    <input type="text" class="form-input" placeholder="e.g., 20 tablets">
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Urgency</label>
                  <select class="form-select">
                    <option value="critical">🔴 Critical</option>
                    <option value="moderate">🟡 Moderate</option>
                    <option value="stable">🟢 Stable</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Purpose / Case ID</label>
                  <input type="text" class="form-input" placeholder="Link to a case ID or describe usage">
                </div>
                <div class="form-group">
                  <label class="form-label">📍 Your Location</label>
                  <input type="text" class="form-input" placeholder="For local donor matching">
                </div>
                <div style="padding:var(--space-sm); background:rgba(20,184,166,0.08); border-radius:var(--radius-sm); margin-bottom:var(--space-lg); font-size:0.8rem; color:var(--teal-light);">
                  ⏱️ Request will be auto-timestamped
                </div>
                <button class="btn btn-primary" style="width:100%; justify-content:center;" onclick="showToast('✅ Request submitted! Matching with nearby donors...')">Submit Request</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function initMedicinePage() {
  fetch('http://localhost:3000/api/medicines/nearby?latitude=19.0760&longitude=72.8777&radiusKm=5000')
    .then(res => res.json())
    .then(json => {
      if (json.data && json.data.length > 0) {
        document.getElementById('medAvailableGrid').innerHTML = json.data.map(m => `
                <div class="medicine-card animate-in visible">
                  <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div class="med-name">💊 ${m.name}</div>
                    <span class="badge badge-stable" style="font-size:0.65rem;">AVAILABLE</span>
                  </div>
                  <div class="med-detail">📦 Quantity: ${m.quantity || 'Unknown'}</div>
                  <div class="med-detail">📍 Location: ${m.city || 'India'}</div>
                  <div class="med-detail">👤 Donor: ${m.donor?.email || 'Anonymous'}</div>
                  <div class="med-expiry">⏰ Expires: ${formatDate(m.expiryDate)}</div>
                  <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">📅 Listed: ${formatDateTime(m.createdAt)}</div>
                  <div class="med-actions">
                    <button class="btn btn-sm btn-primary" onclick="showToast('Request sent to donor!')">Request This Medicine</button>
                  </div>
                </div>
              `).join('');
      }
    }).catch(e => console.error("Error fetching medicines", e));
}

function showMedTab(tabName) {
  switchTab('medicine', tabName);
}
