import React, { useEffect, useState } from 'react';
// import { getCurrentWindow } from '@electron/remote';
// import { enabled } from '@electron/remote/main';
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
const TIMER_IN_SECONDS = TIMER_IN_MINUTES * (60 / 3);

export function App() {
  const [updateTimer, setUpdateTimer] = useState(false);
  const [currentTimer, setCurrentTimer] = useState(TIMER_IN_SECONDS);
  const [showChart, setShowChart] = useState(true);

  const [chartSolidGaugeOptions, setSolidGaugeOptions] = useState(
    StaticGauge as any
  );

  function updateChart() {
    setSolidGaugeOptions({
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
        max: TIMER_IN_MINUTES * (60 / 3),
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

  function handleStartOrReset() {
    setCurrentTimer(0);
  }

  function handleStop() {
    setCurrentTimer(TIMER_IN_SECONDS);
  }

  // const handleClose = useCallback(() => {
  //   // getCurrentWindow().close();
  // }, []);

  // function handleClose() {
  //   setCurrentTimer(0);
  // }

  useEffect(() => {
    if (currentTimer <= TIMER_IN_SECONDS) {
      setCurrentTimer(currentTimer + 3);
      setShowChart(true);
      updateChart();
    } else {
      setShowChart(false);
    }

    const timer = setTimeout(() => {
      setUpdateTimer(!updateTimer);
    }, 3 * 1000);
    return () => clearTimeout(timer);
  }, [updateTimer]);

  useEffect(() => {
    updateChart();
  }, []);

  return (
    <>
      <div className={styles.main}>
        {chartSolidGaugeOptions && showChart ? (
          <>
            <HighchartsReact
              highcharts={Highcharts}
              options={chartSolidGaugeOptions}
            ></HighchartsReact>
            <div className={`${styles.buttonContainer}`}>
              <button
                className={`${styles.button} ${styles['button-close-reset']}`}
                onClick={handleStartOrReset}
              >
                Reset
              </button>
              <button
                className={`${styles.button} ${styles['button-close-reset']}`}
                onClick={handleStop}
              >
                Stop
              </button>
              {/* <button
                className={`${styles.button} ${styles['button-close-reset']}`}
                onClick={handleClose}
              >
                Close
              </button> */}
            </div>
          </>
        ) : (
          <button
            className={`${styles.button} ${styles['button-start']}`}
            onClick={handleStartOrReset}
          >
            Start
          </button>
        )}
      </div>
    </>
  );
}
