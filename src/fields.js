export const fields = {
  id: { sort_type: 'text', sortable: false, editable: false },
  tc: { sort_type: 'number', sortable: true, editable: false },
  status: {
    align: 'center',
    sort_type: 'text',
    sortable: true,
    editable: true,
  },
  calc_type: { sort_type: 'text', sortable: true, editable: true },
  tags: { isTag: true, sortable: false, editable: true },
  ptags: { isTag: true, sortable: false, editable: true },
  bcd: { align: 'right', sort_type: 'date', sortable: true, editable: true },
  doe: { align: 'right', sort_type: 'date', sortable: true, editable: true },
  dot: { align: 'right', sort_type: 'date', sortable: true, editable: true },
  dob: { align: 'right', sort_type: 'date', sortable: true, editable: true },
  pbc: { sort_type: 'text', sortable: true, editable: true },
  hir_age: {
    align: 'right',
    sort_type: 'number',
    sortable: true,
    editable: false,
  },
  calc_age: {
    align: 'right',
    sort_type: 'number',
    sortable: true,
    editable: false,
  },
};
