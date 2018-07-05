import merge from 'deepmerge';

const emptyTarget = value => (Array.isArray(value) ? [] : {});
const clone = (value, options) => merge(emptyTarget(value), value, options);

// Combine array into one: https://github.com/KyleAMathews/deepmerge
function combineMerge(target, source, options) {
   const destination = target.slice();

   source.forEach(function(e, i) {
      if (typeof destination[i] === 'undefined') {
         const cloneRequested = options.clone !== false;
         const shouldClone = cloneRequested && options.isMergeableObject(e);
         destination[i] = shouldClone ? clone(e, options) : e;
      }
      else if (options.isMergeableObject(e)) {
         destination[i] = merge(target[i], e, options);
      }
      else if (target.indexOf(e) === -1) {
         destination.push(e);
      }
   });
   return destination;
}

function toChartJsData(config, props, value) {
   let { labels, maxDataSize } = props;

   let data;
   if (value[0].length == 2) {
      if (!labels) labels = value.map(x => x[0]);
      data = value.map(x => x[1]);
   }
   else if (value[0].Key) {
      if (!labels) labels = value.map(x => x.Key);
      data = value.map(x => x.Value);
   }
   else {
      data = value.map(x => x);
   }

   if (maxDataSize > 0) {
      labels = labels.slice(-maxDataSize);
      data = data.slice(-maxDataSize);
   }

   config = config || {};
   let configData = merge(
      {
         labels: labels,
         datasets: [ { data: data } ]
      },
      config.data || {},
      { arrayMerge: combineMerge }
   );

   return configData;
}

function toChartJsOptions(config, props) {
   let { xAxisLabel, yAxisLabel } = props;

   config = config || {};
   let configOptions = merge(
      {
         legend: { display: false },
         scales: {}
      },
      config.options || {},
      { arrayMerge: combineMerge }
   );

   if (yAxisLabel) {
      configOptions.scales = merge(configOptions.scales, {
         yAxes: [
            {
               scaleLabel: {
                  display: true,
                  labelString: yAxisLabel
               }
            }
         ]
      });
   }

   if (xAxisLabel) {
      configOptions.scales = merge(configOptions.scales, {
         xAxes: [
            {
               scaleLabel: {
                  display: true,
                  labelString: xAxisLabel
               }
            }
         ]
      });
   }

   return configOptions;
}

export function toChartJsConfig(config, props, value) {
   return { data: toChartJsData(config, props, value), options: toChartJsOptions(config, props) };
}