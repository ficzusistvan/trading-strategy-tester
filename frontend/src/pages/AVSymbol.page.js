import React from "react";
import { Jumbotron } from 'reactstrap';
import AVSymbolComponent from '../components/AVSymbol.component';
import translate from 'redux-polyglot/translate';

const AVSymbolPage = (props) => (
  <Jumbotron>
    <AVSymbolComponent symbol={props.match.params.symbol} />
  </Jumbotron>
);

export default translate(AVSymbolPage);