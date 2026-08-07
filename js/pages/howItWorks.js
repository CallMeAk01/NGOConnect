// ============================================================
// NGO CONNECT — How It Works Page
// ============================================================

function renderHowItWorks() {
    return `
    <div class="page-header">
      <div class="container">
        <h1>❓ How It Works</h1>
        <p>Learn how NGO CONNECT saves lives — whether you're a reporter, NGO, donor, or volunteer</p>
      </div>
    </div>
    <section class="section"><div class="container">
      <div data-tab-group="how">
        <div class="tabs">
          <div class="tab active" data-tab="reporters" onclick="switchTab('how','reporters')">📱 For Reporters</div>
          <div class="tab" data-tab="ngos" onclick="switchTab('how','ngos')">🏢 For NGOs</div>
          <div class="tab" data-tab="donors" onclick="switchTab('how','donors')">💰 For Donors</div>
          <div class="tab" data-tab="medicine" onclick="switchTab('how','medicine')">💊 For Medicine Donors</div>
        </div>

        <div class="tab-content active" data-tab-content="reporters">
          <div class="steps animate-in" style="margin-bottom:3rem;">
            <div class="step"><div class="step-number">1</div><h3>🔍 Spot</h3><p>See an animal in distress — injured, abandoned, or trapped.</p></div>
            <div class="step"><div class="step-number">2</div><h3>📱 Report</h3><p>Open NGO CONNECT, upload the location, photo, and urgency level. No account needed!</p></div>
            <div class="step"><div class="step-number">3</div><h3>📡 Track</h3><p>Receive a Case ID and watch real-time timestamped updates as the rescue unfolds.</p></div>
          </div>
          <div class="card" style="padding:2rem;">
            <h3 style="margin-bottom:1rem;">✨ Key Features for Reporters</h3>
            <ul style="color:var(--text-secondary);line-height:2;">
              <li>✅ Anonymous reporting — no account required</li>
              <li>✅ GPS auto-detection for animal location</li>
              <li>✅ Photos auto-stamped with date, time & coordinates</li>
              <li>✅ Unique Case ID for real-time tracking</li>
              <li>✅ Notifications on case progress</li>
              <li>✅ Zero cost — completely free to report</li>
            </ul>
          </div>
        </div>

        <div class="tab-content" data-tab-content="ngos">
          <div class="steps animate-in" style="margin-bottom:3rem;">
            <div class="step"><div class="step-number">1</div><h3>📝 Register</h3><p>Sign up and submit verification documents to get your NGO verified.</p></div>
            <div class="step"><div class="step-number">2</div><h3>📋 Receive Cases</h3><p>Get notified of rescue cases in your area sorted by urgency.</p></div>
            <div class="step"><div class="step-number">3</div><h3>🏥 Coordinate</h3><p>Dispatch teams, update status with timestamped logs, manage financials.</p></div>
          </div>
          <div class="card" style="padding:2rem;">
            <h3 style="margin-bottom:1rem;">✨ NGO Dashboard Features</h3>
            <ul style="color:var(--text-secondary);line-height:2;">
              <li>✅ Urgency-sorted incoming case queue</li>
              <li>✅ Real-time case management tools</li>
              <li>✅ Timestamped activity logging</li>
              <li>✅ Financial tracking per case</li>
              <li>✅ Performance analytics dashboard</li>
              <li>✅ Verification badge for trust</li>
            </ul>
          </div>
        </div>

        <div class="tab-content" data-tab-content="donors">
          <div class="steps animate-in" style="margin-bottom:3rem;">
            <div class="step"><div class="step-number">1</div><h3>🔍 Browse</h3><p>Find active cases needing funding or contribute to the general rescue fund.</p></div>
            <div class="step"><div class="step-number">2</div><h3>💰 Donate</h3><p>Choose an amount and pay via UPI, card, or wallet. Get an instant 80G receipt.</p></div>
            <div class="step"><div class="step-number">3</div><h3>📊 Track</h3><p>See exactly where your money went — every rupee timestamped and verifiable.</p></div>
          </div>
          <div class="card" style="padding:2rem;">
            <h3 style="margin-bottom:1rem;">✨ Donor Transparency Features</h3>
            <ul style="color:var(--text-secondary);line-height:2;">
              <li>✅ Fund specific cases directly</li>
              <li>✅ Every transaction timestamped & recorded</li>
              <li>✅ Publicly verifiable spending trail</li>
              <li>✅ Auto-generated 80G tax receipts</li>
              <li>✅ Impact summary on donor dashboard</li>
            </ul>
          </div>
        </div>

        <div class="tab-content" data-tab-content="medicine">
          <div class="steps animate-in" style="margin-bottom:3rem;">
            <div class="step"><div class="step-number">1</div><h3>💊 List</h3><p>Add unused, unexpired medicine details including name, quantity, and expiry date.</p></div>
            <div class="step"><div class="step-number">2</div><h3>🤝 Match</h3><p>Our system matches you with nearby requesters who need those medicines.</p></div>
            <div class="step"><div class="step-number">3</div><h3>📦 Deliver</h3><p>Arrange pickup or drop-off. The donation and impact are tracked.</p></div>
          </div>
          <div class="card" style="padding:2rem;">
            <h3 style="margin-bottom:1rem;">✨ Medicine Exchange Features</h3>
            <ul style="color:var(--text-secondary);line-height:2;">
              <li>✅ Donate or request medicines</li>
              <li>✅ Location-based instant matching</li>
              <li>✅ Expiry date tracking</li>
              <li>✅ Impact metrics (waste reduced)</li>
              <li>✅ Community-driven redistribution</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- FAQ -->
      <div style="margin-top:3rem;">
        <h2 class="section-title text-center">Frequently Asked Questions</h2>
        <div style="max-width:700px;margin:2rem auto 0;">
          ${[
            { q: 'Is it free to report an animal?', a: 'Yes! Reporting is completely free and you don\'t even need an account. Zero-cost participation is a core principle of NGO CONNECT.' },
            { q: 'How are NGOs verified?', a: 'NGOs submit registration documents for review. Verified NGOs receive a badge displayed on their profile. Verification date is publicly shown.' },
            { q: 'Can I track where my donation goes?', a: 'Absolutely. Every rupee is timestamped and recorded. You can see the full financial breakdown on any case detail page.' },
            { q: 'How does the Medicine Exchange work?', a: 'Donors list unused, unexpired medicines. Our system matches them with nearby requesters. The entire process is tracked for accountability.' },
            { q: 'Is my data secure?', a: 'Yes. We use secure authentication, encrypted transactions, and our architecture is blockchain-ready for fraud prevention.' },
        ].map(f => `
            <div class="faq-item">
              <div class="faq-question" onclick="toggleFaq(this)">
                <span>${f.q}</span><span class="arrow">▼</span>
              </div>
              <div class="faq-answer"><div class="faq-answer-inner">${f.a}</div></div>
            </div>
          `).join('')}
        </div>
      </div>
    </div></section>`;
}

function initHowItWorksPage() { }
