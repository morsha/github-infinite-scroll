// @flow

import React from 'react';

const GITHUB_DOMAIN = 'https://github.com';

type Props = {
  itemData: {
    full_name: String,
    name: String,
    description: String,
  }
}

const ScrollItem = React.forwardRef(({
  itemData,
}: Props, ref) => (
  <div ref={ref} className="scroll-item">
    <a
      className="item-link"
      href={`${GITHUB_DOMAIN}/${itemData.full_name}`}
      target="_blank"
      rel="noreferrer">
      {itemData.name}
    </a>
  </div>
));

export default ScrollItem;
