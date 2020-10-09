import React from 'react';
import { useStore } from '../store';

const StickyHeader = ({}) => {
  return (
    <div className="stickyHeader">
      <div
        className="stickyHeaderLink"
        onClick={() => useStore.setState({ menuOpen: true, aboutOpen: false })}
      >
        Table of Contents
      </div>
      <div
        className="stickyHeaderLink"
        onClick={() => useStore.setState({ aboutOpen: true, menuOpen: false })}
      >
        About
      </div>
    </div>
  );
};

export default StickyHeader;
