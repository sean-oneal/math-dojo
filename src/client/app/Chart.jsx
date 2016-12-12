import React from 'react';
import { Navbar } from './Navbar.jsx';
import { Topbar } from './Topbar.jsx';
import { Chart } from '../../../node_modules/chart.js/dist/Chart.js';


class ChartPage extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    // Need to get user data and then pass them to the chart
  }

  componentDidMount() {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Addition / Red", "Subtraction / Blue", "Multiplication / Yellow", "Division / Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Correct Questions',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
  }


  render() {
    return (
        <div>
          <Topbar signOut={() => this.signOut()}/>
          <div className="container-fluid">
            <div className="row">
              <Navbar />
              <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                <h1 className="page-header">My Chart</h1>
                  <div className="jumbotron">
                    <canvas id="myChart" width="400" height="400"></canvas>
                  </div>
              </div>
            </div>
          </div>
        </div>
    )

  }
}

export {ChartPage};