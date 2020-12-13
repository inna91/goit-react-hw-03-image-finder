import { Component } from 'react';
import LoaderPage from './Components/Loader/Loader';
import Searchbar from './Components/Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import fetchPictures from './services/pictures-api';
import Button from './Components/Button/Button';
import Modal from './Components/Modal/Modal';
import s from './App.module.css';

export default class App extends Component {
  state = {
    pictures: [],
    page: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.fetchPictures();
    }

    if (prevState.page !== page) {
      this.scrollToNextPage();
    }
  }

  handleSearchBarSubmit = query => {
    this.setState({ searchQuery: query, page: 1, pictures: [], error: null });
  };

  fetchPictures = () => {
    const { page, searchQuery } = this.state;

    this.setState({ isLoading: true });

    fetchPictures({ page, searchQuery })
      .then(hits => {
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...hits],
          page: prevState.page + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  scrollToNextPage = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onClickImage = largeImageURL => {
    this.setState({ largeImageURL: largeImageURL });
    this.toggleModal();
  };

  render() {
    const {
      searchQuery,
      pictures,
      isLoading,
      error,
      showModal,
      largeImageURL,
    } = this.state;
    const shouldRenderButton = pictures.length > 0 && !isLoading;
    const picIsNotFound =
      searchQuery && pictures.length === 0 && !error && !isLoading;
    return (
      <div className={s.App}>
        {error && <p className={s.error}>Something went wrong. Try again</p>}
        <Searchbar onSubmit={this.handleSearchBarSubmit} />

        {isLoading && <LoaderPage />}

        {showModal && (
          <Modal largeImageURL={largeImageURL} toggleModal={this.toggleModal} />
        )}

        {pictures.length > 0 && !error && (
          <ImageGallery pictures={pictures} onClickImage={this.onClickImage} />
        )}

        {shouldRenderButton && <Button onClick={this.fetchPictures} />}

        {picIsNotFound && (
          <p className={s.error}>Nothing were found. Enter another query</p>
        )}

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
