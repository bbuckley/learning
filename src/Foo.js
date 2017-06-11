import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from './index';
import { SORT_TOGGLE, HIDE_VALUE, HIDE_CLEAR } from './actions/index';
import { sorter, symbol } from './sort';

import { fields } from './fields';
import { filter } from './filter';
// import ReactTooltip from 'react-tooltip';

const HeadLink = ({ fld, isLive, value }) => {
  // let display
  // if(fields[fld].tooltip){
  //   display =
  //   <span>
  //   <p data-tip={fields[fld].tooltip}>{fld}</p>
  //   <ReactTooltip />
  //   </span>
  // }else{
  //   display = fld
  // }
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
      textAlign: fields[fld].textAlign,
    };
  }
  //const fClick = fields[fld].editable ? () => console.log({ fld, tc }) : null;
  const fClick = () =>
    store.dispatch({ type: HIDE_VALUE, field: fld, value: tc[fld] });

  return (
    <td style={style} key={fld} onClick={fClick}>
      {tc[fld]}
    </td>
  );
};

const Rows = ({ tcs, flds }) => {
  return (
    <tbody>
      {tcs.map(tc => <Row key={tc.id} tc={tc} flds={flds} />)}
    </tbody>
  );
};

//const NofM = ({ fcs, tcs }) => <div>{fcs.length} of {tcs.length}</div>;

const NofM = ({ fcs, tcs, click }) => (
  <div>{fcs.length} of <a href="#" onClick={click}>{tcs.length}</a></div>
);

NofM.defaultProps = {
  click: () => store.dispatch({type: HIDE_CLEAR})
}


class Foo extends Component {
  render() {
    const { flds, sort } = this.props;
    let { tcs } = this.props;
    const fcs = filter(this.props.hide, tcs);
    tcs = sorter(tcs, sort);
    return (
      <div>
        <table>
          <caption><NofM fcs={fcs} tcs={tcs} /></caption>
          <Header flds={flds} sort={sort} />
          <Rows flds={flds} tcs={fcs} />
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    personal: state.personal,
    hide: state.hide,
    sort: state.sort,
  };
};

Foo.defaultProps = {
  flds: ['tc', 'pbc', 'calc_type'],
  tcs: [],
};

export default connect(mapStateToProps)(Foo);
