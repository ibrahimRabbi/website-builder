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

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  link: string;
  imageUrl?: string;
  year?: string;
}

export interface SkillItem {
  name: string;
  category: string;
  level?: number;
}

export interface VideoFilmItem {
  id: string;
  title: string;
  client?: string;
  category: string;
  role: string;
  year?: string;
  duration?: string;
  videoUrl?: string;
  posterUrl: string;
  specs?: string;
  lensSpecs?: string;
  summary?: string;
  aspectRatio?: string;
}

export interface GearCategory {
  category: string;
  items: string[];
}

export interface SectionComponents {
  badge?: TextComponentData;
  title?: TextComponentData;
  subtitle?: TextComponentData;
  bio?: TextComponentData;
  ctaButton?: ButtonComponentData;
  secondaryButton?: ButtonComponentData;
  avatar?: ImageComponentData;
  videoUrl?: string;
  videoPoster?: string;
  videoCaption?: string;
  cameraSpecs?: string;
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
    instagram?: string;
    vimeo?: string;
    youtube?: string;
  };
  projects?: ProjectItem[];
  films?: VideoFilmItem[];
  gear?: GearCategory[];
  clients?: string[];
  skills?: SkillItem[];
  experience?: Array<{
    id: string;
    role: string;
    company: string;
    period: string;
    description: string;
  }>;
  contactEmail?: string;
  contactLocation?: string;
  [key: string]: any;
}

export type SectionType = 
  | 'Hero' 
  | 'Showreel'
  | 'About' 
  | 'Projects' 
  | 'Films'
  | 'ColorLab'
  | 'Gear'
  | 'Rates'
  | 'Clients'
  | 'Skills' 
  | 'Experience' 
  | 'Testimonials' 
  | 'Contact' 
  | 'Footer';

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
}

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';
export type ViewMode = 'visual' | 'split' | 'code' | 'preview';
