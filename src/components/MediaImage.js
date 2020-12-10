import React from 'react'
import MediaIndex from '../media/index.json'
import {Link} from 'react-router-dom'

class MediaImage extends React.Component {
  state = {
    currentImage: this.props.preview,
    loading: true,
  }

  componentDidMount() {
    console.info('MediaImage componentDidMount', this.props.id, MediaIndex)
    this.media = MediaIndex.images[this.props.id]
    if (this.media) {
      this.setState({
        currentImage: this.media.base64,
        loading: true
      }, () => {
        this.timerId = setTimeout(() => this.fetchImage(this.media.resolutions[this.props.resolutions ?? 'medium-h'].url), 50)
      })
    } else {
      console.error('cannot initialize MediaImage, wrong identifier', this.props.id)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.id !== this.props.id || nextState.currentImage !== this.state.currentImage
  }

  componentWillUnmount() {
    if (this.loadingImage) {
      this.loadingImage.onload = null
    }
    clearTimeout(this.timerId)
  }

  fetchImage(src) {
    console.info('MediaImage fetchImage', src)
    const image = new Image()
    image.onload = () => this.setState({ currentImage: src, loading: false })
    image.src = src
    this.loadingImage = image
  }


  render() {
    const { currentImage, loading } = this.state
    const { caption='', height='40vh', padding=5, title='', to } = this.props
    return <figure
      style={{
        display: 'flex',
        flexDirection: 'column',
        height,
        width: '100%',
        margin: '0 auto',
      }}
    >
      {!!title.length && (<h2 className="textContainerTitle">{title}</h2>)}
      <div style={{height:padding, backgroundColor: 'black'}}></div>
      <div style={{
        backgroundImage: `url(${currentImage})`,
        backgroundColor: 'black',
        transition: '0.16s opacity ease-in',
        opacity: `${loading ? 0.2 : 1}`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        flexGrow: 1,
        overflow: 'hidden',
        borderLeft: `${padding}px solid`,
        borderRight: `${padding}px solid`,
        position: 'relative'
      }}>
      {to && <Link to={to} className="absolute tc" style={{
        bottom:0, right:0,
        backgroundColor: 'var(--accent)',
        height: 30,
        width: 30,
        lineHeight: '30px'
      }}>◹ </Link>}
      </div>
      <div style={{height:padding, backgroundColor: 'black'}}></div>
      <figcaption
        dangerouslySetInnerHTML={{ __html: caption }}
        style={{ padding, flexShrink: '1'}}
      />

    </figure>
    // return <img style={this.style(loading)} src={currentImage} alt={alt} {...rest}/>
  }
}

export default MediaImage
