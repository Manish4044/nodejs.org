import classNames from 'classnames';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import { useLocale } from '@/hooks/useLocale';
import { useNavigation } from '@/hooks/useNavigation';
import { useRouter } from '@/hooks/useRouter';

import LocalizedLink from './LocalizedLink';

const Header = () => {
  const { availableLocales, isCurrentLocaleRoute } = useLocale();
  const { navigationItems } = useNavigation();
  const { formatMessage } = useIntl();
  const { asPath, basePath } = useRouter();
  const { theme, setTheme } = useTheme();

  const [showLangPicker, setShowLangPicker] = useState(false);

  const getLinkClassName = (href: string) =>
    classNames({ active: isCurrentLocaleRoute(href, href !== '/') });

  const toggleLanguage = formatMessage({
    id: 'components.header.buttons.toggleLanguage',
  });

  const toggleDarkMode = formatMessage({
    id: 'components.header.buttons.toggleDarkMode',
  });

  const currentRouteLocalized = (locale: string) =>
    asPath.replace(/^\/[a-zA-Z-]+/, `/${locale}`);

  return (
    <header aria-label="Primary">
      <div className="container">
        <LocalizedLink href="/" className="logo">
          <Image
            priority
            width="111"
            height="33"
            src={`${basePath}/static/images/logo.svg`}
            alt="Node.js"
          />
        </LocalizedLink>

        <nav aria-label="primary">
          <ul className="list-divider-pipe">
            {navigationItems.map((item, key) => (
              <li key={key} className={getLinkClassName(item.link)}>
                <LocalizedLink href={item.link}>{item.text}</LocalizedLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="switchers">
          <button
            className="dark-theme-switcher"
            type="button"
            title={toggleDarkMode}
            aria-label={toggleDarkMode}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Image
              priority
              width="28"
              height="28"
              className="dark-image"
              src={`${basePath}/static/images/light-mode.svg`}
              alt="Dark Theme Switcher"
            />

            <Image
              priority
              width="28"
              height="28"
              className="light-image"
              src={`${basePath}/static/images/dark-mode.svg`}
              alt="Dark Theme Switcher"
            />
          </button>

          <button
            className="lang-picker-toggler"
            type="button"
            title={toggleLanguage}
            aria-label={toggleLanguage}
            onClick={() => setShowLangPicker(!showLangPicker)}
            aria-controls="lang-picker"
            aria-expanded="false"
          >
            <Image
              priority
              width="25"
              height="28"
              src={`${basePath}/static/images/language-picker.svg`}
              alt="Language Switcher"
            />
          </button>
        </div>

        {showLangPicker && (
          <ul className="lang-picker">
            {availableLocales.map(locale => (
              <li key={locale.code}>
                <a
                  title={locale.name}
                  href={currentRouteLocalized(locale.code)}
                >
                  {locale.localName}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
