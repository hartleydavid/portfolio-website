export default async function handler(req, res) {
    const response = await fetch(process.env.BACKEND_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.NEXT_PUBLIC_API_KEY, // Your secret API key
      },
      body: JSON.stringify(req.body),
    });
  
    const data = await response.json();
    res.status(200).json(data);
  }