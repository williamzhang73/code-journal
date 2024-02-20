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
function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.setAttribute('class', 'row');
  const $imgElement = document.createElement('img');
  $imgElement.setAttribute('src', entry.imagesUrl);
  $imgElement.setAttribute('alt', 'picture');
  const $divElement1 = document.createElement('div');
  $divElement1.setAttribute('class', 'column-full column-half');
  const $divElement2 = document.createElement('div');
  $divElement2.setAttribute('class', 'column-full column-half');
  const $h4 = document.createElement('h4');
  $h4.textContent = entry.title;
  const $pElement = document.createElement('p');
  $pElement.textContent = entry.notes;
  $li.append($divElement1);
  $li.append($divElement2);
  $divElement1.append($imgElement);
  $divElement2.append($h4);
  $divElement2.append($pElement);
  return $li;
}
const $ulElement = document.querySelector("div[data-view='entries'] > ul");
if (!$ulElement) {
  throw new Error('$ulElement query failed.');
}
/* console.log('$ulElement', $ulElement); */
document.addEventListener('DOMContentLoaded', () => {
  for (const entry of data.entries) {
    const $li = renderEntry(entry);
    console.log('$li', $li);
    $ulElement.append($li);
  }
});
