export interface ILegends {
  title: string;
  color: string;
}

export const doughnutLegends: ILegends[] = [
  { title: 'Low RPM²', color: 'bg-blue-500' },
  { title: 'Medium RPM²', color: 'bg-teal-600' },
  { title: 'High RPM²', color: 'bg-purple-600' },
];

export const doughnutOptions = {
  data: {
    datasets: [
      {
        data: [200, 300, 500], // Valores representando frequência cardíaca em RPM^2
        backgroundColor: ['#0694a2', '#1c64f2', '#7e3af2'],
        label: 'Dataset 1',
      },
    ],
    labels: ['Low', 'Medium', 'High'], // Rótulos alterados para representar a frequência cardíaca
  },
  options: {
    responsive: true,
    cutoutPercentage: 80,
  },
  legend: {
    display: false,
  },
};



export const lineLegends: ILegends[] = [
  { title: 'Low Flow', color: 'bg-teal-600' },
  { title: 'Medium Flow', color: 'bg-purple-600' },
]

export const lineOptions = {
  data: {
    labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
    datasets: [
      {
        label: 'Low Flow',
        backgroundColor: '#0694a2',
        borderColor: '#0694a2',
        data: [30, 35, 40, 45, 50, 55, 60, 65], // Valores representando o fluxo médio cardíaco em ventilador mecânico
        fill: false,
      },
      {
        label: 'Medium Flow',
        backgroundColor: '#7e3af2',
        borderColor: '#7e3af2',
        data: [40, 45, 50, 55, 60, 65, 70, 75], // Valores representando o fluxo médio cardíaco em ventilador mecânico
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Time of Day',
        },
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Value',
        },
      },
    },
  },
  legend: {
    display: false,
  },
};



export const barLegends: ILegends[] = [
  { title: 'dado1', color: 'bg-teal-600' },
  { title: 'dado2', color: 'bg-purple-600' },
]

export const barOptions = {
  data: {
    labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
    datasets: [
      {
        label: 'dado1',
        backgroundColor: '#0694a2',
        // borderColor: window.chartColors.red,
        borderWidth: 1,
        data: [-3, 14, 52, 74, 33, 90, 70],
      },
      {
        label: 'dado2',
        backgroundColor: '#7e3af2',
        // borderColor: window.chartColors.blue,
        borderWidth: 1,
        data: [66, 33, 43, 12, 54, 62, 84],
      },
    ],
  },
  options: {
    responsive: true,
  },
  legend: {
    display: false,
  },
}

