import React from 'react';
import { withRouter } from 'react-router-dom';
import closeWhite from './assets/images/close.svg';
import { useStore } from './store';
import { isMobileWithTablet } from './constants';
import './styles/Menu.css';

const Contents = ({ history }) => {
  const menuOpen = useStore((state) => state.menuOpen);

  const actualPath = history.location.pathname;

  const goTo = (path) => {
    history.push(path);
    closeMenu();
  };

  const closeMenu = () => {
    useStore.setState({ menuOpen: false });
  };

  return (
    <div
      className={`menu w-100 flex flex-column justify-around fixed top-0 bottom-0 left-0 right-0 ${
        menuOpen ? 'open' : 'close'
      }`}
    >
      <div
        className="w-100"
        style={{
          maxWidth: isMobileWithTablet ? '100%' : '75%',
          margin: '0 auto',
        }}
      >
        <div
          className="flex items-center ph4 pointer mv4 mv0-ns"
          onClick={() => goTo('/')}
        >
          <div
            className={`${
              actualPath === '/' ? 'active' : ''
            } w-100 menu-link tl relative `}
          >
            Home
          </div>
        </div>
        <div
          className="flex flex-column justify-center ph4 pointer mv4 mv0-ns"
          onClick={() => goTo('/chapter1')}
        >
          <div className=" tl menu-title">CHAPTER 1</div>
          <div
            className={`${
              actualPath === '/chapter1' ? 'active' : ''
            }  tl relative menu-link`}
          >
            Chapter 1
          </div>
        </div>
        <div
          className="flex flex-column justify-center ph4 pointer mv4 mv0-ns"
          onClick={() => goTo('/family')}
        >
          <div className=" tl menu-title">CHAPTER 2</div>
          <div
            className={`${
              actualPath === '/chapter1' ? 'active' : ''
            }  tl relative menu-link`}
          >
            Family Life
          </div>
        </div>

        <div
          className="flex items-center ph4 mv4 mv0-ns"
          onClick={() =>
            useStore.setState({ menuOpen: false, aboutOpen: true })
          }
        >
          <div
            className={`${
              actualPath === '/' ? 'active' : ''
            } w-100 tl relative menu-link `}
          >
            About
          </div>
        </div>

        <div className="w-100 flex items-center ph4 mv4 mv0-ns">
          <div
            className="read-close pointer close-menu pointer"
            onClick={closeMenu}
            style={{
              zIndex: 999,
            }}
          >
            <img
              src={closeWhite}
              alt="Close menu icon"
              width={30}
              className="pointer svg-hover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Contents);
