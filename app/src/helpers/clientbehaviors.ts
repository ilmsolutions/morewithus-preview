require('../assets/libs/sweetalert/sweetalert.css');

const isBrowser = typeof window !== 'undefined';
const swal = isBrowser ? require( '../assets/libs/sweetalert/sweetalert.min.js') : undefined;
