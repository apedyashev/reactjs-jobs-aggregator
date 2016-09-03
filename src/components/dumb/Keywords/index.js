// libs
import React, {PropTypes} from 'react';
// actions
// components
import TagsInput from 'react-tagsinput';
import Chip from 'material-ui/Chip';
import {Input} from 'components/dumb/Base';
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

  renderInput = (inputProps) => {
    const {onChange, value, ...other} = inputProps;
    return (
      <Input
        className={styles.input}
        hintText="Please, enter keywords"
        onChange={onChange}
        value={value}
        {...other}
        placeholder={null}
      />
    );
  }

  handleChange = (newItems) => {
    this.props.onChange({target: {value: newItems}});
  }

  render() {
    return (<div className={styles.wrapper}>
      <TagsInput
        addOnBlur
        onlyUnique
        addOnPaste
        inputProps={{className: styles.tagsinput}}
        addKeys={[9, 13, 188]}
        renderTag={this.renderTag}
        renderInput={this.renderInput}
        onChange={this.handleChange}
        value={this.props.value || []}
      />
    </div>);
  }
}

export default Keywords;
