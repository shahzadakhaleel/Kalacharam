import { useEffect, useMemo, useState } from 'react'
import logoUrl from '/logo.svg'

const PAGES = ['home', 'about', 'events', 'gallery', 'process', 'contact']
const CONTACT_DISPLAY_EMAIL = 'kalacharamevents@gmail.com'
const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL

const NAV_ITEMS = [
  { key: 'home', label: 'Home' },
  { key: 'about', label: 'About Us' },
  { key: 'events', label: 'Events' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'process', label: 'Our Process' },
  { key: 'contact', label: 'Contact' }
]

const EVENT_CATEGORIES = [
  {
    title: 'Corporate Events',
    subtitle: 'Conferences, Seminars, Product Launches',
    icon: '🎤',
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Private Events',
    subtitle: 'Weddings, Birthdays, Family Celebrations',
    icon: '💍',
    image:
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Sports & Adventure',
    subtitle: 'Tournaments, Team Building, Outdoor Events',
    icon: '🏆',
    image:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Social & Cultural',
    subtitle: 'Festivals, Community Events, Cultural Nights',
    icon: '🎵',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Award Ceremonies',
    subtitle: 'Corporate Awards, Recognition Events',
    icon: '🏅',
    image:
      'https://images.unsplash.com/photo-1560523159-4a9692d222f9?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Educational Events',
    subtitle: 'Workshops, Training Sessions, College Events',
    icon: '🎓',
    image:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80'
  }
]

const HOME_EVENT_CATEGORIES = [
  {
    title: 'Corporate Events',
    subtitle: 'Conferences, Seminars, Product Launches, Awards and more.',
    icon: '🧑‍💼'
  },
  {
    title: 'Private Events',
    subtitle: 'Weddings, Birthdays, Family Anniversaries and special occasions.',
    icon: '🎉'
  },
  {
    title: 'Sports & Adventure',
    subtitle: 'Tournaments, Adventure Trips and Outdoor Team Building.',
    icon: '🏆'
  },
  {
    title: 'Social & Cultural',
    subtitle: 'Festivals, Community Events, Charity Events and celebrations.',
    icon: '🎭'
  },
  {
    title: 'Award Ceremonies',
    subtitle: 'Corporate Awards, Recognition Events and gala nights.',
    icon: '🏅'
  },
  {
    title: 'Educational Events',
    subtitle: 'Workshops, Training Sessions, School and College events.',
    icon: '🎓'
  }
]

const VALUE_POINTS = [
  { title: 'Expert Team', description: 'Experienced professionals with precision and care.', icon: '👥' },
  { title: 'Creative Concepts', description: 'Unique ideas and stories tailored to your vision.', icon: '💡' },
  { title: 'End-to-End Management', description: 'Planning to execution under one trusted team.', icon: '🧭' },
  { title: 'Memorable Experiences', description: 'Events guests remember for a lifetime.', icon: '❤️' }
]

const STATS = [
  { label: 'Events Managed', value: '200+' },
  { label: 'Years Experience', value: '10+' },
  { label: 'Happy Clients', value: '100+' },
  { label: 'Expert Team', value: '25+' }
]

const GALLERY_FILTERS = ['All', 'Corporate', 'Private', 'Sports & Adventure', 'Social & Cultural', 'Award Ceremonies', 'Educational']

const GALLERY_ITEMS = [
  {
    title: 'Corporate Stage Night',
    category: 'Corporate',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Premium Wedding Decor',
    category: 'Private',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Leadership Awards Hall',
    category: 'Award Ceremonies',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Celebration Portraits',
    category: 'Social & Cultural',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Adventure Team Event',
    category: 'Sports & Adventure',
    image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Education Seminar Setup',
    category: 'Educational',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80'
  }
]

function HeroBanner({ title, breadcrumb }) {
  return (
    <section className="top-banner">
      <div className="banner-overlay" />
      <div className="banner-content">
        <h2>{title}</h2>
        <p>{breadcrumb}</p>
      </div>
    </section>
  )
}

function CategoryGrid() {
  return (
    <div className="category-grid">
      {EVENT_CATEGORIES.map((item) => (
        <article className="category-card" key={item.title}>
          <img src={item.image} alt={item.title} />
          <div className="category-icon" aria-hidden="true">
            {item.icon}
          </div>
          <h4>{item.title}</h4>
          <p>{item.subtitle}</p>
        </article>
      ))}
    </div>
  )
}

