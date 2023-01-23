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

const TIMER_IN_MINUTES = 25;
const TIMER_PAUSA_IN_MINUTES = 5;

const TIMER_PAUSA_IN_SECONDS = TIMER_PAUSA_IN_MINUTES * (60 / 3);
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

  function beep() {
    const snd = new Audio(
      'data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU='
    );
    snd.play();
  }

  // const handleClose = useCallback(() => {
  //   // getCurrentWindow().close();
  // }, []);

  // function handleClose() {
  //   setCurrentTimer(0);
  // }

  useEffect(() => {
    if (currentTimer <= TIMER_IN_SECONDS) {
      setCurrentTimer(currentTimer + 1);
      setShowChart(true);
      updateChart();

      if (
        currentTimer >= TIMER_PAUSA_IN_SECONDS &&
        currentTimer <= TIMER_PAUSA_IN_SECONDS + 1
      ) {
        beep();
        beep();
        beep();
      }
    } else {
      setShowChart(false);
      if (
        currentTimer >= TIMER_IN_SECONDS &&
        currentTimer <= TIMER_IN_SECONDS + 1
      ) {
        beep();
        beep();
        beep();

        setCurrentTimer(currentTimer + 1);
      }
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
