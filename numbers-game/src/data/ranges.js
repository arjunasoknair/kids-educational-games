// Number ranges for the Numbers Game
// Each range has an id, label, and an array of numbers

function makeRange(start, end, step = 1) {
  const arr = [];
  for (let i = start; i <= end; i += step) arr.push(i);
  return arr;
}

export const NUMBER_RANGES = [
  { id: '0-10', label: '0–10', numbers: makeRange(0, 10) },
  { id: '11-20', label: '11–20', numbers: makeRange(11, 20) },
  { id: 'tens', label: '10s', numbers: makeRange(10, 100, 10) },
  { id: 'hundreds', label: '100s', numbers: makeRange(100, 1000, 100) },
  { id: '100-200-10s', label: '100–200 (by 10s)', numbers: makeRange(100, 200, 10) },
  { id: '21-30', label: '21–30', numbers: makeRange(21, 30) },
  { id: '31-40', label: '31–40', numbers: makeRange(31, 40) },
  { id: '41-50', label: '41–50', numbers: makeRange(41, 50) },
  { id: '51-60', label: '51–60', numbers: makeRange(51, 60) },
  { id: '61-70', label: '61–70', numbers: makeRange(61, 70) },
  { id: '71-80', label: '71–80', numbers: makeRange(71, 80) },
  { id: '81-90', label: '81–90', numbers: makeRange(81, 90) },
  { id: '91-100', label: '91–100', numbers: makeRange(91, 100) },
]; 