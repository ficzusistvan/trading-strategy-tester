import React from "react";
import { Jumbotron } from 'reactstrap';
import SymbolComponent from '../components/Symbol.component';
import translate from 'redux-polyglot/translate';

const SymbolPage = (props) => (
  <Jumbotron>
    <SymbolComponent symbol={props.match.params.symbol} />
  </Jumbotron>
);

export default translate(SymbolPage);