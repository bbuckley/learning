export const allFields = [
  'id',
  'bcd',
  'doe',
  'dot',
  'pbc',
  'ric',
  'rics',
  'completed',
  'certed',
  'run',
  'status',
  'ssn',
  'origngal_ssn',
  'tc',
  'tags',
  'ptags',
];

export const dates = ['crd', 'dob', 'doe', 'dot', 'bcd'];
const calculated = ['calc_age', 'hir_age'];
const personal = ['ptags', 'pnotes'];

const attr = ['alignText', 'editable', 'sort_type', 'sortable', 'tooltip'];

//console.log({ allFields, calculated, personal, attr });

export const fields = {
  id: { sort_type: 'text', sortable: false, editable: false },
  tc: { sort_type: 'number', sortable: true, editable: false },
  status: {
    textAlign: 'center',
    sort_type: 'text',
    sortable: true,
    editable: true,
  },
  calc_type: { sort_type: 'text', sortable: true, editable: true },
  crd: { editable: true },
  tags: { tooltip: 'shared tag', isTag: true, sortable: false, editable: true },
  ptags: {
    tooltip: 'personal tag',
    isTag: true,
    sortable: false,
    editable: true,
    personal: true,
  },
  pnotes: {
    personal: true,
  },
  bcd: {
    tooltip: 'age at bcd',
    textAlign: 'right',
    sort_type: 'date',
    sortable: true,
    editable: true,
  },
  doe: {
    textAlign: 'right',
    sort_type: 'date',
    sortable: true,
    editable: true,
  },
  dot: {
    textAlign: 'right',
    sort_type: 'date',
    sortable: true,
    editable: true,
  },
  dob: {
    textAlign: 'right',
    sort_type: 'date',
    sortable: true,
    editable: true,
  },
  pbc: { sort_type: 'text', sortable: true, editable: true },
  hir_age: {
    textAlign: 'right',
    sort_type: 'number',
    sortable: true,
    editable: false,
  },
  calc_age: {
    tooltip: 'age at crd',
    textAlign: 'right',
    sort_type: 'number',
    sortable: true,
    editable: false,
  },
  ric: { editable: true },
};
