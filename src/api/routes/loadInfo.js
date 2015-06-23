export default function (req) {
  return new Promise(function (resolve) {
    resolve({
      message: 'This came from the api server',
      time: Date.now()
    });
  });
};