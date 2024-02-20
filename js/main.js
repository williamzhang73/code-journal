'use strict';
const $photoInput = document.querySelector('.photo-url');
const $image = document.querySelector('.container .row img');
const $form = document.querySelector('.container form');
if (!$photoInput || !$image || !$form) {
  throw new Error('query failed');
}
$photoInput?.addEventListener('input', (event) => {
  const $eventTarget = event.target;
  const imageUrl = $eventTarget.value;
  $image.setAttribute('src', imageUrl);
});
$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $form.elements;
  const titleValue = $formElements.title.value;
  const urlValue = $formElements.photoUrl.value;
  const notes = $formElements.notes.value;
  const entryId = data.nextEntryId;
  const entryObject = {
    entryId,
    title: titleValue,
    imagesUrl: urlValue,
    notes,
  };
  data.entries.unshift(entryObject);
  data.nextEntryId++;
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
