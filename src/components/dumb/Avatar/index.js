// libs
import React, {PropTypes} from 'react';
import md5 from 'md5';
import qs from 'qs';
// components
import AvatarUi from 'material-ui/Avatar';

export default function Avatar({email, size, className}) {
  const query = qs.stringify({
    s: size || 30,
    r: 'g',
    // d: this.props.default,
  });
  const hash = md5(email || '');
  const base = '//www.gravatar.com/avatar/';
  const src = `${base}${hash}?${query}`;

  return <AvatarUi className={className} size={size} src={src} />;
}
Avatar.propTypes = {
  email: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
};
