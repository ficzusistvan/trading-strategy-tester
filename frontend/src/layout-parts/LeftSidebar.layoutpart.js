import React from 'react';
import TesterConfigRedux from '../redux/containers/TesterConfig.redux';
import translate from 'redux-polyglot/translate';

const LeftSidebarLayoutPart = () => (
  <>
    <TesterConfigRedux />
  </>
)

export default translate(LeftSidebarLayoutPart);