import {Component, Input} from '@angular/core';
import { Chart, registerables} from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-reservations-chart',
  templateUrl: './reservations-chart.component.html',
  styleUrls: ['./reservations-chart.component.css']
})
export class ReservationsChartComponent {
  @Input() chartData!: Record<string, number>
  @Input() type!: any;

  constructor() {}

  ngOnInit(): void {
    this.RenderChart();
  }

  RenderChart() {

    const labelData = this.getLabelData(this.chartData);

    const chart = new Chart("reservationsChart", {
      type: "bar",
      data: {
        labels: labelData,
        datasets: [{
          label: 'Reservations',
          data: this.chartData,
          yAxisID: 'y',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Reservations'
            },
            ticks: {
              stepSize: 1,
              precision: 0,
            }
          }
        }
      }
    });
  }

  private getLabelData(chartData: Record<string, number>) {
    const labelData: string[] = [];

    for (const month in chartData) {
      labelData.push(month);
    }

    return labelData;
  }
}
