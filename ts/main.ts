/* global data */
interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photoUrl: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

interface EntryObject {
  entryId: number;
  title: string;
  imagesUrl: string;
  notes: string;
}
const $ulElement = document.querySelector("div[data-view='entries'] > ul");
if (!$ulElement) {
  throw new Error('$ulElement query failed.');
}

const $entryFormUrlElement = document.querySelector(
  '.photo-url'
) as HTMLInputElement;
const $imageElement = document.querySelector(
  '.container .row img'
) as HTMLImageElement;
const $form = document.querySelector('.container form') as HTMLFormElement;
const $entryFormH2Element = document.querySelector(
  "div[data-view='entry-form'] h2"
) as HTMLHeadingElement;

if (!$entryFormUrlElement || !$imageElement || !$form) {
  throw new Error('query failed');
}
$entryFormUrlElement?.addEventListener('input', (event: Event) => {
  const $eventTarget = event.target as HTMLInputElement;
  const imageUrl = $eventTarget.value;
  $imageElement.setAttribute('src', imageUrl);
});

$form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const $formElements = $form.elements as FormElements;
  const titleValue = $formElements.title.value;
  const urlValue = $formElements.photoUrl.value;
  const notes = $formElements.notes.value;

  if (data.editing === null) {
    const entryId = data.nextEntryId;
    const entryObject: EntryObject = {
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
    const entryObject: EntryObject = {
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
    const $liElements: NodeListOf<HTMLElement> = document.querySelectorAll(
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
function renderEntry(entry: EntryObject): HTMLElement {
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
) as HTMLDivElement;
if (!$messageElement) {
  throw new Error('the $messageElement query failed.');
}

function toggleNoEntries(): void {
  const entriesLength = data.entries.length;
  if (entriesLength === 0) {
    $messageElement.className = '';
  } else {
    $messageElement.className = 'hidden';
  }
}

const $entriesElement = document.querySelector(
  "div[data-view='entries']"
) as HTMLDivElement;

const $entryFormElement = document.querySelector(
  "div[data-view='entry-form']"
) as HTMLDivElement;

if (!$entriesElement || !$entryFormElement) {
  throw new Error('$entriesElement or $entryFormElement query failed');
}

// the funtion should show the view whose name is argumment.
function viewSwap(view: string): void {
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
$anchorElement.addEventListener('click', (event: Event) => {
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
) as HTMLInputElement;
$newEntriesLinkElement.addEventListener('click', (event: Event) => {
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
) as HTMLTextAreaElement;

$ulElement.addEventListener('click', (event: Event) => {
  const $eventTarget = event.target as HTMLElement;
  const ifPencilClicked = $eventTarget.matches('i');
  if (ifPencilClicked) {
    viewSwap('entry-form');
    const $closestLiElement = $eventTarget.closest('li') as HTMLLIElement;
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
  }
});
