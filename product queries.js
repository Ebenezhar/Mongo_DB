
//1.Find all the information about each products
db.products.find().toArray();

//2.Find the product price which are between 400 to 800
db.products.find({
    $and: [
        {
            product_price : {$gte : 400}
        },
        {
            product_price : {$lte : 800}
        }
    ]
})

//3.Find the product price which are not between 400 to 600

db.products.find({
    $or: [
        {
            product_price : {$lt : 400}
        },
        {
            product_price : {$gt : 600}
        }
    ]
})

//4.List the four product which are grater than 500 in price
db.products.find({product_price:{$gt:500}}).limit(4).toArray()

//5.Find the product name and product material of each products
db.products.find({},{product_name:1,product_material:1})

//6.Find the product with a row id of 10
db.products.find({id:"25"})

//7.Find only the product name and product material
db.products.find({},{product_name:1,product_material:1})

//8.Find all products which contain the value of soft in product material
db.products.find({product_material:"Soft"})

//9.Find products which contain product color indigo  and product price 492.00
db.products.find(
    {
        $or:[
            {
                product_color:"indigo"
            },
            {
                product_price:492
            }
        ]
    }    
)

//10.Delete the products which product price value are same

db.products.updateMany({},{
    $set:{isDeleted:false}
})

db.products.updateMany({product_price:36},{
    $set:{isDeleted:true}
})

db.products.find({isDeleted:false})

