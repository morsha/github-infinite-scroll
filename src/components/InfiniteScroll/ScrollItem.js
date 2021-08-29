// @flow

import React from 'react';

const GITHUB_DOMAIN = 'https://github.com';

type Props = {
  itemData: {
    full_name?: String,
    name?: String,
    description?: String,
    stargazers_count?: Number,
    language?: String,
    license?: {
      name: String,
    },
  }
}

const ScrollItem = React.forwardRef(({
  itemData,
}: Props, ref) => (
  <div ref={ref} className="infinite-scroll__item">
    <a
      className="infinite-scroll__item__link"
      href={`${GITHUB_DOMAIN}/${itemData.full_name}`}
      target="_blank"
      rel="noreferrer">
      {itemData.name}
    </a>
    <span className="infinite-scroll__item__desc">
      {itemData.description}
    </span>
    <div className="infinite-scroll__item__remark-wrapper">
      <div className="infinite-scroll__item__remark">
        <i className="fa fa-star" />
        {' '}
        {itemData?.stargazers_count}
      </div>
      <div className="infinite-scroll__item__remark">
        <div className="infinite-scroll__item__remark__circle-icon" />
        {itemData?.language}
      </div>
      <div className="infinite-scroll__item__remark">
        {itemData?.license?.name}
      </div>
    </div>
  </div>
));

export default ScrollItem;
