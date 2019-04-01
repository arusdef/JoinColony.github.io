/* @flow */
import type { IntlShape } from 'react-intl';

import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import { graphql, useStaticQuery } from 'gatsby';

import type { TutorialNode } from '~types';

import Heading from '~core/Heading';
import Link from '~core/Link';
import Search from '~core/Search';

import styles from './Tutorials.module.css';

const MSG = defineMessages({
  pageTitle: {
    id: 'pages.Tutorials.pageTitle',
    defaultMessage: 'Explore Tutorials',
  },
  pageSubtitle: {
    id: 'pages.Tutorials.pageSubtitle',
    defaultMessage: 'Tutorials',
  },
  searchPlaceholder: {
    id: 'pages.Tutorials.searchPlaceholder',
    defaultMessage: 'Search tutorials',
  },
});

type QueryData = {
  allTutorials: {
    edges: Array<{
      node: TutorialNode,
    }>,
  },
};

type Props = {|
  /** Injected via `injectIntl` */
  intl: IntlShape,
|};

const displayName = 'pages.Tutorials';

const Tutorials = () => {
  const tutorialsQueryData: QueryData = useStaticQuery(graphql`
    {
      ...allTutorialsFragment
    }
  `);
  return (
    <>
      <div className={styles.metaContainer}>
        <Heading
          appearance={{ size: 'large', theme: 'dark' }}
          text={MSG.pageTitle}
        />
        <div className={styles.searchContainer}>
          <Search
            inputId="pagesTutorialsSearch"
            placeholderText={MSG.searchPlaceholder}
          />
        </div>
      </div>
      <div className={styles.tutorialsContainer}>
        <Heading
          appearance={{ size: 'large', theme: 'dark', weight: 'medium' }}
          text={MSG.pageSubtitle}
        />
        <div className={styles.tutorialList}>
          {tutorialsQueryData.allTutorials.edges.map(
            ({
              node: {
                fields: { slug },
                name,
              },
            }) => (
              <Link href={slug} key={slug}>
                <div className={styles.tutorialListItem}>
                  <p>{name}</p>
                </div>
              </Link>
            ),
          )}
        </div>
      </div>
    </>
  );
};

Tutorials.displayName = displayName;

export default Tutorials;
