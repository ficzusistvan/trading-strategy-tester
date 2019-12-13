import React from "react";
import { Jumbotron } from 'reactstrap';
import SymbolsComponent from '../components/Symbols.component';
import translate from 'redux-polyglot/translate';

const SymbolsPage = (props) => (
  <Jumbotron>
    <SymbolsComponent />
  </Jumbotron>
);

export default translate(SymbolsPage);