import React from 'react';
import TesterConfigsRedux from '../redux/containers/TesterConfigs.redux';
import translate from 'redux-polyglot/translate';

const TesterConfigsLayoutPart = () => (
  <div>
    <TesterConfigsRedux />
  </div>
)

export default translate(TesterConfigsLayoutPart);