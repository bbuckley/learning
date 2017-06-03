const all = [
  'id',
  'bcd',
  'doe',
  'dot',
  'pbc',
  'completed',
  'certed',
  'run',
  'status',
  'tc',
  'ptags',
];

const calculated = ['calc_age', 'hir_age'];
const personal = ['ptags', 'pnotes'];

const attr = ['alignText', 'editable', 'sort_type', 'sortable', 'tooltip'];

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
  tags: { tooltip: 'shared tag', isTag: true, sortable: false, editable: true },
  ptags: {
    tooltip: 'personal tag',
    isTag: true,
    sortable: false,
    editable: true,
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
};
