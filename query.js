db.movies.updateOne({_id:ObjectId("62d03539963b6bbf524f0a58")},
{
    $set:{release_date:"2011"}
}
)

db.movies.updateOne({_id:ObjectId("62d03539963b6bbf524f0a58")},
{
    $set:{language:["Tamil","English","Hindi"]}
})

db.movies.updateOne({_id:ObjectId("62d033f6963b6bbf524f0a57")},
{
    $set:{language:["Tamil","English","French"]}
})

db.movies.updateMany({},
    {
        $set:{release_date: "2013"}
    }
)

db.movies.updateOne(
    {
        _id:ObjectId("62d033f6963b6bbf524f0a57")
    },
    {
        $pull:{language:{$in:["French"]}}
    }
)
db.movies.updateOne(
    {
        _id:ObjectId("62d03539963b6bbf524f0a58")
    },
    {
        $set:{"stats.revenue":"9000000"}
    }    
)


db.movies.insertOne({
    "title": "Title1",
    "release_date": "2011",
    "Genre": [
        "Action",
        "Thriller"
    ],
    "stats": {
        "budget": "100000",
        "revenue": "200000"
    },
    "cast_crew": [
        {
            "name": "Name2"
        }
    ]
}
)
db.movies.find({title:"Title1"},{title:1,release_date:1})
db.movies.find({title:"Title1"},{cast_crew:0})

db.movies.updateOne({_id:ObjectId("62d033f6963b6bbf524f0a57")},
    {
        $set:{release_date:"2011"}
    }
)
db.movies.insertOne({
    "title": "Mask",
    "release_date": "1995",
    "Genre": [
        "Action",
        "Fantasy",
        "Comedy"
    ],
    "stats": {
        "budget": "500000",
        "revenue": "500000"
    },
    "cast_crew": [
        {
            "name": "Jim carrey"
        }
    ]
})
db.movies.find({release_date : {$gte : "2010"}},{title:1,release_date:1})

db.movies.find({Genre:{$in:["Comedy"]}})
db.movies.find({title:"Mask"})
db.movies.find({"cast_crew.name":"Jim carrey"})

db.movies.find(
    {
        $and:[
            {
                release_date : {$gt : "2000"}
            },
            {
                release_date : {$lt : "2012"}
            }
        ]
    }
)

db.movies.updateMany({},{$set: {status : "true"}})
db.movies.find({status:{$exists : true}})