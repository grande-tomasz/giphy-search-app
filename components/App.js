var GIPHY_API_URL = "http://api.giphy.com";
var GIPHY_PUB_KEY = "ZSvNlbGaK927tcIVoSsnbCS1qwPH2rlc";

App = React.createClass({
  // getGif: function(searchingText, callback) {
  getGif: function(searchingText) {
    return new Promise((resolve, reject) => {
      var url = GIPHY_API_URL + "/v1/gifs/random?api_key=" + GIPHY_PUB_KEY + "&tag=" + searchingText;
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
      xhr.onerror = () => reject(new Error(`XMLHttpRequest Error: ${this.statusText}`));
      xhr.open("GET", url);
      xhr.send();
    });
  },
  handleSearch: function(searchingText) {
    this.setState({
      loading: true
    });
    // this.getGif(searchingText, function(gif) {
    this.getGif(searchingText)
      .then(gif => {
        this.setState({
          loading: false,
          gif: gif,
          searchingText: searchingText
        });
      })
      .catch(error => console.error("Promise error: ", error));
    // }.bind(this);
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
        <h1>Wyszukiwarka GIFow!</h1>
        <p>Znajdź gifa na <a href="http://giphy.com">giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
        <Search onSearch={this.handleSearch}/>
        <Gif 
          loading={this.state.loading}
          url={this.state.gif.url}
          sourceUrl={this.state.gif.sourceUrl}
        />
      </div>
    );
  }
});
