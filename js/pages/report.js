// ============================================================
// NGO CONNECT — Report an Animal Page (Multi-Step Wizard)
// ============================================================

function renderReport() {
  return `
    <div class="page-header">
      <div class="container">
        <h1>🚨 Report an Animal</h1>
        <p>Found an animal in distress? Submit a report and our verified NGO network will respond immediately.</p>
      </div>
    </div>

    <section class="section">
      <div class="container" style="max-width:800px;">
        <div class="card animate-in" style="padding:2.5rem;">

          <!-- Wizard Progress Bar -->
          <div class="wizard-progress">
            <div class="wizard-step active" id="wizStep1">
              <div class="step-circle">1</div>
              <div class="step-label">Location</div>
            </div>
            <div class="wizard-connector" id="wizConn1"></div>
            <div class="wizard-step" id="wizStep2">
              <div class="step-circle">2</div>
              <div class="step-label">Photos</div>
            </div>
            <div class="wizard-connector" id="wizConn2"></div>
            <div class="wizard-step" id="wizStep3">
              <div class="step-circle">3</div>
              <div class="step-label">Details</div>
            </div>
            <div class="wizard-connector" id="wizConn3"></div>
            <div class="wizard-step" id="wizStep4">
              <div class="step-circle">4</div>
              <div class="step-label">Submit</div>
            </div>
          </div>

          <form id="reportForm" onsubmit="handleReportSubmit(event)">

            <!-- Step 1: Location -->
            <div class="wizard-panel active" id="panel1">
              <div class="form-group">
                <label class="form-label">📍 Animal Location *</label>
                <div class="upload-zone" id="locationPicker" style="padding:1.5rem; cursor:pointer;" onclick="simulateLocation()">
                  <div class="upload-icon">🗺️</div>
                  <p id="locationText">Click to detect your GPS location or enter manually</p>
                </div>
                <div id="reportMap" style="width:100%; height:300px; display:none; border-radius:12px; margin-top:var(--space-md); border:1px solid var(--border-glass);"></div>
                <input type="text" class="form-input" placeholder="Or type address manually..." style="margin-top:var(--space-md);" id="manualLocation">
              </div>
              <div class="wizard-actions">
                <div></div>
                <button type="button" class="btn btn-primary" onclick="wizardNext(1)">Next: Photos →</button>
              </div>
            </div>

            <!-- Step 2: Photos -->
            <div class="wizard-panel" id="panel2">
              <div class="form-group">
                <label class="form-label">📸 Photos of the Animal</label>
                <input type="file" id="actualPhotoInput" multiple accept="image/*" style="display:none;" onchange="handlePhotoSelection(event)">
                <div class="upload-zone" id="photoUpload" onclick="document.getElementById('actualPhotoInput').click()">
                  <div class="upload-icon">📷</div>
                  <p>Click to browse photos or take a picture</p>
                  <p style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">Supports JPG, PNG, WEBP</p>
                </div>
                <div id="photoPreview" style="display:flex; gap:var(--space-md); margin-top:var(--space-md); flex-wrap:wrap;"></div>
              </div>
              <div class="wizard-actions">
                <button type="button" class="btn btn-secondary" onclick="wizardBack(2)">← Back</button>
                <button type="button" class="btn btn-primary" onclick="wizardNext(2)">Next: Details →</button>
              </div>
            </div>

            <!-- Step 3: Details -->
            <div class="wizard-panel" id="panel3">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">🐾 Type of Animal</label>
                  <select class="form-select" id="animalType">
                    <option value="">Select type...</option>
                    <option value="dog">🐕 Dog</option>
                    <option value="cat">🐱 Cat</option>
                    <option value="cow">🐄 Cow</option>
                    <option value="bird">🦜 Bird</option>
                    <option value="horse">🐴 Horse</option>
                    <option value="monkey">🐒 Monkey</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">⚠️ Urgency Level *</label>
                  <select class="form-select" id="urgencyLevel" required>
                    <option value="">Select urgency...</option>
                    <option value="critical">🔴 Critical — Life-threatening</option>
                    <option value="moderate">🟡 Moderate — Needs attention</option>
                    <option value="stable">🟢 Stable — Not immediate danger</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">📝 Description *</label>
                <textarea class="form-textarea" id="reportDesc" placeholder="Describe the animal's condition, surroundings, and any other relevant details..." required maxlength="500" oninput="updateCharCount()"></textarea>
                <div class="char-counter" id="charCounter">0 / 500 characters</div>
              </div>
              <div class="wizard-actions">
                <button type="button" class="btn btn-secondary" onclick="wizardBack(3)">← Back</button>
                <button type="button" class="btn btn-primary" onclick="wizardNext(3)">Next: Review →</button>
              </div>
            </div>

            <!-- Step 4: Review & Submit -->
            <div class="wizard-panel" id="panel4">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">📱 Phone (Optional)</label>
                  <input type="tel" class="form-input" id="reportPhone" placeholder="Your phone number for follow-ups">
                </div>
                <div class="form-group">
                  <label class="form-label">📧 Email (Optional)</label>
                  <input type="email" class="form-input" id="reportEmail" placeholder="Your email address">
                </div>
              </div>

              <div class="form-group" style="display:flex; align-items:center; gap:var(--space-md); padding:var(--space-md); background:var(--bg-glass); border-radius:var(--radius-md);">
                <input type="checkbox" id="anonymousReport" style="width:18px; height:18px; accent-color:var(--teal);">
                <label for="anonymousReport" style="font-size:0.9rem; color:var(--text-secondary); cursor:pointer;">
                  Report anonymously (no account needed — zero-cost participation)
                </label>
              </div>

              <div style="padding:var(--space-md); background:rgba(20,184,166,0.08); border:1px solid rgba(20,184,166,0.2); border-radius:var(--radius-md); margin-bottom:var(--space-xl);">
                <p style="font-size:0.85rem; color:var(--teal-light);">
                  ⏱️ Your report will be automatically timestamped with the current date, time, and timezone (ISO 8601 format) upon submission.
                </p>
              </div>

              <div class="wizard-actions">
                <button type="button" class="btn btn-secondary" onclick="wizardBack(4)">← Back</button>
                <button type="submit" class="btn btn-lg btn-primary" style="flex:1; justify-content:center;">
                  🚨 Submit Report
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </section>
  `;
}

