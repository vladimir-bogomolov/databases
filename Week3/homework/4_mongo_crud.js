const { MongoClient } = require("mongodb");


const url = "mongodb+srv://hyfuser:hyfpassword@cluster0.pksjs.mongodb.net/new_world?retryWrites=true&w=majority";

const client = new MongoClient(url, { useUnifiedTopology: true });
 
 // The database to use
 const dbName = "new_world";
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         
         const col = db.collection("city");

         // 1. Create a new record (document) for a new city (your home town, say)                                                                                                                                                         
         let cityDocument = {
             "Name": "Khabarovsk",
             "CountryCode": "myRUS",                                                                                                                                 
             "District": "Khabarovsk",                                                                                                                               
             "Population": 589596
            }

         
         const p = await col.insertOne(cityDocument);
         const myDoc = await col.findOne(cityDocument);
         console.log(myDoc);

        //  2. Update that record with a new population
        const filter = { "Name": "Khabarovsk" };
        const updateDocument = {
           $set: {
            "Population": 600000,
           },
        };
        const result = await col.updateOne(filter, updateDocument);

        // 3. Read the document that you just updated in two ways : finding by the city name, and then by the country code
        const findResult = await col.find({
            "Name": "Khabarovsk"
        });
        await findResult.forEach(console.log);

        const findResult2 = await col.find({
            "CountryCode": "myRUS"
        });
        await findResult2.forEach(console.log);

        // 4. Delete the city
        const doc = {
            "Name": "Khabarovsk"
          };
        const deleteResult = await col.deleteOne(doc);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);