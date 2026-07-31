import { useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import logoUrl from '/logo.svg'

const PAGES = [
  'home',
  'about',
  'events',
  'process',
  'contact',
  'privacy',
  'terms',
  'service-wedding-planning-chennai',
  'service-corporate-event-management-chennai',
  'service-cultural-events',
  'service-award-ceremonies',
  'event-talent-platform',
  'event-fashion-choreo',
  'event-literary-curation',
  'event-corporate-cultural',
  'event-corporate-festival',
  'event-corporate-fashion',
  'event-corporate-annual',
  'event-corporate-awards',
  'event-children-excellence-awards',
  'event-school-sports-ceremonies'
]
const CONTACT_DISPLAY_EMAIL = 'kalacharamevents@gmail.com'
const CONTACT_PHONE_DISPLAY = '+91 99403 18440'
const CONTACT_PHONE_LINK = 'tel:+919940318440'
const CONTACT_WHATSAPP_NUMBER = '919940318440'
const CONTACT_WHATSAPP_URL = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Kalacharam Events, I would like to discuss an event.')}`
const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL

const NAV_ITEMS = [
  { key: 'home', label: 'Home' },
  { key: 'about', label: 'About Us' },
  { key: 'contact', label: 'Contact' }
]

const EVENT_CATEGORIES = [
  {
    title: 'Corporate Events',
    subtitle: 'Conferences, Seminars, Product Launches',
    icon: 'mic',
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Private Events',
    subtitle: 'Weddings, Birthdays, Family Celebrations',
    icon: 'ring',
    image:
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Sports & Adventure',
    subtitle: 'Tournaments, Team Building, Outdoor Events',
    icon: 'award',
    image:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Social & Cultural',
    subtitle: 'Festivals, Community Events, Cultural Nights',
    icon: 'music',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Award Ceremonies',
    subtitle: 'Corporate Awards, Recognition Events',
    icon: 'medal',
    image:
      'https://images.unsplash.com/photo-1560523159-4a9692d222f9?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Educational Events',
    subtitle: 'Workshops, Training Sessions, College Events',
    icon: 'education',
    image:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80'
  }
]

const HOME_EVENT_CATEGORIES = [
  {
    title: 'Corporate Events',
    subtitle: 'Conferences, Seminars, Product Launches, Awards and more.',
    icon: 'corporate'
  },
  {
    title: 'Private Events',
    subtitle: 'Weddings, Birthdays, Family Anniversaries and special occasions.',
    icon: 'festival'
  },
  {
    title: 'Sports & Adventure',
    subtitle: 'Tournaments, Adventure Trips and Outdoor Team Building.',
    icon: 'award'
  },
  {
    title: 'Social & Cultural',
    subtitle: 'Festivals, Community Events, Charity Events and celebrations.',
    icon: 'cultural'
  },
  {
    title: 'Award Ceremonies',
    subtitle: 'Corporate Awards, Recognition Events and gala nights.',
    icon: 'medal'
  },
  {
    title: 'Educational Events',
    subtitle: 'Workshops, Training Sessions, School and College events.',
    icon: 'education'
  }
]

const VALUE_POINTS = [
  { title: 'Expert Team', description: 'Experienced professionals with precision and care.', icon: 'team' },
  { title: 'Creative Concepts', description: 'Unique ideas and stories tailored to your vision.', icon: 'idea' },
  { title: 'End-to-End Management', description: 'Planning to execution under one trusted team.', icon: 'compass' },
  { title: 'Memorable Experiences', description: 'Events guests remember for a lifetime.', icon: 'heart' }
]

const STATS = [
  { label: 'Events Managed', value: '200+' },
  { label: 'Years Experience', value: '10+' },
  { label: 'Happy Clients', value: '100+' },
  { label: 'Expert Team', value: '25+' }
]

const TRUST_VENUES = [
  'ITC Grand Chola',
  'Taj Coromandel',
  'The Leela Palace',
  'Chennai Trade Centre',
  'Private Estate Venues'
]

const PRIMARY_SERVICES = [
  {
    title: 'Weddings and private celebrations',
    description: 'Multi-day wedding planning, design, and seamless family-focused guest hospitality.',
    pageKey: 'service-wedding-planning-chennai',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80&fm=webp'
  },
  {
    title: 'Corporate events and brand experiences',
    description: 'Leadership events, annual galas, partner meets, and brand moments with executive polish.',
    pageKey: 'service-corporate-event-management-chennai',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80&fm=webp'
  },
  {
    title: 'Cultural and community events',
    description: 'Heritage-led festivals and public celebrations produced with safety, flow, and visual impact.',
    pageKey: 'service-cultural-events',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80&fm=webp'
  }
]

const SECONDARY_SPECIALTIES = ['Sports events', 'Award ceremonies', 'Educational events']

const SERVICE_PAGES = [
  {
    key: 'service-wedding-planning-chennai',
    slug: '/services/wedding-planning-chennai',
    title: 'Wedding Planning in Chennai',
    intro:
      'Bespoke wedding and private celebration planning with design-first storytelling, trusted vendors, and seamless guest hospitality.',
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=80&fm=webp',
    services: [
      'Concept and décor direction',
      'Venue sourcing and walkthrough planning',
      'Guest hospitality and logistics management',
      'Ritual timeline orchestration',
      'Entertainment, stage, and production control'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80&fm=webp',
      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1400&q=80&fm=webp',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=80&fm=webp'
    ],
    process: ['Discovery call', 'Style + budget blueprint', 'Vendor and production planning', 'Execution and closure'],
    faqs: [
      {
        q: 'How early should we start wedding planning?',
        a: 'For premium venues and curated vendors, we recommend starting 6–12 months in advance.'
      },
      {
        q: 'Do you manage destination weddings outside Chennai?',
        a: 'Yes. We plan both Chennai-based and destination weddings with complete logistics support.'
      }
    ],
  },
  {
    key: 'service-corporate-event-management-chennai',
    slug: '/services/corporate-event-management-chennai',
    title: 'Corporate Event Management in Chennai',
    intro:
      'Executive-grade corporate event strategy and production for annual meetings, leadership summits, launches, and brand experiences.',
    heroImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1800&q=80&fm=webp',
    services: [
      'Leadership and annual event architecture',
      'Brand and sponsor integration',
      'Stage scripting, AV, and show-calling',
      'VIP protocol and hospitality desks',
      'Post-event highlights and recap support'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80&fm=webp',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1400&q=80&fm=webp',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=80&fm=webp'
    ],
    process: ['Objective mapping', 'Show flow + run-of-show', 'Technical and vendor rehearsals', 'Live event command center'],
    faqs: [
      {
        q: 'Can you align events with our brand and leadership narrative?',
        a: 'Absolutely. We build the event narrative around your brand priorities, audience, and executive outcomes.'
      },
      {
        q: 'Do you handle large guest counts?',
        a: 'Yes. Our operational model is built for both boutique executive gatherings and high-volume corporate audiences.'
      }
    ],
  },
  {
    key: 'service-cultural-events',
    slug: '/services/cultural-events',
    title: 'Cultural and Community Events',
    intro:
      'Culture-led event design that blends authenticity, public participation, and disciplined production for high-impact celebrations.',
    heroImage: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1800&q=80&fm=webp',
    services: [
      'Theme and heritage concept curation',
      'Artist and performance programming',
      'Public crowd flow and safety planning',
      'Sponsor and community engagement zones',
      'Stage operations and timed segment control'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80&fm=webp',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80&fm=webp',
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1400&q=80&fm=webp'
    ],
    process: ['Cultural brief alignment', 'Programming + zoning design', 'Rehearsals + operations prep', 'On-ground direction and closure'],
    faqs: [
      {
        q: 'Can you produce both corporate cultural days and public festivals?',
        a: 'Yes. We support both private corporate cultural formats and large community festival models.'
      },
      {
        q: 'How do you handle safety for large gatherings?',
        a: 'We prepare movement corridors, timed segment plans, and contingency workflows for high-footfall events.'
      }
    ],
  },
  {
    key: 'service-award-ceremonies',
    slug: '/services/award-ceremonies',
    title: 'Award Ceremonies',
    intro:
      'Prestige-focused award ceremony planning for corporates, institutions, and community platforms with transparent, elegant delivery.',
    heroImage: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1800&q=80&fm=webp',
    services: [
      'Category and recognition flow design',
      'Nominee and winner reveal sequencing',
      'Presenter scripting and cue management',
      'Stage design, lighting, and AV production',
      'Photography and memory-spot moments'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1400&q=80&fm=webp',
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1400&q=80&fm=webp',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=80&fm=webp'
    ],
    process: ['Awards strategy', 'Nominee + protocol planning', 'Show-flow rehearsals', 'Ceremony execution'],
    faqs: [
      {
        q: 'Can you support internal corporate awards and public award nights?',
        a: 'Yes. We design both private recognition events and public-facing award formats.'
      },
      {
        q: 'Do you provide stage and AV management?',
        a: 'Yes, including cues, presenter flow, winner walk-ins, and complete audiovisual direction.'
      }
    ],
  }
]

const SERVICE_PAGE_MAP = Object.fromEntries(SERVICE_PAGES.map((item) => [item.key, item]))
const SERVICE_SLUG_TO_KEY = Object.fromEntries(SERVICE_PAGES.map((item) => [item.slug, item.key]))

const HOW_KALACHARAM_WORKS = [
  { title: 'Discover', description: 'We align on your event goals, audience, and success criteria.' },
  { title: 'Design', description: 'Creative concept, venue mood boards, and guest experience mapping.' },
  { title: 'Produce', description: 'Vendor curation, production planning, timelines, and rehearsal control.' },
  { title: 'Deliver', description: 'On-ground execution with hospitality, precision, and post-event closure.' }
]

const EVENT_FILM = {
  title: 'Celebration design inspiration',
  image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1800&q=80&fm=webp'
}

const HERO_MEDIA = {
  image:
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2200&q=80&fm=webp'
}

const IMMERSIVE_MEDIA = {
  image:
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2200&q=80&fm=webp'
}

const PORTFOLIO_FILTERS = ['All', 'Weddings', 'Corporate Galas', 'Cultural Festivals']

const PORTFOLIO_ITEMS = [
  {
    title: 'Destination Wedding Experience',
    category: 'Weddings',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80&fm=webp',
    conceptBrief: 'A multi-day celebration blending traditional ceremonies with contemporary guest hospitality.',
    capabilities: ['Wedding design direction', 'Vendor and logistics planning', 'Hospitality and guest concierge'],
    designDirection: 'Temple-inspired floral architecture in ivory, marigold and antique gold.',
    productionConsiderations: 'Ritual sequencing, weather contingencies and transitions between event settings.'
  },
  {
    title: 'Executive Leadership Gala Night',
    category: 'Corporate Galas',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80&fm=webp',
    conceptBrief: 'A leadership gathering focused on recognition, brand storytelling and partner hosting.',
    capabilities: ['Show-flow development', 'AV and lighting production', 'Protocol and VIP movement planning'],
    designDirection: 'A cinematic black-and-gold stage with lounge-style networking zones.',
    productionConsiderations: 'Speaker timing, award sequencing and coordinated technical cues.'
  },
  {
    title: 'Cultural Heritage Evening',
    category: 'Cultural Festivals',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80&fm=webp',
    conceptBrief: 'A heritage-led celebration integrating regional performances and sponsor experiences.',
    capabilities: ['Creative curation', 'Artist programming', 'Crowd-flow and sponsor-zone planning'],
    designDirection: 'A South Indian festival streetscape with layered lighting and live-art stations.',
    productionConsiderations: 'Entry sequencing, outdoor staging and weather-risk planning.'
  },
  {
    title: 'Luxury Multi-Day Wedding Production',
    category: 'Weddings',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=80&fm=webp',
    conceptBrief: 'A welcome, mehendi, sangeet and reception coordinated under one production plan.',
    capabilities: ['End-to-end planning', 'Guest-journey design', 'Décor and experiential styling'],
    designDirection: 'A sunset-garden palette with floral pathways and live-music moments.',
    productionConsiderations: 'Set changes, catering movement and coordination across multiple event zones.'
  },
  {
    title: 'Annual Corporate Awards Gala',
    category: 'Corporate Galas',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80&fm=webp',
    conceptBrief: 'A recognition-led awards format with executive speeches, category reveals and entertainment.',
    capabilities: ['Awards-format design', 'Stage management', 'Broadcast-ready show production'],
    designDirection: 'A prestige-led visual identity with dramatic reveal cues and gold textures.',
    productionConsiderations: 'Presenter cues, winner logistics and real-time coordination with media teams.'
  },
  {
    title: 'Community Festival Signature Stage',
    category: 'Cultural Festivals',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80&fm=webp',
    conceptBrief: 'A community-first celebration combining performances, family experiences and sponsor visibility.',
    capabilities: ['Festival zoning and safety planning', 'Programme management', 'Vendor and sponsor coordination'],
    designDirection: 'A colourful stage identity supported by artisan and family-activity zones.',
    productionConsiderations: 'Queue management, audience circulation and continuous multi-stage programming.'
  }
]

const BUDGET_OPTIONS = ['₹5L - ₹10L', '₹10L - ₹25L', '₹25L - ₹50L', '₹50L - ₹1Cr', '₹1Cr+']

const SERVICE_OPTIONS = [
  'Full event planning',
  'Venue and hospitality',
  'Design and décor',
  'Production and AV',
  'Artist and entertainment',
  'Guest experience and concierge'
]

function iconNameFromItem(icon, title = '') {
  if (typeof icon === 'string' && /^[a-z-]+$/.test(icon)) {
    return icon
  }

  const normalized = title.toLowerCase()

  if (normalized.includes('wedding') || normalized.includes('private')) return 'ring'
  if (normalized.includes('corporate')) return 'corporate'
  if (normalized.includes('festival') || normalized.includes('cultural')) return 'cultural'
  if (normalized.includes('award')) return 'award'
  if (normalized.includes('sports')) return 'medal'
  if (normalized.includes('fashion')) return 'fashion'
  if (normalized.includes('literary') || normalized.includes('script')) return 'script'

  return 'spark'
}

function LuxuryIcon({ name }) {
  switch (name) {
    case 'team':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="16" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4.5 19c.2-2.6 1.9-4.2 4.5-4.2S13.3 16.4 13.5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M10.5 19c.2-2.1 1.5-3.3 3.5-3.3s3.3 1.2 3.5 3.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'mic':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="9" y="4" width="6" height="9" rx="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M6.5 10.5A5.5 5.5 0 0 0 12 16a5.5 5.5 0 0 0 5.5-5.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 16v4M9 20h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'corporate':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 8V6.7A2.3 2.3 0 0 1 11.3 4.4h1.4A2.3 2.3 0 0 1 15 6.7V8" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 13h18" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )
    case 'ring':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="14" r="5.3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 3.5l2.4 2.4L12 8.3 9.6 5.9 12 3.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      )
    case 'award':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 4h10v3a5 5 0 1 1-10 0V4z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 12v4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 20h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'music':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 6v10.2a2.4 2.4 0 1 1-1.6-2.3V7.6L18 5v8.2a2.4 2.4 0 1 1-1.6-2.3V6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'medal':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="14" r="4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 4h2l1 4 1-4h2l-1.8 5.2h-2.4L9 4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      )
    case 'cultural':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 18h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M8 18V9l4-4 4 4v9" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M10 12h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'education':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9.5L12 5l9 4.5-9 4.5-9-4.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M7 11.5V15c0 1.7 2.2 3 5 3s5-1.3 5-3v-3.5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )
    case 'idea':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4a6 6 0 0 0-3.8 10.6c.7.6 1.2 1.4 1.3 2.3h5c.1-.9.6-1.7 1.3-2.3A6 6 0 0 0 12 4z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9.5 20h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'compass':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
          <path d="M15.8 8.2l-2.4 7.6-7.6 2.4 2.4-7.6 7.6-2.4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      )
    case 'heart':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 20s-7-4.3-7-9.3C5 7.8 7 6 9.6 6c1.5 0 2.6.7 3.4 1.9.8-1.2 2-1.9 3.4-1.9C19 6 21 7.8 21 10.7 21 15.7 12 20 12 20z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      )
    case 'venue':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 20h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M6 20v-7h3v7M11 20v-7h2v7M15 20v-7h3v7" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 10l8-5 8 5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      )
    case 'star':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4.6l2.2 4.4 4.9.7-3.6 3.5.9 4.9L12 15.8 7.6 18l.9-4.9-3.6-3.5 4.9-.7L12 4.6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      )
    case 'fashion':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 4l3 2 3-2 2 3-2 2v10H9V9L7 7l2-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      )
    case 'script':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 4h8a2 2 0 0 1 2 2v12l-4-2-4 2V6a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M8 4a2 2 0 0 0-2 2v12" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )
    case 'festival':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 8h16" stroke="currentColor" strokeWidth="1.6" />
          <path d="M6 8l2-4h8l2 4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <rect x="5" y="8" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )
    case 'calendar':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="6" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 4v4M16 4v4M4 10h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4v4M12 16v4M4 12h4M16 12h4M6.5 6.5l2.8 2.8M14.7 14.7l2.8 2.8M17.5 6.5l-2.8 2.8M9.3 14.7l-2.8 2.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
  }
}

