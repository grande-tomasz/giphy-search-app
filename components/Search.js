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
      maxWidth: "350px",
      fontSize: "1.5em"
    };
    return <input
      style={styles}
      type="text"
      placeholder="Tutaj wpisz wyszukiwaną frazę"
      value={this.state.searchingText}
      onChange={this.handleChange}
      onKeyUp={this.handleKeyUp}
    />;
  }
});
