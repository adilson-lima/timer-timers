import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';
import HighchartsReact from 'highcharts-react-official';

import { StaticGauge } from './StaticGrauge';
import './global.css';
import styles from './App.module.css';

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const TIMER_IN_MINUTES = 50;

export function App() {
  const [timerVerify, setTimerVerify] = useState(false);
  const [currentTimer, setCurrentTimer] = useState(0);
  // const [oldTimer, setOldTimer] = useState(new Date().getTime());

  const [chartSolidGaugeOptions, setSolidGaugeOptions] = useState(
    StaticGauge as any
  );

  function updateChart() {
    setSolidGaugeOptions({
      chart: {
        renderTo: 'container',
        type: 'solidgauge',
        height: '53%',

        // spacingBottom: 0,
        spacingTop: 15,
        spacingLeft: -350
        // spacingRight: 0,
      },

      title: {
        text: ''
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
      },

      pane: {
        startAngle: 0,
        endAngle: 360,
        background: [
          {
            // Track for Move
            outerRadius: '100%',
            innerRadius: '0%',
            backgroundColor: '#8a0303',

            borderWidth: 0
          }
        ]
      },

      // tooltip: {
      //   enabled: false,
      // },

      yAxis: {
        min: 0,
        max: 60,
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
              color: '#00875f',
              radius: '100%',
              innerRadius: '0%',
              y: currentTimer
            }
          ],

          dataLabels: {
            enabled: false
          }
        }
      ]
    });
  }

  function handleStart() {
    setCurrentTimer(0);
  }

  useEffect(() => {
    if (currentTimer <= TIMER_IN_MINUTES) {
      const timer = setTimeout(() => {
        console.log('updateChart');
        setTimerVerify(!timerVerify);
        setCurrentTimer(currentTimer + 1);
        updateChart();
        console.log(currentTimer);
      }, TIMER_IN_MINUTES * 1 * 1000);

      return () => clearTimeout(timer);
    }
  }, [timerVerify, currentTimer]);

  useEffect(() => {
    updateChart();
  }, []);

  return (
    <>
      <div className={styles.main}>
        {chartSolidGaugeOptions && currentTimer <= TIMER_IN_MINUTES ? (
          <HighchartsReact
            highcharts={Highcharts}
            options={chartSolidGaugeOptions}
          />
        ) : (
          <button className={styles.button} onClick={handleStart}>
            Start
          </button>
        )}
      </div>
    </>
  );
}
