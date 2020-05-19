import React, { Component } from "react";
import loadable from "@loadable/component";
import Highcharts from "highcharts";
import { connect } from "react-redux";

const HighchartsReact = loadable(() => import(/* webpackChunkName: "reacthighchart" */"highcharts-react-official"));

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoverData: null
        };
    }

    setHoverData = (e) => {
        // The chart is not updated because `chartOptions` has not changed.
        this.setState({ hoverData: e.target.category });
    }

    updateSeries = () => {
        // The chart is updated only with new options.
        this.setState({
            chartOptions: {
                series: [
                    { data: [Math.random() * 5, 2, 1] }
                ]
            }
        });
    }

    render() {
        const { data } = this.props;
        const votes = [];
        const ids = [];
        data.forEach((obj) => {
            if (obj.title) {
                votes.push(obj.points);
                ids.push(obj.objectID);
            }
            return true;
        });
        const chartOptions = {
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        chart: {
                            spacing: [15, 10, 15, 10]
                        },
                        yAxis: {
                            labels: {
                                align: "left",
                                x: 0,
                                y: -5
                            },
                            title: {
                                text: null
                            }
                        },
                        subtitle: {
                            text: null
                        },
                        credits: {
                            enabled: false
                        }
                    }
                }]
            },
            credits: {
                enabled: false
            },
            title: {
                text: undefined
            },
            legend: {
                enabled: false
            },
            yAxis: {
                title: {
                    text: "Votes",
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            xAxis: {
                title: {
                    text: "ID",
                    y: 10,
                    style: {
                        fontWeight: "bold"
                    }
                },
                categories: ids,
                labels: {
                    rotation: -90
                }
            },
            series: [
                { data: votes }
            ],
            plotOptions: {
                series: {
                    point: {
                        events: {
                            mouseOver: this.setHoverData.bind(this)
                        }
                    }
                }
            }
        };
        return (
            <div style={{ width: "100%" }}>
                <HighchartsReact
                    allowChartUpdate={true}
                    highcharts={Highcharts}
                    options={chartOptions}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ stories }) => ({
    data: stories.data.hits
});
export default connect(mapStateToProps, {})(Graph);