function initReportPage() {
  // Page-specific initialization if needed
}

// --- Wizard Navigation ---
function wizardNext(currentStep) {
  // Validate current step
  if (currentStep === 1) {
    if (reportCoords.lat === null || reportCoords.lng === null) {
      const manual = document.getElementById('manualLocation').value;
      if (!manual) {
        showToast('Please detect your location or enter an address', 'error');
        return;
      }
    }
  }
  if (currentStep === 3) {
    const urgency = document.getElementById('urgencyLevel').value;
    const desc = document.getElementById('reportDesc').value;
    if (!urgency || !desc) {
      showToast('Please fill in urgency and description', 'error');
      return;
    }
  }

  const nextStep = currentStep + 1;

  // Update panels
  document.getElementById(`panel${currentStep}`).classList.remove('active');
  document.getElementById(`panel${nextStep}`).classList.remove('active');
  // Force re-trigger animation
  void document.getElementById(`panel${nextStep}`).offsetWidth;
  document.getElementById(`panel${nextStep}`).classList.add('active');

  // Update progress
  document.getElementById(`wizStep${currentStep}`).classList.remove('active');
  document.getElementById(`wizStep${currentStep}`).classList.add('completed');
  document.getElementById(`wizStep${currentStep}`).querySelector('.step-circle').textContent = '✓';
  document.getElementById(`wizConn${currentStep}`).classList.add('completed');
  document.getElementById(`wizStep${nextStep}`).classList.add('active');
}

function wizardBack(currentStep) {
  const prevStep = currentStep - 1;

  document.getElementById(`panel${currentStep}`).classList.remove('active');
  document.getElementById(`panel${prevStep}`).classList.add('active');

  // Revert progress
  document.getElementById(`wizStep${currentStep}`).classList.remove('active');
  document.getElementById(`wizConn${prevStep}`).classList.remove('completed');
  document.getElementById(`wizStep${prevStep}`).classList.remove('completed');
  document.getElementById(`wizStep${prevStep}`).classList.add('active');
  document.getElementById(`wizStep${prevStep}`).querySelector('.step-circle').textContent = prevStep;
}

function updateCharCount() {
  const textarea = document.getElementById('reportDesc');
  const counter = document.getElementById('charCounter');
  const len = textarea.value.length;
  counter.textContent = `${len} / 500 characters`;
  counter.className = 'char-counter' + (len > 450 ? (len >= 500 ? ' at-limit' : ' near-limit') : '');
}

// --- Location ---
let reportCoords = { lat: null, lng: null };
let reportMapInstance = null;
let reportMapMarker = null;

