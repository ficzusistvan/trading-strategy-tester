import React from 'react';
import TesterRedux from '../redux/containers/TesterConfig.redux';
import translate from 'redux-polyglot/translate';

const LeftSidebarLayoutPart = () => (
  <>
    <TesterRedux />
  </>
)

export default translate(LeftSidebarLayoutPart);