import history from "../history";
//IceBranch
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
    if (response.status == 500) return response.json();
    if (response.status == 200) return response.json();
  },
  register: async (
    firstName,
    lastName,
    gender,
    password,
    email,
    phoneNumber,
    role,
    birthDate,
    ssn
  ) => {
    const URL = "http://localhost:8000/signup";
    const response = await fetch(URL, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName,
        gender,
        password,
        email,
        phoneNumber,
        role,
        birthDate,
        ssn
      })
    });
    console.log(response);
    if (response.status == 400) return response.json();
    if (response.status == 200) return response.json();
  },
  getProfile: async userId => {
    if (!localStorage.getItem("token")) {
      window.alert("Please login first!");
      return history.push("./login");
    }
    console.log(userId);
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
  getCourseByTutorId: async userId => {
    const URL = `http://localhost:8000/courses?tutorId=${userId}&token=${localStorage.getItem(
      "token"
    )}`;
    const response = await fetch(URL, {
      method: "GET",
      mode: "cors"
    });
    if (response.status == 404) return { error: true };
    if (response.status == 200) return response.json();
  },
  getRequests: async userId => {
    const URL = `http://localhost:8000/requests?tutorId=${userId}&token=${localStorage.getItem(
      "token"
    )}`;
    const response = await fetch(URL, {
      method: "GET",
      mode: "cors"
    });
    if (response.status == 404) return { error: true };
    if (response.status == 200) return response.json();
  },
  updateRequest: async (requestId, status, studentId, courseId) => {
    const URL = `http://localhost:8000/requests?token=${localStorage.getItem(
      "token"
    )}`;
    const response = await fetch(URL, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ requestId, status, studentId, courseId })
    });
    if (response.status == 500) return { error: true };
    if (response.status == 201) return response.json();
  },
  getSearchResult: async (day, subject, time, price) => {
    const URL = `http://localhost:8000/search?day=${day}&time=${time}&category=${subject}&price=${price}`;
    const response = await fetch(URL, {
      method: "GET",
      mode: "cors"
    });
    if (response.status == 404) return { error: true };
    if (response.status == 200) return response.json();
  },
  createRequests: async (tutorId, courseId) => {
    const URL = `http://localhost:8000/requests?token=${localStorage.getItem(
      "token"
    )}`;
    const response = await fetch(URL, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tutorId, courseId })
    });
    console.log(response.status);
    if (response.status == 500) return { error: true };
    if (response.status == 201) return response.json();
  },
  createCourse: async (
    courseName,
    dayAndStartTime,
    dayAndEndTime,
    startDate,
    endDate,
    token,
    totalAmountOfStudent,
    description,
    courseFee,
    category
  ) => {
    const URL = `http://localhost:8000/courses?token=${token}`;
    const amountOfStudent = totalAmountOfStudent;
    const response = await fetch(URL, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        courseName,
        dayAndStartTime,
        dayAndEndTime,
        startDate,
        endDate,
        amountOfStudent,
        totalAmountOfStudent,
        description,
        courseFee,
        category
      })
    });
    console.log(response.status);
    if (response.status == 400) return { error: true };
    if (response.status == 201) return response.json();
  },
  editCourse: async (
    _id,
    courseName,
    dayAndStartTime,
    dayAndEndTime,
    startDate,
    endDate,
    token,
    totalAmountOfStudent,
    description,
    courseFee,
    category
  ) => {
    const URL = `http://localhost:8000/courses?token=${token}`;
    const amountOfStudent = totalAmountOfStudent;
    const response = await fetch(URL, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        _id,
        courseName,
        dayAndStartTime,
        dayAndEndTime,
        startDate,
        endDate,
        amountOfStudent,
        totalAmountOfStudent,
        description,
        courseFee,
        category
      })
    });
    console.log(response.status);
    if (response.status == 400) return { error: true };
    if (response.status == 201) return response.json();
  },
  editProfile: async (
    _id,
    firstName,
    lastName,
    gender,
    phoneNumber,
    profileImage,
    token
  ) => {
    const URL = `http://localhost:8000/profile?token=${token}`;
    const response = await fetch(URL, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        _id,
        firstName,
        lastName,
        gender,
        phoneNumber,
        profileImage
      })
    });
    console.log(response.status);
    if (response.status == 400) return { error: true };
    if (response.status == 201) return response.json();
  },
  getVeriDoc: async tutorId => {
    const URL = `http://localhost:8000/file/verifyFile?token=${localStorage.getItem(
      "token"
    )}&tutorId=${tutorId}`;
    const response = await fetch(URL, {
      method: "GET",
      mode: "cors"
    });
    console.log(response);
    if (response.status == 404) return { error: true };
    if (response.status == 200) return response;
  },
  getMessage: async roomId => {
    const URL = `http://localhost:8000/message?roomId=${roomId}&token=${localStorage.getItem(
      "token"
    )}`;
    const response = await fetch(URL, {
      method: "GET",
      mode: "cors"
    });
    console.log(response);
    if (response.status == 500) return { error: true };
    if (response.status == 200) return response.json();
  },
  sendMessage: async (message, roomId) => {
    const URL = `http://localhost:8000/message?token=${localStorage.getItem(
      "token"
    )}`;
    const response = await fetch(URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message, roomId })
    });
    console.log(response);
    if (response.status == 500) return { error: true };
    if (response.status == 201) return response.json();
  },
  getChatUserBoxes: async () => {
    const URL = `http://localhost:8000/message/rooms?token=${localStorage.getItem(
      "token"
    )}`;
    const response = await fetch(URL, {
      method: "GET",
      mode: "cors"
    });
    console.log(response);
    if (response.status == 500) return { error: true };
    if (response.status == 200) return response.json();
  },
  getChatUserBox: async userId => {
    const URL = `http://localhost:8000/message/room?userId=${userId}&token=${localStorage.getItem(
      "token"
    )}`;
    const response = await fetch(URL, {
      method: "GET",
      mode: "cors"
    });
    console.log(response);
    if (response.status == 500) return { error: true };
    if (response.status == 200) return response.json();
  },
  sendReport: async data => {
    const URL = `http://localhost:8000/report?token=${localStorage.getItem(
      "token"
    )}`;
    const response = await fetch(URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    console.log(response);
    if (response.status == 500) return { error: true };
    if (response.status == 201) return response.json();
  }
};

export default Util;
