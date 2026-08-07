// ============================================================
// NGO CONNECT — About Us Page
// ============================================================

function renderAbout() {
    const team = MOCK_DATA.team;
    return `
    <div class="page-header">
      <div class="container">
        <h1>ℹ️ About NGO CONNECT</h1>
        <p>Building India's most transparent animal rescue platform</p>
      </div>
    </div>
    <section class="section"><div class="container">
      <!-- Mission -->
      <div class="grid-2 animate-in" style="margin-bottom:3rem; gap:3rem; align-items:center;">
        <div>
          <h2 class="section-title">Our Mission</h2>
          <p style="color:var(--text-secondary);line-height:1.8;margin-bottom:1rem;">NGO CONNECT exists to bridge the gap between animals in distress and the people who can help. We believe every life counts — and that transparency, speed, and community are the keys to building a better world for all creatures.</p>
          <p style="color:var(--text-secondary);line-height:1.8;">Our vision is to create a scalable, trust-first platform that empowers anyone to be an animal rescuer — regardless of their resources, location, or experience.</p>
        </div>
        <div class="card" style="text-align:center;padding:2.5rem;">
          <div style="font-size:4rem;margin-bottom:1rem;">🌍</div>
          <h3 style="margin-bottom:1rem;">Our Vision</h3>
          <p style="color:var(--text-secondary);font-size:0.95rem;">A world where no animal suffers without help — powered by technology, transparency, and community.</p>
        </div>
      </div>

      <!-- Team -->
      <div class="text-center animate-in" style="margin-bottom:3rem;">
        <h2 class="section-title">Our Team</h2>
        <p class="section-subtitle">The people behind the platform</p>
        <div class="grid-4">
          ${team.map(t => `
            <div class="card" style="text-align:center;">
              <div style="font-size:3rem;margin-bottom:0.5rem;">${t.emoji}</div>
              <h3 style="font-size:1rem;">${t.name}</h3>
              <p style="color:var(--text-muted);font-size:0.85rem;">${t.role}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Technology -->
      <div class="card animate-in" style="margin-bottom:3rem;padding:2.5rem;">
        <h2 class="section-title" style="margin-bottom:1.5rem;">🔐 Technology & Security</h2>
        <div class="grid-3">
          <div><h4 style="color:var(--teal-light);margin-bottom:0.5rem;">🔒 Secure Auth</h4><p style="color:var(--text-secondary);font-size:0.9rem;">Industry-standard authentication with email, phone, and Google SSO.</p></div>
          <div><h4 style="color:var(--teal-light);margin-bottom:0.5rem;">☁️ Cloud Infrastructure</h4><p style="color:var(--text-secondary);font-size:0.9rem;">Scalable cloud storage and real-time database for reliable operations.</p></div>
          <div><h4 style="color:var(--teal-light);margin-bottom:0.5rem;">🔗 Blockchain-Ready</h4><p style="color:var(--text-secondary);font-size:0.9rem;">Architecture designed for immutable records and fraud prevention.</p></div>
        </div>
      </div>

      <!-- Partners -->
      <div class="text-center animate-in" style="margin-bottom:3rem;">
        <h2 class="section-title">Our Partners</h2>
        <p class="section-subtitle">NGOs and organizations we work with</p>
        <div style="display:flex;justify-content:center;gap:2rem;flex-wrap:wrap;">
          ${MOCK_DATA.ngos.slice(0, 4).map(n => `
            <div class="card" style="padding:1.5rem;text-align:center;min-width:150px;cursor:pointer;" onclick="navigate('/ngo/${n.id}')">
              <div style="font-size:2rem;">${n.emoji}</div>
              <div style="font-size:0.85rem;font-weight:600;margin-top:0.5rem;">${n.name}</div>
              <div style="font-size:0.75rem;color:var(--text-muted);">${n.city}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Contact -->
      <div class="card animate-in" style="max-width:600px;margin:0 auto;padding:2.5rem;">
        <h2 class="section-title text-center" style="margin-bottom:1.5rem;">📬 Contact Us</h2>
        <div class="form-group"><label class="form-label">Your Name</label><input type="text" class="form-input" placeholder="Full name"></div>
        <div class="form-group"><label class="form-label">Email</label><input type="email" class="form-input" placeholder="your@email.com"></div>
        <div class="form-group"><label class="form-label">Message</label><textarea class="form-textarea" placeholder="Your message..."></textarea></div>
        <button class="btn btn-primary" style="width:100%;justify-content:center;" onclick="showToast('✅ Message sent! We\\'ll get back to you soon.')">Send Message</button>
      </div>
    </div></section>`;
}
