import axios from "axios";

const mockedPacientId = "626d8e0f192fcf413027dda9";

const fetchDevices = async (pacientId = mockedPacientId) => {
  try {
    const result = await axios.get(`${window.BaseUrl}/pacients/${pacientId}`, {
      headers: { gameToken: "0a377edf-9e39-427b-9426-ef87afb7287f" },
    });

    return [
      {
        name: "Pitaco",
        ...result.data.data.capacitiesPitaco,
      },
      {
        name: "Manovacuômetro",
        ...result.data.data.capacitiesMano,
      },
      {
        name: "Cinta",
        ...result.data.data.capacitiesCinta,
      },
    ];
  } catch (error) {
    console.log(error);
  }
};

const fetchHistory = (device, exercise) => {
  return [
    {
      name: "",
      value: 0,
    },
    {
      name: "01/05/2022",
      value: 1000,
    },
    {
      name: "02/05/2022",
      value: 5000,
    },
    {
      name: "02/05/2022",
      value: 3500,
    },
    {
      name: "03/05/2022",
      value: 2000,
    },
    {
      name: "03/05/2055",
      value: 2780,
    },
  ];
};

export { fetchDevices, fetchHistory };
