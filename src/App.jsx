import { useEffect, useMemo, useState } from 'react'
import logoUrl from '/logo.svg'

const FILTER_STORAGE_KEY = 'kalacharam.dashboardFilters'

const eventCategories = [
  {
    title: 'Corporate Cultural Events',
    emoji: '🎭',
    gradient: 'gradient-pink',
    description: 'Elevated cultural storytelling for brand moments and leadership gatherings.',
    stat: '320 curated shows',
    span: 'span-2'
  },
  {
    title: 'Corporate Festival Events',
    emoji: '🎉',
    gradient: 'gradient-cyan',
    description: 'High-energy festival experiences with immersive set pieces and crowd flow.',
    stat: '280 festival experiences',
    span: 'span-1'
  },
  {
    title: 'Corporate Fashion Events',
    emoji: '👗',
    gradient: 'gradient-purple',
    description: 'Runway-driven productions with spotlight choreography and tactile luxury.',
    stat: '156 runway productions',
    span: 'span-1'
  },
  {
    title: 'Corporate Annual Events',
    emoji: '📅',
    gradient: 'gradient-gold',
    description: 'Immersive year-end celebrations and strategic milestone launches.',
    stat: '420 annual galas',
    span: 'span-2'
  },
  {
    title: 'Corporate Awards Events',
    emoji: '🏆',
    gradient: 'gradient-lime',
    description: 'Prestige-led awards nights with cinematic reveal moments.',
    stat: '195 awards nights',
    span: 'span-1'
  },
  {
    title: "Children's Excellence Awards",
    emoji: '⭐',
    gradient: 'gradient-orange',
    description: 'Warm, human-centric award ceremonies designed for young achievers.',
    stat: '88 youth showcases',
    span: 'span-1'
  }
]

const agenda = [
  { time: '18:00', title: 'Arrival & Champagne Welcome', detail: 'Luxury guest reception and personalized check-in' },
  { time: '19:00', title: 'Opening Sequence', detail: 'Kinetic reveal with stage lighting and live sound' },
  { time: '20:00', title: 'Showcase Moment', detail: 'Talent, performance, awards, or keynote ceremony' },
  { time: '21:30', title: 'Grand Finale', detail: 'Cinematic closing with music, visuals, and applause' }
]

const recommendations = [
  { label: 'Leadership Gala', score: 98, note: 'Best for executive visibility' },
  { label: 'Fashion Showcase', score: 94, note: 'High engagement runway format' },
  { label: 'Awards Night', score: 99, note: 'Premium recognition experience' }
]

const kpiMetrics = [
  { label: 'Upcoming Events', value: '24', trend: '+12% this month', points: [10, 14, 12, 18, 16, 20, 24] },
  { label: 'Active Sponsors', value: '46', trend: '+8 premium partners', points: [22, 25, 26, 31, 34, 38, 46] },
  { label: 'Total Attendees', value: '18.4K', trend: '+21% YoY growth', points: [8, 9, 10, 12, 14, 16, 18.4] },
  { label: 'Avg. Satisfaction', value: '4.9/5', trend: 'based on 3,200 reviews', points: [4.1, 4.3, 4.4, 4.6, 4.7, 4.8, 4.9] }
]

const conferenceModules = [
  {
    title: 'Session Intelligence',
    summary: 'Real-time session occupancy, engagement heatmaps, and speaker traction analytics.',
    badge: 'Live Metrics',
    eventType: 'Conference',
    city: 'Hyderabad',
    dateGroup: 'Next 30 Days'
  },
  {
    title: 'Sponsor Impact',
    summary: 'Track sponsor impressions, booth interactions, and lead quality in one luxury dashboard.',
    badge: 'ROI Ready',
    eventType: 'Corporate',
    city: 'Bengaluru',
    dateGroup: 'This Quarter'
  },
  {
    title: 'Agenda Control',
    summary: 'Adaptive schedule orchestration with conflict alerts and keynote flow optimization.',
    badge: 'AI Assisted',
    eventType: 'Conference',
    city: 'Chennai',
    dateGroup: 'This Quarter'
  }
]

const gallery = [
  { title: 'Stage Mood', tone: 'Parallax lighting', className: 'gallery-tall' },
  { title: 'Guest Arrival', tone: 'Red carpet welcome', className: 'gallery-wide' },
  { title: 'Pod Interaction', tone: '3D glass pods', className: 'gallery-square' },
  { title: 'Luxury Details', tone: 'Gold accents', className: 'gallery-square' }
]

