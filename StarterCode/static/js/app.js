// The new student and grade to add to the table
function dropdown(){
    var dropdown = d3.select('#selDataset');
    d3.json('samples.json').then((data)=>{
        //console.log(data);
        var sampleid = data.names;
        sampleid.forEach((sample)=>{
            dropdown.append("option")
            .text(sample)
            .property("value", sample);

        })
        var newsample = sampleid[0];
        demographic(newsample);
        chart(newsample);

    })
}

dropdown();

function demographic(id){
    d3.json('samples.json').then((data)=>{
        //console.log(data);
        var samplemeta = data.metadata;
        var result=samplemeta.filter(object=>object.id==id);
        result = result[0];
        var display = d3.select('#sample-metadata');
        display.html("");
    Object.entries(result).forEach(([key,value])=>{
        display.append("h6").text(`${key} ${value}`);

    })

        
    })
}

function optionChanged(id){
    demographic(id);
    chart(id);
    

}

function chart(id){
    d3.json('samples.json').then((data)=>{
        //console.log(data);
        var datasamples = data.samples;
        var result=datasamples.filter(object=>object.id==id);
        result = result[0];
        var otu_ids=result.otu_ids;
        var otu_labels=result.otu_labels;
        var sample_values=result.sample_values;
        var bubbledata=[{
            x:otu_ids,
            y: sample_values,
            text:otu_labels,
            mode:"markers",
            marker:{
                size:sample_values,
                color:otu_ids,
                colorscale:"Earth"
            }
            
        }];
        Plotly.newPlot("bubble",bubbledata);
        });
        }
    

       
         
        function gaugeChart(data) {
            console.log("gaugeChart", data);
          
            if(data.wfreq === null){
              data.wfreq = 0;
          
            }
          
            let degree = parseInt(data.wfreq) * (180/10);
          
            // Trig to calc meter point
            let degrees = 180 - degree;
            let radius = .5;
            let radians = degrees * Math.PI / 180;
            let x = radius * Math.cos(radians);
            let y = radius * Math.sin(radians);
          
            let mainPath = 'M -.0 -0.025 L .0 0.025 L ',
                pathX = String(x),
                space = ' ',
                pathY = String(y),
                pathEnd = ' Z';
            let path = mainPath.concat(pathX, space, pathY, pathEnd);
            
            let trace = [{ type: 'scatter',
               x: [0], y:[0],
                marker: {size: 50, color:'2F6497'},
                showlegend: false,
                name: 'WASH FREQ',
                text: data.wfreq,
                hoverinfo: 'text+name'},
              { values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
              rotation: 90,
              text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1',''],
              textinfo: 'text',
              textposition:'inside',
              textfont:{
                size : 16,
                },
              marker: {colors:[...arrColorsG]},
              labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '2-1', '0-1',''],
              hoverinfo: 'text',
              hole: .5,
              type: 'pie',
              showlegend: false
            }];
          
            let layout = {
              shapes:[{
                  type: 'path',
                  path: path,
                  fillcolor: '#2F6497',
                  line: {
                    color: '#2F6497'
                  }
                }],
          
              title: '<b>Belly Button Washing Frequency</b> <br> <b>Scrub Per Week</b>',
              height: 550,
              width: 550,
              xaxis: {zeroline:false, showticklabels:false,
                         showgrid: false, range: [-1, 1]},
              yaxis: {zeroline:false, showticklabels:false,
                         showgrid: false, range: [-1, 1]},
            };
          
            Plotly.newPlot('gauge', trace, layout, {responsive: true});
          
          }
          function init() {
            // Grab a reference to the dropdown select element
            var selector = d3.select("#selDataset");
            
            // Use the list of sample names to populate the select options
            d3.json("samples.json").then((data) => {
              var sampleNames = data.names;
              sampleNames.forEach((sample) => {
                selector
                  .append("option")
                  .text(sample)
                  .property("value", sample);
              });
            
              // Use the first sample from the list to build the initial plots
              const firstSample = sampleNames[0];
              buildMetadata(firstSample);
              buildCharts(firstSample);
              buildGaugeChart(firstSample)
            
            
            });
            }