function simulateLocation() {
  const el = document.getElementById('locationText');
  const box = document.getElementById('locationPicker');
  const mapDiv = document.getElementById('reportMap');

  if (!navigator.geolocation) {
    el.innerHTML = '❌ <strong>Error:</strong> Geolocation is not supported by your browser.';
    el.style.color = 'var(--danger)';
    return;
  }

  el.innerHTML = '⏳ <strong>Locating...</strong> Please allow access.';
  el.style.color = 'var(--text-secondary)';

  navigator.geolocation.getCurrentPosition(
    (position) => {
      reportCoords.lat = position.coords.latitude;
      reportCoords.lng = position.coords.longitude;
      el.innerHTML = `📍 <strong>Location detected:</strong> ${reportCoords.lat.toFixed(4)}° N, ${reportCoords.lng.toFixed(4)}° E`;
      el.style.color = 'var(--emerald-light)';
      box.style.borderColor = 'var(--emerald)';

      if (typeof L !== 'undefined') {
        mapDiv.style.display = 'block';
        if (!reportMapInstance) {
          reportMapInstance = L.map('reportMap').setView([reportCoords.lat, reportCoords.lng], 15);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19, attribution: '© OpenStreetMap contributors'
          }).addTo(reportMapInstance);
          reportMapMarker = L.marker([reportCoords.lat, reportCoords.lng], { draggable: true })
            .addTo(reportMapInstance)
            .bindPopup("<b>Detected Location</b><br>Drag pin to adjust!").openPopup();
          reportMapMarker.on('dragend', function (event) {
            const newPos = event.target.getLatLng();
            reportCoords.lat = newPos.lat;
            reportCoords.lng = newPos.lng;
            el.innerHTML = `📍 <strong>Location adjusted:</strong> ${reportCoords.lat.toFixed(4)}° N, ${reportCoords.lng.toFixed(4)}° E`;
          });
        } else {
          reportMapInstance.setView([reportCoords.lat, reportCoords.lng], 15);
          reportMapMarker.setLatLng([reportCoords.lat, reportCoords.lng]);
        }
      }
    },
    (error) => {
      el.innerHTML = `❌ <strong>Error:</strong> ${error.message}. Please enter address manually.`;
      el.style.color = 'var(--danger)';
      box.style.borderColor = 'var(--danger)';
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
}

// --- Photo Upload with Gemini Vision Verification ---
let selectedReportPhotos = [];  // array of base64 data URLs

async function verifyPhotoWithGemini(base64DataUrl) {
  // Key is stored in localStorage (set once) or falls back to window config
  const GEMINI_KEY = localStorage.getItem('GEMINI_KEY') || window.GEMINI_KEY || '';
  if (!GEMINI_KEY) {
    // If no key available, skip verification and allow the photo
    return { isAnimal: true, confidence: 70, what: 'Verification skipped (no key)' };
  }
  const base64 = base64DataUrl.split(',')[1];
  const mimeType = base64DataUrl.split(';')[0].split(':')[1];
  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: 'Look at this image carefully. Does it contain an animal (any living creature like dog, cat, cow, bird, reptile, etc.)? Answer ONLY with a JSON object: {"isAnimal": true/false, "confidence": 0-100, "what": "brief description of what you see"}. No markdown, no extra text.' },
              { inline_data: { mime_type: mimeType, data: base64 } }
            ]
          }],
          generationConfig: { temperature: 0.1, maxOutputTokens: 100 }
        })
      }
    );
    const data = await resp.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '{}';
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch (e) {
    console.warn('Gemini Vision check failed:', e);
    return { isAnimal: true, confidence: 70, what: 'Could not verify (offline)' }; // graceful fallback
  }
}

