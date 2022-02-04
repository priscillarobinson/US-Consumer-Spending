function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const baseURL = "https://nubc-project2.herokuapp.com/api/exp_by_year/"
var year = 2019;
var url = baseURL + year;
var apiCall = d3.json(url);

function plot() {

  d3.json(url).then(function(data) {
    var spending = [];
    var stateAbbrev = [];
    for (var i=0; i < data.length; i++) {
      if(data[i].code == "DC" || data[i].code == "US") {
        continue
      }
      var spend = data[i].dollars;
      var state = data[i].code;

      spending.push(spend);
      stateAbbrev.push(state);
    }

    minSpend = Math.min(...spending);
    maxSpend = Math.max(...spending);

    var data = [{
        type: "choroplethmapbox", 
        name: "Personal Consumption Expenditures by State (2019)", 
        geojson: "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json", 
        locations: stateAbbrev,
        z: spending,
        zmin: minSpend,
        zmax: maxSpend,
        colorscale:[[0, '#C6D4AF'],[.3, '#839F56'],[1, '#58693A']],
        colorbar:{
          y: 0,
          yanchor: "bottom"}
       }];
    
    
       var layout = {
           mapbox: {style: "mapbox://styles/michaelsorensen/ckvh9qgpx023g14p877xtf9e4", center: {lon: -97, lat: 39}, zoom: 3}, 
           margin: {t: 0, b: 0, l:0, r:0},
           plot_bgcolor:'rgba(0,0,0,0)',
           paper_bgcolor:'rgba(0,0,0,0)',
           yaxis:{
               color:"white"
           }};
       
       var config = {mapboxAccessToken: API_KEY, responsive: true};
       
       Plotly.newPlot("map", data, layout, config);      
    }
    
  );
};

plot();