import React from 'react';
import { Navbar } from './Navbar.jsx';
import { Topbar } from './Topbar.jsx';
import { Chart } from '../../../node_modules/chart.js/dist/Chart.js';
import Axios from '../../../node_modules/axios/lib/axios.js';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router'


class ChartPage extends React.Component {
  constructor() {
    super();
  }

  signOut() {
    var context = this;
    Axios.put('http://localhost:3000/user/' + context.props.username, {
      level: this.props.userlvl,
      correctAnswers: context.props.correctAnswers,
      incorrectAnswers: context.props.incorrectAnswers,
    })
    .then(function(res) {
      console.log(res);
      browserHistory.push('/');
    })
  }

  componentWillMount() {
    // Need to get user data and then pass them to the chart
  }

  componentDidMount() {
    console.log(this.props);
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Addition / Red", "Subtraction / Blue", "Multiplication / Yellow", "Division / Green"],
            datasets: [{
                label: '# of Correct Questions',
                data: [
                this.props.correctAnswers.addition,
                this.props.correctAnswers.subtraction,
                this.props.correctAnswers.multiplication,
                this.props.correctAnswers.division,
                ],
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
            },
            {
                label: '# of Incorrect Questions',
                data: [
                this.props.incorrectAnswers.addition,
                this.props.incorrectAnswers.subtraction,
                this.props.incorrectAnswers.multiplication,
                this.props.incorrectAnswers.division,
                ],
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
                    <canvas id="myChart" width="300" height="300"></canvas>
                  </div>
              </div>
            </div>
          </div>
        </div>
    )

  }
}

const mapStateToProps = (state) => ({
  correctAnswers: state.userCorrectAnswers,
  incorrectAnswers: state.userIncorrectAnswers,
});

ChartPage = connect(mapStateToProps)(ChartPage);

export {ChartPage};