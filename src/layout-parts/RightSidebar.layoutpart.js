import React from 'react';
import { Row, Col } from 'reactstrap';
import './RightSidebar.layoutpart.css';
import SymbolAndPeriodItemComponent from '../components/SymbolAndPeriod/SymbolAndPeriodItem.component';

const RightSidebarLayoutPart = (props) => {

  let listItems = [];
  props.symbolsAndPeriods.forEach((res, idx, arr) => {
    listItems.push(<SymbolAndPeriodItemComponent key={res.symbol + res.period} symbol={res.symbol} period={res.period} isDefault={res.isDefault} nrOfCandles={res.candles.length} />);
  });

  return (<Row className='right-sidebar'>
    <Col>
      <Row className='my-5'>
        <Col className="border-bottom border-top">
          <p className="font-weight-bold">Selected data source:</p>
          <p>{props.dataSource}</p>
        </Col>
      </Row>
      <Row className='my-5'>
        <Col className="border-bottom border-top">
          <p className="font-weight-bold">Added symbols and periods:</p>
          {listItems}
        </Col>
      </Row>
      <Row className='my-5'>
        <Col className="border-bottom border-top">
          <p className="font-weight-bold">Selected strategy:</p>
          <p>{props.strategy}</p>
        </Col>
      </Row>
    </Col>
  </Row>
  )
}

export default RightSidebarLayoutPart;