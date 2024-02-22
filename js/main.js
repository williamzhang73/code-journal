'use strict';
const $ulElement = document.querySelector("div[data-view='entries'] > ul");
if (!$ulElement) {
  throw new Error('$ulElement query failed.');
}
const $entryFormUrlElement = document.querySelector('.photo-url');
const $imageElement = document.querySelector('.container .row img');
const $form = document.querySelector('.container form');
const $entryFormH2Element = document.querySelector(
  "div[data-view='entry-form'] h2"
);
if (!$entryFormUrlElement || !$imageElement || !$form) {
  throw new Error('query failed');
}
$entryFormUrlElement?.addEventListener('input', (event) => {
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
    $ulElement.prepend($li);
  } else {
    const entryObject = {
      entryId: data.editing.entryId,
      title: titleValue,
      imagesUrl: urlValue,
      notes,
    };
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === entryObject.entryId) {
        data.entries[i] = entryObject;
        break;
      }
    }
    const $updatedLiElement = renderEntry(entryObject);
    const $liElements = document.querySelectorAll(
      "div[data-view='entries'] ul li"
    );
    if (!$liElements) {
      throw new Error('$liElements query failed');
    }
    for (const $liElement of $liElements) {
      if ($liElement.dataset.entryId === entryObject.entryId.toString()) {
        $liElement.replaceWith($updatedLiElement);
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
  const $entryFormImgElement = document.createElement('img');
  $entryFormImgElement.setAttribute('src', entry.imagesUrl);
  $entryFormImgElement.setAttribute('alt', 'picture');
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
  $divElement1.append($entryFormImgElement);
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
const $entryFormTitleElement = document.querySelector(
  "div[data-view='entry-form'] .title"
);
$newEntriesLinkElement.addEventListener('click', (event) => {
  event.preventDefault();
  $form.reset();
  data.editing = null;
  $entryFormTitleElement.value = '';
  $entryFormUrlElement.value = '';
  $entryFormNotesElement.value = '';
  $imageElement.src = 'images/placeholder-image-square.jpg';
  $entryFormH2Element.textContent = 'New Entry';
  viewSwap('entry-form');
});
const $entryFormNotesElement = document.querySelector(
  "div[data-view='entry-form'] .notes"
);
const $divDeleteElement = document.querySelector(
  "div[data-view='entry-form'] .row .deleteButton"
);
const $divSaveElement = document.getElementById('savediv');
/* console.log("$divSaveElement: ", $divSaveElement); */
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
        $entryFormTitleElement.value = entry.title;
        $entryFormNotesElement.value = entry.notes;
        $entryFormUrlElement.value = entry.imagesUrl;
        $imageElement.src = entry.imagesUrl;
        $entryFormH2Element.textContent = 'Edit Entry';
        break;
      }
    }
    // edit layout of button delete entity and save button
    $divDeleteElement.classList.remove('hidden');
    $divSaveElement.className = 'submit';
    $deleteEntry.setAttribute('data-entry-id', entryId);
  }
});
const $deleteEntry = document.querySelector(
  "div[data-view='entry-form'] .row .delete"
);
const $dialogElement = document.querySelector('dialog');
const $cancelModal = document.querySelector('.dismiss-modal');
const $confirmModal = document.querySelector('dialog .confirm-modal');
if (!$deleteEntry || !$dialogElement || !$cancelModal || !$confirmModal) {
  throw new Error('modal query failed');
}
$deleteEntry.addEventListener('click', () => {
  $dialogElement.showModal();
  /*   console.log("entryId: ", $deleteEntry.dataset.entryId); */
});
$cancelModal.addEventListener('click', () => {
  $dialogElement.close();
});
//add event listener to confirm button at dialog
$confirmModal.addEventListener('click', () => {
  /*   console.log('confirm button clicked'); */
  const entryId = $deleteEntry.dataset.entryId;
  if (entryId) {
    /*     console.log('entryId: ', entryId); */
    let i = 0;
    for (const entry of data.entries) {
      if (entry.entryId.toString() === entryId) {
        data.entries.splice(i, 1);
        break;
      }
      i++;
    }
    const $liElements = document.querySelectorAll(
      "div[data-view='entries'] ul li"
    );
    if (!$liElements) {
      throw new Error('$liElements query failed');
    }
    for (const $liElement of $liElements) {
      if ($liElement.dataset.entryId === entryId) {
        $liElement.remove();
        break;
      }
    }
    const $hiddenMessage = document.querySelector(
      "div[data-view='entries'] div[data-view='no-entries']"
    );
    if (!$hiddenMessage) {
      throw new Error('$hiddenMessage query failed');
    }
    console.log('$hiddenMessage: ', $hiddenMessage);
    if (data.entries.length === 0) {
      $hiddenMessage.className = '';
    } else {
      $hiddenMessage.className = 'hidden';
    }
    viewSwap('entries');
    $dialogElement.close();
  } else {
    throw new Error('entryId not exists.');
  }
});
