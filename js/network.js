function getData(onSuccess) {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((ads) => {
      console.log(ads);
      onSuccess(ads);
    });
    // fetch('https://23.javascript.pages.academy/keksobooking/data')
    //   .then((response) => {
    //     if (response.ok) {
    //       console.log(response);
    //       console.log(response.json());
    //     } else {
    //       // onFail();
    //     }
    //   })
    //   .then((ads) => {
    //     console.log(ads);
    //     onSuccess(ads);
    //   });
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

export {getData, sendData};
