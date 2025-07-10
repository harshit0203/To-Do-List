const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Check if user session is there or not
export const checkAuth = async () => {
  try {
    const res = await fetch(`${BASE_URL}/auth/check`, {
      method: "GET",
      credentials: "include", // 👈 important for sending session
    });

    const data = await res.json();
    return data?.status === true;
  } catch (err) {
    return false;
  }
};

// GET request
export const apiGet = async (endpoint) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (err) {
    console.error("GET error:", err);
    return { error: true, message: "GET request failed" };
  }
};

// POST request
export const apiPost = async (endpoint, data) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error("POST error:", err);
    return { error: true, message: "POST request failed" };
  }
};
