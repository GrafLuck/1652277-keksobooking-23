let listOfAd;

function setListOfAd(ads) {
  listOfAd = ads;
  return listOfAd;
}

function getListOfAd() {
  return listOfAd;
}

function getData(onSuccess, onFail) {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
      setListOfAd(ads);
    })
    .catch((error) => onFail(error));
}

function sendData(onSuccess, onFail, body) {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
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
}

export {getData, sendData, getListOfAd};
