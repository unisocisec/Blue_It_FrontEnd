import axios from "axios";

const url = "https://iblueit.azurewebsites.net/api/pacients";
const gameToken = "0a377edf-9e39-427b-9426-ef87afb7287f";

const fetchAll = async () => {
  try {
    const result = await axios.get(`${url}?sort=asc`, {
      headers: {
        gameToken,
      },
    });

    return result.data.data.map((patient) => {
      return { id: patient._id, name: patient.name };
    });
  } catch (error) {
    console.log(error);
  }
};

export { fetchAll };
