import React from 'react';
import ChartsRedux from '../redux/containers/Charts.redux';
import translate from 'redux-polyglot/translate';

const ChartsLayoutPart = () => (
  <div>
    <ChartsRedux />
  </div>
)

export default translate(ChartsLayoutPart);