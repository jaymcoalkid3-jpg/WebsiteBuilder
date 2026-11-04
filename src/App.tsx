import { useState, useEffect } from "react";

// ─── Images ──────────────────────────────────────────────────────────────────
const IMG = {
  hero: "https://images.unsplash.com/photo-1575553939928-d03b21323afe?w=1400&h=800&fit=crop&auto=format",
  balls: "https://images.unsplash.com/photo-1599685315659-bc876da49fe5?w=900&h=600&fit=crop&auto=format",
  tableWide: "https://images.unsplash.com/photo-1545062080-a71640ea75a1?w=1200&h=500&fit=crop&auto=format",
  tableGreen: "https://images.unsplash.com/photo-1761591847985-2184afaab747?w=900&h=600&fit=crop&auto=format",
  playing: "https://images.unsplash.com/photo-1656381836187-79f6d0ae2e57?w=900&h=700&fit=crop&auto=format",
  wood1: "https://images.unsplash.com/photo-1736506159893-22cca29b8018?w=700&h=500&fit=crop&auto=format",
  wood2: "https://images.unsplash.com/photo-1677338003679-b422eb979c5d?w=700&h=500&fit=crop&auto=format",
  wood3: "https://images.unsplash.com/photo-1583596838470-10ae8e96a95a?w=700&h=500&fit=crop&auto=format",
};

// ─── Nav ─────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "About Us", href: "#about" },
  { label: "Custom Cues", href: "#custom-cues" },
  { label: "Materials & Craft", href: "#materials" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionTag({ children }: { children: React.ReactNode }) {
  return <p className="section-label mb-3">{children}</p>;
}

function SectionTitle({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2
      className="display-heading font-bold leading-tight mb-2"
      style={{
        fontSize: "clamp(2rem, 4vw, 3.2rem)",
        color: light ? "#f9fafb" : "#f3f4f6",
      }}
    >
      {children}
    </h2>
  );
}

function Divider() {
  return <div className="divider" />;
}

function SubCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="card p-6 rounded-sm">
      <h4 className="display-heading text-lg font-bold text-[#c9a84c] mb-3">{title}</h4>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="text-sm text-gray-300 flex items-start gap-2">
            <span className="text-[#b91c1c] mt-1 flex-shrink-0">▸</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TeamCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="card p-6 rounded-sm text-center">
      <div className="w-16 h-16 rounded-full bg-[#374151] mx-auto mb-4 flex items-center justify-center">
        <span className="display-heading text-2xl font-bold text-[#c9a84c]">
          {name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </span>
      </div>
      <h4 className="display-heading font-bold text-white text-lg">{name}</h4>
      <p className="text-sm text-[#9ca3af] mt-1">{role}</p>
    </div>
  );
}

