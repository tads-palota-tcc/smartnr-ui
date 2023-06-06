import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { EquipmentSituation } from 'src/app/core/model/equipment';
import { PendencyByPlant } from 'src/app/core/model/statistics';
import { StatisticsService } from 'src/app/core/statistics.service';
import { EquipmentService, SituationFilter } from 'src/app/features/equipments/equipment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  equipmentsSituation: EquipmentSituation[] = [];
  equipmentsSituationTotalElements: number = 0;
  filter = new SituationFilter();

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

  ngOnInit(): void {
    this.searchEquipmentsSituation();
    this.findPlantsPendencies();
    this.findResponsiblePendencies()
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
