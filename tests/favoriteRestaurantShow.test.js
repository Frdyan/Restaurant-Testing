import FavoriteRestaurantView from '../src/scripts/view/pages/liked-restaurants/favorite-restaurant-view';
import FavoriteRestaurantShowPresenter from '../src/scripts/view/pages/liked-restaurants/favorite-restaurant-show-presenter';

describe('Showing all favorite restaurants', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurants have been liked', () => {
    it('should ask for the favorite restaurants', () => {
      const favoriteRestaurants = {
        getAllRestaurant: jest.fn().mockImplementation(() => []),
      };

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });

      expect(favoriteRestaurants.getAllRestaurant).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no restaurants have been liked', (done) => {
      document.getElementById('card').addEventListener('card:updated', () => {
        expect(document.querySelectorAll('.restaurants__not__found').length).toEqual(1);

        done();
      });

      const favoriteRestaurants = {
        getAllRestaurant: jest.fn().mockImplementation(() => []),
      };

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
    });
  });

  describe('When favorite restaurants exist', () => {
    it('should show the restaurants', (done) => {
      document.getElementById('card').addEventListener('card:updated', () => {
        expect(document.querySelectorAll('.card-item').length).toEqual(2);

        done();
      });

      const favoriteRestaurants = {
        getAllRestaurant: jest.fn().mockImplementation(() => [
          {
            id: 11,
            title: 'A',
            rating: 3,
            description: 'Sebuah restaurant A',
          },
          {
            id: 22,
            title: 'B',
            rating: 4,
            description: 'Sebuah restaurant B',
          },
        ]),
      };
      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
    });
  });
});
