import axios from "axios";

async function test() {
  try {
    // 1. Login to get cookie
    console.log("Logging in...");
    const loginRes = await axios.post("http://localhost:5001/v1/api/auth/login", {
      email: "admin@rmcp.edu",
      password: "Admin@123!"
    });
    
    const cookie = loginRes.headers["set-cookie"];
    console.log("Login successful! Cookie received:", cookie);

    // 2. Fetch enquiries with cookie
    console.log("Fetching enquiries...");
    const enquiryRes = await axios.get("http://localhost:5001/v1/api/enquiry", {
      headers: {
        Cookie: cookie ? cookie.join("; ") : ""
      }
    });

    console.log("SUCCESS:", enquiryRes.status, enquiryRes.data);
    process.exit(0);
  } catch (error) {
    if (error.response) {
      console.error("API ERROR:", error.response.status, error.response.data);
    } else {
      console.error("REQUEST ERROR:", error.message);
    }
    process.exit(1);
  }
}

test();
