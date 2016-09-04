/* eslint react/prefer-stateless-function: "off" */
import React, {Component, PropTypes} from 'react';
// components
import TopBar from 'components/dumb/TopBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import muiTheme from './MuiTheme';
import injectTapEventPlugin from './InjectTapEventPlugin';

require('normalize.css');

export default class AppAuth extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  componentWillMount() {
    injectTapEventPlugin();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <div>
          <TopBar />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}
