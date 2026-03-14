import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyDVG-QVgPibmigoSpyr_z6dktdmrFlYEK4";

async function listModels() {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
  const data = await response.json();
  console.log(data.models.map(m => m.name).join("\n"));
}
listModels();
