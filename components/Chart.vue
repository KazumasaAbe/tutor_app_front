<script>
import { Bar } from 'vue-chartjs'

export default {
  props: {
    nationalLanguage: {
      type: Number,
      required: true
    },
    english: {
      type: Number,
      required: true
    },
    arithmetic: {
      type: Number,
      required: true
    },
    science: {
      type: Number,
      required: true
    },
    society: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  extends: Bar,
  name: 'chart',
  data () {
    return {
      data: {
        labels: ['january', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: 'Bar Dataset',
            fill: false,
            data: [this.nationalLanguage, this.english, this.arithmetic, this.science, this.society],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Month'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 10
            }
          }]
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
    console.log(this.type)
  }
}
</script>
