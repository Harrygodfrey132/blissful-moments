// pages/api/quote.js
import axios from "axios";

export default async function handler(req, res) {
  try {
    // Fetch the quote data from ZenQuotes API (or any other external API)
    const response = await axios.get("https://zenquotes.io/api/random");

    // Send the quote data back to the client
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching quote:", error);
    res.status(500).json({ message: "Error fetching quote" });
  }
}
