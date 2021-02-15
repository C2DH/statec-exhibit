import React from 'react';
import './styles/About.css';
import { useTranslation } from 'react-i18next'
import { useStore } from './store';
import closeWhite from './assets/images/close.svg';


const About = () => {
  const aboutOpen = useStore((state) => state.aboutOpen);
  const { t } = useTranslation()
  const closeLegend = () => {
    useStore.setState({ aboutOpen: false });
  };

  return (
    <div className={`about ${aboutOpen ? 'open' : 'close'} `}>
      <div className="about-wrapper">
        <h3 className="tl fw1 mv0  about-title">
        {t()}
        </h3>
        {/*<div className="tl mt3  about-subtitle"></div>

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
        */}
        <div className="tl mv4">
          <h1 className="tl fw1 mv0  about-title">{t('AboutTitle')}</h1>
          <p className="about-paragraph"
              dangerouslySetInnerHTML={{__html: t('AboutIntroduction')}}
          />
          <p className="about-paragraph"
              dangerouslySetInnerHTML={{__html: t('AboutConcept')}}
          />
          <p className="about-paragraph"
              dangerouslySetInnerHTML={{__html: t('AboutDevelopment')}}
          />
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
