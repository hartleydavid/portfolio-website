export default async function handler(req, res) {
    //Only POST methods
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" }); 
    }

    //Try to call API
    try {
        //Get response from the API
        const response = await fetch("https://portfolio-website-ot1g.onrender.com/graphql", {
            method: "POST",
            headers: {
                Authorization: process.env.API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
        });

        const data = await response.json();
        res.status(200).json(data);
    //Catch any error as proxy error
    } catch (err) {
        console.error("Proxy error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}