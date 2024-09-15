// ToastComponent.js
import Toast from 'react-native-toast-message';

export const showToast = (type, text1, text2) => {
  Toast.show({
    type : type,
    text1 : text1,
    text2 : text2,
  });
};


// const showToast = () => {
//     Toast.show({
//       type: 'success',
//       text1: 'Hello',
//       text2: 'This is some something 👋'
//     });
//   }


export const currencyFormat = (num) => {
  return 'Rp. ' + Math.round(num).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}
