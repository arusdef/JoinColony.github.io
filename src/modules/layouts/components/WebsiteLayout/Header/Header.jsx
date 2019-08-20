/* @flow */

import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { withPrefix } from 'gatsby';

import Button from '~core/Button';
import Icon from '~core/Icon';
import Link from '~core/Link';
import NavigationToggle from '~core/NavigationToggle';
import { getMainClasses } from '~utils/css';
import {
  COLONY_DISCOURSE,
  DOCS_COLONY_JS_GET_STARTED,
  PAGE_ABOUT_COLONY_NETWORK,
  PAGE_ABOUT_VISION,
  PAGE_ABOUT_METACOLONY,
  PAGE_DEV_DOCS,
  PAGE_DEV_TUTORIALS,
  PAGE_GET_EARLY_ACCESS,
  PAGE_INDEX,
  PAGE_PRODUCT_DAPP,
  PAGE_PRODUCT_PLATFORM,
} from '~routes';

import type { Appearance, Props } from './types';

import ThemeContext from '../context';

import NavDropdownParent from './NavDropdownParent.jsx';

import styles from './Header.module.css';

const MSG = defineMessages({
  navAriaLabel: {
    id: 'layouts.WebsiteLayout.Header.navAriaLabel',
    defaultMessage: 'Main Navigation',
  },
  navLinkProducts: {
    id: 'layouts.WebsiteLayout.Header.navLinkProducts',
    defaultMessage: 'Products',
  },
  navLinkDevelopers: {
    id: 'layouts.WebsiteLayout.Header.navLinkDevelopers',
    defaultMessage: 'Developers',
  },
  navLinkAbout: {
    id: 'layouts.WebsiteLayout.Header.navLinkAbout',
    defaultMessage: 'About',
  },
  navLinkEarlyAccess: {
    id: 'layouts.WebsiteLayout.Header.navLinkEarlyAccess',
    defaultMessage: 'Get early access',
  },
  navLinkNewsletter: {
    id: 'layouts.WebsiteLayout.Header.navLinkNewsletter',
    defaultMessage: 'Newsletter',
  },
  dropdownLinkBodyAboutColonyNetwork: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkBodyAboutColonyNetwork',
    defaultMessage: `Organize and operate with our suite of smart
      contracts running on Ethereum.`,
  },
  dropdownLinkBodyAboutMetacolony: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkBodyAboutMetacolony',
    defaultMessage: `Learn about the team and token that keeps Colony running.`,
  },
  dropdownLinkBodyAboutVision: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkBodyAboutVision',
    defaultMessage: 'Read about the vision behind Colony. It gets weird.',
  },
  dropdownLinkBodyDevDiscourse: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkBodyDevDiscourse',
    defaultMessage: `This is the max amount of descriptor text for the
      navigation hover state. Keep it short.`,
  },
  dropdownLinkBodyDevGetStarted: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkBodyDevGetStarted',
    defaultMessage: `New to Colony? Welcome! Let’s get started with
      your first project.`,
  },
  dropdownLinkBodyDevPortal: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkBodyDevPortal',
    defaultMessage: `This is the max amount of descriptor text for the
      navigation hover state. Keep it short.`,
  },
  dropdownLinkBodyDevTutorials: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkBodyDevTutorials',
    defaultMessage: `This is the max amount of descriptor text for the
      navigation hover state. Keep it short.`,
  },
  dropdownLinkBodyProductsDapp: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkBodyProductsDapp',
    defaultMessage: `Tools to organize and incentivize collaborative,
      communities, and contingent workers.`,
  },
  dropdownLinkBodyProductsPlatform: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkBodyProductsPlatform',
    defaultMessage: 'The fastest way to build cryptoeconomic applications.',
  },
  dropdownLinkTitleAboutColonyNetwork: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkTitleAboutColonyNetwork',
    defaultMessage: 'colonyNetwork',
  },
  dropdownLinkTitleAboutMetacolony: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkTitleAboutMetacolony',
    defaultMessage: 'The Metacolony',
  },
  dropdownLinkTitleAboutVision: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkTitleAboutVision',
    defaultMessage: 'Vision',
  },
  dropdownLinkTitleDevDiscourse: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkTitleDevDiscourse',
    defaultMessage: 'Discourse',
  },
  dropdownLinkTitleDevGetStarted: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkTitleDevGetStarted',
    defaultMessage: 'Get started',
  },
  dropdownLinkTitleDevPortal: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkTitleDevPortal',
    defaultMessage: 'Portal',
  },
  dropdownLinkTitleDevTutorials: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkTitleDevTutorials',
    defaultMessage: 'Tutorials',
  },
  dropdownLinkTitleProductsDapp: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkTitleProductsDapp',
    defaultMessage: 'Dapp',
  },
  dropdownLinkTitleProductsPlatform: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkTitleProductsPlatform',
    defaultMessage: 'Platform',
  },
});

const displayName = 'layouts.WebsiteLayout.Header';

