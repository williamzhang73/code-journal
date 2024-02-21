'use strict';
const $ulElement = document.querySelector("div[data-view='entries'] > ul");
if (!$ulElement) {
  throw new Error('$ulElement query failed.');
}
const $EntryFromUrlElement = document.querySelector('.photo-url');
const $imageElement = document.querySelector('.container .row img');
const $form = document.querySelector('.container form');
const $entryFormH2Element = document.querySelector(
  "div[data-view='entry-form'] h2"
);
if (!$EntryFromUrlElement || !$imageElement || !$form) {
  throw new Error('query failed');
}
$EntryFromUrlElement?.addEventListener('input', (event) => {
  const $eventTarget = event.target;
  const imageUrl = $eventTarget.value;
  $imageElement.setAttribute('src', imageUrl);
});
$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $form.elements;
  const titleValue = $formElements.title.value;
  const urlValue = $formElements.photoUrl.value;
  const notes = $formElements.notes.value;
  if (data.editing === null) {
    const entryId = data.nextEntryId;
    const entryObject = {
      entryId,
      title: titleValue,
      imagesUrl: urlValue,
      notes,
    };
    data.entries.unshift(entryObject);
    data.nextEntryId++;
    $imageElement.setAttribute('src', 'images/placeholder-image-square.jpg');
    const $li = renderEntry(entryObject);
    $ulElement.insertBefore($li, $ulElement.firstChild);
  } else {
    const entryObject = {
      entryId: data.editing.entryId,
      title: titleValue,
      imagesUrl: urlValue,
      notes,
    };
    data.entries[data.entries.length - entryObject.entryId] = entryObject;
    const $updatedLiElement = renderEntry(entryObject);
    const $liElements = document.querySelectorAll(
      "div[data-view='entries'] ul li"
    );
    if (!$liElements) {
      throw new Error('$liElements query failed');
    }
    for (const $liElement of $liElements) {
      if ($liElement.dataset.entryId === entryObject.entryId.toString()) {
        console.log('two elements same');
        $liElement.replaceWith($updatedLiElement);
      } else {
        console.log('not same');
      }
    }
  }
  data.editing = null;
  $form.reset();
  toggleNoEntries();
  viewSwap('entries');
});
// render an entry object into a DOM element
function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.setAttribute('class', 'row');
  $li.setAttribute('data-entry-id', entry.entryId.toString());
  const $EntryFormImgElement = document.createElement('img');
  $EntryFormImgElement.setAttribute('src', entry.imagesUrl);
  $EntryFormImgElement.setAttribute('alt', 'picture');
  const $divElement1 = document.createElement('div');
  $divElement1.setAttribute('class', 'column-full column-half');
  const $divElement2 = document.createElement('div');
  $divElement2.setAttribute('class', 'column-full column-half');
  const $h4 = document.createElement('h4');
  $h4.textContent = entry.title;
  const $pElement = document.createElement('p');
  $pElement.textContent = entry.notes;
  const $pencilIcon = document.createElement('i');
  $pencilIcon.setAttribute('class', 'fas fa-pencil-alt');
  $li.append($divElement1);
  $li.append($divElement2);
  $divElement1.append($EntryFormImgElement);
  $divElement2.append($h4);
  $divElement2.append($pencilIcon);
  $divElement2.append($pElement);
  return $li;
}
document.addEventListener('DOMContentLoaded', () => {
  for (const entry of data.entries) {
    const $li = renderEntry(entry);
    $ulElement.append($li);
  }
  viewSwap(data.view);
  toggleNoEntries();
  data.editing = null;
});
// if no entries found, display the message.
const $messageElement = document.querySelector(
  "div[data-view='entries']> div[data-view='no-entries']"
);
if (!$messageElement) {
  throw new Error('the $messageElement query failed.');
}
function toggleNoEntries() {
  const entriesLength = data.entries.length;
  if (entriesLength === 0) {
    $messageElement.className = '';
  } else {
    $messageElement.className = 'hidden';
  }
}
const $entriesElement = document.querySelector("div[data-view='entries']");
const $entryFormElement = document.querySelector("div[data-view='entry-form']");
if (!$entriesElement || !$entryFormElement) {
  throw new Error('$entriesElement or $entryFormElement query failed');
}
// the funtion should show the view whose name is argumment.
function viewSwap(view) {
  if (view === 'entries') {
    $entriesElement.className = '';
    $entryFormElement.className = 'hidden';
  } else if (view === 'entry-form') {
    $entriesElement.className = 'hidden';
    $entryFormElement.className = '';
  } else {
    throw new Error('no such value in arguments of function viewSwap.');
  }
  data.view = view;
}
// entries in navbar
const $anchorElement = document.querySelector('.entriesLink');
if (!$anchorElement) {
  throw new Error('the $anchorElement query failed');
}
$anchorElement.addEventListener('click', (event) => {
  event.preventDefault();
  viewSwap('entries');
  toggleNoEntries();
});
// add event handler to new anchor
const $newEntriesLinkElement = document.querySelector('.newEntriesLink');
if (!$newEntriesLinkElement) {
  throw new Error('$newEntriesLinkElement query failed');
}
$newEntriesLinkElement.addEventListener('click', (event) => {
  event.preventDefault();
  $form.reset();
  data.editing = null;
  $entryFormTitleElement.setAttribute('value', '');
  $entryFormNotesElement.textContent = '';
  $EntryFromUrlElement.setAttribute('value', '');
  $imageElement.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryFormH2Element.textContent = 'New Entry';
  viewSwap('entry-form');
});
const $entryFormTitleElement = document.querySelector(
  "div[data-view='entry-form'] .title"
);
const $entryFormNotesElement = document.querySelector(
  "div[data-view='entry-form'] .notes"
);
$ulElement.addEventListener('click', (event) => {
  const $eventTarget = event.target;
  const ifPencilClicked = $eventTarget.matches('i');
  if (ifPencilClicked) {
    viewSwap('entry-form');
    const $closestLiElement = $eventTarget.closest('li');
    const entryId = $closestLiElement.dataset.entryId;
    const entries = data.entries;
    for (const entry of entries) {
      if (entry.entryId.toString() === entryId) {
        data.editing = entry;
        $entryFormTitleElement.setAttribute('value', entry.title);
        $entryFormNotesElement.textContent = entry.notes;
        $EntryFromUrlElement.setAttribute('value', entry.imagesUrl);
        $imageElement.setAttribute('src', entry.imagesUrl);
        $entryFormH2Element.textContent = 'Edit Entry';
        break;
      }
    }
  }
});
