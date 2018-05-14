var GIPHY_API_URL = "https://api.giphy.com";
var GIPHY_PUB_KEY = "ZSvNlbGaK927tcIVoSsnbCS1qwPH2rlc";

App = React.createClass({
  getGif: function(searchingText) {
    return new Promise((resolve, reject) => {
      var url =
        GIPHY_API_URL +
        "/v1/gifs/random?api_key=" +
        GIPHY_PUB_KEY +
        "&tag=" +
        searchingText;
      var xhr = new XMLHttpRequest();
      xhr.onload = () => {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText).data;
          var gif = {
            url: data.fixed_width_downsampled_url,
            sourceUrl: data.url
          };
          resolve(gif);
        } else {
          reject(new Error(this.statusText));
        }
      };
      xhr.onerror = () =>
        reject(new Error(`XMLHttpRequest Error: ${this.statusText}`));
      xhr.open("GET", url);
      xhr.send();
    });
  },
  handleSearch: function(searchingText) {
    this.setState({
      loading: true
    });
    this.getGif(searchingText)
      .then(gif => {
        this.setState({
          loading: false,
          gif: gif,
          searchingText: searchingText
        });
      })
      .catch(error => console.error("Promise error: ", error));
  },
  getInitialState() {
    return {
      loading: false,
      searchingText: "",
      gif: {}
    };
  },

  render: function() {
    var styles = {
      width: "90%",
      margin: "0 auto",
      textAlign: "center"
    };
    return (
      <div style={styles}>
        <h1>
          <a href="http://giphy.com" target="_blank">
            GIPHY
          </a>{" "}
          Search App
        </h1>
        <Search onSearch={this.handleSearch} />
        <br />
        <small>use ENTER to search for the next gif</small>
        <Gif
          loading={this.state.loading}
          url={this.state.gif.url}
          sourceUrl={this.state.gif.sourceUrl}
        />
      </div>
    );
  }
});
