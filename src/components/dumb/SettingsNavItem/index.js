// libs
import React, {PropTypes} from 'react';
import classNames from 'classnames';
// components
import {Link} from 'react-router';
import Avatar from 'components/dumb/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MdExpandMoreIcon from 'react-icons/lib/md/expand-more';
import MdExpandLessIcon from 'react-icons/lib/md/expand-less';
import styles from './index.css';

class SettingsNavItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    user: PropTypes.object.isRequired,
  };

  state = {isMenuOpen: false};

  handleOpenMenu = () => {
    this.setState({isMenuOpen: true});
  }

  handleOnRequestChange = (value) => {
    this.setState({isMenuOpen: value});
  }

  render() {
    const {user} = this.props;
    const {isMenuOpen} = this.state;
    const avatar = <Avatar email={user.email || ''} size={30} className={styles.avatar} />;
    const expandIcon = isMenuOpen ? <MdExpandLessIcon /> : <MdExpandMoreIcon />;

    return (<span className={classNames(styles.component, this.props.className)}>
      <MenuItem
        primaryText={<div>{user.displayName} {avatar} {expandIcon}</div>}
        onClick={this.handleOpenMenu}
      />
      <IconMenu
        className={styles.iconMenu}
        iconButtonElement={<IconButton />}
        open={isMenuOpen}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestChange={this.handleOnRequestChange}
      >
        <MenuItem primaryText={<Link to="/settings/profile">Edit Profile</Link>} />
        <MenuItem primaryText={<Link to="/settings/password">Change Password</Link>} />
        <MenuItem primaryText="Sign Out" />
      </IconMenu>
    </span>);
  }
}

export default SettingsNavItem;
