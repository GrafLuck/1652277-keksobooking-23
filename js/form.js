
function validateType() {
  const typesApartment = document.querySelector('#type');
  const optionsTypesApartment = typesApartment.querySelectorAll('option');
  const price = document.querySelector('#price');
  typesApartment.addEventListener('change', () => {
    const typesApartmentIndex = typesApartment.selectedIndex;
    const optionSelectTypeApartment = optionsTypesApartment[typesApartmentIndex].value;
    switch (optionSelectTypeApartment) {
      case 'bungalow':
        price.placeholder = 0;
        price.min = 0;
        break;
      case 'flat':
        price.placeholder = 1000;
        price.min = 1000;
        break;
      case 'hotel':
        price.placeholder = 3000;
        price.min = 3000;
        break;
      case 'house':
        price.placeholder = 5000;
        price.min = 5000;
        break;
      case 'palace':
        price.placeholder = 10000;
        price.min = 10000;
        break;
    }
  });
}

function validateRooms() {
  const roomNumber = document.querySelector('#room_number');
  const optionsRoomNumber = roomNumber.querySelectorAll('option');
  const capacity = document.querySelector('#capacity');
  const optionsCapacity = capacity.querySelectorAll('option');
  roomNumber.addEventListener('change', () => {
    const roomNumberIndex = roomNumber.selectedIndex;
    const optionSelectRoomNumber = Number.parseInt(optionsRoomNumber[roomNumberIndex].value);
    for (let i = 0; i < optionsCapacity.length; i++) {
      if (optionSelectRoomNumber !== 100) {
        if (Number.parseInt(optionsCapacity[i].value) > optionSelectRoomNumber || Number.parseInt(optionsCapacity[i].value) === 0) {
          optionsCapacity[i].hidden = true;
          switch (optionSelectRoomNumber) {
            case 1:
              optionsCapacity[2].selected = true;
              break;
            case 2:
              optionsCapacity[1].selected = true;
              break;
            case 3:
              optionsCapacity[0].selected = true;
              break;
          }
        } else {
          optionsCapacity[i].hidden = false;
        }
      } else if (Number.parseInt(optionsCapacity[i].value) === 0) {
        optionsCapacity[i].hidden = false;
      } else {
        optionsCapacity[i].hidden = true;
        optionsCapacity[3].selected = true;
      }
    }
  });
}

function validateTime() {
  const timeIn = document.querySelector('#timein');
  const timeOut = document.querySelector('#timeout');
  const optionTimeIn = timeIn.querySelectorAll('option');
  const optionTimeOut = timeOut.querySelectorAll('option');
  timeIn.addEventListener('change', () => {
    const timeInIndex = timeIn.selectedIndex;
    optionTimeOut[timeInIndex].selected = true;
  });

  timeOut.addEventListener('change', () => {
    const timeOutIndex = timeOut.selectedIndex;
    optionTimeIn[timeOutIndex].selected = true;
  });
}

export {validateRooms, validateType, validateTime};