function useScrollY() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return scrollY
}

function KineticLine({ children, scrollY, speed = 0.015, className = '' }) {
  return (
    <span
      className={`kinetic-line ${className}`}
      style={{
        transform: `translateY(${Math.sin(scrollY * speed) * 8}px) translateX(${Math.cos(scrollY * speed * 0.7) * 4}px)`
      }}
    >
      {children}
    </span>
  )
}

function Sparkline({ points }) {
  const min = Math.min(...points)
  const max = Math.max(...points)
  const spread = max - min || 1
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsAnimated(true), 120)
    return () => window.clearTimeout(timer)
  }, [])

  const path = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * 100
      const y = 100 - ((point - min) / spread) * 100
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg className="kpi-sparkline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <polyline className={isAnimated ? 'draw' : ''} points={path} />
    </svg>
  )
}

function App() {
  const scrollY = useScrollY()
  const [activeAgenda, setActiveAgenda] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', eventType: 'Corporate Cultural Events', message: '' })
  const [selectedType, setSelectedType] = useState('All Types')
  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [selectedDateGroup, setSelectedDateGroup] = useState('All Dates')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setActiveAgenda(1), 900)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const type = params.get('type')
    const city = params.get('city')
    const date = params.get('date')

    const validTypes = ['All Types', 'Conference', 'Corporate']
    const validCities = ['All Cities', 'Hyderabad', 'Bengaluru', 'Chennai']
    const validDates = ['All Dates', 'Next 30 Days', 'This Quarter']

    const hasQueryFilters = Boolean(type || city || date)

    if (hasQueryFilters) {
      if (type && validTypes.includes(type)) setSelectedType(type)
      if (city && validCities.includes(city)) setSelectedCity(city)
      if (date && validDates.includes(date)) setSelectedDateGroup(date)
      return
    }

    try {
      const stored = window.localStorage.getItem(FILTER_STORAGE_KEY)
      if (!stored) return

      const parsed = JSON.parse(stored)
      if (parsed.type && validTypes.includes(parsed.type)) setSelectedType(parsed.type)
      if (parsed.city && validCities.includes(parsed.city)) setSelectedCity(parsed.city)
      if (parsed.date && validDates.includes(parsed.date)) setSelectedDateGroup(parsed.date)
    } catch {
      // ignore malformed localStorage payload
    }
  }, [])

  const heroOffset = useMemo(() => Math.min(scrollY * 0.25, 220), [scrollY])
  const filteredModules = useMemo(
    () => conferenceModules.filter((module) => {
      const typeMatch = selectedType === 'All Types' || module.eventType === selectedType
      const cityMatch = selectedCity === 'All Cities' || module.city === selectedCity
      const dateMatch = selectedDateGroup === 'All Dates' || module.dateGroup === selectedDateGroup
      return typeMatch && cityMatch && dateMatch
    }),
    [selectedType, selectedCity, selectedDateGroup]
  )

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (selectedType !== 'All Types') count += 1
    if (selectedCity !== 'All Cities') count += 1
    if (selectedDateGroup !== 'All Dates') count += 1
    return count
  }, [selectedType, selectedCity, selectedDateGroup])

  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedType !== 'All Types') params.set('type', selectedType)
    if (selectedCity !== 'All Cities') params.set('city', selectedCity)
    if (selectedDateGroup !== 'All Dates') params.set('date', selectedDateGroup)

    const queryString = params.toString()
    const nextUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ''}${window.location.hash}`
    window.history.replaceState({}, '', nextUrl)

    try {
      window.localStorage.setItem(
        FILTER_STORAGE_KEY,
        JSON.stringify({ type: selectedType, city: selectedCity, date: selectedDateGroup })
      )
    } catch {
      // storage can be blocked by browser privacy settings
    }
  }, [selectedType, selectedCity, selectedDateGroup])

  const handleCopyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
    } catch {
      // fallback for older browser clipboard behavior
      const tempInput = document.createElement('textarea')
      tempInput.value = window.location.href
      document.body.appendChild(tempInput)
      tempInput.select()
      document.execCommand('copy')
      document.body.removeChild(tempInput)
      setCopied(true)
    }

    window.setTimeout(() => setCopied(false), 1500)
  }

  const handleResetFilters = () => {
    setSelectedType('All Types')
    setSelectedCity('All Cities')
    setSelectedDateGroup('All Dates')

    try {
      window.localStorage.removeItem(FILTER_STORAGE_KEY)
    } catch {
      // ignore storage errors
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: '', email: '', eventType: 'Corporate Cultural Events', message: '' })
    window.setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="app-shell">
      <header className="site-header glass-surface">
        <div className="brand">
          <img src={logoUrl} alt="Kalacharam Events" className="logo" />
          <div>
            <p className="eyebrow">Kalacharam Events</p>
            <h1>Luxury motion-led event design</h1>
          </div>
        </div>
        <nav className="nav-links">
          <a href="#dashboard">Dashboard</a>
          <a href="#modules">Modules</a>
          <a href="#categories">Categories</a>
          <a href="#recommendations">Recommendations</a>
          <a href="#contact" className="nav-cta">Book Now</a>
        </nav>
      </header>

      <main>
        <section className="hero-video">
          <div className="hero-video-backdrop" />
          <div className="hero-video-overlay" />
          <div className="hero-copy" style={{ transform: `translateY(${heroOffset * -0.2}px)` }}>
            <p className="eyebrow gold">Dopamine design meets champagne luxury</p>
            <h2>
              <KineticLine scrollY={scrollY} speed={0.016}>Luxury</KineticLine>
              <KineticLine scrollY={scrollY} speed={0.02} className="accent">Event</KineticLine>
              <KineticLine scrollY={scrollY} speed={0.024}>Management</KineticLine>
            </h2>
            <p className="hero-text">
              Cinematic full-bleed motion narrative, high-contrast neon gradients, and tactile gold details for premium events that feel alive on every scroll.
            </p>
            <div className="hero-actions">
              <button className="cta-button primary">Explore Experiences</button>
              <button className="cta-button secondary">View Portfolio</button>
            </div>
          </div>
        </section>

        <section id="dashboard" className="section-wrap">
          <div className="section-heading">
            <p className="eyebrow">Expovent-style dashboard</p>
            <h3>Integrated metrics and executive summaries</h3>
            <p>A high-performance, SEO-friendly analytics strip for conference teams and premium event operators.</p>
          </div>
          <div className="dashboard-filters glass-surface" role="group" aria-label="Dashboard filters">
            <div className="filter-actions">
              <span className={`active-filter-count ${activeFiltersCount > 0 ? 'active' : ''}`} aria-live="polite">
                {activeFiltersCount === 0 ? 'No filters' : `${activeFiltersCount} active`}
              </span>
              <button type="button" className="share-filter-link" onClick={handleCopyShareLink}>
                {copied ? 'Link copied ✓' : 'Share this view'}
              </button>
              <button type="button" className="reset-filter-link" onClick={handleResetFilters}>
                Reset filters
              </button>
            </div>
            <div className="filter-group">
              {['All Types', 'Conference', 'Corporate'].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`filter-pill ${selectedType === type ? 'active' : ''}`}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="filter-group">
              {['All Cities', 'Hyderabad', 'Bengaluru', 'Chennai'].map((city) => (
                <button
                  key={city}
                  type="button"
                  className={`filter-pill ${selectedCity === city ? 'active' : ''}`}
                  onClick={() => setSelectedCity(city)}
                >
                  {city}
                </button>
              ))}
            </div>
            <div className="filter-group">
              {['All Dates', 'Next 30 Days', 'This Quarter'].map((date) => (
                <button
                  key={date}
                  type="button"
                  className={`filter-pill ${selectedDateGroup === date ? 'active' : ''}`}
                  onClick={() => setSelectedDateGroup(date)}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>
          <div className="kpi-grid">
            {kpiMetrics.map((item) => (
              <article key={item.label} className="kpi-card glass-surface">
                <p className="kpi-label">{item.label}</p>
                <h4>{item.value}</h4>
                <p className="kpi-trend">{item.trend}</p>
                <Sparkline points={item.points} />
              </article>
            ))}
          </div>
        </section>

        <section id="modules" className="section-wrap">
          <div className="section-heading">
            <p className="eyebrow">Conference modules</p>
            <h3>Advanced event operations toolkit</h3>
            <p>Purpose-built cards inspired by modern dashboard products for events, summits, and seminars.</p>
          </div>
          <div className="module-grid">
            {filteredModules.map((module) => (
              <article key={module.title} className="module-card glass-surface">
                <span className="module-badge">{module.badge}</span>
                <h4>{module.title}</h4>
                <p>{module.summary}</p>
                <button className="module-link" type="button">Open module →</button>
              </article>
            ))}
            {filteredModules.length === 0 && (
              <article className="module-card glass-surface">
                <span className="module-badge">No Match</span>
                <h4>No modules found for this filter</h4>
                <p>Try changing event type, city, or date to view available modules.</p>
              </article>
            )}
          </div>
        </section>

        <section id="categories" className="section-wrap">
          <div className="section-heading">
            <p className="eyebrow">Event categories</p>
            <h3>Bento grid of signature experiences</h3>
            <p>Asymmetrical cards and floating icons create a polished, gallery-like overview of what Kalacharam delivers.</p>
          </div>
          <div className="bento-grid">
            {eventCategories.map((item) => (
              <article key={item.title} className={`bento-card ${item.gradient} ${item.span}`}>
                <div className="bento-icon">{item.emoji}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <span>{item.stat}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="motion-story section-wrap">
          <div className="story-panel glass-surface">
            <p className="eyebrow">Immersive scrolling</p>
            <h3>Motion narrative that unfolds in layers</h3>
            <p>
              Parallax depth, atmospheric glow, and responsive transitions guide the user through a cinematic brand story.
            </p>
          </div>
          <div className="story-panel glass-surface dark">
            <p className="eyebrow gold">Interactive experience pods</p>
            <div className="pods">
              <div className="pod">Glass Pod</div>
              <div className="pod">Neon Pod</div>
              <div className="pod">Gold Pod</div>
            </div>
          </div>
        </section>

        <section id="recommendations" className="section-wrap recommendations">
          <div className="section-heading">
            <p className="eyebrow">AI personalization</p>
            <h3>Personalized event recommendations</h3>
            <p>A clean luxury dashboard surface for curated suggestions and planning confidence.</p>
          </div>
          <div className="dashboard glass-surface">
            <div className="dashboard-summary">
              <h4>Your suggested event mix</h4>
              <p>Based on audience size, budget posture, and desired energy.</p>
            </div>
            <div className="recommendation-list">
              {recommendations.map((item) => (
                <div key={item.label} className="recommendation-row">
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.note}</p>
                  </div>
                  <span>{item.score}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap agenda-layout">
          <div className="section-heading left-align">
            <p className="eyebrow">Agenda design</p>
            <h3>Minimalist luxury timeline</h3>
            <p>Custom pacing for premium guest flow, stage rhythm, and event storytelling.</p>
          </div>
          <div className="agenda-list">
            {agenda.map((item, index) => (
              <button
                key={item.time}
                className={`agenda-item ${activeAgenda === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveAgenda(index)}
                type="button"
              >
                <time>{item.time}</time>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.detail}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="section-wrap gallery-wrap">
          <div className="section-heading">
            <p className="eyebrow">Interactive visuals</p>
            <h3>Masonry gallery with tactile hover overlays</h3>
            <p>Designed to feel immersive and human-first, with tactile cards and cinematic depth.</p>
          </div>
          <div className="masonry-gallery">
            {gallery.map((item) => (
              <article key={item.title} className={`gallery-card ${item.className}`}>
                <div className="gallery-overlay" />
                <div>
                  <p className="eyebrow gold">{item.title}</p>
                  <h4>{item.tone}</h4>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section-wrap contact-section">
          <div className="contact-copy">
            <p className="eyebrow">Mobile-first luxury</p>
            <h3>Sticky navigation and tactile CTA buttons built for every screen</h3>
            <p>Book a consultation and let the experience unfold with premium clarity.</p>
          </div>
          <form className="contact-form glass-surface" onSubmit={handleSubmit}>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Your email" type="email" required />
            <select name="eventType" value={form.eventType} onChange={handleChange}>
              {eventCategories.map((item) => <option key={item.title}>{item.title}</option>)}
            </select>
            <textarea name="message" value={form.message} onChange={handleChange} rows="4" placeholder="Tell us about your event vision" />
            <button className="cta-button primary submit" type="submit">Send Inquiry</button>
            {submitted && <p className="success-note">Thank you — your luxury event request has been received.</p>}
          </form>
        </section>
      </main>
    </div>
  )
}

export default App