const PACKAGE_TIERS = [
  {
    title: 'Signature',
    subtitle: 'Focused planning for intimate, design-led occasions',
    details: [
      ['Ideal event size', 'Up to 150 guests'],
      ['Typical planning period', '6–12 weeks'],
      ['Creative involvement', 'A refined concept with styling direction for key guest moments'],
      ['Vendor & venue coordination', 'Core venue and essential vendor coordination'],
      ['Production coverage', 'Essential sound, lighting, stage and show-flow oversight'],
      ['Hospitality coverage', 'Host-family coordination and guest arrival support']
    ],
    additions: 'Entertainment, photography, invitation management and additional hospitality desks'
  },
  {
    title: 'Grand',
    subtitle: 'Comprehensive coordination for larger, high-impact celebrations',
    details: [
      ['Ideal event size', '150–500 guests'],
      ['Typical planning period', '3–6 months'],
      ['Creative involvement', 'Full event concept, spatial styling and guest-experience design'],
      ['Vendor & venue coordination', 'End-to-end venue, vendor and entertainment management'],
      ['Production coverage', 'Full production crew, technical planning, rehearsals and live show-calling'],
      ['Hospitality coverage', 'Guest help desk, RSVP support and VIP movement planning']
    ],
    additions: 'Multi-day functions, artist management, transport, accommodation and branded content'
  },
  {
    title: 'Legacy',
    subtitle: 'Bespoke creative direction for complex or destination experiences',
    details: [
      ['Ideal event size', '500+ guests or multi-day events'],
      ['Typical planning period', '6–12+ months'],
      ['Creative involvement', 'Original event narrative, creative direction and immersive experience design'],
      ['Vendor & venue coordination', 'Multi-venue, destination and specialist partner coordination'],
      ['Production coverage', 'Dedicated production leadership, advanced technical design and complete show control'],
      ['Hospitality coverage', 'Full guest journey, travel, accommodation, concierge and VIP protocol']
    ],
    additions: 'Cinematic content, custom installations, celebrity talent, security and destination logistics'
  }
]


