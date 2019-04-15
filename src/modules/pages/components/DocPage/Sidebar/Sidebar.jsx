/* @flow */
import React, { createElement, useState } from 'react';
import { defineMessages } from 'react-intl';
import { withProps } from 'recompose';
import { Match } from '@reach/router';
import RehypeReact from 'rehype-react';

import type { Project, HtmlAst } from '~types';

import Button from '~core/Button';
import Heading from '~core/Heading';
import Icon from '~core/Icon';
import Link from '~core/Link';
import SectionList from '~pages/DocPage/SectionList';
import { PAGE_DEVELOPER_PORTAL } from '~routes';
import { getMainClasses } from '~utils/css';

import styles from './Sidebar.module.css';
import listItemStyles from '../SectionListItem/SectionListItem.module.css';

const MSG = defineMessages({
  linkHome: {
    id: 'pages.DocPage.Sidebar.linkHome',
    defaultMessage: 'Home',
  },
  btnBackToTop: {
    id: 'pages.DocPage.Sidebar.btnBackToTop',
    defaultMessage: 'Back to Top',
  },
  iconTitleVisitLink: {
    id: 'pages.DocPage.Sidebar.iconTitleVisitLink',
    defaultMessage: 'Visit Link',
  },
  iconTitleToggleMenu: {
    id: 'pages.DOcPage.Sidebar.iconTitleToggleMenu',
    defaultMessage: 'Toggle Section Menu',
  },
});

type Props = {|
  locationState: {
    fromChild: boolean,
    fromParent: boolean,
    key: string,
  },
  project: Project,
  projectEntryPoint: string,
  tableOfContents: HtmlAst,
  title?: string,
|};

const ItemLink = ({ children, ...rest }: Object) => (
  <Link
    {...rest}
    className={listItemStyles.itemLink}
    state={{ fromChild: true }}
  >
    <div className={styles.subItemLink}>{children}</div>
  </Link>
);

const renderAst = new RehypeReact({
  createElement,
  components: {
    a: ItemLink,
    li: props =>
      createElement('li', { ...props, className: listItemStyles.docsItem }),
    p: withProps({
      appearance: {
        margin: 'none',
        size: 'medium',
        theme: 'dark',
        weight: 'medium',
      },
    })(Heading),
  },
}).Compiler;

const displayName = 'pages.DocPage.Sidebar';

const Sidebar = ({
  locationState: { fromChild, fromParent },
  project: { name: projectName },
  project,
  projectEntryPoint,
  tableOfContents,
  title,
}: Props) => {
  const [isTocExpanded, toggleToc] = useState(true);
  return (
    <nav
      className={getMainClasses({}, styles, {
        fromChild,
        fromParent,
      })}
    >
      <div className={styles.menuContentsWrapper}>
        <Match path={projectEntryPoint}>
          {({ match }) =>
            match ? (
              <>
                <Link
                  arrow="left"
                  className={styles.homeLink}
                  href={PAGE_DEVELOPER_PORTAL}
                  text={MSG.linkHome}
                />
                <div className={styles.mobileProjectTitle}>
                  <Link href={PAGE_DEVELOPER_PORTAL}>
                    <Icon
                      className={styles.chevron}
                      name="chevron"
                      title={projectName}
                    />
                    <Heading
                      appearance={{
                        margin: 'none',
                        size: 'mediumLarge',
                        theme: 'dark',
                        weight: 'medium',
                      }}
                      text={projectName}
                    />
                  </Link>
                </div>
                <div className={styles.menuContents}>
                  <div className={styles.projectTitle}>
                    <Heading
                      appearance={{
                        size: 'mediumLarge',
                        theme: 'dark',
                        weight: 'medium',
                      }}
                      text={projectName}
                    />
                  </div>
                  <SectionList project={project} />
                </div>
              </>
            ) : (
              <>
                <Link
                  arrow="left"
                  className={styles.homeLink}
                  href={projectEntryPoint}
                  state={{ fromChild: true }}
                  text={projectName}
                />
                {title && (
                  <>
                    <div className={styles.mobileProjectTitle}>
                      <Link
                        href={projectEntryPoint}
                        state={{ fromChild: true }}
                      >
                        <Icon
                          className={styles.chevron}
                          name="chevron"
                          title={title}
                        />
                        <Heading
                          appearance={{
                            margin: 'none',
                            size: 'mediumLarge',
                            theme: 'dark',
                            weight: 'medium',
                          }}
                          text={title}
                        />
                      </Link>
                    </div>
                    <div className={styles.menuContents}>
                      <div className={styles.projectTitle}>
                        <Heading
                          appearance={{
                            size: 'mediumLarge',
                            theme: 'dark',
                            weight: 'medium',
                          }}
                          style={{ lineHeight: styles.projectTitleLineHeight }}
                          text={title}
                        />
                      </div>
                      <div
                        className={styles.tocMenuWrapper}
                        aria-expanded={isTocExpanded}
                      >
                        <div className={styles.tocWrapper}>
                          {renderAst(tableOfContents)}
                        </div>
                        <div className={styles.toggleContainer}>
                          <Button
                            appearance={{ theme: 'reset' }}
                            onClick={() => toggleToc(!isTocExpanded)}
                          >
                            <Icon
                              className={styles.toggleIcon}
                              name="chevron"
                              title={MSG.iconTitleToggleMenu}
                            />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )
          }
        </Match>
      </div>
      <div className={styles.backToTop}>
        <Button
          className={styles.itemLink}
          onClick={handleBackToTop}
          text={MSG.btnBackToTop}
        />
      </div>
    </nav>
  );
};

Sidebar.displayName = displayName;

function handleBackToTop(e) {
  if (typeof window !== 'undefined') {
    e.preventDefault();
    window.scrollTo(0, 0);
  }
}

export default Sidebar;
