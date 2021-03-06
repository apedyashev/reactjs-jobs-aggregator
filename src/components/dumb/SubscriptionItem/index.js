// libs
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {ListItem} from 'material-ui/List';
import DeleteIcon from 'react-icons/lib/md/delete';
import EditIcon from 'react-icons/lib/md/edit';
import classNames from 'classnames';
import styles from './index.css';

class SubscriptionItem extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onRemoveRequesChanged: PropTypes.func.isRequired,
    removeConfirmed: PropTypes.func.isRequired,
  };

  state = {
    removeRequested: false,
  };

  componentWillReceiveProps(newProps) {
    this.setState({removeRequested: newProps.removeRequested});
  }

  handleRemoveIconClicked = () => {
    this.setState({removeRequested: true});
    this.props.onRemoveRequesChanged(this.props.data.id, true);
  }

  handleRemovingCancel = () => {
    this.setState({removeRequested: false});
    this.props.onRemoveRequesChanged(this.props.data.id, false);
  }

  handleRemoveConfirmed = () => {
    this.props.removeConfirmed(this.props.data.id);
  }

  render() {
    const {data} = this.props;
    const {removeRequested} = this.state;
    const itemClassNames = classNames({
      [styles.item]: true,
      [styles.removeRequested]: removeRequested,
    });

    return (<ListItem className={itemClassNames}>
      <div className={styles.content}>
        <Link to={`/dashboard/subscription/${data.id}`} activeClassName={styles.active} className={styles.label}>
          {data.title}
        </Link>
        <div className={styles.icons}>
          <Link to={`/dashboard/subscription/${data.id}/edit`} activeClassName={styles.active}><EditIcon /></Link>
          <DeleteIcon onClick={this.handleRemoveIconClicked} />
        </div>
      </div>
      <div className={styles.confirmationContent}>
        <span className={styles.confirmLabel}>Delete?</span>
        <span className={styles.confirmDelete} onClick={this.handleRemoveConfirmed}>Yes</span>
        <span className={styles.cancelDelete} onClick={this.handleRemovingCancel}>No</span>
      </div>
    </ListItem>);
  }
}

export default SubscriptionItem;
