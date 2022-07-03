export const StaticGauge = {
  chart: {
    renderTo: 'container',
    type: 'solidgauge',
    height: '54%',

    // spacingBottom: 0,
    spacingTop: 15,
    spacingLeft: -350
    // spacingRight: 0,
  },

  title: {
    text: ''
    // style: {
    //   fontSize: "24px",
    // },
  },

  tooltip: {
    enabled: false,
    borderWidth: 0,
    backgroundColor: 'none',
    shadow: false,
    style: {
      fontSize: '16px'
    },
    valueSuffix: '%',
    pointFormat:
      '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>'
    // positioner: function (labelWidth) {
    //   return {
    //     x: (this.chart.chartWidth - labelWidth) / 2,
    //     y: this.chart.plotHeight / 2 + 15,
    //   };
    // },
  },

  pane: {
    startAngle: 0,
    endAngle: 360,
    background: [
      {
        // Track for Move
        outerRadius: '100%',
        innerRadius: '0%',
        backgroundColor: '#00875f',

        // backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0])
        // //   .setOpacity(0.3)
        // //   .get(),
        borderWidth: 0
      }
    ]
  },

  // tooltip: {
  //   enabled: false,
  // },

  yAxis: {
    min: 0,
    max: 60 * (60 / 3),
    lineWidth: 0,
    tickPositions: [],
    labels: {
      enabled: false
    }
  },

  plotOptions: {
    solidgauge: {
      dataLabels: {
        enabled: true
      },
      linecap: 'round',
      stickyTracking: false,
      rounded: false
    },

    series: {
      dataLabels: {
        enabled: false
      }
    }
  },

  series: [
    {
      name: 'Move',
      type: 'solidgauge',
      data: [
        {
          // color: '#e6cb00',
          // color: '#8a0303',
          radius: '100%',
          innerRadius: '0%',
          y: 0
        }
      ],

      dataLabels: {
        enabled: false
      }
    }
  ]
};
