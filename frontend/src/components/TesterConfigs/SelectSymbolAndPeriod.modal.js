import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SymbolAndPeriodChooserRedux from '../../redux/containers/SymbolAndPeriod.redux';

const SelectSymbolAndPeriodModal = (props) => {
  const {
    buttonLabel,
    className,
    isDataSourceSelected
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  
  const add = () => props.onAddSymbolAndPeriod(props.symbol, props.period);

  return (
    <div>
      <Button block color="primary" onClick={toggle} disabled={!isDataSourceSelected}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Select symbol and period</ModalHeader>
        <ModalBody>
          <SymbolAndPeriodChooserRedux />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={add}>Add</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default SelectSymbolAndPeriodModal;