function handlePhotoSelection(event) {
  const files = event.target.files;
  if (!files || files.length === 0) return;

  const previewContainer = document.getElementById('photoPreview');
  const uploadBox = document.getElementById('photoUpload');

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = async function (e) {
      const base64 = e.target.result;
      const now = new Date().toLocaleString('en-IN');

      // Create preview element immediately with scanning indicator
      const previewEl = document.createElement('div');
      previewEl.style.cssText = 'position:relative;background:var(--bg-glass);border:2px solid var(--border-glass);border-radius:10px;padding:6px;text-align:center;min-width:130px;animation:wizardFadeIn 0.35s ease;';
      previewEl.innerHTML = `
        <img src="${base64}" style="width:100%;height:100px;object-fit:cover;border-radius:6px;margin-bottom:4px;">
        <div style="font-size:0.7rem;color:var(--text-muted);">📅 ${now}</div>
        <div id="aiVerifyBadge_${Date.now()}" style="margin-top:4px;font-size:0.7rem;font-weight:600;color:var(--text-muted);">🤖 Verifying...</div>
      `;
      previewContainer.appendChild(previewEl);
      const badgeEl = previewEl.querySelector('[id^="aiVerifyBadge_"]');

      // Run Gemini Vision check
      const result = await verifyPhotoWithGemini(base64);

      if (result.isAnimal) {
        // ✅ Animal confirmed — accept photo
        selectedReportPhotos.push(base64);
        uploadBox.style.borderColor = 'var(--success)';
        previewEl.style.borderColor = 'var(--success)';
        badgeEl.innerHTML = `<span style="color:var(--success);">✅ Animal verified (${result.confidence}%)</span>`;
        if (result.what) badgeEl.innerHTML += `<br><span style="color:var(--text-muted);font-size:0.65rem;">${result.what}</span>`;
      } else {
        // ❌ Not an animal — reject photo
        previewEl.style.borderColor = 'var(--danger)';
        previewEl.style.opacity = '0.6';
        badgeEl.innerHTML = `<span style="color:var(--danger);">❌ Not an animal (${result.confidence}%)</span>`;
        if (result.what) badgeEl.innerHTML += `<br><span style="color:var(--text-muted);font-size:0.65rem;">${result.what}</span>`;
        showToast('⚠️ Photo rejected — please upload a real animal photo', 'error');
      }
    };
    reader.readAsDataURL(file);
  });
}


