const url = 'https://ukm.sixeyestech.com';
export const endpoint = {
  registerUser: `${url}/api/auth/register`,
  loginUser: `${url}/api/auth/login`,
  logoutUser: `${url}/api/auth/logout`,
  getProvince: `${url}/api/provinces`,
  getCities: (provinceId) => `${url}/api/cities?province_id=${provinceId}`,
  getDistrict: (cityId) => `${url}/api/districts?city_id=${cityId}`,
  getShop: (lat, lng) => `${url}/api/shops?lat=${lat}&lng=${lng}`
};
