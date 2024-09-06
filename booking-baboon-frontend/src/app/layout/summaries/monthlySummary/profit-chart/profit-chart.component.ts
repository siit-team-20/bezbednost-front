import {Component, Input} from '@angular/core';
import { Chart, registerables} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-profit-chart',
  templateUrl: './profit-chart.component.html',
  styleUrls: ['./profit-chart.component.css']
})
export class ProfitChartComponent {
  @Input() chartData!: Record<string, number>
  constructor() {}

  ngOnInit(): void {
    this.RenderChart();
  }

  RenderChart() {

    const labelData = this.getLabelData(this.chartData);

    const chart = new Chart("profitChart", {
      type: "bar",
      data: {
        labels: labelData,
        datasets: [{
          label: 'Profit (€)',
          data: this.chartData,
          yAxisID: 'y1',
          backgroundColor: 'rgba(236,105,193, 0.2)',
          borderColor: 'rgb(236,105,193)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y1: {
            type: 'linear',
            position: 'left',
            beginAtZero: true,
            title: {
              display: true,
              text: 'Profit (€)'
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