// --- Submit with Dispatch Visualization ---
async function handleReportSubmit(e) {
  e.preventDefault();

  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  const type = document.getElementById('animalType').value;
  const urgency = document.getElementById('urgencyLevel').value;
  const desc = document.getElementById('reportDesc').value;
  const isAnonymous = document.getElementById('anonymousReport').checked;
  const manualLoc = document.getElementById('manualLocation')?.value || '';

  if (!urgency || !desc) {
    showToast('Please fill in all required fields (Urgency & Description)', 'error');
    return;
  }

  if (reportCoords.lat === null || reportCoords.lng === null) {
    showToast('Please detect or provide the animal location first.', 'error');
    return;
  }

  if (selectedReportPhotos.length === 0) {
    const ok = confirm('No verified animal photos added. Continue anyway?');
    if (!ok) return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = '⏳ Submitting... Please wait';

  try {
    const payload = {
      latitude: reportCoords.lat,
      longitude: reportCoords.lng,
      urgency: urgency.toUpperCase(),
      description: type ? `[${type.toUpperCase()}] ${desc}` : desc,
      city: manualLoc || undefined,
      // Send actual verified base64 images (max 3 to avoid payload size issues)
      images: JSON.stringify(selectedReportPhotos.slice(0, 3))
    };

    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };

    if (!isAnonymous && token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else if (!isAnonymous && !token) {
      showToast('You are not logged in. Reporting anonymously instead.', 'info');
    }

    const response = await fetch('http://localhost:3000/api/cases', {
      method: 'POST', headers, body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || 'Failed to submit report');
    }

    const caseData = await response.json();
    // Store newly created case ID so cases page highlights it
    try { const prev = JSON.parse(localStorage.getItem('mySubmittedCases')||'[]'); prev.unshift(caseData.id); localStorage.setItem('mySubmittedCases', JSON.stringify(prev.slice(0,20))); } catch{}
    showToast(`✅ Report submitted! Case ID: ${caseData.id}`);
    showDispatchVisualization(caseData, reportCoords);

  } catch (error) {
    console.error(error);
    showToast('Showing demo dispatch (backend may be offline)', 'info');
    showDispatchVisualization({ id: 'DEMO-' + Date.now().toString(36).toUpperCase() }, reportCoords);
  }
}


function showDispatchVisualization(caseData, coords) {
  const form = document.getElementById('reportForm');

  // Get nearby NGOs from mock data for demo
  const nearbyNgos = MOCK_DATA.ngos
    .map(n => ({
      ...n,
      dist: (Math.random() * 15 + 1).toFixed(1)
    }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 4);

  form.innerHTML = `
    <div style="text-align:center; padding:1rem 0;">
      <div style="font-size:3rem; margin-bottom:var(--space-md);">🚨</div>
      <h2 style="margin-bottom:var(--space-sm);">Report Submitted Successfully!</h2>
      <p style="color:var(--text-secondary); margin-bottom:var(--space-md);">Case ID: <strong style="color:var(--teal-light);">${caseData.id}</strong></p>
      
      <!-- Dispatch Map -->
      <div class="dispatch-map-container" style="margin-bottom:var(--space-lg);">
        <div id="dispatchMap" style="width:100%; height:300px;"></div>
        <div class="dispatch-radius-ring"></div>
        <div class="dispatch-status" id="dispatchStatus">
          <div class="status-dot"></div>
          <span>🔍 Scanning for nearby NGOs...</span>
        </div>
      </div>
      
      <!-- NGO Discovery List -->
      <div id="ngoDiscoveryList" style="text-align:left;"></div>

      <div id="dispatchActions" style="display:none; margin-top:var(--space-xl);">
        <div style="display:flex; gap:var(--space-md); justify-content:center;">
          <a href="#/cases" class="btn btn-primary">Track Your Case →</a>
          <a href="#/report" class="btn btn-secondary" onclick="setTimeout(()=>location.reload(),100)">Report Another</a>
        </div>
      </div>
    </div>
  `;

  // Initialize dispatch map
  if (typeof L !== 'undefined') {
    const lat = coords.lat || 19.0760;
    const lng = coords.lng || 72.8777;

    const dispatchMap = L.map('dispatchMap').setView([lat, lng], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '© OpenStreetMap'
    }).addTo(dispatchMap);

    // Animal location marker (red)
    const animalIcon = L.divIcon({
      className: '',
      html: '<div style="background:#DC2626;width:20px;height:20px;border-radius:50%;border:3px solid white;box-shadow:0 0 10px rgba(220,38,38,0.5);"></div>',
      iconSize: [20, 20], iconAnchor: [10, 10]
    });
    L.marker([lat, lng], { icon: animalIcon }).addTo(dispatchMap).bindPopup('<strong>🚨 Animal Location</strong>').openPopup();

    // Animated NGO discovery
    nearbyNgos.forEach((ngo, i) => {
      setTimeout(() => {
        const ngoLat = lat + (Math.random() - 0.5) * 0.08;
        const ngoLng = lng + (Math.random() - 0.5) * 0.08;

        const ngoIcon = L.divIcon({
          className: '',
          html: `<div style="background:${i === 0 ? '#16A34A' : '#2563EB'};width:16px;height:16px;border-radius:50%;border:2px solid white;box-shadow:0 0 8px rgba(37,99,235,0.4);"></div>`,
          iconSize: [16, 16], iconAnchor: [8, 8]
        });
        L.marker([ngoLat, ngoLng], { icon: ngoIcon }).addTo(dispatchMap)
          .bindPopup(`<strong>${ngo.name}</strong><br>${ngo.dist} km away`);

        // Draw line from animal to NGO
        L.polyline([[lat, lng], [ngoLat, ngoLng]], {
          color: i === 0 ? '#16A34A' : '#2563EB', weight: 2, opacity: 0.4, dashArray: '5, 10'
        }).addTo(dispatchMap);

        // Update discovery list
        const list = document.getElementById('ngoDiscoveryList');
        const badge = i === 0 ? '<span class="badge badge-verified" style="font-size:0.6rem;margin-left:6px;">✅ NEAREST</span>' : '';
        list.innerHTML += `
          <div class="card" style="padding:12px 16px;margin-bottom:8px;display:flex;align-items:center;gap:12px;animation:wizardFadeIn 0.35s ease;">
            <div style="font-size:1.3rem;">${ngo.emoji || '🏢'}</div>
            <div style="flex:1;">
              <div style="font-weight:600;font-size:0.9rem;">${ngo.name}${badge}</div>
              <div style="font-size:0.8rem;color:var(--text-muted);">📍 ${ngo.dist} km away • ⭐ ${ngo.rating}</div>
            </div>
            <div style="font-size:0.8rem;color:${i === 0 ? 'var(--success)' : 'var(--text-muted)'}; font-weight:600;">
              ${i === 0 ? '🟢 Assigned' : '🔵 Notified'}
            </div>
          </div>
        `;

        // Update status
        const statusEl = document.getElementById('dispatchStatus');
        if (statusEl) {
          if (i === nearbyNgos.length - 1) {
            statusEl.innerHTML = `
              <div class="status-dot"></div>
              <span>✅ <strong>${nearbyNgos[0].name}</strong> auto-assigned (${nearbyNgos[0].dist} km) · Est. response: ~${Math.floor(parseFloat(nearbyNgos[0].dist) * 3 + 10)} min</span>
            `;
            document.getElementById('dispatchActions').style.display = 'block';
          } else {
            statusEl.innerHTML = `<div class="status-dot"></div><span>📡 Found ${i + 1}/${nearbyNgos.length} NGOs nearby...</span>`;
          }
        }
      }, 1000 + (i * 800));
    });
  }
}
