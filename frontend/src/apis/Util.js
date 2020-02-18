const Util = {
  login: async (email, password) => {
    console.log({ email, password });
    const response = await fetch("http://localhost:8000/login", {
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
  }
};

export default Util;
