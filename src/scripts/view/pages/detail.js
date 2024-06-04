// detail.js
import UrlParser from '../../routes/url-parser';
import RestaurantDbSource from '../../data/restaurantdb-source';
import { createRestaurantDetailTemplate } from '../templates/template-creators';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Detail = {
  async render() {
    return `
        <resto-detail></resto-detail>
        <div id="likeButtonContainer"></div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantDbSource.detailRestaurant(url.id);
    const detailContainer = document.querySelector('.detail_content');
    const skipLink = document.querySelector('skip-content>a');
    const mainContent = document.querySelector('#main-post');

    mainContent.setAttribute('tabindex', '-1');
    skipLink.setAttribute('href', '#likeButton');
    detailContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        pictureId: restaurant.pictureId,
        description: restaurant.description,
        city: restaurant.city,
        rating: restaurant.rating,
      },
    });
  },
};

export default Detail;
