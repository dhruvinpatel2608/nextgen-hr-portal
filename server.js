import { createServer } from "http";
import { MongoClient, ObjectId } from "mongodb";


const PORT = 4000;

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'NextGenHR';

const getBody = async (req) => {
    return new Promise((resolve, rejects) => {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => resolve(body));
        req.on("error", () => rejects(err));
    })
}

const startServer = async () => {
    await client.connect();       // ✔ FIXED
    const db = client.db(dbName); // ✔ FIXED

    const server = createServer(async (req, res) => {

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "*");

        if (req.method === "OPTIONS") {
            res.writeHead(204);
            res.end();
            return;
        }

        // CREATE
        if (req.method === "POST" && req.url == "/storeJobVacancy") {
            const body = JSON.parse(await getBody(req))

            await db.collection('jobApplications').insertOne(body);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: 'job vacancy stored successfully' }));
            return;
        }

        // READ ALL
        if (req.method == "GET" && req.url === "/getapplications") {
            const getjobdata = await db.collection('jobApplications').find({}).toArray();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(getjobdata));
            return;
        }

        // GET SINGLE APPLICATION
        if (req.method === "POST" && req.url === "/getSingleJobAppData") {
            const bodydata = JSON.parse(await getBody(req));
            const id = bodydata.id

            const collection = db.collection("jobApplications");

            const singleData = await collection.findOne({ _id: new ObjectId(id) });

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(singleData || {}));
            return;
        }

        if (req.method === "PUT" && req.url === "/updateJobApplication") {
            const bodydata = JSON.parse(await getBody(req))

            await db.collection('jobApplications').updateOne({ _id: new ObjectId(bodydata.id) }, { $set: bodydata });

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Applications updated' }));
            return;
        }

        if (req.method === "DELETE" && req.url == "/deleteJobApplication") {
            const bodydata = JSON.parse(await getBody(req));

            await db.collection("jobApplications").deleteOne({ _id: new ObjectId(bodydata.id) });

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Application deleted successfully" }));
            return;
        }
    });

    server.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
}
startServer();
