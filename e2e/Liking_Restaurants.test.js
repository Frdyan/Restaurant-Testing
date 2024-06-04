const assert = require('assert');

Feature('Liking Restaurants');
Before(({ I }) => {
  I.amOnPage('/#/favorite');
});
Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurants__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
    I.see('Tidak ada restaurant untuk ditampilkan', '.restaurants__not__found');

    I.amOnPage('/');

    I.seeElement('.card-item-title a');
    const firstRestaurant = locate('.card-item-title a').first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.card-item');
  const likedRestaurantTitle = await I.grabTextFrom('.card-item-title');
 
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('unliking one restaurant', async ({ I }) => {
    I.see('Tidak ada restaurant untuk ditampilkan', '.restaurants__not__found');

    I.amOnPage('/');
    I.wait(2);

    I.seeElement('.card-item-title a');

    const firstRestaurantName = (await I.grabTextFrom(locate('.card-item-title').first())).trim();
    I.click(locate('.card-item-title a').first());
    I.wait(3);

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.seeElement('.card-item');

    const likedRestaurantName = (await I.grabTextFrom('.card-item-title')).trim();
    assert.strictEqual(firstRestaurantName, likedRestaurantName);

    I.click('.card-item-title a');
    I.wait(3);

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');

    const FavoriteRestaurantIsEmpty = (await I.grabTextFrom('.restaurants__not__found')).trim();
    assert.strictEqual('Tidak ada restaurant untuk ditampilkan', FavoriteRestaurantIsEmpty);
});
