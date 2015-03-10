var React = require('react');
var $ = require('jquery');

function propTypes() {
  return {
    cb: React.PropTypes.func.isRequired
  };
}

function formatURL() {
  var searchInput = this.refs.searchInput.getDOMNode().value;
  var selectInput = this.refs.selectInput.getDOMNode().value;
  var params = [];
  params.push('term='+searchInput);
  params.push('entity='+selectInput);
  return 'https://itunes.apple.com/search?'+params.join('&');
}

function handleSubmit() {
  $.ajax({
    url:  this.formatURL(),
    dataType: 'jsonp',
    error: function() {
      console.log('error on post');
    },
    success: function(data) {
      console.log('success');
      this.props.cb(data.results);
      this.refs.searchInput.getDOMNode().value = '';
    }.bind(this)
  })
}

function render(){
  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="input-group-inline col-sm-4">
          <input
           type='text'
           ref='searchInput'
           className='form-control'
          />
        </div>
        <div className="input-group-inline col-sm-4">
          <select ref='selectInput' className='form-control'>
            <option value='musicTrack'>Music</option>
            <option value='movie'>Movie</option>
          </select>
        </div>
        <div className="input-group-inline col-sm-4">
          <button onClick={this.handleSubmit} className='btn btn-default'> Search </button>
        </div>
      </div>
    </div>
  );
}

var SearchItunes = React.createClass({
  propTypes: propTypes(),
    handleSubmit: handleSubmit,
  formatURL: formatURL,
  render:    render
});

module.exports = SearchItunes;
