// libs
import React, {PropTypes} from 'react';
// actions
// components
import TagsInput from 'react-tagsinput';
import Chip from 'material-ui/Chip';
// import TagInput from 'components/dumb/TagInput';
import styles from './index.css';

class Keywords extends React.Component {
  static propTypes = {
    value: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  renderTag = (tagProps) => {
    const {tag, key, onRemove} = tagProps;
    return (<Chip
      key={key}
      className={styles.tag}
      onRequestDelete={() => { onRemove(key); }}
    >
      {tag}
    </Chip>);
  }

  handleChange = (newItems) => {
    this.props.onChange({target: {value: newItems}});
  }

  render() {
    return (<div className={styles.wrapper}>
      <TagsInput
        addKeys={[9, 13, 188]}
        addOnBlur
        renderTag={this.renderTag}
        onChange={this.handleChange}
        value={this.props.value || []}
      />
    </div>);
  }
}

export default Keywords;
