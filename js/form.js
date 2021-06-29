function deactivateForm() {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.add('ad-form--disabled');
  const fieldsetsForm = adForm.querySelectorAll('fieldset');
  fieldsetsForm.forEach((fieldset) => {
    fieldset.disabled = true;
  });

  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.add('map__filters--disabled');
  const mapFilterSelects = mapFilters.querySelectorAll('select');
  const mapFilterFieldset = mapFilters.querySelector('fieldset');
  mapFilterSelects.forEach((select) => {
    select.disabled = true;
  });
  mapFilterFieldset.disabled = true;
}

function activateForm() {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');
  const fieldsetsForm = adForm.querySelectorAll('fieldset');
  fieldsetsForm.forEach((fieldset) => {
    fieldset.disabled = false;
  });

  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.remove('map__filters--disabled');
  const mapFilterSelects = mapFilters.querySelectorAll('select');
  const mapFilterFieldset = mapFilters.querySelector('fieldset');
  mapFilterSelects.forEach((select) => {
    select.disabled = false;
  });
  mapFilterFieldset.disabled = false;
}

export {deactivateForm, activateForm};
