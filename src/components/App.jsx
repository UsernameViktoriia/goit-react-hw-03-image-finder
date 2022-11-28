import React from 'react';
import { AppWrapper } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends React.Component {
  state = {
    images: '',
    gallery: [],
    error: null,
    page: 1,
    imageUrl: '',
    status: 'idle',
  };
  handleFormSubmit = images => {
    this.setState({
      gallery: [],
      page: 1,
      images,
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.images !== this.state.images
    ) {
      this.setState({
        status: 'pending',
      });
      fetch(
        `https://pixabay.com/api/?key=31020563-d44473fd087eb3f9b37189b03&q=${this.state.images}&image_type=photo&orientation=horizontal&per_page=12&page=${this.state.page}`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(images => {
          if (!images.total) {
            this.setState({
              status: 'idle',
            });
            return alert('There is no picture for that name');
          }
          this.setState(pS => ({
            status: 'resolved',
            gallery: [...pS.gallery, ...images.hits],
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }
  onClickButton = () => {
    this.setState({ page: this.state.page + 1 });
  };
  onClickImage = imageUrl => {
    this.setState({ imageUrl });
  };
  onCloseModal = () => {
    this.setState({ imageUrl: '' });
  };
  render() {
    const { gallery, status, imageUrl, error } = this.state;
    return (
      <AppWrapper>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'pending' && <Loader />}
        {status === 'resolved' && (
          <ImageGallery images={gallery} onClick={this.onClickImage} />
        )}
        {status === 'resolved' && <Button onClick={this.onClickButton} />}
        {status === 'rejected' && (
          <h1 style={{ textAlign: 'center' }}>{error.message}</h1>
        )}
        {imageUrl && (
          <Modal onClose={this.onCloseModal}>
            <img src={imageUrl} alt="" />
          </Modal>
        )}
      </AppWrapper>
    );
  }
}
