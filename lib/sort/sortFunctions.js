export function sortByDescendingValue(obj) {
  const dataArray = Object.entries(obj);
  const sortedArray = dataArray.sort((a, b) => b[1] - a[1]);
  const sortedObj = Object.fromEntries(sortedArray);
  return sortedObj;
}

export function createBoxPlotData(data) {
  const sortedData = data.sort((a, b) => a - b);
  const q1 = calculateQuartile(sortedData, 0.25);
  const q2 = calculateQuartile(sortedData, 0.5);
  const q3 = calculateQuartile(sortedData, 0.75);
  const iqr = q3 - q1;
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;
  const outliers = sortedData.filter((d) => d < lowerFence || d > upperFence);
  const inliers = sortedData.filter((d) => d >= lowerFence && d <= upperFence);
  const mean = (data.reduce((data, val) => data + val, 0)) / data.length;
  const median = calculatedMedian(sortedData)
  return [Math.min(...inliers), q1, q2, q3, Math.max(...inliers), outliers, mean, median];
}

// helper function to calculate a quartile value
export function calculateQuartile(sortedData, percentile) {
  const index = percentile * (sortedData.length - 1);
  const floor = Math.floor(index);
  const ceil = Math.ceil(index);
  if (floor === ceil) {
    return sortedData[floor];
  }
  const d0 = sortedData[floor] * (ceil - index);
  const d1 = sortedData[ceil] * (index - floor);
  return d0 + d1;
}

export function calculatedMedian(sortedData){
  const isEven = sortedData.length % 2 === 0;
  if (isEven) {
    const midIndex = sortedData.length / 2;
    const median = (sortedData[midIndex - 1] + sortedData[midIndex]) / 2;
    return median; 
  } else {
    const midIndex = Math.floor(sortedData.length / 2);
    const median = sortedData[midIndex];
    return median; 
  }
}
