import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from './index';
import './Foo.css';

import {
  SORT_TOGGLE,
  HIDE_VALUE,
  HIDE_CLEAR,
  HIDE_REMOVE_FILTER,
  EDIT_VALUE,
  PERSONAL_EDIT,
} from './actions/index';
import { sorter, symbol } from './sort';

import { fields } from './fields';
import { filter } from './filter';
// import ReactTooltip from 'react-tooltip';

import { compose, withHandlers, branch } from 'recompose';

const enhance = compose(
  withHandlers({
    onClick: props => () =>
      store.dispatch({ type: SORT_TOGGLE, fld: props.fld }),
  }),
);
const NotLive = ({ fld }) => <th>{fld}</th>;
const HeadLink = enhance(({ fld, isLive, value, onClick }) => {
  if (!isLive) return <NotLive fld={fld} />;
  return (
    <th>
      <a href="#" onClick={onClick}>
        {value}
      </a>
    </th>
  );
});

const Header = ({ flds, sort }) =>
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
  </thead>;

const Row = ({ flds, tc }) =>
  <tr>
    {flds.map(fld => <Field tc={tc} fld={fld} key={fld} />)}
  </tr>;

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

const NofM = ({ fcs, tcs, click, hide }) => {
  let links = Object.keys(hide)
    .filter(k => {
      const x = hide[k];
      return !x || x.length !== 0;
    })
    .sort()
    .map(field =>
      <span key={field}>
        {' '}
        <a
          href="#"
          onClick={() => store.dispatch({ type: HIDE_REMOVE_FILTER, field })}
        >
          {field}
        </a>
        {' '}
      </span>,
    );
  const pre = links.length === 0 ? ' - No filters' : ' - Filters ';
  return (
    <div>
      {fcs.length} of <a href="#" onClick={click}>{tcs.length}</a>
      <span>
        {pre}{links}
      </span>
    </div>
  );
};

NofM.defaultProps = {
  click: () => store.dispatch({ type: HIDE_CLEAR }),
};

class Foo extends Component {
  setAll(tcs) {
    console.log('this is setAll' + tcs.length);
    // tcs.forEach(tc => {
    //   console.log('ptags is ' + tc['ptags']);
    //   store.dispatch({
    //     type: EDIT_VALUE,
    //     id: tc.id,
    //     fld: 'bcd',
    //     value: '01/01/2024',
    //   });
    // });

    tcs.forEach(tc => {
      //console.log('ptags is ' + tc['ptags']);
      store.dispatch({
        type: PERSONAL_EDIT,
        id: tc.id,
        fld: 'ptags',
        value: 'x',
      });
    });
  }

  render() {
    const { flds, sort, hide } = this.props;
    const fcs = filter(hide, this.props.tcs);
    const tcs = sorter(this.props.tcs, sort);

    return (
      <div className="Foo">
        <a href="#" onClick={() => this.setAll(fcs)}>x</a>
        <table>
          <caption>
            <NofM fcs={fcs} tcs={tcs} hide={hide} />
          </caption>
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
  setPtagAll: () => {
    console.log('setPtagAll');
  },
};

export default connect(mapStateToProps)(Foo);

const mapStateToPropsNofM = state => {
  return {
    hide: state.hide,
  };
};

connect(mapStateToPropsNofM)(NofM);
