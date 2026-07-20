import { useEffect, useMemo, useState } from 'react'
import logoUrl from '/logo.svg'

const PAGES = [
  'home',
  'about',
  'events',
  'gallery',
  'process',
  'contact',
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
const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL

const NAV_ITEMS = [
  { key: 'home', label: 'Home' },
  { key: 'about', label: 'About Us' },
  { key: 'gallery', label: 'Gallery' },
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

const PORTFOLIO_FILTERS = ['All', 'Weddings', 'Corporate Galas', 'Cultural Festivals']

const PORTFOLIO_ITEMS = [
  {
    title: 'Royal Destination Wedding Experience',
    category: 'Weddings',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80&fm=webp'
  },
  {
    title: 'Executive Leadership Gala Night',
    category: 'Corporate Galas',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80&fm=webp'
  },
  {
    title: 'Grand Cultural Heritage Evening',
    category: 'Cultural Festivals',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80&fm=webp'
  },
  {
    title: 'Luxury Multi-Day Wedding Production',
    category: 'Weddings',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=80&fm=webp'
  },
  {
    title: 'Annual Corporate Awards Gala',
    category: 'Corporate Galas',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80&fm=webp'
  },
  {
    title: 'Community Festival Signature Stage',
    category: 'Cultural Festivals',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80&fm=webp'
  }
]

const PACKAGE_TIERS = [
  {
    title: 'Signature',
    subtitle: 'Boutique production for intimate premium events',
    includes: ['Concept Design', 'Venue Styling', 'Host Coordination', 'Photo-Ready Lighting']
  },
  {
    title: 'Grand',
    subtitle: 'Large-scale execution for high-profile celebrations',
    includes: ['Everything in Signature', 'Full Production Crew', 'Artist & Entertainment Management', 'Guest Experience Desk']
  },
  {
    title: 'Legacy',
    subtitle: 'End-to-end luxury curation with strategic storytelling',
    includes: ['Everything in Grand', 'Creative Direction', 'Cinematic Content Team', 'VIP Protocol & Hospitality']
  }
]

const TESTIMONIALS = [
  {
    name: 'Aditi Rao',
    role: 'Bride, Bengaluru',
    quote:
      'Kalacharam transformed our wedding into a breathtaking experience. Every moment felt intentional, elegant, and deeply personal.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80&fm=webp'
  },
  {
    name: 'Rahul Menon',
    role: 'HR Head, Tech Enterprise',
    quote:
      'From stage direction to guest flow, their corporate gala execution was world-class. Our leadership team was truly impressed.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80&fm=webp'
  },
  {
    name: 'Niharika S',
    role: 'Festival Committee Lead',
    quote:
      'They captured the soul of our cultural festival while delivering flawless production standards. Audience response was phenomenal.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=500&q=80&fm=webp'
  }
]

const EVENT_DETAIL_PAGES = [
  {
    key: 'event-weddings-marriages',
    title: 'Weddings & Marriages',
    icon: '💍',
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
    icon: '🏛️',
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
    icon: '🎭',
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
    icon: '🎤',
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
    icon: '🌟',
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
    icon: '👗',
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
    icon: '🖋️',
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
    icon: '🎭',
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
    icon: '🎊',
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
    icon: '✨',
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
    icon: '📅',
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
    icon: '🏆',
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
    icon: '🎖️',
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
    icon: '🏅',
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
    icon: '🌟',
    description:
      'We design talent-forward showcase experiences that give emerging performers, models, and creative artists a professional stage. From concept curation and audition structure to backstage movement, sequence planning, and spotlight timing, every detail is built to help new talent perform with confidence. These showcases are ideal for institutions, communities, and brands that want to discover fresh voices while presenting a polished, audience-friendly event.'
  },
  {
    title: 'Choreographic Fashion Events',
    icon: '👗',
    description:
      'Our fashion event format combines runway storytelling with choreographed transitions, dramatic lighting, curated music, and expert voice-over support. We create presentation arcs for all age groups so each segment feels purposeful, elegant, and memorable. Whether it is a themed fashion evening, a cultural couture reveal, or a seasonal style production, we ensure artistic quality while keeping timing, flow, and audience engagement tightly managed.'
  },
  {
    title: 'Literary Concept Curation & Scripted Hosting',
    icon: '🖋️',
    description:
      'For events that need depth in language and narrative, we provide structured concept writing, scripting, and literary curation support. This includes event anchors, stage scripts, segment introductions, and thematic transitions crafted in polished professional English. The result is a program that not only runs smoothly but also communicates your brand message with clarity, sophistication, and emotional connection.'
  },
  {
    title: 'Corporate Cultural Events',
    icon: '🎭',
    description:
      'Corporate cultural events are where company identity meets celebration. We build immersive experiences featuring performances, storytelling, regional themes, and employee participation modules that reflect your organization’s values. From stage design and rehearsal planning to protocol management and guest hospitality, we turn internal cultural gatherings into high-impact engagement moments that strengthen team pride and workplace belonging.'
  },
  {
    title: 'Corporate Festival Events',
    icon: '🎉',
    description:
      'Festive corporate programs require the right blend of warmth, energy, and operational discipline. We curate festival-focused events with décor narratives, ritual-sensitive planning, employee activity zones, entertainment blocks, and food experiences that suit diverse teams. Whether it is a seasonal celebration, family-inclusive festival day, or a large annual festive carnival, we manage flow, safety, and excitement from entry to closing moments.'
  },
  {
    title: 'Corporate Fashion Events',
    icon: '✨',
    description:
      'Our corporate fashion events are crafted for brands that want a premium visual identity and modern experiential format. We handle runway layout, model movement grids, cue-based choreography, backstage coordination, and sponsor integration so every showcase feels magazine-level polished. These events are excellent for brand launches, lifestyle positioning, recognition nights, and audience-facing corporate campaigns.'
  },
  {
    title: 'Corporate Annual Events',
    icon: '📅',
    description:
      'Annual events carry strategic importance—celebrating milestones, communicating vision, and aligning teams for the next phase of growth. We design these evenings as end-to-end brand experiences with leadership addresses, achievement storytelling, entertainment chapters, and seamless production control. Our team ensures every minute is timed with precision, so your annual event feels grand, meaningful, and professionally executed.'
  },
  {
    title: 'Corporate Awards Events',
    icon: '🏆',
    description:
      'Recognition ceremonies deserve dignity, emotional impact, and a premium atmosphere. We produce corporate awards events with nomination-stage flow, winner reveal strategy, presenter cueing, trophy logistics, and cinematic stage moments. By balancing protocol with celebration energy, we create award nights that honour excellence, motivate teams, and elevate your brand culture both internally and publicly.'
  },
  {
    title: 'Corporate Children’s Excellence Awards',
    icon: '🎖️',
    description:
      'These programs are designed to celebrate young achievers connected with corporate communities, institutions, and social initiatives. We create a supportive and inspiring format with child-friendly pacing, family seating dynamics, talent segments, and thoughtful recognition moments. The event experience is warm yet professional, ensuring that children feel celebrated and parents, schools, and sponsors feel proud to participate.'
  },
  {
    title: 'School Sports Opening & Closing Ceremonies',
    icon: '🏅',
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
  const [portfolioFilter, setPortfolioFilter] = useState('All')

  const filteredPortfolio = useMemo(
    () =>
      PORTFOLIO_ITEMS.filter((item) => {
        if (portfolioFilter === 'All') return true
        return item.category === portfolioFilter
      }),
    [portfolioFilter]
  )

  return (
    <div className="home-exact">
      <section className="hero-home">
        <div className="hero-copy">
          <p className="eyebrow">Luxury Event Design Studio</p>
          <h1>Crafting Memorable Events That Inspire</h1>
          <p>
            We craft luxury weddings, corporate galas, and cultural festivals with cinematic production quality and seamless execution.
          </p>
          <div className="hero-actions">
            <button onClick={() => onNavigate('events')} type="button" className="btn btn-primary">
              Explore Events
            </button>
            <button onClick={() => onNavigate('contact')} type="button" className="btn btn-secondary">
              Book Consultation
            </button>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          
        </div>
      </section>

      <section className="section trust-metrics-section">
        <div className="trust-metrics-grid">
          {STATS.map((item) => (
            <article key={item.label} className="trust-metric-card fade-in-up">
              <h4>{item.value}</h4>
              <p>{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <p>Interactive Portfolio</p>
          <h3>Curated Event Case Studies</h3>
        </div>

        <div className="portfolio-filters" role="group" aria-label="Portfolio category filters">
          {PORTFOLIO_FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`portfolio-filter-pill ${portfolioFilter === filter ? 'active' : ''}`}
              onClick={() => setPortfolioFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filteredPortfolio.map((item) => (
            <article key={item.title} className="portfolio-card zoom-on-hover fade-in-up">
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="portfolio-overlay">
                <p>{item.category}</p>
                <h4>{item.title}</h4>
              </div>
            </article>
          ))}
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

      <section className="section">
        <div className="section-title">
          <p>Package Matrix</p>
          <h3>Choose Your Experience Tier</h3>
        </div>

        <div className="package-matrix-grid">
          {PACKAGE_TIERS.map((tier) => (
            <article key={tier.title} className="package-card fade-in-up">
              <h4>{tier.title}</h4>
              <p>{tier.subtitle}</p>
              <ul>
                {tier.includes.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <p>Verified Client Voices</p>
          <h3>Live Testimonials</h3>
        </div>

        <div className="testimonial-carousel" aria-label="Client testimonials">
          {TESTIMONIALS.map((item) => (
            <article key={item.name} className="testimonial-card fade-in-up">
              <img src={item.image} alt={item.name} loading="lazy" />
              <div>
                <h4>{item.name}</h4>
                <span>{item.role}</span>
                <p>“{item.quote}”</p>
              </div>
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
        <img src="/abou2.png" alt="Concert performance" />
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
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="20" stroke="var(--maroon)" strokeWidth="2"/><path d="M16 32c2-6 6-10 8-10s6 4 8 10" stroke="var(--maroon)" strokeWidth="2" strokeLinecap="round"/><circle cx="20" cy="20" r="2" fill="var(--maroon)"/><circle cx="28" cy="20" r="2" fill="var(--maroon)"/><path d="M18 14c1-3 5-5 6-3" stroke="var(--maroon)" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <h4>Creativity</h4>
            <p>We bring fresh ideas to life.</p>
          </article>
          <article className="value-card">
            <div className="value-icon">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="20" stroke="var(--maroon)" strokeWidth="2"/><path d="M24 14v6M24 28v2" stroke="var(--maroon)" strokeWidth="2" strokeLinecap="round"/><path d="M17 20h14" stroke="var(--maroon)" strokeWidth="2" strokeLinecap="round"/><path d="M19 26h10" stroke="var(--maroon)" strokeWidth="2" strokeLinecap="round"/><circle cx="24" cy="34" r="1.5" fill="var(--maroon)"/></svg>
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
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="20" stroke="var(--maroon)" strokeWidth="2"/><path d="M24 33s-9-5.5-9-12a6 6 0 0112 0 6 6 0 0112 0c0 6.5-9 12-9 12h-6z" stroke="var(--maroon)" strokeWidth="1.8" strokeLinejoin="round"/></svg>
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
                <span aria-hidden="true">{item.icon}</span> {item.title}
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
                  <span aria-hidden="true">{item.icon}</span> {item.title}
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

      <section className="section event-detail-submenu">
        <div className="event-submenu-scroll" role="tablist" aria-label="Events submenu">
          <button type="button" className="btn btn-secondary" onClick={() => onNavigate('events')}>
            ← Events Overview
          </button>
          {EVENT_DETAIL_PAGES.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`event-chip ${item.key === event.key ? 'active' : ''}`}
              onClick={() => onNavigate(item.key)}
            >
              {item.title}
            </button>
          ))}
        </div>
      </section>

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
    date: '',
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
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          eventType: form.eventType,
          date: form.date,
          message: `${form.message}\n\nPreferred event date: ${form.date || 'Not specified'}`
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
      setSubmitMessage('Thanks! Your message has been sent successfully.')
      setForm({ name: '', email: '', phone: '', eventType: 'Corporate Events', date: '', message: '' })
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
          <p>Quick booking form — our team will contact you within one business day.</p>
          <div className="form-grid">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required />
            <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Your Email" required />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required />
            <select name="eventType" value={form.eventType} onChange={handleChange}>
              {EVENT_CATEGORIES.map((item) => (
                <option key={item.title}>{item.title}</option>
              ))}
            </select>
            <input name="date" value={form.date} onChange={handleChange} type="date" required />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your event requirements"
              rows={4}
              required
              className="form-message-field"
            />
          </div>
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
  const [eventsMenuOpen, setEventsMenuOpen] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const nextPage = params.get('page')
    if (nextPage && PAGES.includes(nextPage)) {
      setPage(nextPage)
    }
  }, [])

  const navigate = (nextPage) => {
    setPage(nextPage)
    setEventsMenuOpen(false)
    const params = new URLSearchParams(window.location.search)
    params.set('page', nextPage)
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isEventsActive = page === 'events' || page.startsWith('event-')

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
        {EVENT_PAGE_MAP[page] && <EventDetailPage event={EVENT_PAGE_MAP[page]} onNavigate={navigate} />}
        {page === 'gallery' && <GalleryPage />}
        {page === 'process' && <ProcessPage />}
        {page === 'contact' && <ContactPage />}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  )
}

export default App