const EVENT_DETAIL_PAGES = [
  {
    key: 'event-weddings-marriages',
    title: 'Weddings & Marriages',
    icon: 'ring',
    summary:
      'Luxury wedding planning and execution from intimate ceremonies to multi-day destination celebrations with flawless guest experience.',
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80&fm=webp',
    sections: [
      {
        heading: 'Design-Led Wedding Storytelling',
        text:
          'Every wedding we curate begins with a narrative: your families, traditions, and celebration style. We build mood boards, décor concepts, and ceremony flows that blend elegance with emotional authenticity. From haldi and mehendi to reception and after-party sequencing, every chapter is choreographed to feel timeless and cinematic.',
        image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80&fm=webp'
      },
      {
        heading: 'Production, Hospitality & Guest Comfort',
        text:
          'A luxury wedding is remembered by how smoothly it feels. We manage vendor orchestration, backstage cues, family protocol, and VIP guest pathways with precision. The result is a stress-free celebration where hosts remain present in every special moment while operations run invisibly in the background.',
        image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1200&q=80&fm=webp'
      }
    ]
  },
  {
    key: 'event-corporate-galas',
    title: 'Corporate Galas',
    icon: 'venue',
    summary:
      'High-prestige corporate evenings crafted for leadership presence, brand storytelling, recognition, and business hospitality excellence.',
    heroImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80&fm=webp',
    sections: [
      {
        heading: 'Executive-Grade Gala Architecture',
        text:
          'Corporate galas demand strategic precision and visual sophistication. We structure welcome experiences, keynote timelines, awards blocks, entertainment windows, and sponsor integrations so each segment reinforces your brand narrative. This architecture helps leadership communicate vision while keeping guests deeply engaged.',
        image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1200&q=80&fm=webp'
      },
      {
        heading: 'Reputation-Driven Event Delivery',
        text:
          'From stagecraft and lighting design to protocol management and premium dining flow, every layer is managed with hospitality-first discipline. We ensure that partners, clients, and internal teams experience your brand at its most refined, credible, and memorable standard.',
        image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80&fm=webp'
      }
    ]
  },
  {
    key: 'event-cultural-festivals',
    title: 'Cultural Festivals',
    icon: 'cultural',
    summary:
      'Immersive festival productions blending heritage, performance, community emotion, and world-class event operations.',
    heroImage: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80&fm=webp',
    sections: [
      {
        heading: 'Heritage-Centered Creative Direction',
        text:
          'Cultural festivals are at their best when tradition is presented with modern production finesse. We curate thematic décor, folk and contemporary performance layering, and narrative stage transitions that preserve authenticity while amplifying audience impact.',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80&fm=webp'
      },
      {
        heading: 'Large-Crowd Flow & Experience Management',
        text:
          'Festival environments require robust operational systems—crowd direction, safety corridors, timed programming, and vendor orchestration. Our execution model ensures the event remains vibrant and emotionally rich while maintaining comfort, safety, and continuity for attendees across all age groups.',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80&fm=webp'
      }
    ]
  },
  {
    key: 'event-stage-shows-concerts',
    title: 'Stage Shows & Concerts',
    icon: 'mic',
    summary:
      'Electrifying stage-led experiences with high-energy show direction, artist coordination, and cinematic audio-visual production.',
    heroImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80&fm=webp',
    sections: [
      {
        heading: 'Show Direction & Performance Sequencing',
        text:
          'We design concert narratives with strong pacing—opening impact, momentum lifts, audience participation moments, and grand finale closure. Every cue, from artist walk-ins to visual transitions, is synchronized to sustain energy and keep the crowd emotionally connected throughout the performance arc.',
        image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80&fm=webp'
      },
      {
        heading: 'Technical Mastery for Live Impact',
        text:
          'Stage shows depend on flawless sound, light, and timing. Our team handles FOH coordination, monitor planning, effect sequencing, and stage safety systems to ensure performers and audiences enjoy a seamless, immersive live experience with premium production polish.',
        image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80&fm=webp'
      }
    ]
  },
  {
    key: 'event-talent-platform',
    title: 'Talent Platform & Runway Showcases',
    icon: 'star',
    summary:
      'A discovery-first event format that provides structured stage opportunities for emerging performers, anchors, and fashion talent.',
    heroImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80',
    sections: [
      {
        heading: 'Concept & Talent Discovery Framework',
        text:
          'We begin by defining your discovery objective: fresh talent discovery, youth engagement, institution branding, or sponsor-led community activation. Our team designs transparent audition rounds, category mapping, and skill-specific evaluation criteria so participants know exactly how they are assessed. This structure creates credibility for your platform and ensures every shortlisted performer enters the showcase with confidence and clarity.',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80'
      },
      {
        heading: 'Runway & Stage Experience Design',
        text:
          'From entry tunnels and backstage movement plans to spotlight cues and emcee transitions, we build an event flow that feels premium and cinematic. Participants are guided through rehearsals, safety briefings, and timing rehearsals, while audiences experience a seamless progression of acts. The result is a stage where emerging talent gets noticed and your organization earns recognition for professional event quality.',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  {
    key: 'event-fashion-choreo',
    title: 'Choreographic Fashion Events',
    icon: 'fashion',
    summary:
      'A polished fashion format that blends runway presentation, movement choreography, curated music, and narration for all age groups.',
    heroImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80',
    sections: [
      {
        heading: 'Story-Driven Fashion Direction',
        text:
          'Rather than a sequence of disconnected walks, we design each segment as a visual story. Themes, color palettes, attire categories, and model flow are choreographed to maintain narrative continuity. This approach helps brands and designers communicate identity while keeping audience attention high from opening frame to finale reveal.',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80'
      },
      {
        heading: 'Production Control & Audience Impact',
        text:
          'We coordinate backstage teams, cue operators, sound engineers, and anchors through an integrated run sheet. Voice-over transitions and music dynamics are synchronized with ramp entries, spotlight positions, and camera-friendly moments. The outcome is a fashion event that feels editorial, energetic, and highly memorable for guests, sponsors, and digital viewers.',
        image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  {
    key: 'event-literary-curation',
    title: 'Literary Concept Curation & Scripted Hosting',
    icon: 'script',
    summary:
      'Editorial and language-rich support for events that require thoughtful scripting, polished communication, and meaningful stage narration.',
    heroImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80',
    sections: [
      {
        heading: 'Narrative Architecture for Events',
        text:
          'We build your event narrative from purpose to closure: opening statements, segment transitions, dignitary introductions, recognition notes, and closing reflections. This narrative architecture makes your event sound coherent, intelligent, and intentional. It is especially valuable for conferences, knowledge summits, policy events, literary forums, and institution-led ceremonies.',
        image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80'
      },
      {
        heading: 'Anchor Scripts, Voice Strategy & Stage Tone',
        text:
          'Our team prepares multilingual-friendly, audience-sensitive scripts with clear pronunciation cues and flexible improvised bridges. We train anchors on delivery rhythm and emotional emphasis, ensuring the event feels fluent and authentic. The final output is a stage voice that reflects your values and elevates the perceived quality of the entire program.',
        image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  {
    key: 'event-corporate-cultural',
    title: 'Corporate Cultural Events',
    icon: 'cultural',
    summary:
      'Culture-led corporate experiences that strengthen belonging, celebrate diversity, and align teams through meaningful entertainment.',
    heroImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1600&q=80',
    sections: [
      {
        heading: 'Cultural Programming with Brand Relevance',
        text:
          'We map cultural performances to your organization’s values, milestones, and workforce demographics. Program design can include regional storytelling, employee-led creative blocks, and professionally curated stage segments. This keeps the event emotionally resonant while maintaining brand relevance and audience inclusivity.',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80'
      },
      {
        heading: 'Execution Discipline for Large Teams',
        text:
          'Corporate cultural events involve complex coordination—participant rehearsals, protocol management, guest movements, and sponsor visibility. Our operations team handles schedules, backstage coordination, and contingency workflows so your HR, admin, and leadership teams can focus on people engagement instead of logistics.',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  {
    key: 'event-corporate-festival',
    title: 'Corporate Festival Events',
    icon: 'festival',
    summary:
      'Festival-inspired corporate experiences with décor themes, employee participation formats, and family-friendly celebration moments.',
    heroImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1600&q=80',
    sections: [
      {
        heading: 'Theme, Décor & Experience Zoning',
        text:
          'Festival events are strongest when atmosphere and movement are carefully planned. We create themed spaces—welcome arc, stage zone, activity islands, photo points, and dining flow—to guide participation naturally. Every visual element is curated to feel celebratory yet brand-safe, helping teams feel festive without compromising professionalism.',
        image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80'
      },
      {
        heading: 'Engagement Modules & Family Inclusion',
        text:
          'From live performances and games to curated employee showcases and kid-friendly stations, we design modules that invite participation across age groups. This format works exceptionally well for annual festive calendars and family days where emotional recall and community feeling matter as much as production quality.',
        image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  {
    key: 'event-corporate-fashion',
    title: 'Corporate Fashion Events',
    icon: 'spark',
    summary:
      'Premium corporate showcases built around style, branding, confidence, and high-impact stage presentation.',
    heroImage: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80',
    sections: [
      {
        heading: 'Brand-Led Fashion Positioning',
        text:
          'We design corporate fashion events as brand narratives rather than standalone entertainment segments. Theme boards, wardrobe styling logic, and movement plans are aligned to your audience profile and brand image. This makes the event valuable not only for attendees in the room, but also for content marketing and digital storytelling.',
        image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80'
      },
      {
        heading: 'Runway Precision & Visual Production',
        text:
          'Our team synchronizes lighting, music, stage entries, and presenter cues to create a smooth premium experience. We integrate sponsor placements, brand moments, and curated transitions so every minute contributes to a cohesive visual identity. The result is a sophisticated event that is both elegant on-site and camera-ready for post-event distribution.',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  {
    key: 'event-corporate-annual',
    title: 'Corporate Annual Events',
    icon: 'calendar',
    summary:
      'Strategic annual gatherings that celebrate achievements, align teams, and communicate future direction with impact.',
    heroImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80',
    sections: [
      {
        heading: 'Annual Narrative & Leadership Moments',
        text:
          'Annual events are milestones in an organization’s journey. We design the flow to highlight achievements, recognize contributors, and communicate leadership direction clearly. Structured storytelling, visual recaps, and speaker sequencing are crafted to maintain momentum and ensure every segment reinforces the year’s purpose and the next year’s ambition.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80'
      },
      {
        heading: 'Celebration, Recognition & Closure',
        text:
          'Beyond formal speeches, we build moments of celebration that teams genuinely remember—awards, entertainment interludes, gratitude segments, and finale experiences. This balance of professional structure and emotional payoff creates stronger employee alignment and a more meaningful close to the annual cycle.',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  {
    key: 'event-corporate-awards',
    title: 'Corporate Awards Events',
    icon: 'award',
    summary:
      'Recognition ceremonies designed to honour excellence with prestige, fairness, and unforgettable stage moments.',
    heroImage: 'https://images.unsplash.com/photo-1560523159-4a9692d222f9?auto=format&fit=crop&w=1600&q=80',
    sections: [
      {
        heading: 'Credible Awards Architecture',
        text:
          'A great awards night begins long before stage lights turn on. We assist with category design, nominee flow, shortlisting structure, and reveal sequencing so recognition feels transparent and meaningful. This foundational design builds trust across teams and amplifies the value of each honour conferred.',
        image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80'
      },
      {
        heading: 'Ceremony Experience & Prestige Delivery',
        text:
          'On event day, our focus is on ceremony rhythm—presenter movement, audiovisual cues, winner walk-ins, and acceptance-time management. We shape each award moment to feel cinematic and emotionally resonant while keeping the overall event efficient. The final experience celebrates excellence and elevates your organization’s recognition culture.',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  {
    key: 'event-children-excellence-awards',
    title: 'Corporate Children’s Excellence Awards',
    icon: 'medal',
    summary:
      'A warm, structured recognition format celebrating children’s achievements in academics, sports, arts, and leadership.',
    heroImage: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1600&q=80',
    sections: [
      {
        heading: 'Child-Centered Program Design',
        text:
          'We create an encouraging environment where children feel celebrated and confident. Program pacing, stage instructions, waiting-area comfort, and family seating are planned around child psychology and parent convenience. This makes the event joyful, smooth, and stress-free for schools, sponsors, and participating families.',
        image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=80'
      },
      {
        heading: 'Recognition with Emotional Value',
        text:
          'Each recognition moment is thoughtfully designed—category narration, achievement highlights, and photo-ready stage moments—to honour effort as much as outcome. We combine discipline and warmth so the ceremony remains professional while preserving the excitement and pride that children and families carry home.',
        image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  {
    key: 'event-school-sports-ceremonies',
    title: 'School Sports Opening & Closing Ceremonies',
    icon: 'medal',
    summary:
      'High-energy sports ceremony production that sets the tone at launch and delivers an inspiring finale at closure.',
    heroImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1600&q=80',
    sections: [
      {
        heading: 'Opening Ceremony Impact',
        text:
          'For opening ceremonies, we structure athlete parades, school contingents, oaths, torch moments, and performance segments into one disciplined celebratory flow. Audience visibility, announcer timing, music transitions, and protocol sequences are aligned to ensure the event launches with pride, order, and excitement.',
        image: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1200&q=80'
      },
      {
        heading: 'Closing Ceremony Legacy',
        text:
          'Closing ceremonies are crafted as legacy moments—winners’ recognition, gratitude acknowledgements, highlight retrospectives, and symbolic closure. We handle ceremony mechanics with precision while preserving the emotional energy of achievement and teamwork. The final experience leaves students, parents, and institutions with a strong sense of accomplishment.',
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  }
]

const EVENT_PAGE_MAP = Object.fromEntries(EVENT_DETAIL_PAGES.map((item) => [item.key, item]))

const EVENT_DROPDOWN_ITEMS = [
  { key: 'events', label: 'All Events Overview' },
  ...EVENT_DETAIL_PAGES.map((item) => ({ key: item.key, label: item.title }))
]

const EVENTS_MENU_LONGREAD = [
  {
    title: 'Talent Platform & Runway Showcases',
    icon: 'star',
    description:
      'We design talent-forward showcase experiences that give emerging performers, models, and creative artists a professional stage. From concept curation and audition structure to backstage movement, sequence planning, and spotlight timing, every detail is built to help new talent perform with confidence. These showcases are ideal for institutions, communities, and brands that want to discover fresh voices while presenting a polished, audience-friendly event.'
  },
  {
    title: 'Choreographic Fashion Events',
    icon: 'fashion',
    description:
      'Our fashion event format combines runway storytelling with choreographed transitions, dramatic lighting, curated music, and expert voice-over support. We create presentation arcs for all age groups so each segment feels purposeful, elegant, and memorable. Whether it is a themed fashion evening, a cultural couture reveal, or a seasonal style production, we ensure artistic quality while keeping timing, flow, and audience engagement tightly managed.'
  },
  {
    title: 'Literary Concept Curation & Scripted Hosting',
    icon: 'script',
    description:
      'For events that need depth in language and narrative, we provide structured concept writing, scripting, and literary curation support. This includes event anchors, stage scripts, segment introductions, and thematic transitions crafted in polished professional English. The result is a program that not only runs smoothly but also communicates your brand message with clarity, sophistication, and emotional connection.'
  },
  {
    title: 'Corporate Cultural Events',
    icon: 'cultural',
    description:
      'Corporate cultural events are where company identity meets celebration. We build immersive experiences featuring performances, storytelling, regional themes, and employee participation modules that reflect your organization’s values. From stage design and rehearsal planning to protocol management and guest hospitality, we turn internal cultural gatherings into high-impact engagement moments that strengthen team pride and workplace belonging.'
  },
  {
    title: 'Corporate Festival Events',
    icon: 'festival',
    description:
      'Festive corporate programs require the right blend of warmth, energy, and operational discipline. We curate festival-focused events with décor narratives, ritual-sensitive planning, employee activity zones, entertainment blocks, and food experiences that suit diverse teams. Whether it is a seasonal celebration, family-inclusive festival day, or a large annual festive carnival, we manage flow, safety, and excitement from entry to closing moments.'
  },
  {
    title: 'Corporate Fashion Events',
    icon: 'spark',
    description:
      'Our corporate fashion events are crafted for brands that want a premium visual identity and modern experiential format. We handle runway layout, model movement grids, cue-based choreography, backstage coordination, and sponsor integration so every showcase feels magazine-level polished. These events are excellent for brand launches, lifestyle positioning, recognition nights, and audience-facing corporate campaigns.'
  },
  {
    title: 'Corporate Annual Events',
    icon: 'calendar',
    description:
      'Annual events carry strategic importance—celebrating milestones, communicating vision, and aligning teams for the next phase of growth. We design these evenings as end-to-end brand experiences with leadership addresses, achievement storytelling, entertainment chapters, and seamless production control. Our team ensures every minute is timed with precision, so your annual event feels grand, meaningful, and professionally executed.'
  },
  {
    title: 'Corporate Awards Events',
    icon: 'award',
    description:
      'Recognition ceremonies deserve dignity, emotional impact, and a premium atmosphere. We produce corporate awards events with nomination-stage flow, winner reveal strategy, presenter cueing, trophy logistics, and cinematic stage moments. By balancing protocol with celebration energy, we create award nights that honour excellence, motivate teams, and elevate your brand culture both internally and publicly.'
  },
  {
    title: 'Corporate Children’s Excellence Awards',
    icon: 'medal',
    description:
      'These programs are designed to celebrate young achievers connected with corporate communities, institutions, and social initiatives. We create a supportive and inspiring format with child-friendly pacing, family seating dynamics, talent segments, and thoughtful recognition moments. The event experience is warm yet professional, ensuring that children feel celebrated and parents, schools, and sponsors feel proud to participate.'
  },
  {
    title: 'School Sports Opening & Closing Ceremonies',
    icon: 'medal',
    description:
      'Sports ceremonies set the emotional tone for an entire tournament. For opening ceremonies, we design athlete marches, oath sequences, symbolic torch moments, and energetic performance blocks to launch the event with pride. For closing ceremonies, we shape memorable finale experiences with award flow, gratitude segments, highlight recaps, and ceremonial handovers. Our structured approach keeps schools stress-free while delivering a high-spirited, disciplined production.'
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
            <LuxuryIcon name={iconNameFromItem(item.icon, item.title)} />
          </div>
          <h4>{item.title}</h4>
          <p>{item.subtitle}</p>
        </article>
      ))}
    </div>
  )
}

function ServiceDetailPage({ service, onNavigate }) {
  return (
    <>
      <HeroBanner title={service.title} breadcrumb={`Home > Services > ${service.title}`} />

      <section className="section event-detail-intro service-detail-intro">
        <img src={service.heroImage} alt={service.title} />
        <div>
          <p className="eyebrow">Service Overview</p>
          <h3>{service.title}</h3>
          <p>{service.intro}</p>
          <button type="button" className="btn btn-primary" onClick={() => onNavigate('contact')}>
            Plan a Consultation
          </button>
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <p>What’s Included</p>
          <h3>Services we deliver for this category</h3>
        </div>
        <div className="service-list-grid">
          {service.services.map((item) => (
            <article className="service-list-card" key={item}>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <p>Gallery</p>
          <h3>Visual style references</h3>
        </div>
        <div className="service-gallery-grid">
          {service.gallery.map((img) => (
            <img key={img} src={img} alt={`${service.title} visual reference`} loading="lazy" />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <p>Our Process</p>
          <h3>How we execute this service</h3>
        </div>
        <div className="home-process-grid">
          {service.process.map((step, index) => (
            <article className="home-process-card" key={step}>
              <span>{`0${index + 1}`}</span>
              <h4>{step}</h4>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <p>FAQs</p>
          <h3>Common planning questions</h3>
        </div>
        <div className="service-faq-grid">
          {service.faqs.map((faq) => (
            <article className="service-faq-card" key={faq.q}>
              <h4>{faq.q}</h4>
              <p>{faq.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-strip">
        <h3>Tell us what you’re planning</h3>
        <p>Share your event goals and our Chennai team will contact you within one business day.</p>
        <button onClick={() => onNavigate('contact')} type="button" className="btn btn-primary light">
          Book Consultation
        </button>
      </section>
    </>
  )
}

function HomePage({ onNavigate }) {
  const featuredProjects = PORTFOLIO_ITEMS.slice(0, 3)

  return (
    <div className="home-exact">
      <section className="hero-home" style={{ '--hero-image': `url('${HERO_MEDIA.image}')` }}>
        <div className="hero-media" aria-hidden="true" />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-watermark" aria-hidden="true">
          K
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Kalacharam Events • Chennai</p>
          <h1>Extraordinary events, designed around your story.</h1>
          <p>
            Luxury weddings, corporate experiences and cultural celebrations—planned and produced end to end in Chennai and beyond.
          </p>
          <div className="hero-actions">
            <button onClick={() => onNavigate('contact')} type="button" className="btn btn-primary">
              Plan Your Event
            </button>
            <button onClick={() => onNavigate('events')} type="button" className="btn btn-secondary hero-secondary-action">
              View Our Work
            </button>
          </div>
        </div>
      </section>

      <section className="section trust-strip-section">
        <div className="trust-strip-title">
          <p>Trusted Venue Network</p>
        </div>
        <div className="trust-strip" role="list" aria-label="Venue trust strip">
          {TRUST_VENUES.map((venue) => (
            <span key={venue} className="trust-chip" role="listitem">{venue}</span>
          ))}
        </div>

        <div className="trust-metrics-grid">
          {STATS.map((item) => (
            <article key={item.label} className="trust-metric-card fade-in-up">
              <h4>{item.value}</h4>
              <p>{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section consultation-funnel" aria-labelledby="consultation-funnel-title">
        <div className="section-title">
          <p>Start Planning</p>
          <h3 id="consultation-funnel-title">Your consultation journey</h3>
          <p>Follow the steps in order, or jump to the point that best matches where you are today.</p>
        </div>
        <ol className="consultation-steps">
          <li><span>01</span><strong>See event work</strong><button type="button" onClick={() => onNavigate('events')}>Explore work</button></li>
          <li><span>02</span><strong>Choose an event type</strong><button type="button" onClick={() => onNavigate('events')}>View event types</button></li>
          <li><span>03</span><strong>Understand the process</strong><button type="button" onClick={() => onNavigate('process')}>See our process</button></li>
          <li><span>04</span><strong>Review a relevant package</strong><button type="button" onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}>Compare packages</button></li>
          <li><span>05</span><strong>Submit a planning brief or WhatsApp</strong><button type="button" onClick={() => onNavigate('contact')}>Send your brief</button></li>
          <li><span>06</span><strong>Receive confirmation and next steps</strong><small>We respond within one business day.</small></li>
        </ol>
      </section>

      <section className="section">
        <div className="section-title">
          <p>Primary Services</p>
          <h3>Three ways we deliver exceptional events</h3>
        </div>

        <div className="primary-services-grid">
          {PRIMARY_SERVICES.map((service) => (
            <article key={service.title} className="primary-service-card">
              <img src={service.image} alt={service.title} loading="lazy" />
              <div>
                <h4>{service.title}</h4>
                <p>{service.description}</p>
                <button type="button" className="btn btn-secondary" onClick={() => onNavigate(service.pageKey)}>
                  Explore Service
                </button>
              </div>
            </article>
          ))}
        </div>

        <p className="secondary-specialties-note">
          <strong>Secondary specialities:</strong> {SECONDARY_SPECIALTIES.join(' • ')}
        </p>
      </section>

      <section className="section">
        <div className="section-title">
          <p>What We Can Create</p>
          <h3>Event Concepts and Capabilities</h3>
          <p>Examples of the experiences Kalacharam can design and produce.</p>
          <p className="concept-disclaimer">These are illustrative concepts using style-reference imagery, not completed Kalacharam projects or client case studies. Once authenticated media is available, each concept can be replaced with a verified case study.</p>
        </div>

        <div className="portfolio-grid">
          {featuredProjects.map((item, index) => (
            <article key={item.title} className={`portfolio-card zoom-on-hover fade-in-up ${index === 0 ? 'featured' : ''}`}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="portfolio-content">
                <div className="portfolio-meta-row">
                  <p>{item.category}</p>
                  <span className="portfolio-placeholder-tag">Concept example</span>
                </div>
                <h4>{item.title}</h4>
                <p className="portfolio-brief"><strong>Concept brief:</strong> {item.conceptBrief}</p>
                <p><strong>Capabilities:</strong> {item.capabilities.join(' • ')}</p>
                <p><strong>Design direction:</strong> {item.designDirection}</p>
                <p><strong>Production considerations:</strong> {item.productionConsiderations}</p>
                <button type="button" className="btn btn-primary" onClick={() => onNavigate('contact')}>
                  Discuss This Concept
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="home-inline-cta">
          <button type="button" className="btn btn-secondary" onClick={() => onNavigate('events')}>
            View All Event Formats
          </button>
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <p>How Kalacharam Works</p>
          <h3>From first brief to flawless execution</h3>
        </div>

        <div className="home-process-grid">
          {HOW_KALACHARAM_WORKS.map((step, index) => (
            <article className="home-process-card" key={step.title}>
              <span>{`0${index + 1}`}</span>
              <h4>{step.title}</h4>
              <p>{step.description}</p>
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
              <span className="home-value-icon" aria-hidden="true"><LuxuryIcon name={iconNameFromItem(point.icon, point.title)} /></span>
              <h4>{point.title}</h4>
              <p>{point.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="story-proof-layout">
          <article className="event-film-card" style={{ '--film-image': `url('${EVENT_FILM.image}')` }}>
            <div className="event-film-overlay" />
            <div className="event-film-content">
              <p className="eyebrow">Style Reference</p>
              <h4>{EVENT_FILM.title}</h4>
            </div>
          </article>

          <article className="story-capability-card">
            <p className="eyebrow">Planning Capability</p>
            <h4>One team from creative brief to on-ground delivery</h4>
            <p>
              Kalacharam can coordinate creative direction, vendors, production and guest experience for weddings, leadership gatherings and culture-led celebrations.
            </p>
            <button type="button" className="btn btn-primary" onClick={() => onNavigate('contact')}>
              Book a Consultation
            </button>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <p id="packages">Package Matrix</p>
          <h3>An experience designed for your scale and ambition</h3>
          <p>Use these profiles as a starting point. We will recommend the right level of support after understanding your event.</p>
        </div>

        <div className="package-matrix-grid">
          {PACKAGE_TIERS.map((tier) => (
            <article key={tier.title} className="package-card fade-in-up">
              <h4>{tier.title}</h4>
              <p className="package-subtitle">{tier.subtitle}</p>
              <dl className="package-details">
                {tier.details.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="package-additions">
                <strong>Optional additions</strong>
                <p>{tier.additions}</p>
              </div>
              <p className="package-investment">
                Investment is customized according to scale, location, guest experience and production requirements.
              </p>
              <button type="button" className="btn btn-primary package-cta" onClick={() => onNavigate('contact')}>
                Discuss {tier.title}
              </button>
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

function AboutPage({ onNavigate }) {
  return (
    <>
      <section className="about-hero">
        <div className="about-hero-inner">
          <p className="about-hero-eyebrow">ABOUT US</p>
          <h1 className="about-hero-title">Meaningful events,<br />meticulously made.</h1>
        </div>
      </section>

      <section className="section">
        <div className="about-story-grid">
          <div className="about-story-image">
            <img src="/about1.png" alt="Event setup" />
          </div>
          <div className="about-story-content">
            <p className="eyebrow">Our Story</p>
            <h3>Culture, creativity and human connection</h3>
            <p>
              Kalacharam Events is built around a simple belief: the best events feel effortless to the guest
              because every detail has been considered behind the scenes.
            </p>
            <p>
              We combine creative direction, project management and trusted vendor partnerships to deliver events
              that are beautiful, functional and true to the client's purpose.
            </p>
            <div className="about-mini-stats">
              {[['360°', 'Planning'], ['One', 'Team'], ['100%', 'Commitment']].map(([num, label]) => (
                <div key={label} className="about-mini-stat">
                  <strong>{num}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
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
        <img src="/about3.png" alt="Concert performance" />
        <div className="mission-vision-content">
          <article>
            <p className="eyebrow">Our Mission</p>
            <p>To deliver extraordinary events that inspire, engage and leave a lasting impression.</p>
          </article>
          <article>
            <p className="eyebrow">Our Vision</p>
            <p>To be the most trusted event management partner known for creativity, integrity and excellence.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <h3>Our Values</h3>
        </div>
        <div className="value-grid">
          <article className="value-card">
            <div className="value-icon">
              <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Left person - filled dot head */}
                <circle cx="22" cy="31" r="5.5" fill="var(--maroon)"/>
                {/* Left person - body arc */}
                <path d="M8 65 C8 53 15 47 25 45 L33 45" stroke="var(--maroon)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                {/* Right person - filled dot head */}
                <circle cx="58" cy="31" r="5.5" fill="var(--maroon)"/>
                {/* Right person - body arc */}
                <path d="M72 65 C72 53 65 47 55 45 L47 45" stroke="var(--maroon)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                {/* Center - open circle head */}
                <circle cx="40" cy="14" r="6.5" stroke="var(--maroon)" strokeWidth="3.5"/>
                {/* Center - neck line */}
                <line x1="40" y1="20.5" x2="40" y2="27" stroke="var(--maroon)" strokeWidth="3.5" strokeLinecap="round"/>
                {/* Center - torso ring */}
                <circle cx="40" cy="33" r="9.5" stroke="var(--maroon)" strokeWidth="3.5"/>
                {/* Center - connector to dot */}
                <line x1="40" y1="42.5" x2="40" y2="45" stroke="var(--maroon)" strokeWidth="3.5" strokeLinecap="round"/>
                {/* Center - small filled dot */}
                <circle cx="40" cy="48" r="4" fill="var(--maroon)"/>
                {/* Center - lower body / robe */}
                <path d="M29 65 L32 53 L48 53 L51 65" stroke="var(--maroon)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M29 65 Q40 69 51 65" stroke="var(--maroon)" strokeWidth="3.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h4>Creativity</h4>
            <p>We bring fresh ideas to life.</p>
          </article>
          <article className="value-card">
            <div className="value-icon">
              <img src="/about2.png" alt="Integrity" style={{width:'64px',height:'64px',objectFit:'contain'}}/>
            </div>
            <h4>Integrity</h4>
            <p>We value honesty and transparency.</p>
          </article>
          <article className="value-card">
            <div className="value-icon">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="20" stroke="var(--maroon)" strokeWidth="2"/><path d="M24 14l2.5 7.5H34l-6.5 4.5 2.5 7.5L24 29l-6 4.5 2.5-7.5L14 21.5h7.5z" stroke="var(--maroon)" strokeWidth="1.8" strokeLinejoin="round"/></svg>
            </div>
            <h4>Excellence</h4>
            <p>We are committed to highest quality.</p>
          </article>
          <article className="value-card">
            <div className="value-icon">
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 54 C32 54 6 38 6 22 C6 13 13 7 20 7 C25 7 29 10 32 14 C35 10 39 7 44 7 C51 7 58 13 58 22 C58 38 32 54 32 54 Z"
                  stroke="var(--maroon)" strokeWidth="4" strokeLinejoin="round"/>
              </svg>
            </div>
            <h4>Passion</h4>
            <p>We love what we do and it shows.</p>
          </article>
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

      <section className="section">
        <div className="section-title">
          <p>Detailed Event Menu</p>
          <h3>Signature Event Formats We Deliver</h3>
          <p>
            Explore our complete event menu inspired by our original program vision—expanded with strategic planning,
            creative execution, and audience-first production standards for modern brands, schools, and institutions.
          </p>
        </div>

        <div className="events-longread-grid">
          {EVENTS_MENU_LONGREAD.map((item) => (
            <article key={item.title} className="events-longread-card">
              <h4>
                <span className="events-inline-icon" aria-hidden="true"><LuxuryIcon name={iconNameFromItem(item.icon, item.title)} /></span> {item.title}
              </h4>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <p>Events Submenu</p>
          <h3>Open a Dedicated Page for Each Event Type</h3>
        </div>

        <div className="events-submenu-grid">
          {EVENT_DETAIL_PAGES.map((item) => (
            <article key={item.key} className="events-submenu-card">
              <img src={item.heroImage} alt={item.title} />
              <div className="events-submenu-body">
                <h4>
                  <span className="events-inline-icon" aria-hidden="true"><LuxuryIcon name={iconNameFromItem(item.icon, item.title)} /></span> {item.title}
                </h4>
                <p>{item.summary}</p>
                <button type="button" className="btn btn-primary" onClick={() => onNavigate(item.key)}>
                  View Details
                </button>
              </div>
            </article>
          ))}
        </div>
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

function EventDetailPage({ event, onNavigate }) {
  return (
    <>
      <HeroBanner title={event.title} breadcrumb={`Home > Events > ${event.title}`} />

      <section className="section event-detail-intro">
        <img src={event.heroImage} alt={event.title} />
        <div>
          <p className="eyebrow">Event Specialization</p>
          <h3>{event.title}</h3>
          <p>{event.summary}</p>
        </div>
      </section>

      {event.sections.map((section, index) => (
        <section key={section.heading} className="section event-detail-section">
          <article className={`event-detail-row ${index % 2 === 1 ? 'reverse' : ''}`}>
            <img src={section.image} alt={section.heading} />
            <div>
              <h4>{section.heading}</h4>
              <p>{section.text}</p>
            </div>
          </article>
        </section>
      ))}

      <section className="cta-strip">
        <h3>Planning {event.title}?</h3>
        <p>Let our team convert your idea into a seamless, high-impact event experience.</p>
        <button onClick={() => onNavigate('contact')} type="button" className="btn btn-primary light">
          Request a Proposal
        </button>
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
    date: '',
    cityOrVenue: '',
    guestCount: '',
    budgetRange: '',
    servicesRequired: [],
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [submitState, setSubmitState] = useState('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const validateForm = (values) => {
    const nextErrors = {}
    const phonePattern = /^[+]?[-\d\s()]{8,20}$/

    if (!values.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!values.email.trim()) nextErrors.email = 'Please enter your email.'
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!values.phone.trim()) nextErrors.phone = 'Please add a phone or WhatsApp number.'
    if (values.phone && !phonePattern.test(values.phone)) {
      nextErrors.phone = 'Please enter a valid phone number.'
    }
    if (!values.eventType) nextErrors.eventType = 'Please select an event type.'
    if (!values.date) nextErrors.date = 'Please select an event date.'
    if (!values.cityOrVenue.trim()) nextErrors.cityOrVenue = 'Please enter city or venue.'
    if (!values.guestCount.trim()) nextErrors.guestCount = 'Please provide an estimated guest count.'
    if (!values.budgetRange) nextErrors.budgetRange = 'Please select a budget range.'
    if (!values.servicesRequired.length) nextErrors.servicesRequired = 'Choose at least one service.'
    if (!values.message.trim()) nextErrors.message = 'Tell us about your vision so we can prepare better.'

    return nextErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const handleServiceToggle = (service) => {
    setForm((current) => {
      const exists = current.servicesRequired.includes(service)
      const nextServices = exists
        ? current.servicesRequired.filter((item) => item !== service)
        : [...current.servicesRequired, service]

      return { ...current, servicesRequired: nextServices }
    })
    setErrors((current) => ({ ...current, servicesRequired: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateForm(form)

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      setSubmitState('error')
      setSubmitMessage('Please review the highlighted fields and try again.')
      return
    }

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
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          eventType: form.eventType,
          date: form.date,
          cityOrVenue: form.cityOrVenue,
          guestCount: form.guestCount,
          budgetRange: form.budgetRange,
          servicesRequired: form.servicesRequired.join(', '),
          message: `${form.message}\n\nEvent date: ${form.date || 'Not specified'}\nCity/Venue: ${form.cityOrVenue || 'Not specified'}\nGuest count: ${form.guestCount || 'Not specified'}\nBudget range: ${form.budgetRange || 'Not specified'}\nServices required: ${form.servicesRequired.join(', ') || 'Not specified'}`
        })
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
      setSubmitMessage('Thanks! We received your request. Our Chennai events team will contact you within one business day.')
      setErrors({})
      setForm({
        name: '',
        email: '',
        phone: '',
        eventType: 'Corporate Events',
        date: '',
        cityOrVenue: '',
        guestCount: '',
        budgetRange: '',
        servicesRequired: [],
        message: ''
      })
    } catch (error) {
      setSubmitState('error')
      setSubmitMessage(error instanceof Error && error.message ? error.message : 'Unable to send right now. Please try again in a moment.')
    }
  }

  return (
    <>
      <HeroBanner title="Contact Us" breadcrumb="Home > Contact Us" />
      <section className="section contact-layout">
        {submitState === 'success' ? (
          <section className="contact-form confirmation-card" aria-live="polite">
            <h3>Request received</h3>
            <p>{submitMessage}</p>
            <p>Need immediate assistance? Message us directly on WhatsApp.</p>
            <div className="confirmation-actions">
              <a className="btn btn-primary" href={CONTACT_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
              <button type="button" className="btn btn-secondary" onClick={() => setSubmitState('idle')}>
                Send Another Request
              </button>
            </div>
          </section>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <h3>Tell us what you’re planning</h3>
            <p>Share a few details and our Chennai events team will contact you within one business day.</p>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="name">Name <span aria-hidden="true">*</span></label>
                <input id="name" name="name" value={form.name} onChange={handleChange} aria-invalid={Boolean(errors.name)} required />
                {errors.name && <p className="error-note field-error">{errors.name}</p>}
              </div>

              <div className="form-field">
                <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
                <input id="email" name="email" value={form.email} onChange={handleChange} type="email" aria-invalid={Boolean(errors.email)} required />
                {errors.email && <p className="error-note field-error">{errors.email}</p>}
              </div>

              <div className="form-field">
                <label htmlFor="phone">Phone/WhatsApp <span aria-hidden="true">*</span></label>
                <input id="phone" name="phone" value={form.phone} onChange={handleChange} aria-invalid={Boolean(errors.phone)} required />
                {errors.phone && <p className="error-note field-error">{errors.phone}</p>}
              </div>

              <div className="form-field">
                <label htmlFor="eventType">Event type <span aria-hidden="true">*</span></label>
                <select id="eventType" name="eventType" value={form.eventType} onChange={handleChange} aria-invalid={Boolean(errors.eventType)} required>
                  {EVENT_CATEGORIES.map((item) => (
                    <option key={item.title}>{item.title}</option>
                  ))}
                  <option>Wedding Events</option>
                  <option>Brand Activation</option>
                  <option>Other</option>
                </select>
                {errors.eventType && <p className="error-note field-error">{errors.eventType}</p>}
              </div>

              <div className="form-field">
                <label htmlFor="date">Event date <span aria-hidden="true">*</span></label>
                <input id="date" name="date" value={form.date} onChange={handleChange} type="date" aria-invalid={Boolean(errors.date)} required />
                {errors.date && <p className="error-note field-error">{errors.date}</p>}
              </div>

              <div className="form-field">
                <label htmlFor="cityOrVenue">City or venue <span aria-hidden="true">*</span></label>
                <input id="cityOrVenue" name="cityOrVenue" value={form.cityOrVenue} onChange={handleChange} aria-invalid={Boolean(errors.cityOrVenue)} required />
                {errors.cityOrVenue && <p className="error-note field-error">{errors.cityOrVenue}</p>}
              </div>

              <div className="form-field">
                <label htmlFor="guestCount">Estimated guest count <span aria-hidden="true">*</span></label>
                <input id="guestCount" name="guestCount" value={form.guestCount} onChange={handleChange} placeholder="e.g., 300" aria-invalid={Boolean(errors.guestCount)} required />
                {errors.guestCount && <p className="error-note field-error">{errors.guestCount}</p>}
              </div>

              <div className="form-field">
                <label htmlFor="budgetRange">Approximate budget range <span aria-hidden="true">*</span></label>
                <select id="budgetRange" name="budgetRange" value={form.budgetRange} onChange={handleChange} aria-invalid={Boolean(errors.budgetRange)} required>
                  <option value="">Select budget range</option>
                  {BUDGET_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.budgetRange && <p className="error-note field-error">{errors.budgetRange}</p>}
              </div>

              <fieldset className="form-services-field form-message-field" aria-invalid={Boolean(errors.servicesRequired)}>
                <legend>Services required <span aria-hidden="true">*</span></legend>
                <div className="service-options">
                  {SERVICE_OPTIONS.map((service) => {
                    const checked = form.servicesRequired.includes(service)

                    return (
                      <label key={service} className="service-option">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleServiceToggle(service)}
                        />
                        <span>{service}</span>
                      </label>
                    )
                  })}
                </div>
                {errors.servicesRequired && <p className="error-note field-error">{errors.servicesRequired}</p>}
              </fieldset>

              <div className="form-field form-message-field">
                <label htmlFor="message">Tell us about your vision <span aria-hidden="true">*</span></label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Share the mood, priorities, and must-have moments for your event"
                  rows={5}
                  required
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message && <p className="error-note field-error">{errors.message}</p>}
              </div>
            </div>

            <p className="form-privacy-note">
              <strong>Privacy assurance:</strong> Your details are used only to respond to your enquiry and are never sold to third parties.
            </p>

            <button className="btn btn-primary" type="submit" disabled={submitState === 'sending'}>
              {submitState === 'sending' ? 'Sending...' : 'Plan Your Event'}
            </button>
            {submitState === 'error' && <p className="error-note">{submitMessage}</p>}
          </form>
        )}

        <aside className="contact-info">
          <h3>Get In Touch</h3>
          <p>
            <strong>Phone:</strong> <a href={CONTACT_PHONE_LINK}>{CONTACT_PHONE_DISPLAY}</a>
          </p>
          <p>
            <strong>Email:</strong> <a href={`mailto:${CONTACT_DISPLAY_EMAIL}`}>{CONTACT_DISPLAY_EMAIL}</a>
          </p>
          <p>
            <strong>WhatsApp:</strong>{' '}
            <a href={CONTACT_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              WhatsApp our team
            </a>
          </p>
          <p><strong>Based in:</strong> Chennai, Tamil Nadu</p>
          <p><strong>Service area:</strong> Chennai and across Tamil Nadu, with destination and multi-city events across India by arrangement.</p>
          <p><strong>Response time:</strong> Within one business day.</p>
        </aside>
      </section>
    </>
  )
}

function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-columns">
        <div className="footer-brand">
          <p>We design and deliver exceptional events that inspire, engage and create lasting memories.</p>
          <p>Based in Chennai. Serving Tamil Nadu and events across India by arrangement.</p>
        </div>
        <div>
          <h5>Quick Links</h5>
          <ul>
            <li><button onClick={() => onNavigate('home')} type="button">Home</button></li>
            <li><button onClick={() => onNavigate('about')} type="button">About Us</button></li>
            <li><button onClick={() => onNavigate('events')} type="button">Events</button></li>
            <li><button onClick={() => onNavigate('process')} type="button">Our Process</button></li>
            <li><button onClick={() => onNavigate('contact')} type="button">Contact</button></li>
            <li><button onClick={() => onNavigate('privacy')} type="button">Privacy Policy</button></li>
            <li><button onClick={() => onNavigate('terms')} type="button">Terms &amp; Conditions</button></li>
          </ul>
        </div>
        <div>
          <h5>Event Categories</h5>
          <ul>
            <li><button onClick={() => onNavigate('events')} type="button">Corporate Events</button></li>
            <li><button onClick={() => onNavigate('events')} type="button">Private Events</button></li>
            <li><button onClick={() => onNavigate('events')} type="button">Sports &amp; Adventure</button></li>
            <li><button onClick={() => onNavigate('events')} type="button">Social &amp; Cultural</button></li>
            <li><button onClick={() => onNavigate('events')} type="button">Award Ceremonies</button></li>
            <li><button onClick={() => onNavigate('events')} type="button">Educational Events</button></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h5>Contact Us</h5>
          <p><strong>Phone:</strong> <a href={CONTACT_PHONE_LINK}>{CONTACT_PHONE_DISPLAY}</a></p>
          <p><strong>Email:</strong> <a href={`mailto:${CONTACT_DISPLAY_EMAIL}`}>{CONTACT_DISPLAY_EMAIL}</a></p>
          <p><strong>WhatsApp:</strong> <a href={CONTACT_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Message our team</a></p>
          <p><strong>Service area:</strong> Chennai, Tamil Nadu and pan-India by arrangement.</p>
          <button onClick={() => onNavigate('contact')} type="button" className="btn btn-secondary footer-btn">
            Get In Touch
          </button>
        </div>
      </div>
      <p className="footer-copy">© {new Date().getFullYear()} Kalacharam Events. All rights reserved.</p>
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

function LegalPage({ type }) {
  const isPrivacy = type === 'privacy'

  return (
    <>
      <HeroBanner title={isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'} breadcrumb={`Home > ${isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}`} />
      <section className="section legal-page">
        <p className="legal-updated">Last updated: 31 July 2026</p>
        {isPrivacy ? (
          <>
            <h3>How we handle your information</h3>
            <p>Kalacharam Events collects the contact and event-planning details you submit so we can respond to your enquiry, prepare recommendations, and coordinate requested services.</p>
            <h4>Information we collect</h4>
            <p>This may include your name, email, phone number, event date, location, guest count, budget range, service preferences, and any details included in your planning brief.</p>
            <h4>Use, sharing and retention</h4>
            <p>We use your information only for enquiry handling and event delivery. We do not sell personal information. Details may be shared with trusted service providers only when necessary to prepare or deliver your event, and are retained only as long as reasonably needed for business, legal, or record-keeping purposes.</p>
            <h4>Your choices</h4>
            <p>You may request access, correction, or deletion of your enquiry information by emailing <a href={`mailto:${CONTACT_DISPLAY_EMAIL}`}>{CONTACT_DISPLAY_EMAIL}</a>.</p>
          </>
        ) : (
          <>
            <h3>Website and enquiry terms</h3>
            <p>This website provides general information about Kalacharam Events and its event-planning services. Submitting an enquiry or planning brief does not create a booking or guarantee availability.</p>
            <h4>Proposals and bookings</h4>
            <p>Event scope, pricing, timelines, payment terms, cancellation terms, vendor arrangements, and deliverables are confirmed only in a written proposal or service agreement accepted by both parties.</p>
            <h4>Website content</h4>
            <p>Information, packages, and availability may change. Images identified as style references are illustrative and do not represent a promise of an identical result.</p>
            <h4>Questions</h4>
            <p>For questions about these terms, contact <a href={`mailto:${CONTACT_DISPLAY_EMAIL}`}>{CONTACT_DISPLAY_EMAIL}</a> or call <a href={CONTACT_PHONE_LINK}>{CONTACT_PHONE_DISPLAY}</a>.</p>
          </>
        )}
      </section>
    </>
  )
}

function App() {
  const [page, setPage] = useState('home')
  const [eventsMenuOpen, setEventsMenuOpen] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const nextPage = params.get('page')
    const pathname = window.location.pathname
    const servicePageFromPath = SERVICE_SLUG_TO_KEY[pathname]

    if (servicePageFromPath) {
      setPage(servicePageFromPath)
    } else if (nextPage && PAGES.includes(nextPage)) {
      setPage(nextPage)
    }
  }, [])

  const navigate = (nextPage) => {
    setPage(nextPage)
    setEventsMenuOpen(false)

    const servicePage = SERVICE_PAGE_MAP[nextPage]

    if (servicePage) {
      window.history.replaceState({}, '', servicePage.slug)
    } else {
      const params = new URLSearchParams(window.location.search)
      params.set('page', nextPage)
      window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`)
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isEventsActive = page === 'events' || page.startsWith('event-')

  return (
    <HelmetProvider>
      <Helmet>
        <title>Kalacharam Events - Corporate Event Planning in Chennai</title>
        <meta name="description" content="Professional event planning services in Chennai. Book your next corporate event, wedding, or cultural celebration with Kalacharam Events." />
        <meta name="keywords" content="events, corporate events, Chennai, event planning, weddings, celebrations" />
        <meta property="og:title" content="Kalacharam Events - Corporate Event Planning in Chennai" />
        <meta property="og:description" content="Professional event planning services in Chennai. Book your next corporate event, wedding, or cultural celebration with Kalacharam Events." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kalacharam.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kalacharam Events - Corporate Event Planning in Chennai" />
        <meta name="twitter:description" content="Professional event planning services in Chennai. Book your next corporate event, wedding, or cultural celebration with Kalacharam Events." />
      </Helmet>
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
          {NAV_ITEMS.filter((item) => item.key === 'home').map((item) => (
            <button
              key={item.key}
              type="button"
              className={item.key === page ? 'active' : ''}
              onClick={() => navigate(item.key)}
            >
              {item.label}
            </button>
          ))}

          <div
            className={`events-nav-dropdown ${eventsMenuOpen ? 'open' : ''}`}
          >
            <button
              type="button"
              className={`dropdown-trigger ${isEventsActive ? 'active' : ''}`}
              onClick={() => setEventsMenuOpen((current) => !current)}
              aria-expanded={eventsMenuOpen}
              aria-controls="events-nav-submenu"
            >
              Events
              <svg className={`dropdown-arrow ${eventsMenuOpen ? 'open' : ''}`} viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div id="events-nav-submenu" className="events-nav-submenu" role="menu">
              {EVENT_DROPDOWN_ITEMS.map((item) => (
                <button key={item.key} type="button" className="submenu-item" onClick={() => navigate(item.key)}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {NAV_ITEMS.filter((item) => item.key !== 'home' && item.key !== 'events').map((item) => (
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
      </header>

      <main>
        {page === 'home' && (
          <HomePage onNavigate={navigate} />
        )}
        {page === 'about' && <AboutPage onNavigate={navigate} />}
        {page === 'events' && <EventsPage onNavigate={navigate} />}
        {SERVICE_PAGE_MAP[page] && <ServiceDetailPage service={SERVICE_PAGE_MAP[page]} onNavigate={navigate} />}
        {EVENT_PAGE_MAP[page] && <EventDetailPage event={EVENT_PAGE_MAP[page]} onNavigate={navigate} />}
        {page === 'process' && <ProcessPage />}
        {page === 'contact' && <ContactPage />}
        {page === 'privacy' && <LegalPage type="privacy" />}
        {page === 'terms' && <LegalPage type="terms" />}
      </main>

      <Footer onNavigate={navigate} />
    </div>
    </HelmetProvider>
  )
}

export default App
