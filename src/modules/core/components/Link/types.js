/* @flow */
import type { Node } from 'react';
import type { IntlShape, MessageDescriptor } from 'react-intl';

export type InProps = {
  children?: Node,
  href: string,
  text?: MessageDescriptor | string,
  textValues?: Object,
  /** Text transformation to apply to the `href`. Only called if `isInernal` is true. */
  transformUrl?: (href: string) => string,
};

export type OutProps = InProps & {
  /** Injected by `injectIntl` */
  intl: IntlShape,
  isInternal: boolean,
  target?: '_blank',
  rel?: 'noopener noreferrer',
};
