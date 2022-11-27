import React from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Button } from './Button/Button';

export class App extends React.Component {
  state = {
    images: '',
    gallery: [],
    page: 1,
  };
  handleFormSubmit = images => {
    this.setState({ images });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.images !== this.state.images) {
      fetch(
        `https://pixabay.com/api/?key=31020563-d44473fd087eb3f9b37189b03&q=${this.state.images}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${this.state.page}`
      )
        .then(response => response.json())
        .then(images => this.setState({ gallery: images.hits }))
        .finally(() =>
          this.setState({
            images: '',
          })
        );
    }
  }
  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={this.state.gallery} />
        {/* <Button /> */}
      </div>
    );
  }
}
