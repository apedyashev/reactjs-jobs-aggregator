// libs
import React from 'react';
// actions
// components
import TagsInput from 'react-tagsinput';
import Chip from 'material-ui/Chip';
// import TagInput from 'components/dumb/TagInput';
import styles from './index.css';

class Keywords extends React.Component {
  renderTag(props) {
    return (<Chip key={props.key} className={styles.tag}>
      {props.tag}
    </Chip>);
  }

  handleChange = (newItems) => {
    this.props.onChange({target: {value: newItems}});
  }

  render() {
    return (<div>
      <TagsInput
        renderTag={this.renderTag}
        onChange={this.handleChange}
        value={this.props.value || []}
      />
    </div>);
  }
}

export default Keywords;
