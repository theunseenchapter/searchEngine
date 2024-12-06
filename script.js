import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import readline from "readline";
dotenv.config();

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to get user input asynchronously
function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function generateAIContent() {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  while (true) {
    // Prompt the user for a question
    const question = await askQuestion("Enter your question here (or type 'exit' to quit): ");
    
    // Exit the loop if the user types 'exit'
    if (question.toLowerCase() === 'exit') {
      console.log("Exiting the program...");
      break; // Break out of the loop
    }

    try {
      // Generate content based on the user's question
      const result = await model.generateContent(question);
      console.log("AI Response:", result.response.text()); // Display the AI's response
    } catch (error) {
      console.error("Error generating content:", error);
    }
  }

  rl.close(); // Close the readline interface after exiting the loop
}

generateAIContent();
