export const fields = {
  id: { sort_type: 'text', sortable: false, editable: false },
  status: { sort_type: 'text', sortable: true, editable: true },
  calc_type: { sort_type: 'text', sortable: true, editable: true },
  tags: { isTag: true, sortable: false, editable: true },
  ptags: { isTag: true, sortable: false, editable: true },
  doe: { sort_type: 'date', sortable: true, editable: true },
  dot: { sort_type: 'date', sortable: true, editable: true },
  dob: { sort_type: 'date', sortable: true, editable: true },
  pbc: { sort_type: 'text', sortable: true, editable: true },
  hir_age: { sort_type: 'number', sortable: true, editable: false },
  calc_age: { sort_type: 'number', sortable: true, editable: false },
};
