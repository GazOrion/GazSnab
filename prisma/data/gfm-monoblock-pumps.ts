export type MonoblockConsolePumpRow = {
  model: string;
  connection: string;
  voltage: "220" | "380";
  powerKw: string;
  currentA: string;
  flow: string;
  head: string;
  material: string;
  speed: string;
};

export const GFM_MONOBLOCK_PUMPS: MonoblockConsolePumpRow[] = [
  {
    "model": "GFm32-125B*",
    "connection": "50x32",
    "voltage": "220",
    "powerKw": "0.75",
    "currentA": "5.15",
    "flow": "18",
    "head": "17.5",
    "material": "нержавеющая сталь",
    "speed": "2900"
  },
  {
    "model": "GFm32-125A*",
    "connection": "50x32",
    "voltage": "220",
    "powerKw": "1.1",
    "currentA": "7",
    "flow": "24",
    "head": "22",
    "material": "нержавеющая сталь",
    "speed": "2900"
  },
  {
    "model": "GFm32-160C*",
    "connection": "50x32",
    "voltage": "220",
    "powerKw": "1.5",
    "currentA": "9.44",
    "flow": "18",
    "head": "25.4",
    "material": "нержавеющая сталь",
    "speed": "2900"
  },
  {
    "model": "GFm32-160B*",
    "connection": "50x32",
    "voltage": "220",
    "powerKw": "2.2",
    "currentA": "13.4",
    "flow": "24",
    "head": "31",
    "material": "нержавеющая сталь",
    "speed": "2900"
  },
  {
    "model": "GFm32-160A*",
    "connection": "50x32",
    "voltage": "220",
    "powerKw": "3",
    "currentA": "18",
    "flow": "27",
    "head": "35",
    "material": "нержавеющая сталь",
    "speed": "2900"
  },
  {
    "model": "GFm40-125C",
    "connection": "65x40",
    "voltage": "220",
    "powerKw": "1.1",
    "currentA": "7",
    "flow": "36",
    "head": "14.7",
    "material": "чугун",
    "speed": "2900"
  },
  {
    "model": "GFm40-125B",
    "connection": "65x40",
    "voltage": "220",
    "powerKw": "1.5",
    "currentA": "9.44",
    "flow": "42",
    "head": "18.1",
    "material": "чугун",
    "speed": "2900"
  },
  {
    "model": "GFm40-125A",
    "connection": "65x40",
    "voltage": "220",
    "powerKw": "2.2",
    "currentA": "13.4",
    "flow": "48",
    "head": "24.5",
    "material": "чугун",
    "speed": "2900"
  },
  {
    "model": "GFm40-160B",
    "connection": "65x40",
    "voltage": "220",
    "powerKw": "3",
    "currentA": "18",
    "flow": "42",
    "head": "31.8",
    "material": "чугун",
    "speed": "2900"
  },
  {
    "model": "GFm50-125C",
    "connection": "65x50",
    "voltage": "220",
    "powerKw": "2.2",
    "currentA": "13.4",
    "flow": "72",
    "head": "17",
    "material": "чугун",
    "speed": "2900"
  },
  {
    "model": "GFm50-125B",
    "connection": "65x50",
    "voltage": "220",
    "powerKw": "3",
    "currentA": "18",
    "flow": "72",
    "head": "20",
    "material": "чугун",
    "speed": "2900"
  }
];
