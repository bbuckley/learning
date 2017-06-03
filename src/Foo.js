import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase, { FIRE_NAME } from './base';
import { store } from './index';
import { SORT_TOGGLE } from './actions/index';
import { sorter, symbol } from './sort';

import { fields } from './fields';

const HeadLink = ({ fld, isLive, value }) => {
  if (!isLive) return <th>{fld}</th>;
  return (
    <th>
      <a
        href="#"
        onClick={() => {
          store.dispatch({ type: SORT_TOGGLE, fld });
        }}
      >
        {value}
      </a>
    </th>
  );
};

const Header = ({ flds, sort }) => (
  <thead>
    <tr>
      {flds.map(fld => {
        return (
          <HeadLink
            key={fld}
            fld={fld}
            value={symbol(fld, sort)}
            isLive={fields[fld].sortable}
          />
        );
      })}
    </tr>
  </thead>
);

const Row = ({ flds, tc }) => (
  <tr>
    {flds.map(fld => <Field tc={tc} fld={fld} key={fld} />)}
  </tr>
);

const Field = ({ tc, fld, onClick }) => {
  let style = fields[fld].editable
    ? { cursor: 'pointer' }
    : { cursor: 'not-allowed' };

  if (fields[fld].textAlign) {
    style = {
      ...style,
      textAlign: fields[fld].textAlign
    };
  }
  // style = {
  //   ...style,
  //   textAlign: fields[fld].align ? fields[fld].align : 'left',
  // };

  const fClick = fields[fld].editable ? () => console.log({ fld, tc }) : null;

  return (
    <td style={style} key={fld} onClick={fClick}>
      {tc[fld]}
    </td>
  );
};

const Rows = ({ tcs, flds }) => (
  <tbody>
    {tcs.map(tc => <Row key={tc.id} tc={tc} flds={flds} />)}
  </tbody>
);

class Foo extends Component {
  constructor() {
    super();
    this.state = {
      tcs: [],
    };
  }

  componentDidMount() {
    firebase.database().ref(FIRE_NAME).on('value', snapshot => {
      const o = snapshot.val();
      let tcs = Object.keys(o).map(k => {
        const v = o[k];
        v.id = k;
        return v;
      });

      tcs = tcs.map(tc => {
        const b = new Date(tc.dob).getFullYear();
        const h = new Date(tc.doe).getFullYear();
        const e = new Date(tc.crd).getFullYear();

        const hir_age = h - b;
        const calc_age = e - b;
        return { ...tc, hir_age, calc_age };
      });

      this.props.personal.forEach(p => {
        const i = tcs.findIndex(t => t.id === p.id);
        if (i !== -1) tcs[i]['ptags'] = p['ptags'];
      });

      this.setState({ tcs });
    });
  }

  render() {
    const { flds, sort } = this.props;
    let { tcs } = this.state;

    tcs = sorter(tcs, sort);
    return (
      <div>
        <table>
          <caption>Foo {tcs.length}!</caption>
          <Header flds={flds} sort={sort} />
          <Rows flds={flds} tcs={tcs} />
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    personal: state.personal,
    sort: state.sort,
  };
};

export default connect(mapStateToProps)(Foo);
