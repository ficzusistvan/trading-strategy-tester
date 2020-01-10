import React from "react";
import { Jumbotron } from 'reactstrap';
import AVSymbolsComponent from '../components/AVSymbols.component';
import translate from 'redux-polyglot/translate';

const AVSymbolsPage = (props) => (
  <Jumbotron>
    <AVSymbolsComponent />
  </Jumbotron>
);

export default translate(AVSymbolsPage);