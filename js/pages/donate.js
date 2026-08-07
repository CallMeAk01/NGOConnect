// ============================================================
// NGO CONNECT — Donate Page
// ============================================================

function renderDonate() {
  const activeCases = MOCK_DATA.cases.filter(c => c.status !== 'resolved');

  return `
    <div class="page-header">
      <div class="container">
        <h1>💰 Donate</h1>
        <p>Fund animal rescues directly. Every rupee is tracked and publicly verifiable.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <!-- Trust Pledge -->
        <div class="trust-section animate-in" style="margin-bottom:var(--space-2xl);">
          <h3 style="margin-bottom:var(--space-md);">🔒 100% Financial Transparency Pledge</h3>
          <p style="color:var(--text-secondary); max-width:600px; margin:0 auto;">Every donation is timestamped, recorded, and publicly verifiable. You can track exactly where your money goes — from the moment it's received to the treatment it funds.</p>
        </div>

        <!-- Tabs -->
        <div data-tab-group="donate">
          <div class="tabs">
            <div class="tab active" data-tab="fund-case" onclick="switchTab('donate','fund-case')">🎯 Fund a Specific Case</div>
            <div class="tab" data-tab="general" onclick="switchTab('donate','general')">💚 General Donation</div>
          </div>

          <!-- Fund a Case -->
          <div class="tab-content active" data-tab-content="fund-case">
            <p style="color:var(--text-secondary); margin-bottom:var(--space-xl);">Choose an active case to fund directly. Your donation goes straight to the animal's treatment.</p>
            <div class="grid-3">
              ${activeCases.map(c => `
                <div class="card animate-in" style="text-align:center;">
                  <div style="font-size:3rem; margin-bottom:var(--space-md);">${c.emoji}</div>
                  <h3 style="font-size:1rem; margin-bottom:var(--space-sm);">${c.title}</h3>
                  <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:var(--space-md);">📍 ${c.city} • ${getUrgencyBadge(c.urgency)}</div>
                  <div class="stat-bar" style="margin-bottom:var(--space-md);">
                    <div class="stat-bar-header">
                      <span style="font-size:0.85rem; color:var(--teal-light);">${formatCurrency(c.fundsRaised)}</span>
                      <span style="font-size:0.85rem; color:var(--text-muted);">of ${formatCurrency(c.fundsRequired)}</span>
                    </div>
                    <div class="stat-bar-track">
                      <div class="stat-bar-fill" style="width:${Math.min(100, (c.fundsRaised / c.fundsRequired) * 100)}%;"></div>
                    </div>
                  </div>
                  <div style="display:flex; gap:var(--space-sm); flex-wrap:wrap; justify-content:center;">
                    <button class="btn btn-sm btn-secondary" onclick="handleDonation('${c.id}', 500)">₹500</button>
                    <button class="btn btn-sm btn-secondary" onclick="handleDonation('${c.id}', 1000)">₹1,000</button>
                    <button class="btn btn-sm btn-gold" onclick="handleDonation('${c.id}', 2000)">₹2,000</button>
                  </div>
                  <div style="margin-top:var(--space-md);">
                    <a href="#/case/${c.id}" style="font-size:0.8rem;">View Case Details →</a>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- General Donation -->
          <div class="tab-content" data-tab-content="general">
            <div style="max-width:500px; margin:0 auto;">
              <div class="card" style="padding:2.5rem; text-align:center;">
                <div style="font-size:3rem; margin-bottom:var(--space-md);">💚</div>
                <h3 style="margin-bottom:var(--space-md);">Contribute to the Rescue Fund</h3>
                <p style="color:var(--text-secondary); margin-bottom:var(--space-xl);">Your general donation supports the overall rescue operations, helping cases that need funding the most.</p>

                <div class="form-group">
                  <label class="form-label text-center">Select Amount</label>
                  <div style="display:flex; gap:var(--space-sm); flex-wrap:wrap; justify-content:center; margin-bottom:var(--space-md);">
                    <button class="btn btn-secondary donate-amount-btn" onclick="setDonateAmount(500)">₹500</button>
                    <button class="btn btn-secondary donate-amount-btn" onclick="setDonateAmount(1000)">₹1,000</button>
                    <button class="btn btn-secondary donate-amount-btn" onclick="setDonateAmount(2000)">₹2,000</button>
                    <button class="btn btn-secondary donate-amount-btn" onclick="setDonateAmount(5000)">₹5,000</button>
                  </div>
                  <input type="number" class="form-input" id="donateCustomAmount" placeholder="Or enter custom amount (₹)" style="text-align:center;">
                </div>

                <div class="form-group">
                  <label class="form-label text-center">Payment Method</label>
                  <div style="display:flex; gap:var(--space-sm); flex-wrap:wrap; justify-content:center;">
                    <span class="badge badge-stable" style="cursor:pointer; padding:8px 16px;">UPI</span>
                    <span class="badge badge-stable" style="cursor:pointer; padding:8px 16px;">Card</span>
                    <span class="badge badge-stable" style="cursor:pointer; padding:8px 16px;">Net Banking</span>
                    <span class="badge badge-stable" style="cursor:pointer; padding:8px 16px;">Wallet</span>
                  </div>
                </div>

                <div style="padding:var(--space-sm); background:rgba(20,184,166,0.08); border-radius:var(--radius-sm); margin-bottom:var(--space-lg); font-size:0.8rem; color:var(--teal-light);">
                  ⏱️ Transaction will be timestamped • 🧾 80G tax receipt auto-generated
                </div>

                <button class="btn btn-lg btn-gold" style="width:100%; justify-content:center;" onclick="handleGeneralDonation()">
                  💰 Donate Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function initDonatePage() {
  // Nothing extra needed
}

function setDonateAmount(amount) {
  document.getElementById('donateCustomAmount').value = amount;
  // Highlight selected button
  document.querySelectorAll('.donate-amount-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
}

function handleDonation(caseId, amount) {
  openPaymentGateway(amount, caseId);
}

function handleGeneralDonation() {
  const amount = document.getElementById('donateCustomAmount').value;
  if (!amount || amount <= 0) {
    showToast('Please select or enter a donation amount', 'error');
    return;
  }
  openPaymentGateway(parseInt(amount), 'RESCUE-FUND');
}

function openPaymentGateway(amount, caseId) {
  const txId = 'TXN' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase();

  const overlay = document.createElement('div');
  overlay.id = 'paymentGatewayOverlay';
  overlay.style.cssText = `
        position:fixed; inset:0; background:rgba(0,0,0,0.6); z-index:10000;
        display:flex; align-items:center; justify-content:center;
        animation: fadeInUp 0.3s ease;
    `;

  overlay.innerHTML = `
      <div style="background:var(--bg-card, #fff); border-radius:16px; width:440px; max-width:95vw; max-height:90vh; overflow-y:auto; box-shadow:0 25px 60px rgba(0,0,0,0.3); border:1px solid var(--border-glass, #e5e7eb);" id="paymentModal">
        <!-- Header -->
        <div style="background:linear-gradient(135deg, #1e3a8a, #2563eb); padding:20px 24px; border-radius:16px 16px 0 0; color:#fff; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-size:0.75rem; opacity:0.8; margin-bottom:4px;">NGO CONNECT PAYMENTS</div>
            <div style="font-size:1.5rem; font-weight:700;">₹${amount.toLocaleString('en-IN')}</div>
            <div style="font-size:0.7rem; opacity:0.7; margin-top:2px;">Case: ${caseId}</div>
          </div>
          <div style="cursor:pointer; font-size:1.5rem; width:36px; height:36px; display:flex; align-items:center; justify-content:center; border-radius:50%; background:rgba(255,255,255,0.15);" onclick="closePaymentGateway()">✕</div>
        </div>

        <!-- Payment Methods -->
        <div style="padding:24px;" id="paymentStep1">
          <div style="font-size:0.85rem; font-weight:600; margin-bottom:12px; color:var(--text-primary, #1f2937);">Choose Payment Method</div>

          <div id="payMethodBtns" style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:20px;">
            <div class="pay-method-btn active" onclick="selectPayMethod('upi', this)" style="padding:14px; border-radius:10px; border:2px solid #2563eb; background:rgba(37,99,235,0.06); cursor:pointer; text-align:center; transition:all 0.2s;">
              <div style="font-size:1.3rem;">📱</div><div style="font-size:0.8rem; font-weight:600; margin-top:4px;">UPI</div>
            </div>
            <div class="pay-method-btn" onclick="selectPayMethod('card', this)" style="padding:14px; border-radius:10px; border:2px solid var(--border-glass, #e5e7eb); cursor:pointer; text-align:center; transition:all 0.2s;">
              <div style="font-size:1.3rem;">💳</div><div style="font-size:0.8rem; font-weight:600; margin-top:4px;">Card</div>
            </div>
            <div class="pay-method-btn" onclick="selectPayMethod('netbanking', this)" style="padding:14px; border-radius:10px; border:2px solid var(--border-glass, #e5e7eb); cursor:pointer; text-align:center; transition:all 0.2s;">
              <div style="font-size:1.3rem;">🏦</div><div style="font-size:0.8rem; font-weight:600; margin-top:4px;">Net Banking</div>
            </div>
            <div class="pay-method-btn" onclick="selectPayMethod('wallet', this)" style="padding:14px; border-radius:10px; border:2px solid var(--border-glass, #e5e7eb); cursor:pointer; text-align:center; transition:all 0.2s;">
              <div style="font-size:1.3rem;">👛</div><div style="font-size:0.8rem; font-weight:600; margin-top:4px;">Wallet</div>
            </div>
          </div>

          <!-- UPI Form -->
          <div id="payFormUpi">
            <label style="font-size:0.8rem; font-weight:600; display:block; margin-bottom:6px; color:var(--text-primary, #1f2937);">UPI ID</label>
            <input type="text" id="upiIdInput" placeholder="yourname@upi" value="demo@ybl" style="width:100%; padding:12px 16px; border:2px solid var(--border-glass, #e5e7eb); border-radius:10px; font-size:0.95rem; background:var(--bg-glass, #f9fafb); color:var(--text-primary, #1f2937); box-sizing:border-box;">
            <div style="display:flex; gap:8px; margin-top:10px; flex-wrap:wrap;">
              <span style="padding:4px 10px; border-radius:6px; font-size:0.7rem; background:rgba(37,99,235,0.08); color:#2563eb; cursor:pointer;" onclick="document.getElementById('upiIdInput').value='demo@ybl'">Google Pay</span>
              <span style="padding:4px 10px; border-radius:6px; font-size:0.7rem; background:rgba(124,58,237,0.08); color:#7c3aed; cursor:pointer;" onclick="document.getElementById('upiIdInput').value='demo@paytm'">PhonePe</span>
              <span style="padding:4px 10px; border-radius:6px; font-size:0.7rem; background:rgba(16,185,129,0.08); color:#10b981; cursor:pointer;" onclick="document.getElementById('upiIdInput').value='demo@axl'">Paytm</span>
            </div>
          </div>

          <!-- Card Form (hidden initially) -->
          <div id="payFormCard" style="display:none;">
            <label style="font-size:0.8rem; font-weight:600; display:block; margin-bottom:6px; color:var(--text-primary, #1f2937);">Card Number</label>
            <input type="text" placeholder="4242 4242 4242 4242" value="4242 4242 4242 4242" maxlength="19" style="width:100%; padding:12px 16px; border:2px solid var(--border-glass, #e5e7eb); border-radius:10px; font-size:0.95rem; letter-spacing:2px; background:var(--bg-glass, #f9fafb); color:var(--text-primary, #1f2937); box-sizing:border-box; margin-bottom:10px;">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
              <div>
                <label style="font-size:0.75rem; font-weight:600; display:block; margin-bottom:4px; color:var(--text-primary, #1f2937);">Expiry</label>
                <input type="text" placeholder="MM/YY" value="12/28" maxlength="5" style="width:100%; padding:10px 14px; border:2px solid var(--border-glass, #e5e7eb); border-radius:10px; font-size:0.9rem; background:var(--bg-glass, #f9fafb); color:var(--text-primary, #1f2937); box-sizing:border-box;">
              </div>
              <div>
                <label style="font-size:0.75rem; font-weight:600; display:block; margin-bottom:4px; color:var(--text-primary, #1f2937);">CVV</label>
                <input type="password" placeholder="•••" value="123" maxlength="4" style="width:100%; padding:10px 14px; border:2px solid var(--border-glass, #e5e7eb); border-radius:10px; font-size:0.9rem; background:var(--bg-glass, #f9fafb); color:var(--text-primary, #1f2937); box-sizing:border-box;">
              </div>
            </div>
          </div>

          <!-- Net Banking Form (hidden initially) -->
          <div id="payFormNetbanking" style="display:none;">
            <label style="font-size:0.8rem; font-weight:600; display:block; margin-bottom:6px; color:var(--text-primary, #1f2937);">Select Bank</label>
            <select style="width:100%; padding:12px 16px; border:2px solid var(--border-glass, #e5e7eb); border-radius:10px; font-size:0.95rem; background:var(--bg-glass, #f9fafb); color:var(--text-primary, #1f2937); box-sizing:border-box;">
              <option>State Bank of India</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>Axis Bank</option>
              <option>Kotak Mahindra Bank</option>
              <option>Punjab National Bank</option>
            </select>
          </div>

          <!-- Wallet Form (hidden initially) -->
          <div id="payFormWallet" style="display:none;">
            <label style="font-size:0.8rem; font-weight:600; display:block; margin-bottom:6px; color:var(--text-primary, #1f2937);">Select Wallet</label>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
              <div style="padding:12px; border-radius:10px; border:2px solid #2563eb; background:rgba(37,99,235,0.06); cursor:pointer; text-align:center; font-size:0.85rem; font-weight:600;">Paytm Wallet</div>
              <div style="padding:12px; border-radius:10px; border:2px solid var(--border-glass, #e5e7eb); cursor:pointer; text-align:center; font-size:0.85rem; font-weight:600;">Amazon Pay</div>
            </div>
          </div>

          <!-- Security Info -->
          <div style="display:flex; align-items:center; gap:8px; margin-top:16px; padding:10px 14px; background:rgba(16,185,129,0.06); border-radius:8px; border:1px solid rgba(16,185,129,0.15);">
            <span>🔒</span>
            <span style="font-size:0.72rem; color:var(--text-muted, #6b7280);">256-bit SSL encrypted • PCI DSS compliant • RBI regulated</span>
          </div>

          <button onclick="processPayment(${amount}, '${caseId}', '${txId}')" style="width:100%; padding:14px; background:linear-gradient(135deg, #2563eb, #1d4ed8); color:#fff; border:none; border-radius:10px; font-size:1rem; font-weight:700; cursor:pointer; margin-top:16px; transition:all 0.2s;" onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 4px 15px rgba(37,99,235,0.4)'" onmouseout="this.style.transform='none';this.style.boxShadow='none'">
            Pay ₹${amount.toLocaleString('en-IN')} Securely →
          </button>

          <div style="text-align:center; margin-top:10px; font-size:0.7rem; color:var(--text-muted, #9ca3af);">
            Powered by <strong>NGO Connect Payments</strong> • Razorpay Partner
          </div>
        </div>

        <!-- Processing Step (hidden) -->
        <div id="paymentStep2" style="display:none; padding:48px 24px; text-align:center;">
          <div style="width:60px; height:60px; border:4px solid var(--border-glass, #e5e7eb); border-top-color:#2563eb; border-radius:50%; margin:0 auto 20px; animation:spin 1s linear infinite;"></div>
          <div style="font-size:1.1rem; font-weight:700; color:var(--text-primary, #1f2937);">Processing Payment...</div>
          <div style="font-size:0.8rem; color:var(--text-muted, #6b7280); margin-top:8px;">Please wait while we verify your transaction</div>
        </div>

        <!-- Success Step (hidden) -->
        <div id="paymentStep3" style="display:none; padding:36px 24px; text-align:center;">
          <div style="width:70px; height:70px; background:linear-gradient(135deg, #10b981, #059669); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 16px; font-size:2rem; animation: fadeInUp 0.5s ease;">✓</div>
          <div style="font-size:1.3rem; font-weight:700; color:var(--text-primary, #1f2937);">Payment Successful!</div>
          <div style="font-size:0.85rem; color:var(--text-muted, #6b7280); margin-top:6px;">₹${amount.toLocaleString('en-IN')} donated to ${caseId}</div>
          <div style="margin-top:16px; padding:14px; background:var(--bg-glass, #f3f4f6); border-radius:10px; text-align:left; font-size:0.8rem;">
            <div style="display:flex; justify-content:space-between; margin-bottom:6px;"><span style="color:var(--text-muted, #6b7280);">Transaction ID</span><strong style="color:var(--text-primary, #1f2937);">${txId}</strong></div>
            <div style="display:flex; justify-content:space-between; margin-bottom:6px;"><span style="color:var(--text-muted, #6b7280);">Timestamp</span><strong style="color:var(--text-primary, #1f2937);">${formatDateTime(new Date().toISOString())}</strong></div>
            <div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted, #6b7280);">Tax Receipt</span><strong style="color:#10b981;">80G Generated ✓</strong></div>
          </div>
          <button onclick="closePaymentGateway()" style="width:100%; padding:12px; background:linear-gradient(135deg, #10b981, #059669); color:#fff; border:none; border-radius:10px; font-size:0.95rem; font-weight:700; cursor:pointer; margin-top:16px;">Done ✓</button>
        </div>
      </div>
    `;

  document.body.appendChild(overlay);
  // Close on overlay click
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closePaymentGateway(); });
}