const Header = ({
  appearance: appearanceProp,
  intl: { formatMessage },
  showOnScrollHeight,
}: Props) => {
  // Mobile nav state
  const [isNavOpen, setIsNavOpen] = useState(false);
  // Scrolled nav state
  const [showScrolledNav, setShowScrolledNav] = useState(false);

  const { headerHeight } = useContext(ThemeContext);

  const isShowOnScrollEnabled = typeof showOnScrollHeight !== 'undefined';

  const handleScroll = useCallback(() => {
    if (typeof window !== 'undefined') {
      const scrollTop = window.scrollTop || window.pageYOffset;
      const shouldShow =
        isShowOnScrollEnabled &&
        scrollTop > headerHeight && // make sure we've scrolled past the regular top nav. Useful for responsiveness.
        scrollTop > showOnScrollHeight;
      if (shouldShow && !showScrolledNav) {
        setShowScrolledNav(true);
      }
      if (!shouldShow && showScrolledNav) {
        setShowScrolledNav(false);
      }
    }
  }, [
    headerHeight,
    isShowOnScrollEnabled,
    showOnScrollHeight,
    showScrolledNav,
  ]);

  useLayoutEffect(() => {
    // Incase page is loaded at a scrolled position
    if (isShowOnScrollEnabled) {
      handleScroll();
    }
  }, [handleScroll, isShowOnScrollEnabled, showOnScrollHeight]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isShowOnScrollEnabled) {
        window.addEventListener('scroll', handleScroll);
      }
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll, isShowOnScrollEnabled, showOnScrollHeight]);

  const appearance = showScrolledNav
    ? ({ logoTheme: 'dark', theme: 'scrolled' }: Appearance)
    : appearanceProp;

  const navAriaLabel = formatMessage(MSG.navAriaLabel);

  return (
    <div className={getMainClasses(appearance, styles)}>
      <div className={styles.wrapper}>
        <div className={styles.navigationContainer}>
          <div className={styles.leftWrapper}>
            <Link href={PAGE_INDEX}>
              <Icon
                className={styles.logo}
                name="colony_logo_horizontal"
                title="Colony"
                viewBox="0 0 134 33"
              />
            </Link>
          </div>
          <div aria-expanded={isNavOpen} className={styles.navContainer}>
            <nav
              aria-label={navAriaLabel}
              className={styles.navigation}
              role="navigation"
            >
              <NavDropdownParent
                className={`${styles.navDropdownParent} ${styles.navLink}`}
                image={withPrefix('img/nav_products.png')}
                navItems={[
                  {
                    body: MSG.dropdownLinkBodyProductsDapp,
                    href: PAGE_PRODUCT_DAPP,
                    title: MSG.dropdownLinkTitleProductsDapp,
                  },
                  {
                    body: MSG.dropdownLinkBodyProductsPlatform,
                    href: PAGE_PRODUCT_PLATFORM,
                    title: MSG.dropdownLinkTitleProductsPlatform,
                  },
                ]}
                text={MSG.navLinkProducts}
              />
              <NavDropdownParent
                className={`${styles.navDropdownParent} ${styles.navLink}`}
                image={withPrefix('img/nav_developers.png')}
                navItems={[
                  {
                    body: MSG.dropdownLinkBodyDevPortal,
                    href: PAGE_DEV_DOCS,
                    title: MSG.dropdownLinkTitleDevPortal,
                  },
                  {
                    body: MSG.dropdownLinkBodyDevTutorials,
                    href: PAGE_DEV_TUTORIALS,
                    title: MSG.dropdownLinkTitleDevTutorials,
                  },
                  {
                    body: MSG.dropdownLinkBodyDevDiscourse,
                    href: COLONY_DISCOURSE,
                    title: MSG.dropdownLinkTitleDevDiscourse,
                  },
                  {
                    body: MSG.dropdownLinkBodyDevGetStarted,
                    href: DOCS_COLONY_JS_GET_STARTED,
                    title: MSG.dropdownLinkTitleDevGetStarted,
                  },
                ]}
                text={MSG.navLinkDevelopers}
              />
              <NavDropdownParent
                className={`${styles.navDropdownParent} ${styles.navLink}`}
                image={withPrefix('img/nav_about.png')}
                navItems={[
                  {
                    body: MSG.dropdownLinkBodyAboutColonyNetwork,
                    href: PAGE_ABOUT_COLONY_NETWORK,
                    title: MSG.dropdownLinkTitleAboutColonyNetwork,
                  },
                  {
                    body: MSG.dropdownLinkBodyAboutMetacolony,
                    href: PAGE_ABOUT_METACOLONY,
                    title: MSG.dropdownLinkTitleAboutMetacolony,
                  },
                  {
                    body: MSG.dropdownLinkBodyAboutVision,
                    href: PAGE_ABOUT_VISION,
                    title: MSG.dropdownLinkTitleAboutVision,
                  },
                ]}
                text={MSG.navLinkAbout}
              />
              <Link
                activeClassName={styles.active}
                className={styles.navLinkAlt}
                href={PAGE_GET_EARLY_ACCESS}
                text={MSG.navLinkEarlyAccess}
              />
              <div className={styles.mobileButtons}>
                <Button
                  appearance={{
                    borderRadius: 'none',
                    font: 'tiny',
                    theme: 'primaryHollow',
                  }}
                  className={styles.mobileButton}
                  linkTo={PAGE_GET_EARLY_ACCESS}
                  text={MSG.navLinkEarlyAccess}
                />
                <Button
                  appearance={{
                    borderRadius: 'none',
                    font: 'tiny',
                    theme: 'primary',
                  }}
                  className={styles.mobileButton}
                  linkTo={PAGE_GET_EARLY_ACCESS}
                  text={MSG.navLinkNewsletter}
                />
              </div>
            </nav>
          </div>
          <div className={styles.navToggle}>
            <NavigationToggle
              appearance={{ hideAtSize: 'medium' }}
              isNavOpen={isNavOpen}
              onClick={() => setIsNavOpen(!isNavOpen)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Header.displayName = displayName;

export default injectIntl(Header);