function ValuePill({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-4 border-b border-[#374151]">
      <span className="w-2 h-2 rounded-full bg-[#b91c1c] flex-shrink-0" />
      <span className="font-semibold text-white tracking-wide">{label}</span>
    </div>
  );
}

function ProcessStep({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="flex gap-5">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#b91c1c] flex items-center justify-center">
        <span className="display-heading font-bold text-white text-sm">{num}</span>
      </div>
      <div>
        <h4 className="display-heading font-bold text-[#c9a84c] mb-1">{title}</h4>
        <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function ServiceCard({ title, items, icon }: { title: string; items: string[]; icon: string }) {
  return (
    <div className="card p-7 rounded-sm hover:border-[#b91c1c] transition-colors duration-200">
      <div className="text-3xl mb-4">{icon}</div>
      <h4 className="display-heading font-bold text-white text-xl mb-3">{title}</h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm text-gray-400 flex items-start gap-2">
            <span className="text-[#c9a84c] mt-0.5">—</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#374151]">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-white text-sm">{q}</span>
        <span className="text-[#c9a84c] flex-shrink-0 text-lg">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <p className="text-sm text-gray-400 pb-5 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Record<string, string>>({});

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const setTab = (section: string, tab: string) =>
    setActiveTab((prev) => ({ ...prev, [section]: tab }));
  const getTab = (section: string, def: string) => activeTab[section] ?? def;

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-[#f3f4f6]">

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#0b0f1a]/95 backdrop-blur-sm shadow-lg shadow-black/40" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-[#b91c1c] flex items-center justify-center text-white text-xs font-bold display-heading">
              A
            </span>
            <span className="display-heading font-bold text-white text-lg leading-tight">
              Aragon<br />
              <span className="text-[#c9a84c] text-xs font-normal tracking-widest uppercase not-italic" style={{ fontFamily: "var(--font-body)" }}>
                Custom Cue's
              </span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-sm font-semibold text-gray-300 hover:text-[#c9a84c] tracking-wide"
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className="accent-btn text-xs">
                Get a Quote
              </a>
            </li>
          </ul>

          <button
            className="lg:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span className={`block w-6 h-px bg-white transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-px bg-white transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-white transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-[#111827] border-t border-[#374151] px-6 py-6 space-y-4">
            {NAV_ITEMS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block text-base font-semibold text-gray-200 hover:text-[#c9a84c]"
              >
                {label}
              </a>
            ))}
            <a href="#contact" className="accent-btn block text-center mt-4">
              Get a Quote
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center"
        style={{
          background: `linear-gradient(to right, #0b0f1a 45%, rgba(11,15,26,0.6) 100%), url(${IMG.hero}) center/cover no-repeat`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-16 w-full">
          <div className="max-w-2xl">
            <SectionTag>Handcrafted in the Philippines</SectionTag>
            <h1
              className="display-heading font-black leading-none mb-6"
              style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
            >
              Custom Cues.<br />
              <em className="text-[#c9a84c] italic">Precision Craft.</em>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl">
              Every cue is built by hand — tailored to your game, your grip, and your style.
              From exotic wood selection to final engraving, we craft tools that perform and last.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#custom-cues" className="accent-btn">Design Your Cue</a>
              <a href="#about" className="ghost-btn">Our Story</a>
            </div>
          </div>
        </div>

        {/* Stat strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#111827]/80 backdrop-blur-sm border-t border-[#374151]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              ["1000+", "Cues Built"],
              ["42+", "Years Experience"],
              ["2", "Craftsmen"],
              ["100%", "Handcrafted"],
            ].map(([num, label]) => (
              <div key={label} className="text-center">
                <p className="display-heading font-bold text-[#c9a84c] text-2xl md:text-3xl">{num}</p>
                <p className="text-xs text-gray-400 tracking-wide mt-1 uppercase">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT US ─────────────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
            <div>
              <SectionTag>About Us</SectionTag>
              <SectionTitle>The Story Behind<br />Aragon Custom Cue's</SectionTitle>
              <Divider />
            </div>
            <div className="flex gap-3 flex-wrap">
              {["Our Story", "Our Journey", "Our Values", "The Team"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTab("about", tab)}
                  className={`text-xs font-bold tracking-widest uppercase px-4 py-2 border transition-all ${
                    getTab("about", "Our Story") === tab
                      ? "bg-[#b91c1c] border-[#b91c1c] text-white"
                      : "border-[#374151] text-gray-400 hover:border-[#c9a84c] hover:text-[#c9a84c]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Our Story */}
          {getTab("about", "Our Story") === "Our Story" && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="display-heading text-2xl font-bold text-[#c9a84c] mb-4">
                  Built from a love of the game.
                </h3>
                <p className="text-gray-300 leading-relaxed mb-5">
                  Aragon Custom Cue's was born from a passion for billiards and a deep respect for craftsmanship.
                  What started as a small workshop building cues for friends quickly grew into a dedicated studio
                  serving players who demand precision from their equipment.
                </p>
                <p className="text-gray-400 leading-relaxed mb-8">
                  We believe a cue is more than a tool — it's an extension of the player. Every joint, wrap, and
                  finish we apply is chosen with intention, shaped by years of experience and a relentless commitment
                  to quality.
                </p>
                <a href="#custom-cues" className="accent-btn">Design Your Cue</a>
              </div>
              <div className="relative">
                <img
                  src={IMG.playing}
                  alt="Player at the pool table"
                  className="w-full aspect-[4/5] object-cover rounded-sm"
                />
                <div className="absolute -bottom-4 -left-4 bg-[#b91c1c] px-5 py-3">
                  <p className="display-heading italic text-white font-bold text-lg leading-tight">
                    "Precision in<br />every stroke."
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Our Journey */}
          {getTab("about", "Our Journey") === "Our Journey" && (
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { year: "1984", title: "The Beginning", desc: "Started in a small garage workshop, building cues for local billiards players and experimenting with exotic wood combinations." },
                { year: "1995-2005", title: "Growing the Craft", desc: "Expanded our materials catalog and began offering full custom engraving services. Word spread through the billiards community." },
                { year: "2000", title: "The Studio", desc: "Moved into a dedicated workshop space with professional tools, enabling higher precision and shorter lead times on custom orders." },
                { year: "2010", title: "Team Expansion", desc: "Welcomed skilled craftsmen to the team, each bringing specialized expertise in joinery, finishing, and wood selection." },
                { year: "2011", title: "Appraisal Services", desc: "Launched our cue appraisal and restoration division, helping players maintain and authenticate their valuable equipment." },
                { year: "Today", title: "Still Growing", desc: "Continuing to refine our craft, deepen client relationships, and push the limits of what a custom cue can be." },
              ].map(({ year, title, desc }) => (
                <div key={year} className="card p-6 rounded-sm">
                  <p className="text-[#b91c1c] font-bold text-sm tracking-widest uppercase mb-2">{year}</p>
                  <h4 className="display-heading font-bold text-white text-lg mb-3">{title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Our Values */}
          {getTab("about", "Our Values") === "Our Values" && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="display-heading text-2xl font-bold text-white mb-6">What drives us every day.</h3>
                <div>
                  {[
                    { label: "Quality", desc: "We never cut corners. Every cue leaves our workshop meeting strict standards of fit, finish, and playability." },
                    { label: "Precision", desc: "Billiards is a game of millimeters. Our cues are engineered to tight tolerances so your equipment never lets you down." },
                    { label: "Passion", desc: "We play the game ourselves. This love for billiards informs every design decision and every hour of work." },
                    { label: "Customer Focus", desc: "Your vision guides our build. We listen carefully and communicate openly throughout the process." },
                  ].map(({ label, desc }) => (
                    <div key={label} className="py-5 border-b border-[#374151]">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-2 h-2 rounded-full bg-[#b91c1c]" />
                        <span className="font-bold text-[#c9a84c] tracking-wide">{label}</span>
                      </div>
                      <p className="text-sm text-gray-400 pl-5 leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <img
                src={IMG.tableGreen}
                alt="Green pool table"
                className="w-full aspect-video object-cover rounded-sm"
              />
            </div>
          )}

          {/* The Team */}
          {getTab("about", "The Team") === "The Team" && (
            <div>
              <p className="text-gray-400 max-w-xl mb-10 leading-relaxed">
                Aragon Custom Cue's is made by a tight-knit team of craftsmen who share a love for the game and
                a dedication to the art of cue-making.
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                <TeamCard name="Aragon, Jeff" role="Lead Builder & Founder" />
                <TeamCard name="Dominguez, Francis" role="Wood Selection & Joinery" />
                <TeamCard name="Espiritu, Marl" role="Finishing & Wraps" />
                <TeamCard name="Joshua, Hapil" role="Engraving & Custom Work" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── CUSTOM CUES ──────────────────────────────────────────────── */}
      <section id="custom-cues" className="py-24 md:py-32 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
            <div>
              <SectionTag>Custom Cues</SectionTag>
              <SectionTitle>Design Your Cue</SectionTitle>
              <Divider />
              <p className="text-gray-400 max-w-lg leading-relaxed">
                From the first consultation to the final polish, every custom cue is built around you.
                Tell us your game, your preferences, and your style — we'll handle the rest.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              {["Design Process", "Custom Options", "Engraving"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTab("cues", tab)}
                  className={`text-xs font-bold tracking-widest uppercase px-4 py-2 border transition-all ${
                    getTab("cues", "Design Process") === tab
                      ? "bg-[#b91c1c] border-[#b91c1c] text-white"
                      : "border-[#374151] text-gray-400 hover:border-[#c9a84c] hover:text-[#c9a84c]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Design Process */}
          {getTab("cues", "Design Process") === "Design Process" && (
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-8">
                <ProcessStep
                  num="01"
                  title="Consultation"
                  desc="We start by understanding your game — your grip, your stroke, the weight and length you prefer. This conversation shapes every decision that follows."
                />
                <ProcessStep
                  num="02"
                  title="Design and Specs"
                  desc="We draft a full specification sheet: wood species, shaft taper, joint type, wrap material, tip, and any decorative elements. You review and refine."
                />
                <ProcessStep
                  num="03"
                  title="Approval"
                  desc="Once you approve the spec sheet and design mockup, we begin the build. Lead time is 4–8 weeks depending on complexity and material availability."
                />
              </div>
              <img
                src={IMG.wood1}
                alt="Close-up of fine wood grain"
                className="w-full aspect-[4/3] object-cover rounded-sm"
              />
            </div>
          )}

          {/* Custom Options */}
          {getTab("cues", "Design Process") === "Custom Options" && (
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
              <SubCard
                title="Wood Selection"
                items={["Exotic hardwoods", "Maple blanks", "Ebony accents", "Birdseye maple shafts", "Cocobolo butts"]}
              />
              <SubCard
                title="Inlays & Design"
                items={["Shell inlays", "Wood veneers", "Geometric patterns", "Custom artwork", "Full-color prints"]}
              />
              <SubCard
                title="Joint Options"
                items={["Uni-loc", "3/8 × 10", "Radial pin", "Stainless steel", "Phenolic ferrule"]}
              />
              <SubCard
                title="Wrap & Finishes"
                items={["Irish linen", "Leather wrap", "No wrap", "Matte finish", "High-gloss lacquer", "Satin coat"]}
              />
            </div>
          )}

          {/* Engraving */}
          {getTab("cues", "Design Process") === "Engraving" && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <img
                src={IMG.wood2}
                alt="Fine wood texture for engraving"
                className="w-full aspect-video object-cover rounded-sm"
              />
              <div>
                <h3 className="display-heading text-2xl font-bold text-[#c9a84c] mb-4">
                  Make it unmistakably yours.
                </h3>
                <p className="text-gray-300 leading-relaxed mb-8">
                  Our engraving service transforms your cue into a one-of-a-kind heirloom.
                  Whether it's a name, a logo, or a dedication, we work with you to design
                  something that looks as good as it plays.
                </p>
                <div className="space-y-4">
                  {[
                    { title: "Personalization", desc: "Your name, initials, or custom text engraved into the butt or joint area." },
                    { title: "Name and Logo", desc: "Club logos, team crests, or personal brand marks etched with precision." },
                    { title: "Special Dedications", desc: "Memorial inscriptions, milestone dates, or meaningful quotes — rendered with care." },
                  ].map(({ title, desc }) => (
                    <div key={title} className="flex gap-4 items-start">
                      <span className="text-[#b91c1c] text-xl mt-0.5">✦</span>
                      <div>
                        <h4 className="font-bold text-white">{title}</h4>
                        <p className="text-sm text-gray-400 mt-1">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Full-width image break */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <img
          src={IMG.tableWide}
          alt="Pool table wide shot"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <h2
            className="display-heading font-black text-white leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Handcrafted with{" "}
            <em className="text-[#c9a84c] italic">obsession.</em>
          </h2>
        </div>
      </div>

      {/* ── MATERIALS & CRAFT ────────────────────────────────────────── */}
      <section id="materials" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
            <div>
              <SectionTag>Materials & Craft</SectionTag>
              <SectionTitle>Quality &<br />Craftsmanship</SectionTitle>
              <Divider />
            </div>
            <div className="flex gap-3 flex-wrap">
              {["Premium Materials", "Craftmanship", "Behind the Build"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTab("materials", tab)}
                  className={`text-xs font-bold tracking-widest uppercase px-4 py-2 border transition-all ${
                    getTab("materials", "Premium Materials") === tab
                      ? "bg-[#b91c1c] border-[#b91c1c] text-white"
                      : "border-[#374151] text-gray-400 hover:border-[#c9a84c] hover:text-[#c9a84c]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Premium Materials */}
          {getTab("materials", "Premium Materials") === "Premium Materials" && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card p-0 rounded-sm overflow-hidden">
                <img src={IMG.wood1} alt="Exotic wood" className="w-full aspect-video object-cover" />
                <div className="p-6">
                  <h4 className="display-heading font-bold text-[#c9a84c] text-xl mb-3">Exotic Woods</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    We source cocobolo, ebony, purpleheart, maple, and other premium species from trusted suppliers.
                    Each blank is inspected for grain consistency and density before it touches our tools.
                  </p>
                </div>
              </div>
              <div className="card p-0 rounded-sm overflow-hidden">
                <img src={IMG.wood2} alt="Shaft wood" className="w-full aspect-video object-cover" />
                <div className="p-6">
                  <h4 className="display-heading font-bold text-[#c9a84c] text-xl mb-3">Shafts</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Shafts are milled from quartersawn hard rock maple — straight grain, low deflection.
                    We offer multiple tapers and diameters to match your stroke style.
                  </p>
                </div>
              </div>
              <div className="card p-0 rounded-sm overflow-hidden">
                <img src={IMG.wood3} alt="Cue tip materials" className="w-full aspect-video object-cover" />
                <div className="p-6">
                  <h4 className="display-heading font-bold text-[#c9a84c] text-xl mb-3">Tips & Ferrules</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    We stock layered tips from leading brands alongside phenolic, ivory-look, and carbon fiber ferrules.
                    The right tip-ferrule combination transforms feel and control.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Craftmanship */}
          {getTab("materials", "Premium Materials") === "Craftmanship" && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="display-heading text-2xl font-bold text-white mb-6">
                  Three pillars of our craft.
                </h3>
                <div className="space-y-6">
                  {[
                    { icon: "🪵", title: "Handcrafted", desc: "Every cue is turned, shaped, and assembled by hand. We use machines only where precision demands it — the rest is craft." },
                    { icon: "🎯", title: "Precision Work", desc: "Joints are fitted to sub-millimeter tolerances. Shafts are hand-tested for straightness. Weight is calibrated to your spec." },
                    { icon: "🔍", title: "Attention to Detail", desc: "We inspect every cue at five stages before it ships. If it doesn't meet our standard, it doesn't leave the workshop." },
                  ].map(({ icon, title, desc }) => (
                    <div key={title} className="flex gap-5 items-start">
                      <div className="text-3xl flex-shrink-0">{icon}</div>
                      <div>
                        <h4 className="font-bold text-white text-lg mb-1">{title}</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <img
                src={IMG.balls}
                alt="Billiard balls on table"
                className="w-full aspect-[4/3] object-cover rounded-sm"
              />
            </div>
          )}

          {/* Behind the Build */}
          {getTab("materials", "Premium Materials") === "Behind the Build" && (
            <div>
              <p className="text-gray-400 max-w-xl mb-10 leading-relaxed">
                Here's a simplified look at how a custom Aragon cue comes to life — from raw blank to finished instrument.
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
                {[
                  { step: "01", title: "Material Selection", desc: "The right wood blank is chosen based on the client's specs — density, grain, color." },
                  { step: "02", title: "Turning & Shaping", desc: "The blank is turned on a lathe to achieve the desired taper, diameter, and balance point." },
                  { step: "03", title: "Assembly", desc: "Ferrule, tip, joint, and wrap are fitted. Alignment is checked and adjusted by hand." },
                  { step: "04", title: "Finish & QC", desc: "Lacquer or oil finish is applied in multiple coats. Final inspection before packaging." },
                ].map(({ step, title, desc }) => (
                  <div key={step} className="card p-6 rounded-sm">
                    <p className="text-[#b91c1c] font-bold text-3xl display-heading mb-3">{step}</p>
                    <h4 className="display-heading font-bold text-[#c9a84c] text-lg mb-2">{title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────── */}
      <section id="services" className="py-24 md:py-32 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="mb-14">
            <SectionTag>Services</SectionTag>
            <SectionTitle>What We Offer</SectionTitle>
            <Divider />
            <p className="text-gray-400 max-w-xl leading-relaxed">
              Beyond building cues, we keep your equipment in peak condition through our full range of maintenance, repair, and appraisal services.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mb-16">
            <ServiceCard
              icon="🔧"
              title="Gear & Maintenance"
              items={[
                "Cue maintenance consultations",
                "Tip replacement",
                "Shaft cleaning & polishing",
                "Wrap replacement",
                "General tune-ups",
              ]}
            />
            <ServiceCard
              icon="🛠️"
              title="Repairs & Restoration"
              items={[
                "Tip replacement",
                "Re-ferrule service",
                "Refinishing (matte or gloss)",
                "Crack repair",
                "Joint thread repair",
              ]}
            />
            <ServiceCard
              icon="🧽"
              title="Maintenance Guide"
              items={[
                "Cleaning: microfiber and shaft cleaner",
                "Store horizontally in a case",
                "Avoid humidity extremes",
                "Re-tip every 6–12 months",
                "Polish joint threads regularly",
              ]}
            />
            <ServiceCard
              icon="📋"
              title="Appraisal Services"
              items={[
                "Cue appraisal & valuation",
                "Authentication of vintage cues",
                "Insurance valuation reports",
                "Provenance research",
              ]}
            />
            <ServiceCard
              icon="💬"
              title="Custom Quotes"
              items={[
                "Custom build estimates",
                "Order status updates",
                "Design consultations",
                "Bulk/club orders available",
              ]}
            />
            <ServiceCard
              icon="📦"
              title="Shipping & Care"
              items={[
                "Nationwide shipping",
                "Custom foam-lined cases",
                "Repair return shipping",
                "Secure international options",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="mb-14">
            <SectionTag>Contact</SectionTag>
            <SectionTitle>Get In Touch</SectionTitle>
            <Divider />
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {/* Contact form */}
            <div>
              <h3 className="display-heading font-bold text-[#c9a84c] text-xl mb-6">Send Us a Message</h3>
              <div className="space-y-4">
                {[
                  { label: "Full Name", type: "text", placeholder: "Your name" },
                  { label: "Email Address", type: "email", placeholder: "you@example.com" },
                  { label: "Phone (optional)", type: "tel", placeholder: "+63 9XX XXX XXXX" },
                ].map(({ label, type, placeholder }) => (
                  <div key={label}>
                    <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-1.5">
                      {label}
                    </label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      className="w-full bg-[#1f2937] border border-[#374151] text-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#b91c1c] placeholder-gray-600"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-1.5">
                    Inquiry Type
                  </label>
                  <select className="w-full bg-[#1f2937] border border-[#374151] text-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#b91c1c]">
                    <option value="">Select an option</option>
                    <option>Custom Cue Build</option>
                    <option>Custom Quote</option>
                    <option>Order Status</option>
                    <option>Repairs & Restoration</option>
                    <option>Appraisal</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your project or question..."
                    className="w-full bg-[#1f2937] border border-[#374151] text-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#b91c1c] placeholder-gray-600 resize-none"
                  />
                </div>
                <button className="accent-btn w-full text-center cursor-pointer">
                  Send Message
                </button>
              </div>
            </div>

            {/* Info panel */}
            <div className="space-y-10">
              {/* Location & Hours */}
              <div>
                <h3 className="display-heading font-bold text-[#c9a84c] text-xl mb-4">Location & Hours</h3>
                <div className="card p-6 rounded-sm space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-[#b91c1c] text-xl">📍</span>
                    <div>
                      <p className="font-semibold text-white">Workshop Location</p>
                      <p className="text-sm text-gray-400">Available upon appointment — Philippines</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#b91c1c] text-xl">🕐</span>
                    <div>
                      <p className="font-semibold text-white">Business Hours</p>
                      <p className="text-sm text-gray-400">Mon–Sat: 9:00 AM – 6:00 PM</p>
                      <p className="text-sm text-gray-400">Sunday: By appointment only</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div>
                <h3 className="display-heading font-bold text-[#c9a84c] text-xl mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {[
                    { name: "Facebook", icon: "f", color: "#1877f2" },
                    { name: "Instagram", icon: "ig", color: "#e1306c" },
                    { name: "TikTok", icon: "tt", color: "#69c9d0" },
                  ].map(({ name, icon, color }) => (
                    <a
                      key={name}
                      href="#"
                      className="card flex items-center gap-3 px-5 py-3 rounded-sm hover:border-[#c9a84c] transition-colors"
                    >
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: color }}
                      >
                        {icon}
                      </span>
                      <span className="text-sm font-semibold text-gray-300">{name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h3 className="display-heading font-bold text-[#c9a84c] text-xl mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="card p-6 rounded-sm">
                  {[
                    {
                      q: "How long does a custom cue build take?",
                      a: "Lead time is typically 4–8 weeks depending on the complexity of your build and current order volume. We'll give you a specific estimate at the consultation stage.",
                    },
                    {
                      q: "Can I visit the workshop?",
                      a: "Yes, by appointment. We love showing clients the build process in person. Reach out via the contact form to schedule a visit.",
                    },
                    {
                      q: "Do you ship nationally and internationally?",
                      a: "We ship anywhere in the Philippines. For international orders, contact us directly for a shipping quote and timeline.",
                    },
                    {
                      q: "What's the starting price for a custom cue?",
                      a: "Custom cues start at ₱8,000 for entry-level builds. Premium materials and engraving will increase the price. We'll give you a detailed quote after the consultation.",
                    },
                  ].map((item) => (
                    <FAQItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="bg-[#060810] border-t border-[#1f2937] py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
            <div>
              <p className="display-heading font-black text-white text-2xl">Aragon Custom Cue's</p>
              <p className="text-xs text-gray-500 tracking-widest uppercase mt-1">
                Precision Built. Handcrafted. Yours.
              </p>
            </div>
            <nav className="flex flex-wrap gap-6">
              {NAV_ITEMS.map(({ label, href }) => (
                <a key={label} href={href} className="text-sm text-gray-400 hover:text-[#c9a84c]">
                  {label}
                </a>
              ))}
            </nav>
          </div>
          <div className="border-t border-[#1f2937] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-600">© 2026 Aragon Custom Cue's. All rights reserved.</p>
            <p className="text-xs text-gray-600">
              Made by: Dominguez, Francis Espiritu, Marl Hapil, Joshua
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
