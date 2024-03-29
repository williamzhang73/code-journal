/* exported data */
interface Data {
  view: string;
  entries: EntryObject[];
  editing: null | EntryObject;
  nextEntryId: number;
}

let data: Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
window.addEventListener('beforeunload', () => {
  const serializedData = JSON.stringify(data);
  localStorage.setItem('data', serializedData);
});

if (localStorage.length > 0) {
  const getData = localStorage.getItem('data');
  if (getData !== null) {
    const deserialized = JSON.parse(getData);
    data = deserialized;
  }
}
