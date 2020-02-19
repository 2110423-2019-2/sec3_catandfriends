import history from "../history";

const Util = {
  login: async (email, password) => {
    const URL = "http://localhost:8000/login";
    const response = await fetch(URL, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    console.log(response.status);
    if (response.status == 500) return { error: true };
    if (response.status == 200) return response.json();
  },
  getProfile: async userId => {
    if (!localStorage.getItem("token")) {
      window.alert("Please login first!");
      return history.push("./login");
    }
    const URL = userId
      ? `http://localhost:8000/profile?userId=${userId}&token=${localStorage.getItem(
          "token"
        )}`
      : `http://localhost:8000/profile?token=${localStorage.getItem("token")}`;
    const response = await fetch(URL, {
      method: "GET",
      mode: "cors"
    });
    if (response.status == 404) return { error: true };
    if (response.status == 200) return response.json();
  },
  getSchedule: async userId => {
    const URL = `http://localhost:8000/schedule?userId=${userId}&token=${localStorage.getItem(
      "token"
    )}`;
    let response = await fetch(URL, {
      method: "GET",
      mode: "cors"
    });
    if (response.status == 404) return { error: true };
    if (response.status == 200) return response.json();
  },
  getCourseById: async courseId => {
    let URL = `http://localhost:8000/courses?courseId=${courseId}&token=${localStorage.getItem(
      "token"
    )}`;
    let response = await fetch(URL, {
      method: "GET",
      mode: "cors"
    });
    if (response.status == 404) return { error: true };
    if (response.status == 200) return response.json();
  },
  getMycourse: async userId => {
    const URL = `http://localhost:8000/course?userId=${userId}&token=${localStorage.getItem(
      "token"
    )}`;
    const response = await fetch(URL, {
      method: "GET",
      mode: "cors"
    });
    if (response.status == 404) return { error: true };
    if (response.status == 200) return response.json();
  }
};

export default Util;
