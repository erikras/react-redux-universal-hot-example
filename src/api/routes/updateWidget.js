import {getWidgets} from './loadWidgets';

export default function updateWidget(req) {
  return new Promise((resolve, reject) => {
    // write to database
    setTimeout(() => {
      if (Math.floor(Math.random() * 5) === 0) {
        reject('Oh no! Widget save fails 20% of the time. Try again.');
      } else {
        const widgets = getWidgets(req);
        const widget = req.body;
        if (widget.color === 'Green') {
          reject({
            color: 'We do not accept green widgets' // example server-side validation error
          });
        }
        if (widget.id) {
          widgets[widget.id - 1] = widget;  // id is 1-based. please don't code like this in production! :-)
        }
        resolve(widget);
      }
    }, 2000); // simulate async db write
  });
}
