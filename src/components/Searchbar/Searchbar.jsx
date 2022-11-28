import React from 'react';
import PropTypes from 'prop-types';
import {
  SearchBarHeader,
  Form,
  Button,
  ButtonLabel,
  Input,
} from './Searchbar.styled';

export class Searchbar extends React.Component {
  state = {
    images: '',
  };
  handleNameChange = e => {
    this.setState({
      images: e.target.value.toLowerCase(),
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.images.trim());
    this.setState({
      images: '',
    });
  };
  render() {
    return (
      <SearchBarHeader>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <ButtonLabel>Search</ButtonLabel>
          </Button>

          <Input
            type="text"
            onChange={this.handleNameChange}
            value={this.state.value}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </SearchBarHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