function HomePage({ onNavigate }) {
  return (
    <div className="home-exact">
      <section className="hero-home">
        <div className="hero-copy">
          <p className="eyebrow">We Create. You Celebrate.</p>
          <h1>Crafting Memorable Events That Inspire</h1>
          <p>
            From corporate gatherings to cultural celebrations, we design and execute experiences that leave a
            lasting impression.
          </p>
          <div className="hero-actions">
            <button onClick={() => onNavigate('events')} type="button" className="btn btn-primary">
              Explore Events
            </button>
            <button onClick={() => onNavigate('about')} type="button" className="btn btn-secondary">
              About Us
            </button>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <p>What We Do</p>
          <h3>Our Event Categories</h3>
        </div>
        <div className="home-category-grid">
          {HOME_EVENT_CATEGORIES.map((item) => (
            <article className="home-category-card" key={item.title}>
              <div className="home-category-icon" aria-hidden="true">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.subtitle}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <p>Why Choose Us</p>
          <h3>Your Vision, Perfectly Executed</h3>
        </div>
        <div className="home-value-grid">
          {VALUE_POINTS.map((point) => (
            <article key={point.title} className="home-value-card">
              <span className="home-value-icon" aria-hidden="true">{point.icon}</span>
              <h4>{point.title}</h4>
              <p>{point.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-strip">
        <h3>Let’s Make Your Next Event Unforgettable!</h3>
        <p>Share your ideas with us and we’ll bring them to life.</p>
        <button onClick={() => onNavigate('contact')} type="button" className="btn btn-primary light">
          Get a Free Consultation
        </button>
      </section>
    </div>
  )
}

function AboutPage() {
  return (
    <>
      <HeroBanner title="About Kalacharam Events" breadcrumb="Home > About Us" />
      <section className="section about-layout">
        <div>
          <p className="eyebrow">Who We Are</p>
          <h3>Creating Experiences That Connect People</h3>
          <p>
            Kalacharam Events is a full-service event management company passionate about creating unique,
            meaningful and memorable experiences.
          </p>
          <p>
            With a talented team and a network of trusted partners, we handle every detail with precision and
            creativity.
          </p>
        </div>
        <img
          className="about-image"
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"
          alt="Event hall setup"
        />
      </section>

      <section className="section stats-grid">
        {STATS.map((item) => (
          <article key={item.label} className="stat-card">
            <h4>{item.value}</h4>
            <p>{item.label}</p>
          </article>
        ))}
      </section>

      <section className="section mission-vision">
        <article>
          <p className="eyebrow">Our Mission</p>
          <p>
            To deliver extraordinary events that inspire, engage and leave a lasting impression.
          </p>
        </article>
        <article>
          <p className="eyebrow">Our Vision</p>
          <p>
            To be the most trusted event management partner known for creativity, integrity and excellence.
          </p>
        </article>
      </section>

      <section className="section">
        <div className="section-title">
          <h3>Our Values</h3>
        </div>
        <div className="value-grid">
          <article className="value-card"><span aria-hidden="true">🎨</span><h4>Creativity</h4><p>We bring fresh ideas to life.</p></article>
          <article className="value-card"><span aria-hidden="true">🛡️</span><h4>Integrity</h4><p>We value honesty and transparency.</p></article>
          <article className="value-card"><span aria-hidden="true">⭐</span><h4>Excellence</h4><p>We are committed to highest quality.</p></article>
          <article className="value-card"><span aria-hidden="true">💗</span><h4>Passion</h4><p>We love what we do.</p></article>
        </div>
      </section>
    </>
  )
}

function EventsPage({ onNavigate }) {
  return (
    <>
      <HeroBanner title="Our Events" breadcrumb="Home > Events" />
      <section className="section">
        <div className="section-title">
          <p>Event Categories</p>
          <h3>Explore Our Events</h3>
          <p>
            From corporate conferences to private celebrations, we manage events that create lasting memories.
          </p>
        </div>
        <CategoryGrid />
      </section>

      <section className="cta-strip">
        <h3>Have a Unique Event in Mind?</h3>
        <p>Let’s plan something extraordinary together.</p>
        <button onClick={() => onNavigate('contact')} type="button" className="btn btn-primary light">
          Get a Free Consultation
        </button>
      </section>
    </>
  )
}

function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredItems = useMemo(
    () =>
      GALLERY_ITEMS.filter((item) => {
        if (activeFilter === 'All') return true
        return item.category === activeFilter
      }),
    [activeFilter]
  )

  return (
    <>
      <HeroBanner title="Our Gallery" breadcrumb="Home > Gallery" />
      <section className="section">
        <div className="gallery-filters" role="group" aria-label="Gallery category filters">
          {GALLERY_FILTERS.map((filter) => (
            <button
              type="button"
              key={filter}
              className={`filter-pill ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredItems.map((item) => (
            <article key={item.title} className="gallery-card">
              <img src={item.image} alt={item.title} />
              <div className="gallery-caption">
                <h4>{item.title}</h4>
                <p>{item.category}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Corporate Events',
    message: ''
  })
  const [submitState, setSubmitState] = useState('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitState('sending')
    setSubmitMessage('')

    if (!CONTACT_API_URL) {
      setSubmitState('error')
      setSubmitMessage('Contact form is not configured yet. Please set VITE_CONTACT_API_URL.')
      return
    }

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'text/plain;charset=UTF-8'
        },
        body: JSON.stringify(form)
      })

      const responseText = await response.text()
      let payload = {}

      try {
        payload = responseText ? JSON.parse(responseText) : {}
      } catch {
        payload = { message: responseText }
      }

      if (!response.ok || payload.ok === false) {
        throw new Error(payload.details || payload.error || 'Unable to send message')
      }

      setSubmitState('success')
      setSubmitMessage('Thanks! Your message has been sent successfully.')
      setForm({ name: '', email: '', phone: '', eventType: 'Corporate Events', message: '' })
    } catch (error) {
      setSubmitState('error')
      setSubmitMessage(error instanceof Error && error.message ? error.message : 'Unable to send right now. Please try again in a moment.')
    }
  }

  return (
    <>
      <HeroBanner title="Contact Us" breadcrumb="Home > Contact Us" />
      <section className="section contact-layout">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Let’s Plan Your Next Event</h3>
          <p>Share your requirements and our team will get back to you shortly.</p>
          <div className="form-grid">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address" type="email" required />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required />
            <select name="eventType" value={form.eventType} onChange={handleChange}>
              {EVENT_CATEGORIES.map((item) => (
                <option key={item.title}>{item.title}</option>
              ))}
            </select>
          </div>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            placeholder="Tell us about your event"
            required
          />
          <button className="btn btn-primary" type="submit" disabled={submitState === 'sending'}>
            {submitState === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
          {submitState === 'success' && <p className="success-note">{submitMessage}</p>}
          {submitState === 'error' && <p className="error-note">{submitMessage}</p>}
        </form>

        <aside className="contact-info">
          <h3>Get In Touch</h3>
          <p>📞 +91 98765 43210</p>
          <p>✉️ {CONTACT_DISPLAY_EMAIL}</p>
          <p>📍 Bengaluru, India</p>
          <h4>Follow Us</h4>
          <p>Facebook · Instagram · LinkedIn · YouTube</p>
        </aside>
      </section>
    </>
  )
}

function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-columns">
        <div>
          <h4>Kalacharam Events</h4>
          <p>
            We design and deliver exceptional events that inspire, engage and create lasting memories.
          </p>
        </div>
        <div>
          <h5>Quick Links</h5>
          <ul>
            <li><button onClick={() => onNavigate('home')} type="button">Home</button></li>
            <li><button onClick={() => onNavigate('about')} type="button">About Us</button></li>
            <li><button onClick={() => onNavigate('events')} type="button">Events</button></li>
            <li><button onClick={() => onNavigate('gallery')} type="button">Gallery</button></li>
            <li><button onClick={() => onNavigate('contact')} type="button">Contact</button></li>
          </ul>
        </div>
        <div>
          <h5>Event Categories</h5>
          <ul>
            {EVENT_CATEGORIES.map((item) => (
              <li key={item.title}>{item.title}</li>
            ))}
          </ul>
        </div>
        <div>
          <h5>Contact Us</h5>
          <p>+91 98765 43210</p>
          <p>{CONTACT_DISPLAY_EMAIL}</p>
          <p>Bengaluru, India</p>
          <button onClick={() => onNavigate('contact')} type="button" className="btn btn-secondary footer-btn">
            Get In Touch
          </button>
        </div>
      </div>
      <p className="footer-copy">© 2026 Kalacharam Events. All Rights Reserved.</p>
    </footer>
  )
}

function ProcessPage() {
  return (
    <section className="section">
      <div className="section-title">
        <h3>Our Process</h3>
        <p>A streamlined four-step process to take your event from idea to applause.</p>
      </div>
      <div className="process-grid">
        <article><h4>1. Discovery</h4><p>We understand your goals, audience and outcomes.</p></article>
        <article><h4>2. Planning</h4><p>We build concepts, timelines, venue and vendor plans.</p></article>
        <article><h4>3. Execution</h4><p>Our team manages every detail during the event.</p></article>
        <article><h4>4. Wrap-up</h4><p>We gather feedback, insights and celebrate success.</p></article>
      </div>
    </section>
  )
}

function App() {
  const [page, setPage] = useState('home')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const nextPage = params.get('page')
    if (nextPage && PAGES.includes(nextPage)) {
      setPage(nextPage)
    }
  }, [])

  const navigate = (nextPage) => {
    setPage(nextPage)
    const params = new URLSearchParams(window.location.search)
    params.set('page', nextPage)
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <button type="button" className="brand" onClick={() => navigate('home')}>
          <img src={logoUrl} alt="Kalacharam Events" className="brand-logo" />
          <div>
            <strong>Kalacharam</strong>
            <span>EVENTS</span>
          </div>
        </button>

        <nav className="site-nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              type="button"
              className={item.key === page ? 'active' : ''}
              onClick={() => navigate(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button type="button" className="btn btn-primary nav-cta" onClick={() => navigate('contact')}>
          Get In Touch
        </button>
      </header>

      <main>
        {page === 'home' && (
          <HomePage onNavigate={navigate} />
        )}
        {page === 'about' && <AboutPage />}
        {page === 'events' && <EventsPage onNavigate={navigate} />}
        {page === 'gallery' && <GalleryPage />}
        {page === 'process' && <ProcessPage />}
        {page === 'contact' && <ContactPage />}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  )
}

export default App
