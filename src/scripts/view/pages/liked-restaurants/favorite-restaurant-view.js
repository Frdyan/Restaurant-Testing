import { createRestaurantListTemplate } from '../../templates/template-creators';

class FavoriteRestaurantView {
  getTemplate() {
    return `
      <section class="content" id="main-content">
        <input id="query" type="text">
        <div class="explore">
            <h1 class="explore-title">Explore Restaurant</h1>

            <div id="card" class="card"></div>
        </div>
      </section>
      `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurants) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantListTemplate(restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }
    document.getElementById('card').innerHTML = html;

    document.getElementById('card').dispatchEvent(new Event('card:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return `
      <div class="restaurants__not__found">
        Tidak ada restaurant untuk ditampilkan
      </div>
    `;
  }
}
export default FavoriteRestaurantView;
