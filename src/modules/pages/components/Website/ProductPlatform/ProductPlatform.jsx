/* @flow */

import React from 'react';

import WebsiteLayout from '~layouts/WebsiteLayout';

import DeveloperTools from './DeveloperTools';
import Examples from './Examples';
import Hero from './Hero';
import LookGood from './LookGood';
import TokenSupport from './TokenSupport';
import WithColony from './WithColony';

const displayName = 'pages.Website.ProductPlatform';

const ProductPlatform = () => (
  <WebsiteLayout headerAppearance={{ theme: 'transparent', logoTheme: 'dark' }}>
    <Hero />
    <LookGood />
    <Examples />
    <WithColony />
    <DeveloperTools />
    <TokenSupport />
  </WebsiteLayout>
);

ProductPlatform.displayName = displayName;

export default ProductPlatform;
