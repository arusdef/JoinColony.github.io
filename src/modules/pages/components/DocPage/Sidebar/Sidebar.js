/* @flow */
import { injectIntl } from 'react-intl';
import { compose, withProps } from 'recompose';

import { getProjectEntryPoint } from '~utils/docs';
import { withLocation } from '~hoc/location';
import { fixTocCodeTag } from '~utils/toc';

import Sidebar from './Sidebar.jsx';

const enhance = compose(
  injectIntl,
  withLocation(),
  withProps(
    ({ intl: { locale }, location: { state }, project, tableOfContents }) => {
      const fromChild = state && state.fromChild ? state.fromChild : false;
      const fromParent = state && state.fromParent ? state.fromParent : false;
      return {
        locationState: {
          fromChild,
          fromParent,
          key: (state && state.key) || '0', // state.key only relevant if it already exists
        },
        tableOfContents: fixTocCodeTag(tableOfContents),
        projectEntryPoint: getProjectEntryPoint(project, locale),
      };
    },
  ),
);

export default enhance(Sidebar);
