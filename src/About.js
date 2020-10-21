import React from 'react';
import './styles/About.css';
import { useStore } from './store';
import closeWhite from './assets/images/close.svg';

const About = () => {
  const aboutOpen = useStore((state) => state.aboutOpen);

  const closeLegend = () => {
    useStore.setState({ aboutOpen: false });
  };

  return (
    <div className={`about ${aboutOpen ? 'open' : 'close'} `}>
      <div className="about-wrapper">
        <h3 className="tl fw1 mv0  about-title"></h3>
        <div className="tl mt3  about-subtitle"></div>

        <div className="tl mt3  about-subtitle">AAAAAAA</div>
        <div className="tl fw7  about-subtitle">
          <a className="" href="" target="_blank">
            BBBBBB
          </a>
          &nbsp;&&nbsp;
          <a className="" href="" target="_blank">
            CCCCCC
          </a>
        </div>
        <div className="tl mv4">
          <h3 className="tl fw1 mv0  about-title">About</h3>
          <p className=" about-paragraph">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </p>
          <p className="  about-paragraph">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </p>
        </div>

        <div
          className="close-about svg-hover pointer"
          onClick={closeLegend}
          style={{
            zIndex: 999,
          }}
        >
          <img alt="Close menu icon" src={closeWhite} width={30} />
        </div>
      </div>
    </div>
  );
};

export default About;
