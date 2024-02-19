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

const $photoInput = document.querySelector('.photo-url');
const $image = document.querySelector(
  '.container .row img'
) as HTMLImageElement;
const $form = document.querySelector('.container form') as HTMLFormElement;
console.log('$formElements', $form);
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
});
