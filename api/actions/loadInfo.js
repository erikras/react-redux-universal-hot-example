export default function loadInfo() {
  return Promise.resolve({
    message: 'This came from the api server',
    time: Date.now()
  });
}
