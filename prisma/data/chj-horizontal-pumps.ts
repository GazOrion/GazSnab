export type HorizontalMultistagePumpRow = {
  model: string;
  connection: string;
  voltage: "220" | "380";
  powerKw: string;
  currentA: string;
  flow: string;
  head: string;
};

export const CHJ_HORIZONTAL_PUMPS: HorizontalMultistagePumpRow[] = [
  {
    "model": "CHJ2-20",
    "connection": "1\"x1\"",
    "voltage": "220",
    "powerKw": "0.37",
    "currentA": "2.4",
    "flow": "2",
    "head": "14"
  },
  {
    "model": "CHJ2-30",
    "connection": "1\"x1\"",
    "voltage": "220",
    "powerKw": "0.37",
    "currentA": "2.4",
    "flow": "2",
    "head": "21"
  },
  {
    "model": "CHJ2-40",
    "connection": "1\"x1\"",
    "voltage": "220",
    "powerKw": "0.55",
    "currentA": "3.8",
    "flow": "2",
    "head": "28"
  },
  {
    "model": "CHJ2-50",
    "connection": "1\"x1\"",
    "voltage": "220",
    "powerKw": "0.55",
    "currentA": "3.8",
    "flow": "2",
    "head": "35"
  },
  {
    "model": "CHJ2-60",
    "connection": "1\"x1\"",
    "voltage": "220",
    "powerKw": "0.75",
    "currentA": "5.2",
    "flow": "2",
    "head": "42"
  },
  {
    "model": "CHJ4-20",
    "connection": "1.25\"x1\"",
    "voltage": "220",
    "powerKw": "0.55",
    "currentA": "3.8",
    "flow": "4",
    "head": "15"
  },
  {
    "model": "CHJ4-30",
    "connection": "1.25\"x1\"",
    "voltage": "220",
    "powerKw": "0.75",
    "currentA": "5.2",
    "flow": "4",
    "head": "22"
  },
  {
    "model": "CHJ4-40",
    "connection": "1.25\"x1\"",
    "voltage": "220",
    "powerKw": "0.75",
    "currentA": "5.2",
    "flow": "4",
    "head": "30"
  },
  {
    "model": "CHJ4-50T",
    "connection": "1.25\"x1\"",
    "voltage": "380",
    "powerKw": "1",
    "currentA": "Δ4.2/Y2.4",
    "flow": "4",
    "head": "38"
  },
  {
    "model": "CHJ4-60T",
    "connection": "1.25\"x1\"",
    "voltage": "380",
    "powerKw": "1.1",
    "currentA": "Δ4.5/Y2.6",
    "flow": "4",
    "head": "45"
  },
  {
    "model": "CHJ8-10",
    "connection": "1.5\"x1.5\"",
    "voltage": "220",
    "powerKw": "0.55",
    "currentA": "3.8",
    "flow": "8",
    "head": "9"
  },
  {
    "model": "CHJ8-20",
    "connection": "1.5\"x1.5\"",
    "voltage": "220",
    "powerKw": "0.75",
    "currentA": "5.2",
    "flow": "8",
    "head": "19"
  },
  {
    "model": "CHJ8-30T",
    "connection": "1.5\"x1.5\"",
    "voltage": "380",
    "powerKw": "1.1",
    "currentA": "Δ4.5/Y2.6",
    "flow": "8",
    "head": "26"
  },
  {
    "model": "CHJ8-40T",
    "connection": "1.5\"x1.5\"",
    "voltage": "380",
    "powerKw": "1.5",
    "currentA": "Δ6/Y3.5",
    "flow": "8",
    "head": "37"
  },
  {
    "model": "CHJ8-50T",
    "connection": "1.5\"x1.5\"",
    "voltage": "380",
    "powerKw": "2.2",
    "currentA": "Δ8.4/Y4.9",
    "flow": "8",
    "head": "46.5"
  },
  {
    "model": "CHJ8-60T",
    "connection": "1.5\"x1.5\"",
    "voltage": "380",
    "powerKw": "3",
    "currentA": "Δ11/Y6.3",
    "flow": "8",
    "head": "52"
  },
  {
    "model": "CHJ12-10",
    "connection": "1.5\"x1.5\"",
    "voltage": "220",
    "powerKw": "0.75",
    "currentA": "5.2",
    "flow": "12",
    "head": "9.5"
  },
  {
    "model": "CHJ12-20T",
    "connection": "1.5\"x1.5\"",
    "voltage": "380",
    "powerKw": "1.1",
    "currentA": "Δ4.5/Y2.6",
    "flow": "12",
    "head": "19.5"
  },
  {
    "model": "CHJ12-30T",
    "connection": "1.5\"x1.5\"",
    "voltage": "380",
    "powerKw": "1.85",
    "currentA": "Δ7.1/Y4.1",
    "flow": "12",
    "head": "29.5"
  },
  {
    "model": "CHJ12-40T",
    "connection": "1.5\"x1.5\"",
    "voltage": "380",
    "powerKw": "2.2",
    "currentA": "Δ8.4/Y4.9",
    "flow": "12",
    "head": "39.5"
  },
  {
    "model": "CHJ12-50T",
    "connection": "1.5\"x1.5\"",
    "voltage": "380",
    "powerKw": "3",
    "currentA": "Δ11/Y6.3",
    "flow": "12",
    "head": "50"
  },
  {
    "model": "CHJ16-10T",
    "connection": "2\"x2\"",
    "voltage": "380",
    "powerKw": "1",
    "currentA": "Δ4.2/Y2.4",
    "flow": "16",
    "head": "10"
  },
  {
    "model": "CHJ16-20T",
    "connection": "2\"x2\"",
    "voltage": "380",
    "powerKw": "1.5",
    "currentA": "Δ6/Y3.5",
    "flow": "16",
    "head": "20"
  },
  {
    "model": "CHJ16-30T",
    "connection": "2\"x2\"",
    "voltage": "380",
    "powerKw": "2.2",
    "currentA": "Δ8.4/Y4.9",
    "flow": "16",
    "head": "30"
  },
  {
    "model": "CHJ16-40T",
    "connection": "2\"x2\"",
    "voltage": "380",
    "powerKw": "3",
    "currentA": "Δ11/Y6.3",
    "flow": "16",
    "head": "40"
  },
  {
    "model": "CHJ20-10T",
    "connection": "2\"x2\"",
    "voltage": "380",
    "powerKw": "1",
    "currentA": "Δ4.2/Y2.4",
    "flow": "20",
    "head": "10.5"
  },
  {
    "model": "CHJ20-20T",
    "connection": "2\"x2\"",
    "voltage": "380",
    "powerKw": "1.85",
    "currentA": "Δ7.1/Y4.1",
    "flow": "20",
    "head": "20"
  },
  {
    "model": "CHJ20-30T",
    "connection": "2\"x2\"",
    "voltage": "380",
    "powerKw": "3",
    "currentA": "Δ11/Y6.3",
    "flow": "20",
    "head": "31.5"
  },
  {
    "model": "CHJ20-40T",
    "connection": "2\"x2\"",
    "voltage": "380",
    "powerKw": "4",
    "currentA": "9.6",
    "flow": "20",
    "head": "40"
  }
];
