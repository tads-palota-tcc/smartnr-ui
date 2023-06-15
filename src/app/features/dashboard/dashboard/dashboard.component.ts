import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { EquipmentSituation } from 'src/app/core/model/equipment';
import { Plant } from 'src/app/core/model/plant';
import { PendencyByPlant } from 'src/app/core/model/statistics';
import { StatisticsService } from 'src/app/core/statistics.service';
import { EquipmentService, SituationFilter } from 'src/app/features/equipments/equipment.service';
import { PlantService } from '../../plants/plant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  equipmentsSituation: EquipmentSituation[] = [];
  equipmentsSituationTotalElements: number = 0;
  filter = new SituationFilter();
  plants: Plant[] = [];
  selectedPlant = new Plant();

  pendenciesByPlantData: PendencyByPlant[] = [];

  pendenciesByPlant = {
    labels: [''],
    datasets: [
      {
        data: [0],
        backgroundColor: ['#ff9900']
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
    labels: [''],
    datasets: [
      {
        data: [0],
        backgroundColor: ['#ff9900']
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

  costForecast = {
    labels: [''],
    datasets: [
      {
        label: 'Inspeções',
        backgroundColor: '#F00',
        borderColor: '#F00',
        data: [0]
      },
      {
        label: 'Calibrações',
        backgroundColor: '#00F',
        borderColor: '#00F',
        data: [0]
      }
    ]
  };

  costForecastOptions = {
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

  constructor(
    private equipmentService: EquipmentService,
    private statisticsService: StatisticsService,
    private errorHandler: ErrorHandlerService
  ) {}
  

  findPlantsPendencies() {
    this.statisticsService.findPlantsPendencies().subscribe({
      next: (res) => {
        this.pendenciesByPlant.labels = res.map(r => r.plant);
        this.pendenciesByPlant.datasets[0].data = res.map(r => r.pendencies);
        for (let p of this.pendenciesByPlant.labels) {
          this.pendenciesByPlant.datasets[0].backgroundColor.push(this.getRandomColor());
        }
      }
    });
  }

  findResponsiblePendencies() {
    this.statisticsService.findResponsiblePendencies().subscribe({
      next: (res) => {
        this.pendenciesByResponsible.labels = res.map(r => r.responsible);
        this.pendenciesByResponsible.datasets[0].data = res.map(r => r.pendencies);
        for (let p of this.pendenciesByResponsible.labels) {
          this.pendenciesByResponsible.datasets[0].backgroundColor.push(this.getRandomColor());
        }
      }
    });
  }

  findCostForecast() {
    this.statisticsService.findCostForecast(this.selectedPlant.id || 1).subscribe({
      next: (res) => {
        this.costForecast.labels = res.map(r => `${r.month}/${r.year}`);
        this.costForecast.datasets[0].data = res.map(r => r.inspectionCost);
        this.costForecast.datasets[1].data = res.map(r => r.calibrationCost);
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    })
  }

  ngOnInit(): void {
    this.searchEquipmentsSituation();
    this.findPlantsPendencies();
    this.findResponsiblePendencies()
    this.findCostForecast();
  }

  onChangeEquipmentsSituationPage(event: LazyLoadEvent) {
    const page = event!.first! / event!.rows!
    this.searchEquipmentsSituation(page);
  }

  searchEquipmentsSituation(page: number = 0): void {
    this.filter.page = page;
    this.equipmentService.findEquipmentsSituation(this.filter).subscribe({
      next: res => {
        this.equipmentsSituation = res.content;
        this.equipmentsSituationTotalElements = res.totalElements;
      },
      error: err => {
        this.errorHandler.handle(err);
      }
    });
  }

  private getRandomColor() {
    return `rgb(${this.getRandomNumber()}, ${this.getRandomNumber()}, ${this.getRandomNumber()})`;
  }

  private getRandomNumber() {
    return Math.floor(Math.random() * (100) + 80);
  }


}
