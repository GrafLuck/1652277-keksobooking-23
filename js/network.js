function getData(onSuccess) {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
    });
};

function sendData(onSuccess, onFail, body) {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

// fetch(
//   'https://23.javascript.pages.academy/keksobooking',
//   {
//     method: 'POST',
//     // headers: {
//     //   'Content-Type': 'multipart/form-data',
//     // },
//     // mode: 'same-origin',
//     body: new FormData(evt.target),
//   })
//   .then((response) => response.json())
//   .then((json) => {
//     returnToInitialValue();
//   });

export {getData, sendData};
