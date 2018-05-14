Search = React.createClass({
  handleChange: function(event) {
    var searchingText = event.target.value;
    this.setState({
      searchingText: searchingText
    });
    if (searchingText.length > 2) {
      this.props.onSearch(searchingText);
    }
  },
  handleKeyUp: function(event) {
    if (event.keyCode === 13) {
      this.props.onSearch(this.state.searchingText);
    }
  },
  getInitialState() {
    return {
      searchingText: ""
    };
  },
  render: function() {
    var styles = {
      width: "90%",
      maxWidth: "500px",
      fontSize: "1.2rem"
    };
    return (
      <input
        style={styles}
        type="text"
        placeholder="type at least 3 characters to search for a gif"
        value={this.state.searchingText}
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}
      />
    );
  }
});
