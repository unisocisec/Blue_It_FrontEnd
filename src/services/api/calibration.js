import axios from "axios";

const url = "https://iblueit.azurewebsites.net/api/pacients";
const mockedPacientId = "626d8e0f192fcf413027dda9";

const fetchHistoryCalibration = async (pacientId = mockedPacientId) => {
  try {
    const result = await axios.get(`${url}/${pacientId}`, {
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

export { fetchHistoryCalibration };
