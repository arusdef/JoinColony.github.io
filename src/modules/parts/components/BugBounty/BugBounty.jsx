/* @flow */

import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Link from '~core/Link';
import { PAGE_BUG_BOUNTY } from '~routes';

import styles from './BugBounty.module.css';

const MSG = defineMessages({
  title: {
    id: 'parts.BugBounty.title',
    defaultMessage: 'Secure the network',
  },
  subTitle: {
    id: 'parts.BugBounty.subTitle',
    defaultMessage: 'Bug Bounty 2019',
  },
});

const displayName = 'parts.BugBounty';

const BugBounty = () => (
  <Link
    className={styles.container}
    href={PAGE_BUG_BOUNTY}
    persistLocale={false}
  >
    <span className={styles.leftText}>
      <FormattedMessage {...MSG.title} />
    </span>
    <span className={styles.boldText}>
      <FormattedMessage {...MSG.subTitle} />
    </span>
  </Link>
);

BugBounty.displayName = displayName;

export default BugBounty;
