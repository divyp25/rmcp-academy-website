import axios from "axios";

async function testPut() {
  try {
    const resGet = await axios.get("http://localhost:5001/v1/api/cms/pages/home");
    const currentData = resGet.data.data;
    console.log("Current data from API before update:", currentData);

    currentData.show_admission_notification = false;
    currentData.show_admissions_popup = false;

    const resPut = await axios.put("http://localhost:5001/v1/api/cms/pages/home", {
      data: currentData
    });
    console.log("PUT Response status:", resPut.status);
    console.log("Updated data from API after update:", resPut.data.data);
    process.exit(0);
  } catch (err) {
    console.error("PUT Request failed:", err.message);
    process.exit(1);
  }
}

testPut();
