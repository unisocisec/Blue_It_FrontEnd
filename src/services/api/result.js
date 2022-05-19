import axios from "axios";
import moment from "moment";

const fetchResults = async (patientId, device, visualization) => {
  const gameToken = JSON.parse(
    window.sessionStorage.getItem("userCredentials") || "{}"
  ).gameToken;

  try {
    const response = await axios.get(
      `${window.BaseUrl}/pacients/${patientId}/plataforms/statistics?sort=asc&gameDevice=${device}`,
      {
        headers: { gameToken },
      }
    );

    const zeroPoint = [
      {
        date: "",
        value: 0,
      },
    ];
    const normalizedResponse = response.data.data.map((patientResult) => {
      return {
        date: moment(patientResult.playFinish).format("DD/MM/YY"),
        value: patientResult[visualization],
      };
    });

    return [...zeroPoint, ...normalizedResponse];
  } catch (error) {
    console.log(error);
  }
};

const fetchPointsAndLevelsAndPlays = async (patientId) => {
  const gameToken = JSON.parse(
    window.sessionStorage.getItem("userCredentials") || "{}"
  ).gameToken;

  try {
    const response = await axios.get(
      `${window.BaseUrl}/pacients/${patientId}`,
      {
        headers: { gameToken },
      }
    );

    const data = response.data.data;

    return [
      {
        value: data.accumulatedScore,
        title: "Pontuação acumulada",
      },
      {
        value: data.unlockedLevels,
        title: "Níveis desbloqueados",
      },
      {
        value: data.playSessionsDone,
        title: "Seções jogadas",
      },
    ];
  } catch (error) {
    console.log(error);
  }
};

export { fetchResults, fetchPointsAndLevelsAndPlays };
