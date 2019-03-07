import React from 'react';
import Util from '../../server/util';
// import Plot from 'react-plotly.js';
// import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory'; 
const Plot = createPlotlyComponent(Plotly);// faster load

const URL = 'https://raw.githubusercontent.com/plotly/datasets/master/alpha_shape.csv';
const layout = {
    autosize: true,
    height: 800,
    scene: {
        aspectratio: {
            x: 1,
            y: 1,
            z: 1
        },
        camera: {
            center: {
                x: 0,
                y: 0,
                z: 0
            },
            eye: {
                x: 1.25,
                y: 1.25,
                z: 1.25
            },
            up: {
                x: 0,
                y: 0,
                z: 1
            }
        },
        xaxis: {
            type: 'linear',
            zeroline: false
        },
        yaxis: {
            type: 'linear',
            zeroline: false
        },
        zaxis: {
            type: 'linear',
            zeroline: false
        }
    },
    title: '3d point clustering',
    width: 600
};
class Bar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectionCols :[],
            rawData : [],
            size : 5,
            color: 'rgb(100, 190, 22)'
        }
        this.unpack = this.unpack.bind(this);
        this.sizeUp = this.sizeUp.bind(this);
    }

    unpack(rows, key) {
        return rows.map(function (row) { return row[key]; });
    }
    sizeUp () {
        // console.log(this.state.data)
        const copy = Util.cloneDeep(this.state.data);
        copy[0].marker.size ++;
        this.setState({
            data : copy
        })
        console.log(copy)
        // this.setState({
        //     data: [
        //         {
        //             x: this.unpack(rows, 'x'),
        //             y: this.unpack(rows, 'y'),
        //             z: this.unpack(rows, 'z'),
        //             mode: 'markers',
        //             type: 'scatter3d',
        //             marker: {
        //                 color: this.state.color,
        //                 size: this.state.size
        //             }
        //         },
        //         {
        //             alphahull: 7,
        //             opacity: 0.1,
        //             type: 'mesh3d',
        //             x: this.unpack(rows, 'x'),
        //             y: this.unpack(rows, 'y'),
        //             z: this.unpack(rows, 'z')
        //         }
        //     ],
        //     size : this.state.size + 1
        // })
        // console.log(this.state.size)
    }
    componentDidMount() {
        Plotly.d3.csv(URL, (err, rows) => {
            if(err) {
                // console.log('there is some error');
            } else {
                // console.log(rows);
                this.setState({
                    data:[
                        {
                            x: this.unpack(rows, 'x'),
                            y: this.unpack(rows, 'y'),
                            z: this.unpack(rows, 'z'),
                            mode: 'markers',
                            type: 'scatter3d',
                            marker: {
                                color: this.state.color,
                                size: this.state.size
                            }
                        }, 
                        {
                            alphahull: 7,
                            opacity: 0.1,
                            type: 'mesh3d',
                            x: this.unpack(rows, 'x'),
                            y: this.unpack(rows, 'y'),
                            z: this.unpack(rows, 'z')
                        }
                    ]
                })
            }
        })

        // fetch('/data')
        //     .then(res => res.json())
        //     .then(data => this.setState({rawData: data.data}))
        //     .then(() => {
        //         // console.log(this.state.rawData);
        //         // console.log(this.state.rawData.length)
        //         let combination = Util.combination(Object.keys(this.state.rawData), 3);
        //         this.setState({
        //             selectionCols : combination
        //         })
        //     })
        
    }

    render() {
        const commonProperty = [
            {   mode: 'markers',
                type: 'scatter3d',
                marker: {
                        color: 'rgb(23, 190, 207)',
                        size: 2
                    }
            },
            {
                alphahull: 7,
                opacity: 0.1,
                type: 'mesh3d'
            }
        ]
        // console.log(this.state.rawData);
        return (
            <div>
                <div>
                    <button type="button" onClick={this.sizeUp}> size Up!</button>
                </div>
                <Plot
                    data={this.state.data}
                    layout={layout}
                />
                {/* {this.state.selectionCols.map((cols) => {
                    let mapping = {
                        x : this.state.rawData[cols[0]],
                        y : this.state.rawData[cols[1]],
                        z : this.state.rawData[cols[2]]
                    }
                    let res = [
                        {
                            ...mapping,
                            ...commonProperty[0]
                        },
                        {
                            ...mapping,
                            ...commonProperty[1]
                        }
                    ]
                    return (
                        <div>
                            <h1>Current cols: {String(cols)}</h1>
                            <Plot
                                data={res}
                                layout={layout}
                            />
                        </div>
                    )
                    
                })} */}
            </div>
            
         
        );
    }
}
export default Bar;