import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  panel = [
    {plant: 'RGD1', tag: 'CP-001', inspection: 'OK', calibrations: 'OK'},
    {plant: 'RGD1', tag: 'CP-001', inspection: 'NEAR', calibrations: 'OK'},
    {plant: 'RGD1', tag: 'CP-001', inspection: 'OK', calibrations: 'OK'},
    {plant: 'RGD1', tag: 'CP-001', inspection: 'OK', calibrations: 'OK'},
    {plant: 'RGD1', tag: 'CP-001', inspection: 'OK', calibrations: 'OK'},
    {plant: 'RGD1', tag: 'CP-001', inspection: 'OK', calibrations: 'OK'},
    {plant: 'RGD1', tag: 'CP-001', inspection: 'OK', calibrations: 'OK'},
    {plant: 'RGD1', tag: 'CP-001', inspection: 'NEAR', calibrations: 'NOK'},
    {plant: 'RGD1', tag: 'CP-001', inspection: 'OK', calibrations: 'OK'},
    {plant: 'RGD1', tag: 'CP-001', inspection: 'OK', calibrations: 'OK'},
  ];

  pendenciesByPlant = {
    labels: ['RGD1', 'RGD2', 'PEL1', 'PEL2'],
    datasets: [
      {
        data: [22, 18, 31, 6],
        backgroundColor: ['#ff9900', '#109618', '#990099', '#3b3eac']
      }
    ]
  };

  pendenciesByPlantOptions = {
    cutout: '60%',
    plugins: {
      legend: {
        labels: {
          color: '#000'
        }
      }
    }
  };

  pendenciesByResponsible = {
    labels: ['Alexandre', 'Marina', 'Juliana', 'Miguel'],
    datasets: [
      {
        data: [22, 18, 31, 6],
        backgroundColor: ['#ff9900', '#109618', '#990099', '#3b3eac']
      }
    ]
  };

  pendenciesByResponsibleOptions = {
    cutout: '60%',
    plugins: {
      legend: {
        labels: {
          color: '#000'
        }
      }
    }
  };

  estimatedCost = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
    datasets: [
      {
        label: 'Inspeções',
        backgroundColor: '#F00',
        borderColor: '#F00',
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: 'Calibrações',
        backgroundColor: '#00F',
        borderColor: '#00F',
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ]
  };

  estimatedCostOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: '#000'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#000',
          font: {
            weight: 500
          }
        },
        grid: {
          color: '#000',
          drawBorder: false
        }
      },
      y: {
        ticks: {
          color: '#000'
        },
        grid: {
          color: '#000',
          drawBorder: false
        }
      }

    }
  };

}
