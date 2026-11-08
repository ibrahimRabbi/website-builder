export interface ComponentStyle {
  fontSize?: string;
  color?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  backgroundColor?: string;
  borderRadius?: string;
  padding?: string;
  margin?: string;
  borderColor?: string;
  borderWidth?: string;
  lineHeight?: string;
  letterSpacing?: string;
  maxWidth?: string;
  opacity?: string;
}

export interface TextComponentData {
  text: string;
  styles: ComponentStyle;
}

export interface ButtonComponentData {
  label: string;
  link: string;
  styles: ComponentStyle;
}

export interface ImageComponentData {
  src: string;
  alt: string;
  styles: ComponentStyle;
}


export interface VideoFilmItem {
  id: string;
  title: string;
  client?: string;
  category?: string;
  role?: string;
  year?: string;
  duration?: string;
  videoUrl?: string;
  posterUrl: string;
  specs?: string;
  lensSpecs?: string;
  summary?: string;
  aspectRatio?: string;
  col?: 'left' | 'right';
  isTall?: boolean;
}



export interface SectionComponents {
  badge?: TextComponentData;
  title?: TextComponentData;
  subtitle?: TextComponentData;
  bio?: TextComponentData;
  logo?: TextComponentData;
  ctaButton?: ButtonComponentData;
  secondaryButton?: ButtonComponentData;
  avatar?: ImageComponentData;
  [key: string]: any;
}

export type SectionType = 'Navbar' | 'Hero' | 'Stats' | 'Showreel' | 'Films' | 'ColorLab' | 'Gear' | 'Rates' | 'Footer'
  // Atelier Monolith
  | 'ArchNavbar' | 'ArchHeader' | 'FloorPlan' | 'ArchSpecs' | 'ArchSuite' | 'ArchFooter'
  //law
  | 'LawNavbar' | 'LawHero' | 'LawStats' | 'LawPractice' | 'LawEstimator' | 'LawMatters' | 'LawTestimonials' | 'LawChambers' | 'LawFooter'
  //musician
    | 'MusicNavbar' | 'MusicHero' | 'MusicTracks' | 'MusicTour' | 'MusicDisco' | 'MusicMerch' | 'MusicAbout' | 'MusicFooter'

export interface PortfolioSection {
  id: string;
  type: SectionType;
  title?: string;
  backgroundColor?: string;
  paddingY?: string;
  components: SectionComponents;
}

export interface PortfolioSchema {
  themeId: string;
  title: string;
  authorName: string;
  role: string;
  fontFamily: string;
  accentColor: string;
  sections: PortfolioSection[];
}

export interface ThemeMetadata {
  id: string;
  title: string;
  slug: string;
  description: string;
  badge: string;
  thumbnailUrl: string;
  price: number;
  currency: string;
  accentColor: string;
  fontFamily: string;
  themeStyle: 'dark' | 'light' | 'neo' | 'glass';
  initialSchema: PortfolioSchema;
  allowedSections: SectionType[];
}

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';
export type ViewMode = 'visual' | 'split' | 'code' | 'preview';