import React, { Component } from 'react';
import {
  Modal,
  Button,
  Icon,
  Header,
  Message,
  Input,
  Label
} from 'semantic-ui-react';

class PayBill extends Component {
  constructor() {
    super();
    this.state = {
      success: true,
      amount: 0
    };
  }

  handleTransac = () => {
    if (this.props.amount < this.state.amount || this.state.amount < 1) {
      this.setState({ success: false });
    } else {
      this.props.payBill(
        this.props.title,
        this.props.month,
        this.props.activeBill,
        this.state.amount,
        this.handleSuccess
      );
      this.setState({ success: true }, () => {
        this.handleModal();
      });
    }
  };

  handleChange = (e, { value }) => {
    this.setState({ amount: parseInt(value, 10) });
  };

  clearData = () => this.setState({ amount: 0, success: true });

  handleModal = () => {
    this.props.handleModal();
    this.clearData();
  };

  render() {
    return (
      <Modal
        open={this.props.modalOpen}
        onClose={this.handleModal}
        closeOnRootNodeClick={false}
        size="small"
        basic>
        <Header>
          <Icon name="money" />Pay for {this.props.title} ({this.props.month})
        </Header>
        <Modal.Content>
          {this.state.success
            ? <div />
            : <Message icon negative>
                <Icon name="x" />
                <Message.Content>
                  <Message.Header>Invalid Amount</Message.Header>
                  It looks like you entered an invalid amount or amount greater
                  than the required fee.
                </Message.Content>
              </Message>}
          <Input
            labelPosition="right"
            type="number"
            placeholder="Amount"
            size="large"
            value={this.state.value}
            onChange={this.handleChange}
            fluid
            inverted>
            <Label basic>Php</Label>
            <input min="0" />
            <Label>.00</Label>
          </Input>
          <Header as="h4" textAlign="center" inverted>
            You are about to set payment for {this.props.activeBill}'s bill on{' '}
            {this.props.title.toLowerCase()}.
          </Header>
        </Modal.Content>

        <Modal.Actions>
          <Button basic color="red" onClick={this.handleModal} inverted>
            <Icon name="remove" /> Cancel
          </Button>
          <Button color="green" onClick={() => this.handleTransac()} inverted>
            <Icon name="checkmark" /> Confirm
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default PayBill;