function selectPayMethod(method, el) {
  // Update button styles
  document.querySelectorAll('#payMethodBtns > div').forEach(b => {
    b.style.borderColor = 'var(--border-glass, #e5e7eb)';
    b.style.background = 'transparent';
  });
  el.style.borderColor = '#2563eb';
  el.style.background = 'rgba(37,99,235,0.06)';

  // Show/hide forms
  document.getElementById('payFormUpi').style.display = method === 'upi' ? 'block' : 'none';
  document.getElementById('payFormCard').style.display = method === 'card' ? 'block' : 'none';
  document.getElementById('payFormNetbanking').style.display = method === 'netbanking' ? 'block' : 'none';
  document.getElementById('payFormWallet').style.display = method === 'wallet' ? 'block' : 'none';
}

function processPayment(amount, caseId, txId) {
  // Show processing
  document.getElementById('paymentStep1').style.display = 'none';
  document.getElementById('paymentStep2').style.display = 'block';

  // Simulate processing delay
  setTimeout(() => {
    document.getElementById('paymentStep2').style.display = 'none';
    document.getElementById('paymentStep3').style.display = 'block';
    showToast(`✅ ₹${amount.toLocaleString('en-IN')} donated successfully! Tx: ${txId}`);
  }, 2200);
}

function closePaymentGateway() {
  const overlay = document.getElementById('paymentGatewayOverlay');
  if (overlay) {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease';
    setTimeout(() => overlay.remove(), 300);
  }
}

