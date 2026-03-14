import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyDVG-QVgPibmigoSpyr_z6dktdmrFlYEK4";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function test() {
  try {
    const result = await model.generateContent("Hello");
    console.log("SUCCESS:", result.response.text());
  } catch(e) {
    console.error("ERROR:", e);
  }
}
test();
