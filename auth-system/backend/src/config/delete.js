const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://souravmishra7456:wZgCzCsJJQ22Bnc8@cluster0.5j0ia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function fetchFormDatas() {
    try {
        await client.connect();
        const db = client.db(); // Default database
        const collection = db.collection("formdatas"); // Target collection

        const data = await collection.find({}).toArray(); // Fetch all documents
        console.log("FormDatas Collection Data:", data);
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        await client.close();
    }
}

fetchFormDatas();
