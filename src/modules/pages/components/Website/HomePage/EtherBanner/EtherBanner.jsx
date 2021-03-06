/* @flow */

import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Heading from '~core/Heading';
import Icon from '~core/Icon';
import Link from '~core/Link';
import Paragraph from '~core/Paragraph';
import BlockCta from '~parts/BlockCta';
import { PAGE_PRODUCT_PLATFORM } from '~routes';

import styles from './EtherBanner.module.css';

const MSG = defineMessages({
  title: {
    id: 'pages.Website.HomePage.EtherBanner.title',
    defaultMessage: 'Not in the Cloud;{br}in the Ether',
  },
  body: {
    id: 'pages.Website.HomePage.EtherBanner.body',
    defaultMessage: `Colony is infrastructure for internet native organisations.
      Infrastructure should be impartial and reliable. It shouldn’t be possible
      to take it away from you, or change the rules to your disadvantage. That's
      why Colony is decentralized software, built on Ethereum.`,
  },
  link: {
    id: 'pages.Website.HomePage.EtherBanner.link',
    defaultMessage: 'Learn about the tech',
  },
});

const displayName = 'pages.Website.HomePage.EtherBanner';

const EtherBanner = () => (
  <BlockCta
    appearance={{ firstSideMobile: 'right' }}
    leftBlockChildren={
      <div className={styles.leftBlock}>
        <Icon
          className={styles.image}
          name="ether"
          title="Ether"
          viewBox="0 0 159 270"
        />
      </div>
    }
    rightBlockChildren={
      <div className={styles.rightBlock}>
        <Heading appearance={{ theme: 'dark' }}>
          <FormattedMessage {...MSG.title} values={{ br: <br /> }} />
        </Heading>
        <Paragraph appearance={{ size: 'medium' }} text={MSG.body} />
        <Link
          className={styles.rightBlockLink}
          href={PAGE_PRODUCT_PLATFORM}
          text={MSG.link}
        />
      </div>
    }
  />
);

EtherBanner.displayName = displayName;

export default EtherBanner;
