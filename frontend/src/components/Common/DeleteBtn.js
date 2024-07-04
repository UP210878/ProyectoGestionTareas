import React from 'react';
import PropTypes from 'prop-types';

class DeleteBtn extends React.Component {
  state = {
    deleteConfirmOpen: false,
  }

  openConfirm = () => {
    this.setState({
      deleteConfirmOpen: true
    });
  }

  onOkConfirm = () => {
    this.props.deleteObject(this.props.index);
  }

  onCancelConfirm = () => {
    this.setState({
      deleteConfirmOpen: false
    });
  }

  render() {
    const { objectName } = this.props;
    const { deleteConfirmOpen } = this.state;


    return (
      <button icon onClick={() => this.openConfirm()}>
        <button name='trash'></button>
      </button>
    );

  }

  static propTypes = {
    index: PropTypes.string.isRequired,
    objectName: PropTypes.string.isRequired,
    deleteObject: PropTypes.func.isRequired,
  }
}

export default DeleteBtn;