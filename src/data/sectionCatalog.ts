import React from 'react';
import { SectionType } from '../types/portfolio';
import { LayoutTemplate, Film, Clapperboard, SlidersHorizontal, Camera, Calculator, PanelTop, BarChart3, PanelBottom,  Map, Building2, Type, LayoutGrid, ListOrdered, Quote, Gavel, Scale, UserRound, ShoppingBag, Disc, Ticket, Music, Mic2, } from 'lucide-react';
 

export interface SectionCatalogItem {
    type: SectionType;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}

export const SECTION_CATALOG: SectionCatalogItem[] = [
    { type: 'Navbar', title: 'Navigation Bar', description: 'Logo, menu links and CTA button', icon: PanelTop },
    { type: 'Hero', title: 'Hero Header', description: 'Headline, bio summary, CTA buttons, and portrait', icon: LayoutTemplate },
    { type: 'Stats', title: 'Stats Strip', description: 'Key numbers and achievements', icon: BarChart3 },
    { type: 'Showreel', title: 'Cinematic Showreel', description: 'Film strip and director reel', icon: Film },
    { type: 'Films', title: 'Selected Works', description: 'Project cards with poster, video and specs', icon: Clapperboard },
    { type: 'ColorLab', title: 'Color Lab', description: 'Before/After look comparison slider', icon: SlidersHorizontal },
    { type: 'Gear', title: 'Equipment Vault', description: 'Cameras, lenses, gimbals, drones', icon: Camera },
    { type: 'Rates', title: 'Rates Estimator', description: 'Interactive project cost estimator', icon: Calculator },
    { type: 'Footer', title: 'Footer', description: 'Testimonials, representation, socials and legal', icon: PanelBottom },
    // Atelier Monolith
    { type: 'ArchNavbar', title: 'Studio Navigation', description: 'Logo, tabs and share button', icon: PanelTop },
    { type: 'ArchHeader', title: 'Page Header', description: 'Kicker, serif title, description', icon: Type },
    { type: 'FloorPlan', title: 'Interactive Floor Plan', description: 'Levels, layers, rooms and camera pins', icon: Map },
    { type: 'ArchSpecs', title: 'Layout Specifications', description: 'Intro text with numbered mechanisms', icon: ListOrdered },
    { type: 'ArchSuite', title: 'Design Suite Cards', description: 'Screen replica cards grid', icon: LayoutGrid },
    { type: 'ArchFooter', title: 'Studio Footer', description: 'Studio line and locations', icon: Building2 },
// Law
    { type: 'LawNavbar', title: 'Law Navigation', description: 'Logo, links and retain button', icon: PanelTop },
    { type: 'LawHero', title: 'Law Hero', description: 'Headline, buttons and counsel portrait card', icon: Scale },
    { type: 'LawStats', title: 'Law Metrics', description: '4 proof metric cards', icon: BarChart3 },
    { type: 'LawPractice', title: 'Practice Pillars', description: 'Bento grid of practice areas', icon: LayoutGrid },
    { type: 'LawEstimator', title: 'Retainer Estimator', description: 'Interactive fee configurator', icon: Calculator },
    { type: 'LawMatters', title: 'Landmark Matters', description: 'Filterable case cards with dossier', icon: Gavel },
    { type: 'LawTestimonials', title: 'Client Endorsements', description: 'Quote cards', icon: Quote },
    { type: 'LawChambers', title: 'Chambers Gallery', description: 'Image cards and office addresses', icon: Building2 },
    { type: 'LawFooter', title: 'Law Footer', description: 'Brand, practice links, registry', icon: PanelBottom },
    // Musician
    { type: 'MusicNavbar', title: 'Artist Navigation', description: 'Wordmark, links, tickets button', icon: PanelTop },
    { type: 'MusicHero', title: 'Artist Hero', description: 'Headline, play buttons, visual card, KPIs', icon: Mic2 },
    { type: 'MusicTracks', title: 'Tracks & Player', description: 'Filterable track list, lyrics, player', icon: Music },
    { type: 'MusicTour', title: 'Tour Dates', description: 'Dates list, regions, ticket modal', icon: Ticket },
    { type: 'MusicDisco', title: 'Discography', description: 'Album cards with formats', icon: Disc },
    { type: 'MusicMerch', title: 'Merch Store', description: 'Merch cards with size selector', icon: ShoppingBag },
    { type: 'MusicAbout', title: 'Artist Bio & Press', description: 'Biography, press quotes, booking', icon: UserRound },
    { type: 'MusicFooter', title: 'Newsletter Footer', description: 'Newsletter, socials, copyright', icon: PanelBottom },
];

const UNIVERSAL: SectionType[] = ['Navbar', 'Hero', 'Footer'];

export function getAvailableSections(themeAllowed?: SectionType[]): SectionCatalogItem[] {
    const list = themeAllowed ?? UNIVERSAL;
    return list
        .map((t) => SECTION_CATALOG.find((s) => s.type === t))
        .filter(Boolean) as SectionCatalogItem[];
}

export const getCatalogItem = (type: SectionType) =>
    SECTION_CATALOG.find((s) => s.type === type);