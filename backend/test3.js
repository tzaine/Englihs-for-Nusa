import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyDVG-QVgPibmigoSpyr_z6dktdmrFlYEK4";
const genAI = new GoogleGenerativeAI(apiKey);

async function run() {
  console.log("Starting tests...");
  try {
    const res = await genAI.getGenerativeModel({ model: "gemini-2.0-flash" }).generateContent("test");
    console.log("2.0-flash SUCCESS");
  } catch(e) { console.error("2.0-flash ERROR:", e.status); }

  try {
    const res = await genAI.getGenerativeModel({ model: "gemini-2.5-flash" }).generateContent("test");
    console.log("2.5-flash SUCCESS");
  } catch(e) { console.error("2.5-flash ERROR:", e.status); }
  
  try {
    const res2 = await genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" }).generateContent("test");
    console.log("2.0-flash-lite SUCCESS");
  } catch(e) { console.error("2.0-lite ERROR:", e.status); }
}
run();
