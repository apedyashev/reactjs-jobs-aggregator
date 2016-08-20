// libs
import React from 'react';
import {Link} from 'react-router';
import {ListItem} from 'material-ui/List';
import DeleteIcon from 'react-icons/lib/md/delete';
import EditIcon from 'react-icons/lib/md/edit';
import styles from './index.css';

export default function SubscriptionItem({data}) {
  return (<ListItem className={styles.item}>
    <Link to={`/dashboard/subscription/${data.id}`}>
      {data.title}
    </Link>
    <div className={styles.icons}>
      <Link to={`/dashboard/subscription/${data.id}/edit`}><EditIcon /></Link>
      <DeleteIcon />
    </div>
  </ListItem>);
}
