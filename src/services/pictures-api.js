import axios from 'axios';

const fetchPictures = ({ searchQuery = '', page = 1 }) => {
  const picUrl = `https://pixabay.com/api/?key=18661870-79eb159249f519a0733d37bbc&image_type=photo&orientation=horizontal&per_page=12&q=${searchQuery}&page=${page}`;
  return axios.get(picUrl).then(response => response.data.hits);
};

export default fetchPictures;
