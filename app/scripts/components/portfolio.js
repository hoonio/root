import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        'macat',
        'helpage',
        'telrock',
        'autharium'
      ],
      data: []
    };
    reqwest({
      url:'http://filltext.com/?rows=10&val={randomNumber}',
      type: 'jsonp',
      success:function(resp){
        this.setState({data:resp});
        this.renderChart(this.state.data);
      }.bind(this)
    });
  }

  renderChart(dataset) {
    d3.select('#chart').selectAll('div')
      .data(dataset)
      .enter()
      .append('div')
      .attr('class', 'bar')
      .style('height', function(d){
        return d.val*5+'px';
     });
  }

  render() {
    return (
      <div className="portfolio row">
        <div id="chart"></div>
        <h1>Portfolio</h1>
        <p>Here are all the works</p>
        {this.state.items.map(this.renderCard)}
      </div>
    );
  }

  renderCard(item, index) {
    return (
      <div className="col-sm-4">
        <div className="card" key={index}>
          <img className="card-img-top" data-src="..." alt="Card image cap" />
          <div className="card-block">
            <h4 className="card-title">{item}</h4>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the </p>
            <a href="#" className="btn btn-primary">Button</a>
          </div>
        </div>
      </div>
    );
  }
}