import { createDictionary } from 'src/utils';

export const messages = createDictionary('star-wars', {
  title: 'Star Wars',
  noSearchResults: 'No results where found for your search',
  noResultsSofar: 'No results so far, try loading more',
  search: 'Search',
  searchPlaceholder: 'Search...',
  viewAll: 'View all',
  loadMore: 'Load more',
  categories: 'Categories',
  edit: 'Edit',
  delete: 'Delete',
  submit: 'Submit',

  name: 'Name',
  birthYear: 'Year of birth',
  gender: 'Gender',
  genderMale: 'Male',
  genderFemale: 'Female',
  genderUnknown: 'Unknown',

  films: 'Films',
  people: 'Characters',
  planets: 'Planets',
  species: 'Species',
  starships: 'Starships',
  vehicles: 'Vehicles',

  validationRequired: 'This field is required',
});
