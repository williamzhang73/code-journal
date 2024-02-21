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
const $photoInput = document.querySelector('.photo-url');
const $image = document.querySelector(
  '.container .row img'
) as HTMLImageElement;
const $form = document.querySelector('.container form') as HTMLFormElement;
if (!$photoInput || !$image || !$form) {
  throw new Error('query failed');
}
$photoInput?.addEventListener('input', (event: Event) => {
  const $eventTarget = event.target as HTMLInputElement;
  const imageUrl = $eventTarget.value;
  $image.setAttribute('src', imageUrl);
});

$form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const $formElements = $form.elements as FormElements;
  const titleValue = $formElements.title.value;
  const urlValue = $formElements.photoUrl.value;
  const notes = $formElements.notes.value;

  const entryId = data.nextEntryId;
  const entryObject: EntryObject = {
    entryId,
    title: titleValue,
    imagesUrl: urlValue,
    notes,
  };
  data.entries.unshift(entryObject);
  data.nextEntryId++;
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();

  const $li = renderEntry(entryObject);
  $ulElement.append($li);
  viewSwap('entries');
  toggleNoEntries();
});

// render an entry object into a DOM element
function renderEntry(entry: EntryObject): HTMLElement {
  /*   <i class="fas fa-pencil-alt"></i> */

  const $li = document.createElement('li');
  $li.setAttribute('class', 'row');
  $li.setAttribute('data-entry-id', entry.entryId.toString());

  const $imgElement = document.createElement('img');
  $imgElement.setAttribute('src', entry.imagesUrl);
  $imgElement.setAttribute('alt', 'picture');

  const $divElement1 = document.createElement('div');
  $divElement1.setAttribute('class', 'column-full column-half');

  const $divElement2 = document.createElement('div');
  $divElement2.setAttribute('class', 'column-full column-half');

  const $h4 = document.createElement('h4');
  $h4.textContent = entry.title;
  /*   $h4.setAttribute('class', 'column-half'); */
  const $pElement = document.createElement('p');
  $pElement.textContent = entry.notes;
  /* $pElement.setAttribute('class', 'column-full'); */

  const $pencilIcon = document.createElement('i');
  $pencilIcon.setAttribute('class', 'fas fa-pencil-alt');

  $li.append($divElement1);
  $li.append($divElement2);
  $divElement1.append($imgElement);
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
$newEntriesLinkElement.addEventListener('click', (event: Event) => {
  event.preventDefault();
  viewSwap('entry-form');
});

$ulElement.addEventListener('click', (/* event: Event */) => {
  /*   console.log("I am gonna editing"); */
  /*   const $eventTarget=event.target; */
  /* const $pencil=document.querySelector() */
  /*  console.log("$eventTarget", $eventTarget); */
  /* if($eventTarget===){} */
});
