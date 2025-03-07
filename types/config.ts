import type { RSSFeed, WebsiteBanner } from './features';

export interface TwitterConfig {
  username: string;
  card: string;
  img: string;
  imgAlt: string;
}

export interface OGConfig {
  imgType: string;
  imgWidth: string;
  imgHeight: string;
}

export interface FooterConfig {
  text: string;
  link: string;
}

export interface SocialConfig {
  icon: string;
  link: string;
  kind: 'dark' | 'light' | 'neutral';
  alt?: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  featuredImage: string;
  favicon: string;
  accentColor: string;
  og: OGConfig;
  twitter: TwitterConfig;
  rssFeeds: Array<RSSFeed>;
  websiteBanners: Record<string, WebsiteBanner>;
  footerLinks: Array<FooterConfig>;
  socialLinks: Array<SocialConfig>;
}
