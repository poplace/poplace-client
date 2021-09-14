import axios from "axios";

import { API_SERVER_URL } from "@env";

export default asyncDeleteAccount = async function (id) {
  try {
    await axios.delete(`${API_SERVER_URL}/users/delete`, { data: { id } });
  } catch (err) {
    alert(err.message);
  }
};

