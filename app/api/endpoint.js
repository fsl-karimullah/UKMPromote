const url = 'https://ukm.sixeyestech.com';
export const endpoint = {
  registerUser: `${url}/api/auth/register`,
  loginUser: `${url}/api/auth/login`,
  logoutUser: `${url}/api/auth/logout`,
  getProvince: `${url}/api/provinces`,
  getCategories: `${url}/api/categories`,
  forgotPassword: `${url}/api/auth/forgot-password`,
  updateProfile: `${url}/api/me`,
  getProfile: `${url}/api/me`,
  searchShop: (lat, lng, value) => `${url}/api/shops?q=${value}&lat=${lat}&lng=${lng}`,
  getCities: (provinceId) => `${url}/api/cities?province_id=${provinceId}`,
  getDistrict: (cityId) => `${url}/api/districts?city_id=${cityId}`,
  getShop: (lat, lng) => `${url}/api/shops?lat=${lat}&lng=${lng}`,
  getShopAll: (lat, lng) => `${url}/api/shops?with_geo=0`,
  getShopByFilter: (lat, lng, categoryId) => `${url}/api/shops?lat=${lat}&lng=${lng}&category_id=${categoryId}`,
  getShopDetail: (id) => `${url}/api/shops/${id}`,
  favouriteShop: (id) => `${url}/api/favorites`, 
  deleteFavouriteShop: (id) => `${url}/api/favorites/${id}`, 
  getFavouriteShop: `${url}/api/favorites`, 
  getNews: `${url}/api/news`, 
  getNewsDetails: (id) => `${url}/api/news/${id}`, 
};
  