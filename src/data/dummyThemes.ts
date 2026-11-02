import { ThemeMetadata } from '../types/portfolio';

export const DUMMY_THEMES: ThemeMetadata[] = [
  {
    id: 'theme_kai_ross',
    title: 'Kai Ross — Cinema & Stills (Videographer)',
    slug: 'kai-ross',
    description: 'Exact replica of the Kai Ross high-fashion cinematography & fine monochrome stills portfolio. Features 35mm continuous film strips, asymmetric Selected Works catalog, interactive Color Lab LUT comparison slider, Equipment Vault, and Production Rates Estimator.',
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
          id: 'hero_kai_ross',
          type: 'Hero',
          title: 'Hero Header',
          backgroundColor: '#ffffff',
          paddingY: 'py-16',
          components: {
            badge: {
              text: 'DIRECTOR OF PHOTOGRAPHY | CINEMATOGRAPHY & FINE STILLS | NEW YORK & PARIS',
              styles: {
                fontSize: '11px',
                color: '#64748b',
                fontWeight: '600'
              }
            },
            title: {
              text: 'SCULPTING LIGHT, SHADOW & STILLNESS.',
              styles: {
                fontSize: '56px',
                color: '#000000',
                fontWeight: '800',
                textAlign: 'left',
                lineHeight: '1.08',
                letterSpacing: '-0.02em'
              }
            },
            subtitle: {
              text: 'Specializing in high-contrast narrative cinematography, luxury fashion films, and fine art monochrome portraiture. Working across 35mm motion picture nitrate and calibrated large-format digital sensors.',
              styles: {
                fontSize: '15px',
                color: '#475569',
                fontWeight: '400',
                textAlign: 'left',
                lineHeight: '1.6'
              }
            },
            cameraSpecs: 'LEICA M11 MONOCHROM · 50mm Noctilux · f/0.95 ASPH · ISO 64 · 1/500s NATURAL CHIAROSCURO',
            avatar: {
              src: '/assets/kai-ross/hero_portrait.jpg',
              alt: 'Kai Ross DP Monochrom Still',
              styles: {}
            },
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            ctaButton: {
              label: 'PLAY 2026 SHOWREEL [02:45]',
              link: '#showreel',
              styles: {
                backgroundColor: '#000000',
                color: '#ffffff',
                borderRadius: '8px',
                fontWeight: '700',
                padding: '14px 28px'
              }
            },
            secondaryButton: {
              label: 'SELECTED WORKS ↓',
              link: '#selected-works-section',
              styles: {
                backgroundColor: '#ffffff',
                color: '#000000',
                borderRadius: '8px',
                fontWeight: '700',
                borderColor: '#e2e8f0',
                borderWidth: '1px',
                padding: '14px 28px'
              }
            }
          }
        },
        {
          id: 'showreel_kai_ross',
          type: 'Showreel',
          title: 'Curated Film Strips & Showreel',
          backgroundColor: '#ffffff',
          paddingY: 'py-20',
          components: {
            title: {
              text: 'CURATED FILM STRIPS & SHOWREEL',
              styles: {
                fontSize: '36px',
                color: '#000000',
                fontWeight: '800',
                textAlign: 'left'
              }
            },
            subtitle: {
              text: 'Continuous sequence reel shot across 35mm nitrate and large-format sensors. Scroll or drag horizontally to inspect individual frame takes.',
              styles: {
                fontSize: '14px',
                color: '#475569'
              }
            }
          }
        },
        {
          id: 'films_kai_ross',
          type: 'Films',
          title: 'Selected Works',
          backgroundColor: '#ffffff',
          paddingY: 'py-24',
          components: {
            title: {
              text: 'SELECTED WORKS',
              styles: {
                fontSize: '36px',
                color: '#000000',
                fontWeight: '800',
                textAlign: 'left'
              }
            },
            subtitle: {
              text: 'Cinematic projects and fine art still monographs engineered with deliberate lighting, bespoke optical packages, and fine silver halation.',
              styles: {
                fontSize: '14px',
                color: '#475569'
              }
            }
          }
        },
        {
          id: 'colorlab_kai_ross',
          type: 'ColorLab',
          title: 'Color Lab & Emulsion Archive',
          backgroundColor: '#ffffff',
          paddingY: 'py-20',
          components: {
            title: {
              text: 'COLOR LAB & EMULSION ARCHIVE',
              styles: {
                fontSize: '36px',
                color: '#000000',
                fontWeight: '800',
                textAlign: 'left'
              }
            },
            subtitle: {
              text: 'Interactive Before/After look comparison across monochrome silver halide, Kodak 2383, and ENR bleach bypass.',
              styles: {
                fontSize: '14px',
                color: '#475569'
              }
            }
          }
        },
        {
          id: 'gear_kai_ross',
          type: 'Gear',
          title: 'Equipment Vault',
          backgroundColor: '#ffffff',
          paddingY: 'py-24',
          components: {
            title: {
              text: 'EQUIPMENT VAULT',
              styles: {
                fontSize: '36px',
                color: '#000000',
                fontWeight: '800',
                textAlign: 'left'
              }
            },
            subtitle: {
              text: 'Owned cinema packages and bespoke vintage glass calibrated for immediate worldwide deployment.',
              styles: {
                fontSize: '14px',
                color: '#475569'
              }
            }
          }
        },
        {
          id: 'rates_kai_ross',
          type: 'Rates',
          title: 'Production Rates Estimator',
          backgroundColor: '#ffffff',
          paddingY: 'py-24',
          components: {
            title: {
              text: 'PRODUCTION RATES ESTIMATOR',
              styles: {
                fontSize: '36px',
                color: '#000000',
                fontWeight: '800',
                textAlign: 'left'
              }
            },
            subtitle: {
              text: 'Configure your technical scope, optical requirements, and post-production deliverables to generate an immediate estimated investment range.',
              styles: {
                fontSize: '14px',
                color: '#475569'
              }
            }
          }
        },
        {
          id: 'footer_kai_ross',
          type: 'Footer',
          title: 'Representation & Inquiries',
          backgroundColor: '#ffffff',
          paddingY: 'py-16',
          components: {}
        }
      ]
    }
  },
  {
    id: 'theme_developer_dark',
    title: 'Developer Terminal & Bento',
    slug: 'developer-terminal',
    description: 'Clean dark-mode aesthetic for software engineers, full-stack builders, and systems architects.',
    badge: 'Popular',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    price: 0,
    currency: 'USD',
    accentColor: '#10b981',
    fontFamily: 'Plus Jakarta Sans',
    themeStyle: 'dark',
    initialSchema: {
      themeId: 'theme_developer_dark',
      title: 'Ibrahim Rabbi — Full-Stack Engineer',
      authorName: 'Ibrahim Rabbi',
      role: 'Full-Stack Software Engineer',
      fontFamily: 'Plus Jakarta Sans',
      accentColor: '#10b981',
      sections: [
        {
          id: 'hero_section_1',
          type: 'Hero',
          title: 'Hero Section',
          backgroundColor: '#090d16',
          paddingY: 'py-24',
          components: {
            badge: {
              text: 'Available for high-impact roles & contract engineering',
              styles: {
                fontSize: '13px',
                color: '#10b981',
                fontWeight: '500',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '6px',
                padding: '4px 12px',
                textAlign: 'left'
              }
            },
            title: {
              text: 'Building robust distributed systems and modern web interfaces',
              styles: {
                fontSize: '48px',
                color: '#f8fafc',
                fontWeight: '700',
                textAlign: 'left',
                lineHeight: '1.15'
              }
            },
            subtitle: {
              text: 'Hi, I am Ibrahim. A software engineer focused on high-throughput backend services, React web applications, and developer productivity tools.',
              styles: {
                fontSize: '18px',
                color: '#94a3b8',
                fontWeight: '400',
                textAlign: 'left',
                lineHeight: '1.6'
              }
            },
            ctaButton: {
              label: 'Explore Projects',
              link: '#projects',
              styles: {
                backgroundColor: '#10b981',
                color: '#090d16',
                borderRadius: '8px',
                fontWeight: '600',
                padding: '12px 24px'
              }
            },
            secondaryButton: {
              label: 'Get in Touch',
              link: '#contact',
              styles: {
                backgroundColor: 'rgba(255,255,255,0.06)',
                color: '#f8fafc',
                borderRadius: '8px',
                fontWeight: '500',
                borderColor: 'rgba(255,255,255,0.12)',
                borderWidth: '1px',
                padding: '12px 24px'
              }
            },
            avatar: {
              src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
              alt: 'Ibrahim Rabbi Portrait',
              styles: {
                borderRadius: '16px',
                maxWidth: '120px'
              }
            }
          }
        },
        {
          id: 'about_section_1',
          type: 'About',
          title: 'About Section',
          backgroundColor: '#0c111d',
          paddingY: 'py-20',
          components: {
            title: {
              text: 'Architectural Philosophy & Focus',
              styles: {
                fontSize: '32px',
                color: '#f8fafc',
                fontWeight: '700',
                textAlign: 'left'
              }
            },
            subtitle: {
              text: 'Bridging resilient backend infrastructures with fluid, tactile user interfaces.',
              styles: {
                fontSize: '16px',
                color: '#10b981',
                fontWeight: '500',
                textAlign: 'left'
              }
            },
            bio: {
              text: 'With over 5 years of engineering experience across fast-paced product teams, I specialize in architecting scalable Node.js services, resilient relational and document database pipelines, and high-performance React frontends.',
              styles: {
                fontSize: '16px',
                color: '#cbd5e1',
                lineHeight: '1.7',
                textAlign: 'left'
              }
            }
          }
        },
        {
          id: 'projects_section_1',
          type: 'Projects',
          title: 'Featured Works',
          backgroundColor: '#090d16',
          paddingY: 'py-20',
          components: {
            title: {
              text: 'Selected Production Systems',
              styles: {
                fontSize: '32px',
                color: '#f8fafc',
                fontWeight: '700',
                textAlign: 'left'
              }
            },
            subtitle: {
              text: 'A showcase of open source libraries, commercial platforms, and experimental developer tools.',
              styles: {
                fontSize: '16px',
                color: '#94a3b8',
                textAlign: 'left'
              }
            },
            projects: [
              {
                id: 'proj_1',
                title: 'DataMesh ETL Streaming Engine',
                description: 'Real-time telemetry pipeline processing 45k events/sec with sub-second OLAP latency.',
                tag: 'Distributed Systems',
                link: 'https://github.com',
                year: '2026',
                imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80'
              },
              {
                id: 'proj_2',
                title: 'CraftFlow Visual Canvas Engine',
                description: 'Drag-and-drop schema-driven site builder with live AST compilation and debounced sync.',
                tag: 'React / Webflow Engine',
                link: 'https://github.com',
                year: '2025',
                imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80'
              },
              {
                id: 'proj_3',
                title: 'KubeVault Secret Manager',
                description: 'Zero-trust cryptographic key distribution proxy for containerized microservices.',
                tag: 'Go / Security',
                link: 'https://github.com',
                year: '2024',
                imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80'
              }
            ]
          }
        },
        {
          id: 'skills_section_1',
          type: 'Skills',
          title: 'Skills & Stack',
          backgroundColor: '#0c111d',
          paddingY: 'py-20',
          components: {
            title: {
              text: 'Technical Competencies',
              styles: {
                fontSize: '32px',
                color: '#f8fafc',
                fontWeight: '700',
                textAlign: 'left'
              }
            },
            subtitle: {
              text: 'Core languages, backend runtimes, database engines, and UI toolkits.',
              styles: {
                fontSize: '16px',
                color: '#94a3b8',
                textAlign: 'left'
              }
            },
            skills: [
              { name: 'TypeScript', category: 'Languages', level: 95 },
              { name: 'React 19 / Next.js', category: 'Frontend', level: 90 },
              { name: 'Node.js / Express', category: 'Backend', level: 92 },
              { name: 'PostgreSQL / Mongoose', category: 'Databases', level: 88 },
              { name: 'Tailwind CSS', category: 'Frontend', level: 95 },
              { name: 'Framer Motion', category: 'Frontend', level: 85 },
              { name: 'Docker / Redis', category: 'DevOps', level: 82 },
              { name: 'Craft.js / AST Visual Engines', category: 'Architecture', level: 90 }
            ]
          }
        },
        {
          id: 'contact_section_1',
          type: 'Contact',
          title: 'Contact',
          backgroundColor: '#090d16',
          paddingY: 'py-24',
          components: {
            title: {
              text: 'Let\'s collaborate on your next project',
              styles: {
                fontSize: '36px',
                color: '#f8fafc',
                fontWeight: '700',
                textAlign: 'center'
              }
            },
            subtitle: {
              text: 'Always excited to discuss new software architecture, consulting, or full-time opportunities.',
              styles: {
                fontSize: '16px',
                color: '#94a3b8',
                textAlign: 'center'
              }
            },
            ctaButton: {
              label: 'Say Hello via Email',
              link: 'mailto:ibrahimrabbihere@gmail.com',
              styles: {
                backgroundColor: '#10b981',
                color: '#090d16',
                borderRadius: '8px',
                fontWeight: '600',
                padding: '14px 28px'
              }
            },
            contactEmail: 'ibrahimrabbihere@gmail.com',
            contactLocation: 'Remote Worldwide · UTC+6'
          }
        }
      ]
    }
  },
  {
    id: 'theme_creative_bento',
    title: 'Creative Bento & Studio',
    slug: 'creative-bento',
    description: 'Minimalist editorial aesthetic with indigo hues, subtle borders, and showcase bento boxes.',
    badge: 'Design First',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=600&q=80',
    price: 0,
    currency: 'USD',
    accentColor: '#6366f1',
    fontFamily: 'Plus Jakarta Sans',
    themeStyle: 'dark',
    initialSchema: {
      themeId: 'theme_creative_bento',
      title: 'Ibrahim Rabbi — Design Engineer',
      authorName: 'Ibrahim Rabbi',
      role: 'Design Engineer & Creative Technologist',
      fontFamily: 'Plus Jakarta Sans',
      accentColor: '#6366f1',
      sections: [
        {
          id: 'hero_section_bento',
          type: 'Hero',
          title: 'Hero Section',
          backgroundColor: '#030712',
          paddingY: 'py-28',
          components: {
            badge: {
              text: 'Design Systems · Creative Frontends · Interaction Engineering',
              styles: {
                fontSize: '13px',
                color: '#818cf8',
                fontWeight: '500',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderRadius: '6px',
                padding: '4px 12px',
                textAlign: 'center'
              }
            },
            title: {
              text: 'Crafting digital products at the intersection of design and code',
              styles: {
                fontSize: '52px',
                color: '#ffffff',
                fontWeight: '800',
                textAlign: 'center',
                lineHeight: '1.1'
              }
            },
            subtitle: {
              text: 'Specializing in design tokens, component architecture, and fluid physics-based micro-interactions.',
              styles: {
                fontSize: '18px',
                color: '#9ca3af',
                fontWeight: '400',
                textAlign: 'center',
                lineHeight: '1.6'
              }
            },
            ctaButton: {
              label: 'View Case Studies',
              link: '#projects',
              styles: {
                backgroundColor: '#6366f1',
                color: '#ffffff',
                borderRadius: '10px',
                fontWeight: '600',
                padding: '12px 28px'
              }
            }
          }
        },
        {
          id: 'projects_bento',
          type: 'Projects',
          title: 'Works',
          backgroundColor: '#030712',
          paddingY: 'py-20',
          components: {
            title: {
              text: 'Selected Case Studies',
              styles: {
                fontSize: '36px',
                color: '#ffffff',
                fontWeight: '700',
                textAlign: 'left'
              }
            },
            subtitle: {
              text: 'End-to-end design systems and applications delivered with precision.',
              styles: {
                fontSize: '16px',
                color: '#9ca3af',
                textAlign: 'left'
              }
            },
            projects: [
              {
                id: 'p1',
                title: 'Lumina Design System',
                description: 'Component library powering 14 SaaS web apps with unified Figma tokens.',
                tag: 'Design Systems',
                link: '#',
                year: '2026',
                imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'
              },
              {
                id: 'p2',
                title: 'Aura Spatial Audio Studio',
                description: 'Browser-based 3D sound spatializer built with Web Audio and Canvas.',
                tag: 'Creative Tech',
                link: '#',
                year: '2025',
                imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80'
              }
            ]
          }
        }
      ]
    }
  },
  {
    id: 'theme_editorial_serif',
    title: 'Editorial & Monograph',
    slug: 'editorial-serif',
    description: 'Serif typography, generous whitespace, and luxury publication layout for consultants & leads.',
    badge: 'Editorial',
    thumbnailUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80',
    price: 0,
    currency: 'USD',
    accentColor: '#d97706',
    fontFamily: 'Playfair Display',
    themeStyle: 'light',
    initialSchema: {
      themeId: 'theme_editorial_serif',
      title: 'Ibrahim Rabbi — Product Architect & Strategist',
      authorName: 'Ibrahim Rabbi',
      role: 'Principal Product Architect & Consultant',
      fontFamily: 'Playfair Display',
      accentColor: '#d97706',
      sections: [
        {
          id: 'hero_serif',
          type: 'Hero',
          title: 'Hero Monograph',
          backgroundColor: '#0f172a',
          paddingY: 'py-24',
          components: {
            badge: {
              text: 'Executive Portfolio · Architecture Advisory',
              styles: {
                fontSize: '13px',
                color: '#f59e0b',
                fontWeight: '500',
                padding: '4px 0px',
                textAlign: 'left'
              }
            },
            title: {
              text: 'Architecting digital systems with lasting clarity and scale.',
              styles: {
                fontSize: '46px',
                color: '#f8fafc',
                fontWeight: '600',
                textAlign: 'left',
                lineHeight: '1.2'
              }
            },
            subtitle: {
              text: 'Guiding engineering teams from zero-to-one product development to fault-tolerant global deployments.',
              styles: {
                fontSize: '18px',
                color: '#94a3b8',
                fontWeight: '400',
                textAlign: 'left',
                lineHeight: '1.7'
              }
            },
            ctaButton: {
              label: 'Request Strategy Consultation',
              link: '#contact',
              styles: {
                backgroundColor: '#f59e0b',
                color: '#0f172a',
                borderRadius: '4px',
                fontWeight: '600',
                padding: '14px 28px'
              }
            }
          }
        }
      ]
    }
  }
];
