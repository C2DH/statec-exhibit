import React from 'react'
import MediaIndex from '../media/index.json'


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
        setTimeout(() => this.fetchImage(this.media.resolutions[this.props.resolutions ?? 'medium-h'].url), 50)
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
  }

  fetchImage(src) {
    console.info('MediaImage fetchImage', src)
    const image = new Image()
    image.onload = () => this.setState({ currentImage: src, loading: false })
    image.src = src
    this.loadingImage = image
  }

  style = loading => {
    return {
      transition: '0.16s opacity ease-in',
      opacity: `${loading ? 0.2 : 1}`,
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      border: '1px solid black',
      background: 'black',
      overflow: 'hidden',
      objectPosition: 'center'
    }
  }

  render() {
    const { currentImage, loading } = this.state
    const { alt, caption = '' } = this.props
    return <figure
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '40vh',
        width: '100%',
        margin: '0 auto',
      }}
    >
      <div style={{
        // backgroundImage: `url(${currentImageBase64})`,
        // backgroundSize: 'contain',
        // backgroundPosition: 'center',
        flex: '0 1 auto',
        overflow: 'hidden',
      }}>
        <img style={this.style(loading)} src={currentImage} alt={alt}/>
      </div>
      <figcaption
        dangerouslySetInnerHTML={{ __html: caption }}
        style={{ padding: '5px', flex: '1 1 auto'}}
      />
    </figure>
    // return <img style={this.style(loading)} src={currentImage} alt={alt} {...rest}/>
  }
}

export default MediaImage
