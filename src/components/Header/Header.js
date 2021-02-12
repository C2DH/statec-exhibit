import React, { Component } from 'react';
import { useStore } from '../../store';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { isMobileWithTablet } from '../../constants';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: 0,
      isTitleVisible: true,
    };
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  shouldComponentUpdate(nextProps, { isTitleVisible }) {
    return this.state.isTitleVisible !== isTitleVisible;
  }

  handleScroll(event) {
    this.setState({
      isTitleVisible: window.scrollY < 100,
    });
  }
  render() {
    const { isTitleVisible } = this.state;
    return (
      <header className={styles.stickyHeader}>
        <div
          className={styles.stickyHeaderLink}
          onClick={() =>
            useStore.setState({ menuOpen: true, aboutOpen: false })
          }
        >
          {isMobileWithTablet ? 'Index' : 'Table of Contents'}
        </div>
        <div
          className={styles.title}
          style={{
            transform: isTitleVisible
              ? 'translateY(0px)'
              : 'translateY(-100px)',
          }}
        >
          <a href="/">Framing Luxembourg</a>
        </div>
        <div
          className={styles.stickyHeaderLink}
          style={{ textAlign: 'right' }}
          onClick={() =>
            useStore.setState({ aboutOpen: true, menuOpen: false })
          }
        >
          About
        </div>
      </header>
    );
  }
}

export default Header;
