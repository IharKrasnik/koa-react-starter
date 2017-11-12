import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Input from 'components/common/input';
import Button, {
  colors as buttonColors,
} from 'components/common/button';
import Form, { Row, Column } from 'components/common/form';

import * as fromUser from 'resources/user/user.selectors';
import {
  updateUser,
  validateUserField,
} from 'resources/user/user.actions';

import styles from './profile.styles';

class Profile extends React.Component {
  static propTypes = {
    updateUser: PropTypes.func.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string,
      info: PropTypes.string,
      errors: PropTypes.object,
    }).isRequired,
    validateField: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    const { user = {} } = props;
    this.state = {
      username: user.username || '',
      info: user.info || '',
    };
  }

  componentWillReceiveProps(props) {
    const { user } = props;
    if (user.username !== this.state.username || user.info !== this.state.info) {
      this.setState({
        username: user.username,
        info: user.info,
      });
    }
  }

  onInfoChange = (info) => {
    this.setState({ info });
  }

  onUsernameChange = (username) => {
    this.setState({ username });
  }

  updateUser = () => {
    this.props.updateUser(this.state);
  }

  validateField = (field) => {
    this.props.validateField(this.state, field);
  }

  error(field) {
    return this.props.user.errors[field];
  }

  render() {
    return (
      <div>
        <h1>Profile</h1>

        <Form>
          <Row>
            <Column>
              <Input
                errors={this.error('username')}
                value={this.state.username}
                onChange={this.onUsernameChange}
                onBlur={this.validateField('username')}
              />
            </Column>

            <Column>
              <Input
                errors={this.error('info')}
                value={this.state.info}
                onChange={this.onInfoChange}
                onBlur={this.validateField('info')}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Button
                className={styles.button}
                tabIndex={-1}
                color={buttonColors.red}
              >
                Cancel
              </Button>

              <Button
                className={styles.button}
                onClick={this.updateUser}
                tabIndex={0}
                color={buttonColors.green}
              >
                Save
              </Button>
            </Column>
          </Row>
        </Form>
      </div>
    );
  }
}

export default connect(state => ({
  user: fromUser.getUser(state),
}), {
  updateUser,
  validateField: validateUserField,
})(Profile);
