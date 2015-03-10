var React = require('react');
var SearchItunes = require('./SearchItunes');
var Griddle = require('griddle-react');

var ImageComponent = React.createClass({
  render: function() {
    return (
      <img src={this.props.data} />
    );
  }
});

var UrlComponent = React.createClass({
  render: function() {
    return (
      <a href={this.props.data}>{this.props.rowData.trackName}</a>
    );
  }
});

function getInitialState() {
  return {
    data: ''
  };
}

function updateState(info) {
  this.setState({
    data: info
  });
}

function render() {
  var griddleMeta = [
    {columnName: 'trackName',        displayName: 'Name'},
    {columnName: 'artistName',       displayName: 'Artist'},
    {columnName: 'primaryGenreName', displayName: 'Genre'},
    {columnName: 'artworkUrl100',    displayName: 'Artwork',     customComponent: ImageComponent},
    {columnName: 'trackPrice',       displayName: 'Price'},
    {columnName: 'kind',             displayName: 'Type'},
    {columnName: 'trackViewUrl',     displayName: 'Online Link', customComponent: UrlComponent}
  ];
  var columns = griddleMeta.map(function(item) {
    return item.columnName;
  });

  return (
    <span>
      <div className="navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <SearchItunes cb={this.updateState} />
            </div>
          </div>
        </div>
      </div>
      <div className="panel panel-default" >
        <div className="panel-heading">
          // /* Have this say "Make a Search" when the "data" state is an empty string and have it change to "Your Search Results" when it's not */
        </div>
        <Griddle results={this.state.data} tableClassName='table' columnMetadata={griddleMeta} columns={columns} />
      </div>
    </span>
  )
}

var App = React.createClass({
  getInitialState: getInitialState,
  updateState:     updateState,
  render:          render
});

React.render(
  <App />,
  document.getElementById('app')
);
