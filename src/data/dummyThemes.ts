import { ThemeMetadata } from '../types/portfolio';

export const DUMMY_THEMES: ThemeMetadata[] = [
  {
    id: 'theme_kai_ross',
    title: 'Kai Ross — Cinema & Stills (Videographer)',
    slug: 'kai-ross',
    description: 'Exact replica of the Kai Ross high-fashion cinematography & fine monochrome stills portfolio. Features 35mm continuous film strips, asymmetric Selected Works catalog, interactive Color Lab LUT comparison slider, Equipment Vault, and Production Rates Estimator.',
    allowedSections: ['Navbar', 'Hero', 'Stats', 'Showreel', 'Films', 'ColorLab', 'Gear', 'Rates', 'Footer'],
    badge: 'Replica',
    thumbnailUrl: '/assets/kai-ross/hero_portrait.jpg',
    price: 0,
    currency: 'USD',
    accentColor: '#000000',
    fontFamily: 'Space Grotesk',
    themeStyle: 'light',
    initialSchema: {
      themeId: 'theme_kai_ross',
      title: 'Kai Ross — Cinema & Stills',
      authorName: 'Kai Ross',
      role: 'Director of Photography | Cinematography & Fine Stills',
      fontFamily: 'Space Grotesk',
      accentColor: '#000000',
      sections: [
        {
          id: 'navbar_kai_ross', type: 'Navbar', title: 'Navigation Bar',
          backgroundColor: '#ffffff', paddingY: 'py-4',
          components: {
            logo: { text: 'KAI ROSS CINEMA & STILLS', styles: { color: '#000000' } },
            links: [
              { id: 'n1', label: 'SHOWREEL', target: '#showreel' },
              { id: 'n2', label: 'SELECTED WORKS', target: '#selected-works-section' },
              { id: 'n3', label: 'COLOR LAB', target: '#color-lab-section' },
              { id: 'n4', label: 'EQUIPMENT', target: '#equipment-section' },
              { id: 'n5', label: 'PRODUCTION RATES', target: '#rates-section' }
            ],
            showAudioToggle: true,
            ctaButton: { label: 'BOOK PRODUCTION', link: '#rates-section', styles: { backgroundColor: '#000000', color: '#ffffff', borderRadius: '4px' } }
          }
        },
        {
          id: 'hero_kai_ross', type: 'Hero', title: 'Hero Header',
          backgroundColor: '#ffffff', paddingY: 'py-16',
          components: {
            badge: { text: 'DIRECTOR OF PHOTOGRAPHY | CINEMATOGRAPHY & FINE STILLS | NEW YORK & PARIS', styles: { color: '#64748b', fontWeight: '600' } },
            title: { text: 'SCULPTING LIGHT, SHADOW & STILLNESS.', styles: { fontSize: '56px', color: '#000000', fontWeight: '800', lineHeight: '1.08' } },
            subtitle: { text: 'Specializing in high-contrast narrative cinematography, luxury fashion films, and fine art monochrome portraiture. Working across 35mm motion picture nitrate and calibrated large-format digital sensors.', styles: { fontSize: '15px', color: '#475569', lineHeight: '1.6' } },
            toolsTag: 'ARRI ALEXA 35 / LEICA M11 / COOKE SPEED PANCHRO T1.4 / 35MM MONOCHROME NITRATE',
            ctaButton: { label: 'PLAY 2026 SHOWREEL [02:45]', link: '#showreel', styles: { backgroundColor: '#000000', color: '#ffffff', borderRadius: '8px', padding: '14px 28px' } },
            secondaryButton: { label: 'SELECTED WORKS ↓', link: '#selected-works-section', styles: { backgroundColor: '#ffffff', color: '#000000', borderRadius: '8px', borderColor: '#cbd5e1', borderWidth: '1px', padding: '14px 28px' } },
            avatar: { src: '/assets/kai-ross/hero_portrait.jpg', alt: 'Kai Ross DP Monochrom Still', styles: {} },
            portraitTag: 'MONOCHROM STILL #01',
            cameraSpecs: 'LEICA M11 MONOCHROM · 50mm Noctilux · f/0.95 ASPH · ISO 64 · 1/500s NATURAL CHIAROSCURO',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            reelTitle: 'KAI ROSS · 2026 DIRECTORS SHOWREEL',
            reelSpecs: 'ARRI Alexa 35 · Super 35 Open Gate · Cooke Speed Panchro T1.4 · 2.39:1 Cinema Scope'
          }
        },
        {
          id: 'stats_kai_ross', type: 'Stats', title: 'Stats Strip',
          backgroundColor: '#ffffff', paddingY: 'py-10',
          components: {
            valueColor: '#000000', labelColor: '#475569',
            items: [
              { id: 's1', value: '14', label: 'Festival Awards & Official Selections' },
              { id: 's2', value: '48M+', label: 'Organic Global Showreel Impressions' },
              { id: 's3', value: '85+', label: 'Commercial & Narrative Productions' },
              { id: 's4', value: '100%', label: 'Shot on Cinema Glass & Calibrated Sensors' }
            ]
          }
        },
        {
          id: 'showreel_kai_ross', type: 'Showreel', title: 'Curated Film Strips & Showreel',
          backgroundColor: '#ffffff', paddingY: 'py-20',
          components: {
            badge: { text: '35MM MOTION PICTURE ARCHIVE', styles: { color: '#64748b' } },
            title: { text: 'CURATED FILM STRIPS & SHOWREEL', styles: { fontSize: '36px', color: '#000000', fontWeight: '800' } },
            subtitle: { text: 'Continuous sequence reel shot across 35mm nitrate and large-format sensors. Scroll or drag horizontally to inspect individual frame takes.', styles: { fontSize: '14px', color: '#475569' } },
            topStrip: 'EASTMAN 5219 KODAK VISION3 500T SAFETY FILM 2026',
            bottomStrip: 'NITRATE ARCHIVE REEL KAI ROSS DP OPTICAL SOUNDTRACK',
            frames: [
              { id: 'frame_silent', title: 'THE SILENT THRESHOLD', client: 'NEON ARC PICTURES · 2026', category: 'Cinematography', role: 'Director of Photography', duration: '03:42', aspectRatio: '2.39:1 SCOPE', posterUrl: '/assets/kai-ross/film_silent_threshold.jpg', specs: 'ARRI Alexa 35 · Super 35 Open Gate · Cooke Speed Panchro T1.4', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
              { id: 'frame_vesper', title: 'VESPER MONOLITH', client: 'MAISON NOIR STUDIO · 2026', category: 'Fashion & Editorial', role: 'Cinematographer & Colorist', duration: '01:58', aspectRatio: '4:3 SCOPE', posterUrl: '/assets/kai-ross/film_vesper_monolith.jpg', specs: 'RED V-Raptor 8K VV & Leica M11 Monochrom · 50mm f/2.8', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
              { id: 'frame_vestrahorn', title: 'VESTRAHORN SOLITUDE', client: 'TERRA CINEMA COLLECTIVE · 2025', category: 'Documentary', role: 'Director of Photography', duration: '07:15', aspectRatio: '2.39:1 SCOPE', posterUrl: '/assets/kai-ross/film_vestrahorn_solitude.jpg', specs: 'ARRI Alexa Mini LF · Large Format · 28mm T5.6 · 800 EI', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
              { id: 'frame_golden', title: 'GOLDEN REVERIE', client: 'SUB POP / ISLAND ECHOES · 2025', category: 'Music Video', role: 'Director of Photography', duration: '04:12', aspectRatio: '1.85:1 FLAT', posterUrl: '/assets/kai-ross/film_golden_reverie.jpg', specs: 'Sony FX9 & Aaton XTR Prod 16mm · 35mm T1.3', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
              { id: 'frame_atelier', title: 'ATELIER MONOCHROME', client: 'KULTUR MONOGRAPH ARCHIVE · 2026', category: 'Monochrome 35mm', role: 'Fine Art Photographer', duration: 'STILL', aspectRatio: '1:1 SQUARE STILL', posterUrl: '/assets/kai-ross/film_atelier_monochrome.jpg', specs: 'Hasselblad 500C/M & Leica M6 · 80mm f/4.0 · ISO 400', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
              { id: 'frame_echoes', title: 'ECHOES OF THE SET', client: 'STUDIO CINE 24 · 2025', category: 'Cinematography', role: 'Behind the Scenes DP', duration: '02:30', aspectRatio: '2.39:1 SCOPE', posterUrl: '/assets/kai-ross/film_echoes_set.jpg', specs: 'ARRI Alexa 35 & Master Grips · 40mm T2.0 · 800 EI', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' }
            ]
          }
        },
        {
          id: 'films_kai_ross', type: 'Films', title: 'Selected Works',
          backgroundColor: '#ffffff', paddingY: 'py-24',
          components: {
            badge: { text: 'PORTFOLIO & SELECTED CATALOG', styles: { color: '#64748b' } },
            title: { text: 'SELECTED WORKS', styles: { fontSize: '36px', color: '#000000', fontWeight: '800' } },
            subtitle: { text: 'Cinematic projects and fine art still monographs engineered with deliberate lighting, bespoke optical packages, and fine silver halation.', styles: { fontSize: '14px', color: '#475569' } },
            categories: ['ALL', 'CINEMATOGRAPHY', 'FASHION & EDITORIAL', 'DOCUMENTARY', 'MUSIC VIDEO', 'MONOCHROME 35MM'],
            films: [
              { id: 'film_silent', title: 'THE SILENT THRESHOLD', client: 'NEON ARC PICTURES · 2026', category: 'CINEMATOGRAPHY', role: 'Director of Photography', duration: '03:42', col: 'left', isTall: false, posterUrl: '/assets/kai-ross/film_silent_threshold.jpg', summary: 'A 35mm neo-noir exploration of isolation and memory across rain-drenched urban brutalist bridges. Shot exclusively under available streetlights with high-speed primes.', specs: 'ARRI Alexa 35 · Super 35 Open Gate', lensSpecs: '40mm · T1.4 · 1600 EI', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
              { id: 'film_vestrahorn', title: 'VESTRAHORN SOLITUDE', client: 'TERRA CINEMA COLLECTIVE · 2025', category: 'DOCUMENTARY', role: 'Director of Photography', duration: '07:15', col: 'left', isTall: false, posterUrl: '/assets/kai-ross/film_vestrahorn_solitude.jpg', summary: '65mm panoramic documentary capturing the shifting volcanic black sands and storm fronts along southeastern Iceland. Minimalist color palette and heavy atmospheric fog.', specs: 'ARRI Alexa Mini LF · Large Format', lensSpecs: '28mm · T5.6 · 800 EI', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
              { id: 'film_atelier', title: 'ATELIER MONOCHROME', client: 'KULTUR MONOGRAPH ARCHIVE · 2026', category: 'MONOCHROME 35MM', role: 'Fine Art Photographer', duration: 'STILL', col: 'left', isTall: true, posterUrl: '/assets/kai-ross/film_atelier_monochrome.jpg', summary: 'Silver gelatin portrait monograph of sculptor Elena Lind in her northern studio. Single window natural diffuse light, real Kodak Tri-X 400 pushed 1 stop.', specs: 'Hasselblad 500C/M & Leica M6', lensSpecs: '80mm · f/4.0 · ISO 400', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
              { id: 'film_vesper', title: 'VESPER MONOLITH', client: 'MAISON NOIR STUDIO · 2026', category: 'FASHION & EDITORIAL', role: 'Director of Photography', duration: '01:58', col: 'right', isTall: false, posterUrl: '/assets/kai-ross/film_vesper_monolith.jpg', summary: 'Sculptural obsidian couture set against raw Mediterranean concrete geometries. Natural raking Mediterranean sunlight creating stark chiaroscuro tension.', specs: 'RED V-Raptor 8K VV & Leica M11 Monochrom', lensSpecs: '50mm · f/2.8 · ISO 64', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
              { id: 'film_golden', title: 'GOLDEN REVERIE', client: 'SUB POP / ISLAND ECHOES · 2025', category: 'MUSIC VIDEO', role: 'Director of Photography', duration: '04:12', col: 'right', isTall: false, posterUrl: '/assets/kai-ross/film_golden_reverie.jpg', summary: 'Live performance captured in an abandoned industrial warehouse with heavy haze and 10kW tungsten fresnel backlights creating an ethereal halo around the vocalist.', specs: 'Sony FX9 & Aaton XTR Prod (16mm)', lensSpecs: '35mm · T1.3 · 1250 EI', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
              { id: 'film_echoes', title: 'ECHOES OF THE SET', client: 'STUDIO CINE 24 · 2025', category: 'CINEMATOGRAPHY', role: 'Director of Photography', duration: '02:30', col: 'right', isTall: false, posterUrl: '/assets/kai-ross/film_echoes_set.jpg', summary: 'Behind-the-lens sequence documenting long fluid Steadicam single-take choreography in a multi-room period drama set.', specs: 'ARRI Alexa 35 & Master Grips', lensSpecs: '40mm · T2.0 · 800 EI', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' }
            ]
          }
        },
        {
          id: 'colorlab_kai_ross', type: 'ColorLab', title: 'Color Lab & Emulsion Archive',
          backgroundColor: '#ffffff', paddingY: 'py-20',
          components: {
            badge: { text: 'INTERACTIVE COLOR SCIENCE & LOOK DEVELOPMENT', styles: { color: '#64748b' } },
            title: { text: 'COLOR GRADING LAB', styles: { fontSize: '36px', color: '#000000', fontWeight: '800' } },
            subtitle: { text: 'Inspect the transformation from raw sensor flat log data to calibrated cinema color profiles. Drag the slider to compare.', styles: { fontSize: '14px', color: '#475569' } },
            masterImage: '/assets/kai-ross/color_lab_master.jpg',
            hint: 'DRAG HORIZONTALLY TO COMPARE EXPOSURE ROLL-OFF',
            looks: [
              { id: '01', name: '01. MONOLITH B&W SILVER HALIDE', badge: 'MONOCHROM NATIVE', desc: 'Deep velvety blacks, luminous skin highlights, and high-contrast Rembrandt roll-off directly from Leica M11 sensor.', image: '/assets/kai-ross/color_lab_master.jpg', label: '[MASTER] Monolith B&W Silver Halide', matrix: 'Leica Monochrom Native · Linear to Gamma 2.4', highlight: '+1.2 EV Zone VIII Roll-off', shadow: 'Zone 0 Deep Crush' },
              { id: '02', name: '02. KODAK 2383 PRINT MASTER', badge: '35MM POSITIVE PRINT', desc: 'Classic 35mm motion picture positive film print emulation. Rich shadow separation, subtle amber halation, and organic grain.', image: '/assets/kai-ross/color_lab_kodak2383.jpg', label: '[PRINT EMULATION] Kodak Vision 2383 Gold Stock', matrix: 'ACEScc · Kodak 2383 DCI-P3 Print Curve', highlight: '+0.8 EV Warm Shoulder Roll-off', shadow: 'Zone I Soft Lifted Halation' },
              { id: '03', name: '03. SILVER BLEACH BYPASS (ENR)', badge: 'ENR CHEM PROCESS', desc: 'Retains silver in the emulsion layer during film processing, producing stark graphic contrast and metallic highlights.', image: '/assets/kai-ross/color_lab_bleach_bypass.jpg', label: '[PROCESS EMULATION] Silver Bleach Bypass (ENR)', matrix: 'LogC4 to High-Contrast Silver Bleach LTO', highlight: '+2.0 EV Hard Cut Specular', shadow: 'Dense Carbon Matte Black' },
              { id: '04', name: '04. MIDNIGHT CYAN NEO-NOIR', badge: 'NIGHT EXTERIOR', desc: 'Cold night exterior grade engineered for rainy asphalt reflections and moody sodium-vapor streetlights in urban noir narratives.', image: '/assets/kai-ross/color_lab_midnight_cyan.jpg', label: '[COLOR GRADE] Midnight Cyan Neo-Noir', matrix: 'Cool Cyan Matrix · 3200K Tungsten Shift', highlight: 'Desaturated Blue-White Neon', shadow: 'Deep Inky Petrol Green-Blue' }
            ]
          }
        },
        {
          id: 'gear_kai_ross', type: 'Gear', title: 'Equipment Vault',
          backgroundColor: '#ffffff', paddingY: 'py-24',
          components: {
            badge: { text: 'OPTICAL PACKAGES & PRODUCTION RIGGING', styles: { color: '#64748b' } },
            title: { text: 'EQUIPMENT VAULT', styles: { fontSize: '36px', color: '#000000', fontWeight: '800' } },
            subtitle: { text: 'Owned cinema packages and bespoke vintage glass calibrated for immediate worldwide deployment.', styles: { fontSize: '14px', color: '#475569' } },
            tabs: ['ALL EQUIPMENT', 'CAMERAS', 'OPTICS', 'STABILIZATION & DRONE', 'LIGHTING'],
            items: [
              { id: 'g1', brand: 'ARRI', title: 'ALEXA 35', category: 'CAMERAS', status: 'CALIBRATED', icon: 'camera', specs: '4.6K Super 35 Sensor · 17 Stops Dynamic Range · REKORD ProRes 4444 XQ & ARRIRAW', note: 'Primary narrative and commercial cinema camera' },
              { id: 'g2', brand: 'LEICA', title: 'M11 MONOCHROM', category: 'CAMERAS', status: 'CALIBRATED', icon: 'camera', specs: '60MP Dedicated B&W Sensor · No Color Filter Array · BSI CMOS · Native ISO 64', note: 'Pure silver halide analog look digital capture' },
              { id: 'g3', brand: 'COOKE', title: 'SPEED PANCHRO S2/S3 (VINTAGE 1960S)', category: 'OPTICS', status: 'CALIBRATED', icon: 'optics', specs: '18mm, 25mm, 32mm, 40mm, 50mm, 75mm · PL Mount · Warm flare & gentle roll-off', note: 'Organic skin textures and velvety bokeh' },
              { id: 'g4', brand: 'ATLAS', title: 'ORION 2X ANAMORPHIC PRIMES', category: 'OPTICS', status: 'CALIBRATED', icon: 'optics', specs: '32mm, 50mm, 80mm T2.0 · 2x Squeeze · Oval Bokeh & Streaking Flares', note: 'Cinematic 2.39:1 widescreen scope' },
              { id: 'g5', brand: 'FREEFLY & DJI', title: 'MŌVI PRO RIG + INSPIRE 3 8K DRONE', category: 'STABILIZATION & DRONE', status: 'CALIBRATED', icon: 'drone', specs: '3-Axis Carbon Gimbal · Full Cine Lens Weight · 8K Full-Frame CinemaDNG Aerial', note: 'Dynamic fluid tracking shots and high-altitude motion' },
              { id: 'g6', brand: 'ASTERA & APUTURE', title: 'TITAN TUBES FP1 + ELECTRO STORM XT26', category: 'LIGHTING', status: 'CALIBRATED', icon: 'light', specs: '2600W Bi-Color Point Source + 8-Tube Wireless DMX Battery Tubes · 98+ CRI', note: 'Precise shapeable chiaroscuro and atmospheric fill' }
            ]
          }
        },
        {
          id: 'rates_kai_ross', type: 'Rates', title: 'Production Rates Estimator',
          backgroundColor: '#ffffff', paddingY: 'py-24',
          components: {
            badge: { text: 'PRODUCTION SCHEDULING & BUDGET PLANNER', styles: { color: '#64748b' } },
            title: { text: 'PRODUCTION RATES ESTIMATOR', styles: { fontSize: '36px', color: '#000000', fontWeight: '800' } },
            subtitle: { text: 'Configure your technical scope, optical requirements, and post-production deliverables to generate an immediate estimated investment range.', styles: { fontSize: '14px', color: '#475569' } },
            scopes: [
              { id: 'commercial', name: 'COMMERCIAL CAMPAIGN', desc: 'Brand manifesto, broadcast commercials, and hero campaign motion.', price: 5500 },
              { id: 'narrative', name: 'NARRATIVE MOTION PICTURE', desc: 'Short film, festival narrative, or indie feature principal cinematography.', price: 4800 },
              { id: 'fashion', name: 'FASHION & EDITORIAL', desc: 'High-contrast studio lookbook motion, runway visuals, and monograph stills.', price: 4200 },
              { id: 'music', name: 'MUSIC VIDEO / VISUALIZER', desc: 'Atmospheric performance narrative, stage haze, and bespoke lighting choreography.', price: 3900 }
            ],
            schedules: [
              { id: '1day', label: '1 PRODUCTION DAY', price: 0 },
              { id: '2-3days', label: '2–3 PRODUCTION DAYS', price: 3200 },
              { id: '5plus', label: '5+ DAYS (PRINCIPAL)', price: 7500 }
            ],
            optics: [
              { id: 'arri', name: 'ARRI ALEXA 35 + COOKE PRIMES', price: 1800 },
              { id: 'red', name: 'RED V-RAPTOR 8K LARGE FORMAT', price: 1500 },
              { id: 'film', name: 'ANALOG 35MM FILM + 4K SCAN', price: 2600 }
            ],
            addons: [
              { id: 'color', label: 'Master DCI-P3 Color Grading', price: 1400, defaultOn: true },
              { id: 'sound', label: 'Cinematic Sound Design & Mix', price: 1200, defaultOn: false },
              { id: 'drone', label: 'Heavy-Lift 8K Cine Drone', price: 1100, defaultOn: false },
              { id: 'archive', label: 'Dual LTO RAW Dailies Archive', price: 500, defaultOn: false }
            ],
            highMultiplier: 1.2,
            investmentLabel: 'ESTIMATED PRODUCTION INVESTMENT',
            investmentNote: 'Includes crew rates, DP fee, insured kit packaging, and initial look-dev test reels.',
            formTitle: 'REQUEST PRODUCTION BOOKING',
            submitLabel: 'SUBMIT PRODUCTION INQUIRY',
            successTitle: 'Inquiry Transmitted',
            successText: 'Production schedule and look-dev treatment confirmed. Kai Ross Studio will reply within 24 hours.'
          }
        },
        {
          id: 'footer_kai_ross', type: 'Footer', title: 'Representation & Inquiries',
          backgroundColor: '#ffffff', paddingY: 'py-16',
          components: {
            testimonials: [
              { id: 't1', quote: 'Kai brings an architectural eye to every frame. His mastery of dark monochrome contrast and controlled light transformed our campaign into a timeless piece of cinema.', name: 'Elena Vance', role: 'Creative Director, Maison Noir Studios, Paris' },
              { id: 't2', quote: 'The depth and texture Kai captured on 35mm exceeded our highest expectations. He understands restraint, pacing, and how to command the viewer’s eye.', name: 'Marcus Sterling', role: 'Head of Production, Vanguard Film Works, London' }
            ],
            columns: [
              { id: 'c1', label: 'NORTH AMERICA REPRESENTATION', name: 'Art & Motion Agency', detail: '450 West 33rd St, New York, NY', linkLabel: 'ny@kairosscinema.com', linkHref: 'mailto:ny@kairosscinema.com' },
              { id: 'c2', label: 'EUROPE & UK REPRESENTATION', name: 'Cinematography Co-Op', detail: '12 Rue du Faubourg Saint-Honoré, Paris', linkLabel: 'paris@kairosscinema.com', linkHref: 'mailto:paris@kairosscinema.com' },
              { id: 'c3', label: 'DIRECT INQUIRIES', name: 'Kai Ross Studio', detail: 'Available for worldwide travel & location scouting', linkLabel: 'Production Inquiry Form', linkHref: '#rates-section' }
            ],
            socialLabel: 'SOCIAL ARCHIVES',
            socials: [
              { id: 's1', label: 'Vimeo Pro / kaiross', url: 'https://vimeo.com' },
              { id: 's2', label: 'Instagram / @kaiross.film', url: 'https://instagram.com' },
              { id: 's3', label: 'IMDb / nm8492041', url: 'https://imdb.com' }
            ],
            copyright: '© 2026 KAI ROSS CINEMATOGRAPHY & FINE STILLS. ALL RIGHTS RESERVED.',
            specsLine: 'P3-DCI / ACES 1.3 · 35MM ANALOG & DIGITAL LARGE FORMAT'
          }
        }
      ]
    }
  },
  {
    id: 'theme_atelier_monolith',
    title: 'Atelier Monolith — Architecture & Interiors',
    slug: 'atelier-monolith',
    description: 'Dark architectural studio theme with an interactive CAD floor plan, camera vantage pins, room inspector and design suite cards.',
    allowedSections: ['ArchNavbar', 'ArchHeader', 'FloorPlan', 'ArchSpecs', 'ArchSuite', 'ArchFooter'],
    badge: 'Architecture',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    price: 0,
    currency: 'USD',
    accentColor: '#8ab4d8',
    fontFamily: 'Cormorant Garamond',
    themeStyle: 'dark',
    initialSchema: {
      themeId: 'theme_atelier_monolith',
      title: 'Atelier Monolith — Architecture & Spatial Interiors',
      authorName: 'Atelier Monolith',
      role: 'Architecture & Interior Design Studio',
      fontFamily: 'Cormorant Garamond',
      accentColor: '#8ab4d8',
      sections: [
        {
          id: 'archnav_am', type: 'ArchNavbar', title: 'Studio Navigation',
          backgroundColor: '#0a0908', paddingY: 'py-5',
          components: {
            logo: { text: 'ATELIER MONOLITH', styles: { color: '#f5f5f4', fontSize: '20px' } },
            tag: 'DESIGN REPLICA SUITE',
            tabs: [
              { id: 't1', label: 'Theme Home', active: false },
              { id: 't2', label: 'Floor Plan UI', active: true },
              { id: 't3', label: 'Monograph & Materials', active: false },
              { id: 't4', label: 'Photo Suite (5)', active: false }
            ],
            ctaButton: { label: 'SHARE REPLICA', link: '#', styles: { color: '#f5f5f4', backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,.25)' } }
          }
        },
        {
          id: 'archheader_am', type: 'ArchHeader', title: 'Page Header',
          backgroundColor: '#0a0908', paddingY: 'py-12',
          components: {
            badge: { text: 'ARCHITECTURE & INTERIOR DESIGN PORTFOLIO THEME · PHOTO REPLICA', styles: { fontSize: '11px', color: '#a8a29e', letterSpacing: '0.2em' } },
            title: { text: 'Interactive Floor Plan UI Screen Replica', styles: { fontSize: '48px', color: '#f5f5f4', fontWeight: '500', lineHeight: '1.15' } },
            subtitle: { text: 'Vector architectural floor plan interface with multi-level switcher (Level 01 Ground / Level 02 Mezzanine), technical layer toggles (Structure, Furniture FF&E, Lighting, Sun Path), and numbered camera vantage pins with directional sight cones linked to high-res room photography.', styles: { fontSize: '15px', color: '#a8a29e', lineHeight: '1.7' } },
            zoomLabel: '100%',
            fullscreenLabel: 'FULLSCREEN'
          }
        },
        {
          id: 'floorplan_am', type: 'FloorPlan', title: 'Kodama Residence Floor Plan',
          backgroundColor: '#0a0908', paddingY: 'py-10',
          components: {
            title: { text: 'KODAMA RESIDENCE - GROUND FLOOR', styles: { color: '#e7e5e4' } },
            subtitle: { text: 'Segoe UI, 12pt', styles: { color: '#78716c' } },
            floorPlan: {
              projectName: 'Kodama Residence',
              scale: '1:100',
              levels: [
                { id: 'lvl1', label: 'Level 01 Ground', planImage: '' },
                { id: 'lvl2', label: 'Level 02 Mezzanine', planImage: '' }
              ],
              layers: [
                { id: 'structure', label: 'Structure', enabled: true },
                { id: 'furniture', label: 'Furniture', enabled: true },
                { id: 'lighting', label: 'Lighting', enabled: true },
                { id: 'sunpath', label: 'Sun Path', enabled: true }
              ],
              rooms: [
                { id: 'living', name: 'LIVING AREA', area: '34.2 m²', ceilingHeight: '3.1 m', photo: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80', materials: ['Polished Concrete Floor', 'Oak Panel Walls', 'Glass'], furnishings: ['Polished Concrete', 'Oak Panel Walls', 'Maple Tree', 'Glass', 'Furnishings'] },
                { id: 'kitchen', name: 'KITCHEN', area: '18.6 m²', ceilingHeight: '3.1 m', photo: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80', materials: ['Honed Basalt Counter', 'Oak Panel Walls'], furnishings: ['Island Counter', 'Dining Table', 'Pendant Lighting'] },
                { id: 'master', name: 'MASTER BED', area: '22.0 m²', ceilingHeight: '3.0 m', photo: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80', materials: ['Oak Floor', 'Linen Walls'], furnishings: ['King Bed', 'Reading Chair'] }
              ],
              cameraPins: [
                { id: '1', label: 'Entrance View', roomId: 'living', x: 14, y: 50, angle: 20 },
                { id: '2', label: 'Entrance View', roomId: 'kitchen', x: 38, y: 78, angle: -20 },
                { id: '3', label: 'Courtyard', roomId: 'living', x: 55, y: 90, angle: 270 }
              ]
            }
          }
        },
        {
          id: 'archspecs_am', type: 'ArchSpecs', title: 'Layout Specifications',
          backgroundColor: '#0a0908', paddingY: 'py-14',
          components: {
            badge: { text: 'LAYOUT SPECIFICATIONS', styles: { color: '#a8a29e' } },
            title: { text: 'Precision CAD Spatial Blueprint with Camera Vantage Hotspots', styles: { fontSize: '32px', color: '#f5f5f4', fontWeight: '500' } },
            bio: { text: 'Engineered specifically for high-end architectural studios, interior monographs, and spatial planning showcases. Designed with zero-pill metadata, authentic proportion scales, and technical drafting conventions.', styles: { fontSize: '15px', color: '#a8a29e', lineHeight: '1.8' } },
            panelTitle: 'KEY BLUEPRINT & INTERACTIVE MECHANISMS PRESENT IN THIS REPLICA',
            points: [
              { id: 'p1', text: 'Directional Camera Vantage Cones: Numbered sight-lines showing exact lens perspective & FOV.' },
              { id: 'p2', text: 'Active Room Inspection Panel: Live metadata displaying room area (34.2 m²), ceiling height (3.1 m), and finishes.' },
              { id: 'p3', text: 'Multi-Layer Toggles: Real-time filtering of structural walls, furniture placement, lighting circuits, and solar angles.' }
            ]
          }
        },
        {
          id: 'archsuite_am', type: 'ArchSuite', title: 'Complete Design Suite',
          backgroundColor: '#0a0908', paddingY: 'py-16',
          components: {
            badge: { text: 'THEME ARCHITECTURE OVERVIEW', styles: { color: '#a8a29e' } },
            title: { text: 'Complete Design Suite Replicas', styles: { fontSize: '28px', color: '#f5f5f4', fontWeight: '500' } },
            countLabel: '3 CORE SYSTEM SCREENS',
            cards: [
              { id: 'c1', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', tag: 'SCREEN REPLICA', linkLabel: 'VIEW SCREEN', title: 'Website Theme Design Replica — Master Monograph', desc: 'Complete Desktop Web Interface Layout for Architecture Studios' },
              { id: 'c2', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80', tag: 'SCREEN REPLICA', linkLabel: 'VIEW SCREEN', title: 'Interactive Floor Plan UI Screen Replica', desc: 'Precision CAD Spatial Blueprint with Camera Vantage Hotspots' },
              { id: 'c3', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', tag: 'SCREEN REPLICA', linkLabel: 'VIEW SCREEN', title: 'Project Monograph & Materiality Page Replica', desc: 'Split Editorial Grid with Technical Cross-Section & Lighting Comparison' }
            ]
          }
        },
        {
          id: 'archfooter_am', type: 'ArchFooter', title: 'Studio Footer',
          backgroundColor: '#0a0908', paddingY: 'py-8',
          components: {
            brand: 'ATELIER MONOLITH',
            tagline: 'ARCHITECTURE & SPATIAL INTERIORS THEME REPLICA',
            locations: 'KYOTO · ZURICH · PARIS',
            rightLine: 'PORTFOLIO MONOGRAPHS & INTERACTIVE BLUEPRINTS'
          }
        }
      ]
    }
  },
  {
    id: 'theme_hemlock_law',
    title: 'Hemlock.Law — Legal Counsel & Advocacy',
    slug: 'hemlock-law',
    description: 'Off-white editorial law-firm theme with olive accent: practice bento, retainer estimator, landmark matters, endorsements and chambers gallery.',
    allowedSections: ['LawNavbar', 'LawHero', 'LawStats', 'LawPractice', 'LawEstimator', 'LawMatters', 'LawTestimonials', 'LawChambers', 'LawFooter'],
    badge: 'Legal',
    thumbnailUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    price: 0,
    currency: 'USD',
    accentColor: '#7D8D39',
    fontFamily: 'Poppins',
    themeStyle: 'light',
    initialSchema: {
      themeId: 'theme_hemlock_law',
      title: 'Hemlock.Law — Arthur Hemlock & Associates',
      authorName: 'Arthur Hemlock',
      role: 'Senior Counsel & Appellate Advocate',
      fontFamily: 'Poppins',
      accentColor: '#7D8D39',
      sections: [
        {
          id: 'lawnav_h', type: 'LawNavbar', title: 'Navigation', backgroundColor: '#F7F7F4', paddingY: 'py-4',
          components: {
            logo: { text: 'HEMLOCK*.LAW*', styles: {} },
            links: [
              { id: 'n1', label: 'Practice Bento', target: '#capabilities' },
              { id: 'n2', label: 'Case Record', target: '#matters' },
              { id: 'n3', label: 'Engagement Configurator', target: '#calculator' },
              { id: 'n4', label: 'Client Reviews', target: '#endorsements' },
              { id: 'n5', label: 'Chambers', target: '#chambers' }
            ],
            ctaButton: { label: 'RETAIN COUNSEL', link: '#calculator', styles: { backgroundColor: '#7D8D39', color: '#ffffff', borderRadius: '6px', padding: '10px 20px' } }
          }
        },
        {
          id: 'lawhero_h', type: 'LawHero', title: 'Hero', backgroundColor: '#F7F7F4', paddingY: 'py-16',
          components: {
            badge: { text: 'Chambers of Arthur Hemlock · Senior Bar Practice', styles: { color: '#7D8D39' } },
            title: { text: 'Decisive legal advocacy for *transformative* frontier disputes.', styles: { fontSize: '56px', color: '#1A1E16', fontWeight: '700' } },
            subtitle: { text: 'Specialized in bet-the-company artificial intelligence litigation, clean energy sovereign arbitration, and supreme appellate reversals across New York, San Francisco, and Zurich.', styles: { color: '#5A6054' } },
            ctaButton: { label: 'Retain Counsel Today', link: '#calculator', styles: { backgroundColor: '#7D8D39', color: '#ffffff', borderRadius: '8px', padding: '14px 28px' } },
            secondaryButton: { label: 'Calculate Retainer & Fees', link: '#calculator', styles: { borderRadius: '8px', padding: '12px 24px' } },
            trust: ['Admitted to New York & Federal Circuit Bars', 'FCIArb Chartered Arbitrator', 'Strict Pre-Retainer Conflict Cleared'],
            avatar: { src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80', alt: 'Arthur Hemlock, Senior Counsel', styles: {} },
            cardBadgeLeft: 'Active Senior Counsel',
            cardBadgeRight: '1998–2026',
            cardName: 'Arthur Hemlock, SC',
            cardRole: 'Lead Advocate in 74 Federal & Sovereign Matters',
            cardCities: 'New York · Zurich · London',
            cardCreds: 'FCIArb',
            stakeLabel: 'Disputed Stake Managed', stakeValue: '$4.2 Billion+',
            rateLabel: 'Appellate Win Rate', rateValue: '96.4%'
          }
        },
        {
          id: 'lawstats_h', type: 'LawStats', title: 'Metrics', backgroundColor: '#F7F7F4', paddingY: 'py-8',
          components: {
            items: [
              { id: 'm1', value: '$4.2B+', label: 'Disputed Capital Defended' },
              { id: 'm2', value: '96.4%', label: 'Favorable Injunction Rate' },
              { id: 'm3', value: '180+', label: 'Institutional & Tech Clients' },
              { id: 'm4', value: '24 Yrs', label: 'Federal & Supreme Advocacy' }
            ]
          }
        },
        {
          id: 'lawpractice_h', type: 'LawPractice', title: 'Practice Pillars', backgroundColor: '#F7F7F4', paddingY: 'py-20',
          components: {
            badge: { text: 'Practice Capabilities · Bento Architecture', styles: {} },
            title: { text: 'Architectural defense across *four core* strategic pillars.', styles: { fontSize: '48px' } },
            subtitle: { text: 'Representing multinational enterprises, venture-backed platforms, and sovereign institutions in bet-the-company controversies.', styles: {} },
            items: [
              { id: 'p1', span: '7', icon: 'cpu', pillar: 'Pillar 01', tag: 'Emerging Tech Jurisprudence', title: 'Frontier AI & Generative IP Defense', desc: 'Defending foundation model creators and high-growth enterprise platforms against catastrophic training-data copyright class actions, trade secret misappropriation, and algorithm impoundment injunctions.', focusLabel: 'Mandate Focus:', focus: ['Fair use defenses for foundation model training', 'Proprietary algorithm & weight extraction defense', 'FTC algorithm deletion order avoidance', 'Autonomous system liability & governance'], stat: '$1.8B Protected IP Value', button: 'Consult On AI Matters' },
              { id: 'p2', span: '5', icon: 'leaf', pillar: 'Pillar 02', tag: 'Transnational Infrastructure', title: 'Clean Energy & Sovereign ESG Arbitration', desc: 'Representing renewable consortiums, green hydrogen pioneers, and sovereign ministries in multi-jurisdictional treaty enforcement under ICC, LCIA, and Energy Charter Treaty protocols.', focusLabel: 'Lead Forums:', focus: 'Permanent Court of Arbitration (The Hague), ICC (Paris)', stat: '4 Sovereign Awards Sustained', button: 'Retain Counsel' },
              { id: 'p3', span: '6', icon: 'building', pillar: 'Pillar 03', tag: 'Corporate Governance', title: 'Cross-Border Venture M&A & Hostile Defense', desc: 'Emergency restraining orders, fiduciary breach shielding, and defense against activist hedge funds seeking to destabilize transformative strategic acquisitions.', focusLabel: 'Key Mandates:', focus: ['Delaware Court of Chancery preliminary injunctions', 'HSR / DOJ antitrust merger remedies', 'Special committee independent investigations'], stat: '100% Injunction Survival', button: 'Defend Transaction' },
              { id: 'p4', span: '6', icon: 'gavel', pillar: 'Pillar 04', tag: 'Supreme Benches', title: 'Appellate Advocacy & Supreme Court Review', desc: 'Formulating clean statutory pivots and delivering persuasive oral argument before federal circuit courts of appeals and the Supreme Court.', focusLabel: 'Supreme Circuit Track Record:', focus: 'Supreme Court of the United States, 2nd & D.C. Circuits', stat: '14 En Banc Reversals', button: 'File Appellate Motion' }
            ]
          }
        },
        {
          id: 'lawest_h', type: 'LawEstimator', title: 'Retainer Estimator', backgroundColor: '#F2F4E8', paddingY: 'py-20',
          components: {
            badge: { text: 'Transparent Engagement Architecture', styles: {} },
            title: { text: 'Configure your *retainer scope* & counsel allocation.', styles: { fontSize: '48px' } },
            subtitle: { text: 'Instant institutional estimate based on Chambers billing rates and court tempo.', styles: {} },
            labels: { matter: '01. Matter Classification', urgency: '02. Procedural Posture & Urgency', forum: '03. Forum / Jurisdiction' },
            baseRate: 1150,
            matterTypes: [
              { id: 'ai', label: 'Frontier AI & Generative IP Defense', hours: 120, retainer: 175000 },
              { id: 'energy', label: 'Clean Energy & Sovereign Treaty', hours: 160, retainer: 250000 },
              { id: 'ma', label: 'Venture M&A Injunction Defense', hours: 95, retainer: 150000 },
              { id: 'appeal', label: 'Circuit Court & Supreme Appeal', hours: 110, retainer: 165000 }
            ],
            urgencies: [
              { id: 'std', label: 'Standard Pace', desc: '60+ Day Filing Horizon', rateAdd: 0, mult: 1, team: 'Senior Counsel + 2 Specialized Litigators' },
              { id: 'acc', label: 'Accelerated', desc: '14-Day Motion Schedule', rateAdd: 250, mult: 1.25, team: 'Senior Counsel + 2 Specialized Litigators' },
              { id: 'emg', label: 'Emergency TRO', desc: '48-Hour Injunction', rateAdd: 500, mult: 1.6, team: 'Senior Counsel + 3 Dedicated Partners' }
            ],
            forums: [
              { id: 'fed', label: 'Federal Circuit / S.D.N.Y.', add: 0 },
              { id: 'del', label: 'Delaware Chancery Court', add: 0 },
              { id: 'arb', label: 'ICC / Permanent Court (Hague)', add: 50000 }
            ],
            resultTitle: 'Estimated Retainer Scope', tierLabel: 'Tier Verified',
            retainerLabel: 'Initial Engagement Trust Retainer', escrowNote: 'Fully segregated IOLTA escrow allocation.',
            rateLabel: 'Blended Hourly Rate:', windowLabel: 'Estimated Scope Window:', teamLabel: 'Assigned Counsel Team:',
            note: 'Includes initial conflict-of-interest clearance within 4 business hours and direct lead counsel briefing.',
            ctaButton: { label: 'Request Formal Retainer Agreement', link: '#', styles: { backgroundColor: '#7D8D39', color: '#ffffff', borderRadius: '12px' } }
          }
        },
        {
          id: 'lawmatters_h', type: 'LawMatters', title: 'Landmark Matters', backgroundColor: '#F7F7F4', paddingY: 'py-20',
          components: {
            badge: { text: 'Jurisprudential Record & Verdicts', styles: {} },
            title: { text: 'Landmark matters & *supreme bench* reversals.', styles: { fontSize: '48px' } },
            categories: ['All', 'Tech & AI Disputes', 'Clean Energy & ESG', 'Venture & M&A', 'Appellate Defense'],
            matters: [
              { id: 'mt1', docket: 'Docket No. 24-CV-8912', year: '2025', stake: '$2.4B Claim Value', category: 'Tech & AI Disputes', title: 'NeuralCompute Labs v. Global Publishing Guild', jurisdiction: 'U.S. Court of Appeals, Ninth Circuit', client: 'Generative AI Foundation Lab', synopsis: 'Mass copyright infringement class action alleging unlawful ingestion of 12 million copyrighted texts. Plaintiffs sought an injunction mandating destruction of the 70B parameter model weights.', strategy: 'Engineered an empirical computational transformation demonstration proving model weights do not retain expressive sequences, establishing transformative fair use.', outcome: 'Emergency Preliminary Injunction Vacated. Model Retained in Production.', quote: '“Statistical weight convergence is not duplication; it is machine learning of latent concepts.”' },
              { id: 'mt2', docket: 'PCA Case No. 2023-44', year: '2024', stake: '$1.15B Arbitral Award', category: 'Clean Energy & ESG', title: 'Nordic Clean Hydrogen Consortia v. Republic of Illyria', jurisdiction: 'Permanent Court of Arbitration (The Hague)', client: 'Green Energy Infrastructure Developer', synopsis: 'Arbitration under the Energy Charter Treaty over retroactive cancellation of 1.2GW offshore green hydrogen feeding tariffs by the respondent state.', strategy: 'Established violation of legitimate expectations and the fair and equitable treatment standard through unredacted inter-ministerial communications.', outcome: 'Unanimous Award for Claimants. Full Capital Expropriation Sustained.', quote: '“A sovereign nation cannot attract billions in private green capital on 30-year guarantees, only to repudiate its covenant.”' },
              { id: 'mt3', docket: 'C.A. No. 2024-0391-KSJM', year: '2024', stake: '$780M Acquisition', category: 'Venture & M&A', title: 'In Re Biosphere Genomics Strategic Merger', jurisdiction: 'Delaware Court of Chancery', client: 'Board of Directors & Majority Founders', synopsis: 'Activist minority shareholder consortium sought a temporary restraining order to block a merger with a Swiss pharmaceutical leader, claiming breach of Revlon duties.', strategy: 'Proved the special committee conducted a 14-month market check with 18 qualified bidders, immunizing the transaction under Corwin deference.', outcome: 'TRO Denied with Prejudice. Strategic Merger Consummated on Schedule.', quote: '' },
              { id: 'mt4', docket: 'No. 23-1104', year: '2023', stake: '$520M Spectrum Allocation', category: 'Appellate Defense', title: 'Vanguard Orbital Logistics v. Federal Communications Commission', jurisdiction: 'U.S. Court of Appeals, D.C. Circuit', client: 'Satellite Constellation Operator', synopsis: 'Petition for review challenging the FCC’s arbitrary revocation of orbital spectrum licenses under sudden retroactive rule interpretations.', strategy: 'Mounted an APA challenge showing the commission failed to provide reasoned explanation for its abrupt policy shift.', outcome: 'Commission Order Vacated and Remanded. Spectrum Rights Reinstated.', quote: '' }
            ]
          }
        },
        {
          id: 'lawtest_h', type: 'LawTestimonials', title: 'Endorsements', backgroundColor: '#F7F7F4', paddingY: 'py-20',
          components: {
            badge: { text: 'Institutional Endorsements', styles: {} },
            title: { text: 'Trusted by general counsels in *critical moments*.', styles: { fontSize: '48px' } },
            items: [
              { id: 't1', type: 'Frontier AI Copyright Defense', quote: 'When our generative model was targeted with a preliminary injunction that could have ended our company, Arthur and his team dismantled the plaintiffs’ arguments in 48 hours.', name: 'Dr. Elena Rostova', role: 'Chief Legal Officer', org: 'Synthetix AI Foundation' },
              { id: 't2', type: 'Permanent Court of Arbitration', quote: 'Their understanding of Energy Charter Treaty jurisprudence is peerless. They secured a $1.15B arbitral victory against a sovereign state.', name: 'Marcus Lindqvist', role: 'Managing Director', org: 'Nordic Clean Infrastructure Fund' },
              { id: 't3', type: 'Hostile Takeover Injunction', quote: 'In the Delaware Court of Chancery, precision and tempo are everything. Arthur’s team anticipated every hostile activist move.', name: 'Sarah Sterling, Esq.', role: 'General Counsel', org: 'Biosphere Therapeutics Inc.' }
            ]
          }
        },
        {
          id: 'lawchambers_h', type: 'LawChambers', title: 'Chambers', backgroundColor: '#F7F7F4', paddingY: 'py-20',
          components: {
            badge: { text: 'Chambers & Facilities', styles: {} },
            title: { text: 'Offices designed for *rigorous deliberation*.', styles: { fontSize: '48px' } },
            ctaButton: { label: 'Schedule In-Person Consultation', link: '#', styles: { backgroundColor: '#7D8D39', color: '#ffffff', borderRadius: '8px' } },
            gallery: [
              { id: 'g1', image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1400&q=80', tag: 'New York & Zurich', caption: 'Comprehensive Federal Reporter & International Commercial Arbitral Archives', note: 'Private briefing chambers equipped for multi-party secure depositions and encrypted tribunal hearings.' },
              { id: 'g2', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80', tag: 'Supreme Forums', caption: 'Direct Oral Advocacy & Appellate Appearances', note: 'Active trial and appellate presence across federal circuit courts and international arbitral seats.' }
            ],
            offices: [
              { id: 'o1', label: 'New York Chambers', street: '570 Lexington Avenue', line: '24th Floor, New York, NY 10022', phone: '+1 (212) 894-3200' },
              { id: 'o2', label: 'Zurich Chambers', street: 'Bahnhofstrasse 14', line: '8001 Zürich, Switzerland', phone: '+41 44 218 8000' },
              { id: 'o3', label: 'San Francisco Office', street: 'One Embarcadero Center', line: 'Suite 1900, San Francisco, CA 94111', phone: '+1 (415) 602-9100' }
            ]
          }
        },
        {
          id: 'lawfooter_h', type: 'LawFooter', title: 'Footer', backgroundColor: '#EFEFEA', paddingY: 'py-16',
          components: {
            logo: { text: 'HEMLOCK*.LAW*', styles: {} },
            about: 'Strategic counsel and appellate advocates dedicated to frontier artificial intelligence controversies, clean energy treaty arbitration, and high-stakes corporate defense.',
            creds: 'FCIArb · Lincoln’s Inn · New York Bar (1996)',
            practiceLabel: 'PRACTICE AREAS',
            practiceLinks: ['Frontier AI & IP Defense', 'Clean Energy Sovereign Arbitration', 'Venture M&A Injunction Defense', 'Appellate & Supreme Court Advocacy'],
            registryLabel: 'CHAMBERS REGISTRY',
            email: 'registry@hemlock.law',
            registryNote: 'Confidential wire available for emergency injunctive retainers.',
            ctaButton: { label: 'Retain Senior Counsel', link: '#', styles: { backgroundColor: '#7D8D39', color: '#ffffff', borderRadius: '8px' } },
            copyright: '© 1998–2026 Arthur Hemlock & Associates. All rights reserved.',
            disclaimer: 'Attorney Advertising · Prior results do not guarantee similar outcomes.'
          }
        }
      ]
    }
  },
  {
    id: 'theme_kairo_vance',
    title: 'Kairo Vance — Electronic Artist (Matcha Glass)',
    slug: 'kairo-vance',
    description: 'Daylight matcha-green glassmorphism theme for musicians: track list with player, tour dates with tickets, discography, merch, bio and newsletter.',
    allowedSections: ['MusicNavbar', 'MusicHero', 'MusicTracks', 'MusicTour', 'MusicDisco', 'MusicMerch', 'MusicAbout', 'MusicFooter'],
    badge: 'Music',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    price: 0,
    currency: 'USD',
    accentColor: '#244B20',
    fontFamily: 'Outfit',
    themeStyle: 'glass',
    initialSchema: {
      themeId: 'theme_kairo_vance',
      title: 'Kairo Vance — Solaris Nocturne',
      authorName: 'KAIRO VANCE',
      role: 'Electronic Producer & Multi-Instrumentalist',
      fontFamily: 'Outfit',
      accentColor: '#244B20',
      sections: [
        {
          id: 'mnav_k', type: 'MusicNavbar', title: 'Navigation', backgroundColor: '#F3F6F1', paddingY: 'py-5',
          components: {
            logo: { text: 'KAIRO VANCE', styles: { color: '#1B3817' } },
            links: [
              { id: 'n1', label: 'Music', target: '#music' },
              { id: 'n2', label: 'Tour Dates', target: '#tour' },
              { id: 'n3', label: 'Releases', target: '#discography' },
              { id: 'n4', label: 'Artist Bio', target: '#about' },
              { id: 'n5', label: 'Vault & Merch', target: '#merch' }
            ],
            ctaButton: { label: 'TOUR TICKETS', link: '#tour', styles: { backgroundColor: '#244B20', color: '#ffffff', borderRadius: '2px' } }
          }
        },
        {
          id: 'mhero_k', type: 'MusicHero', title: 'Hero', backgroundColor: '#F3F6F1', paddingY: 'py-16',
          components: {
            badge: { text: 'New Album & World Tour 2026 · Daylight Vinyl Edition Out Now', styles: { color: '#3D7532' } },
            title: { text: 'SOLARIS\n*NOCTURNE*', styles: { fontSize: '72px', color: '#163013' } },
            subtitle: { text: 'Subterranean analog warmth meets botanical modular architectures. The groundbreaking sophomore studio record from producer and multi-instrumentalist Kairo Vance explores the resonant frequencies of Berlin, London, and Tokyo.', styles: { color: '#354F32' } },
            meta: ['11 Tracks', '48 Minutes', 'Metropolis London Mastered', '24-Bit Lossless'],
            ctaButton: { label: 'Play Title Track', link: '#music', styles: { backgroundColor: '#244B20', color: '#ffffff', borderRadius: '2px', padding: '14px 24px' } },
            secondaryButton: { label: 'Tour Dates', link: '#tour', styles: { borderRadius: '2px', padding: '14px 24px' } },
            linkButton: { label: 'Explore Discography', link: '#discography' },
            avatar: { src: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80', alt: 'Kairo Vance modular synthesizer session', styles: {} },
            cardLabel: 'Synthesizer Session · Live Audio',
            cardTitle: 'Solaris Nocturne — Daylight Modular Cut',
            kpis: [
              { id: 'k1', value: '84.2M+', label: 'Global Audio Streams', accent: false },
              { id: 'k2', value: '18 Dates', label: '2026–2027 World Arena Tour', accent: false },
              { id: 'k3', value: '8.8 / 10', label: 'Pitchfork Best New Track', accent: true },
              { id: 'k4', value: '100%', label: 'Analog Hardware & Tape Mastered', accent: false }
            ]
          }
        },
        {
          id: 'mtracks_k', type: 'MusicTracks', title: 'Tracks', backgroundColor: '#EFF5EB', paddingY: 'py-20',
          components: {
            badge: { text: 'Discography & Studio Recordings', styles: {} },
            title: { text: 'Latest Tracks & Soundscapes', styles: { fontSize: '36px' } },
            categories: [
              { id: 'all', label: 'All Tracks' }, { id: 'singles', label: 'Singles' }, { id: 'albums', label: 'Album Cuts' },
              { id: 'instrumentals', label: 'Modular' }, { id: 'remixes', label: 'Remixes' }
            ],
            tracks: [
              { id: 'tr1', title: 'Solaris Nocturne', album: 'Solaris Nocturne (LP)', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80', duration: '4:18', bpm: 118, key: 'D Minor', releaseDate: 'October 2026', category: 'singles', isNew: true, plays: '14.8M', genre: 'Melodic Ambient / Neo-Techno', synopsis: 'A hypnotic tapestry of detuned analog oscillators, subterranean sub-bass, and soaring modular arpeggios recorded at Funkhaus Berlin.', lyrics: ['[Intro: Warm tape saturation, modular pulse]', 'In the twilight between memory and light', 'We drift through the frequency of night', '', '[Chorus]', 'Hold the wave, don’t let it fade away', 'Solaris calls before the break of day'], credits: { production: 'Kairo Vance', mix: 'Marta Salogni (Studio 13, London)', mastering: 'Matt Colton (Metropolis Mastering)', instruments: ['Prophet-6', 'Moog Sub 37', 'Eurorack Modular', 'Oberheim OB-6'] }, audioUrl: '' },
              { id: 'tr2', title: 'Kinetic Resonance', album: 'Sonic Resonance (EP)', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80', duration: '3:52', bpm: 124, key: 'A Minor', releaseDate: 'September 2026', category: 'singles', isNew: true, plays: '9.2M', genre: 'Deep Hypnotic House', synopsis: 'Rhythmic kinetic pulses driven by acoustic percussion samples blended with tape-delayed loops and vintage polyphonic brass.', lyrics: ['[Instrumental Build]', 'Resonance across the floor', 'Vibrations we cannot ignore'], credits: { production: 'Kairo Vance & Hélène Mercier', mix: 'Kairo Vance', mastering: 'Heba Kadry (Brooklyn, NY)', instruments: ['Korg MS-20', 'TR-909 Drum Machine', 'Custom Granular Reverb'] }, audioUrl: '' },
              { id: 'tr3', title: 'Midnight Monolith', album: 'Solaris Nocturne (LP)', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80', duration: '5:04', bpm: 106, key: 'F Minor', releaseDate: 'August 2026', category: 'albums', isNew: false, plays: '11.4M', genre: 'Cinematic Downtempo', synopsis: 'A cinematic slow-burn anthem built on processed upright piano chords washed in infinite convolution reverb.', lyrics: ['Standing in the shadow of the monolith', 'Ancient stories told without a myth'], credits: { production: 'Kairo Vance', mix: 'Alan Moulder', mastering: 'Matt Colton', instruments: ['Yamaha U3 Upright Piano', 'Strymon BigSky', 'Mellotron M4000D'] }, audioUrl: '' },
              { id: 'tr4', title: 'Tokyo Driftwood (Live Rework)', album: 'Live at Liquidroom Tokyo', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80', duration: '4:45', bpm: 120, key: 'E Minor', releaseDate: 'July 2026', category: 'instrumentals', isNew: false, plays: '6.7M', genre: 'Modular Live Improv', synopsis: 'Recorded live in Shibuya, Tokyo. Pure generative modular improvisations over a driving broken beat foundation.', lyrics: ['[Recorded live in Tokyo, Japan]'], credits: { production: 'Kairo Vance', mix: 'Kairo Vance', mastering: 'Metropolis London', instruments: ['Make Noise Shared System', 'Elektron Octatrack', 'Roland TR-8S'] }, audioUrl: '' },
              { id: 'tr5', title: 'Chroma Cascade (Club Rework)', album: 'Frequencies Remixed', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80', duration: '5:28', bpm: 128, key: 'C Minor', releaseDate: 'June 2026', category: 'remixes', isNew: false, plays: '4.9M', genre: 'Peak-Time Melodic Techno', synopsis: 'Extended festival edition with soaring acid bassline filters and heavy acoustic kick-drum weight.', lyrics: ['[Acid 303 filter modulation]', 'Cascading colors in the dark'], credits: { production: 'Kairo Vance', mix: 'Kairo Vance', mastering: 'Heba Kadry', instruments: ['Roland TB-303', 'Sequential Prophet-6', 'Moog Minitaur'] }, audioUrl: '' }
            ],
            gearLabel: 'Studio Gear Signature:',
            gearText: ' Sequential Prophet-6 · Moog Sub 37 · Oberheim OB-6 · Roland Juno-106 · Studer A800 24-Track Tape',
            gearRight: 'Metropolis London Mastered · 96kHz / 24-bit Lossless'
          }
        },
        {
          id: 'mtour_k', type: 'MusicTour', title: 'Tour Dates', backgroundColor: '#F4F7F2', paddingY: 'py-20',
          components: {
            badge: { text: 'World Arena & Amphitheater Tour 2026–2027', styles: {} },
            title: { text: 'The Solaris Tour Dates', styles: { fontSize: '48px' } },
            subtitle: { text: 'An immersive audiovisual daylight & twilight experience featuring botanical monolithic light columns, live analog synthesizer rigs, and 360-degree spatial sound.', styles: {} },
            regions: [{ id: 'all', label: 'All Regions' }, { id: 'Europe', label: 'Europe' }, { id: 'North America', label: 'North America' }, { id: 'Asia & Pacific', label: 'Asia & Pacific' }],
            bannerImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80',
            bannerTag: 'Sunset Amphitheater Production',
            bannerTitle: 'Monolithic Emerald Light & Spatial Acoustics',
            bannerNote: 'VIP Soundcheck & Modular Workshop Passes Available',
            dates: [
              { id: 'd1', month: 'NOV', day: '18', year: '2026', city: 'London', country: 'United Kingdom', venue: 'Roundhouse Camden', status: 'selling-fast', region: 'Europe', doors: '19:00', support: 'Kiasmos (DJ Set)', price: 38 },
              { id: 'd2', month: 'NOV', day: '22', year: '2026', city: 'Berlin', country: 'Germany', venue: 'Funkhaus Berlin (Saal 1)', status: 'low-inventory', region: 'Europe', doors: '20:00', support: 'Christian Löffler', price: 42 },
              { id: 'd3', month: 'NOV', day: '26', year: '2026', city: 'Amsterdam', country: 'Netherlands', venue: 'Paradiso Main Hall', status: 'available', region: 'Europe', doors: '19:30', support: 'Rival Consoles', price: 35 },
              { id: 'd4', month: 'JAN', day: '14', year: '2027', city: 'New York', country: 'United States', venue: 'Brooklyn Steel', status: 'selling-fast', region: 'North America', doors: '20:00', support: 'Tycho (Live Ensemble)', price: 45 },
              { id: 'd5', month: 'FEB', day: '12', year: '2027', city: 'Tokyo', country: 'Japan', venue: 'Liquidroom Shibuya', status: 'selling-fast', region: 'Asia & Pacific', doors: '18:30', support: 'Shinichi Atobe', price: 55 }
            ],
            tiers: [
              { id: 'ga', name: 'General Admission Floor', desc: 'Standing access to the main floor in front of the lighting columns.', delta: 0 },
              { id: 'balcony', name: 'Tier 1 Reserved Mezzanine', desc: 'Elevated central sightlines with dedicated cocktail bar access.', delta: 25 },
              { id: 'vip', name: 'VIP Modular Soundcheck Experience', desc: 'Pre-show access to the modular synthesizer soundcheck & Q&A.', delta: 85 }
            ],
            vip: { title: 'Looking for VIP Soundcheck & Modular Masterclass Access?', text: 'Select any tour date and choose the VIP Soundcheck package to join Kairo Vance on stage before doors open.', button: 'Explore VIP Packages' }
          }
        },
        {
          id: 'mdisco_k', type: 'MusicDisco', title: 'Discography', backgroundColor: '#EFF5EB', paddingY: 'py-20',
          components: {
            badge: { text: 'Physical Editions & Releases', styles: {} },
            title: { text: 'Featured Discography', styles: { fontSize: '48px' } },
            subtitle: { text: 'Pressed on 180g heavyweight audiophile bio-vinyl. Full-range dynamic mastering for tube amplifiers and hi-fi listening systems.', styles: {} },
            storeLabel: 'Vinyl Store', storeTarget: '#merch',
            albums: [
              { id: 'a1', title: 'Solaris Nocturne', subtitle: 'Studio Album · 2026', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=900&q=80', tracks: 11, duration: '48 min', desc: 'A monument to modern analog production, weaving expansive modular synthesizer textures with delicate acoustic intimacy.', formats: ['Gatefold 2xLP Holographic Vinyl', 'Lossless 24-Bit FLAC', 'Deluxe CD Box'] },
              { id: 'a2', title: 'Sonic Resonance', subtitle: 'Contemporary Vinyl EP · 2024', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80', tracks: 6, duration: '27 min', desc: 'Explorations in kinetic wave acoustics, recorded with custom tape delays and resonant sub frequencies.', formats: ['12" Heavyweight Vinyl 180g', 'Digital Edition'] }
            ]
          }
        },
        {
          id: 'mmerch_k', type: 'MusicMerch', title: 'Merch', backgroundColor: '#F4F7F2', paddingY: 'py-20',
          components: {
            badge: { text: 'Official Merch & Collector Physicals', styles: {} },
            title: { text: 'The Vault Store', styles: { fontSize: '48px' } },
            perks: ['Worldwide Shipping', 'Direct From Artist'],
            items: [
              { id: 'm1', title: 'Solaris Nocturne 2xLP Holographic Vinyl', type: 'Vinyl Record', price: 48, edition: 'Limited Edition 1,500 copies', image: 'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?auto=format&fit=crop&w=800&q=80', sizes: [] },
              { id: 'm2', title: 'Tour Heavyweight 480GSM Boxy Hoodie', type: 'Apparel', price: 95, edition: 'Solaris Tour 2026 Official', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80', sizes: ['S', 'M', 'L', 'XL', '2XL'] },
              { id: 'm3', title: 'Kinetic Audio Cassette + Synth Patches', type: 'Collector Tape', price: 28, edition: 'Hand-numbered edition of 500', image: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?auto=format&fit=crop&w=800&q=80', sizes: [] }
            ]
          }
        },
        {
          id: 'mabout_k', type: 'MusicAbout', title: 'Artist Bio', backgroundColor: '#EFF5EB', paddingY: 'py-20',
          components: {
            badge: { text: 'Artist Biography & Narrative', styles: {} },
            title: { text: 'Crafting Sonic Architecture In Daylight', styles: { fontSize: '48px' } },
            bio: { text: 'Born between the botanical warehouse tape-loop scene of East London and the cavernous daylight studios of Berlin’s Funkhaus, KAIRO VANCE has emerged as one of modern music’s most arresting electronic composers.', styles: {} },
            bio2: { text: 'Refusing to rely on digital presets or cold screen simulations, Kairo sculpts every sound from organic voltages, raw analog circuitry, kinetic tape loop degradation, and generative modular patches.', styles: {} },
            avatar: { src: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80', alt: 'Kairo Vance in daylight studio session', styles: {} },
            rigLabel: 'Primary Studio Rig',
            rigText: 'Custom Ivory Modular (Doepfer / Make Noise) · Prophet-6 · Neve 1073 Preamps',
            ctaButton: { label: 'Booking Inquiries', link: '#', styles: { backgroundColor: '#244B20', color: '#ffffff', borderRadius: '2px' } },
            secondaryButton: { label: 'Download Press Kit', link: '#', styles: { borderRadius: '2px' } },
            pressLabel: 'Critical Acclaim & Press',
            press: [
              { id: 'p1', quote: 'A breathtaking collision of modular wizardry and deeply felt human emotion. Kairo Vance is redefining modern electronic composition.', publication: 'Pitchfork', rating: '8.8 Best New Music' },
              { id: 'p2', quote: 'The live show is a sensory architectural marvel. Towering soundscapes that transport thousands into another realm entirely.', publication: 'Resident Advisor', rating: 'Live Review of the Year' },
              { id: 'p3', quote: 'Sleek, nocturnal, and relentlessly inventive. An essential landmark in 2020s electronica.', publication: 'The Guardian', rating: '★★★★★' }
            ],
            manifesto: { text: 'Music isn’t about clinical digital precision. It’s the micro-imperfections in the voltage—the warm flutter of tape and the acoustic breath of physical space—that remind us we are human.' }
          }
        },
        {
          id: 'mfoot_k', type: 'MusicFooter', title: 'Footer', backgroundColor: '#E8EFE4', paddingY: 'py-16',
          components: {
            badge: { text: 'The Daylight Dispatch', styles: {} },
            title: { text: 'Join The Inner Frequency Circle', styles: {} },
            text: { text: 'Receive secret amphitheater tour locations, 48-hour presale codes, unreleased modular tape sketches, and vinyl vault drops.', styles: {} },
            placeholder: 'Enter your email address...',
            joinLabel: 'Join',
            successText: 'You’re on the list. Check your inbox for the presale key.',
            brand: 'KAIRO VANCE',
            label: 'Nocturne Recordings London · Berlin',
            socials: [
              { id: 's1', label: 'Spotify', url: 'https://spotify.com' },
              { id: 's2', label: 'Apple Music', url: 'https://music.apple.com' },
              { id: 's3', label: 'Bandcamp', url: 'https://bandcamp.com' },
              { id: 's4', label: 'YouTube', url: 'https://youtube.com' },
              { id: 's5', label: 'Instagram', url: 'https://instagram.com' },
              { id: 's6', label: 'SoundCloud', url: 'https://soundcloud.com' }
            ],
            copyright: '© 2026 Kairo Vance. All rights reserved.'
          }
        }
      ]
    }
  },
];