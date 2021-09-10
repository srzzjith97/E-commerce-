var db=require('../config/connection')
var collection=require('../config/collection')
var objectId=require('mongodb').ObjectId
const { resolve, reject } = require('promise')
const { response } = require('../app')



module.exports={

    addProduct:(product,callback)=>{
       
        db.get().collection('product').insertOne(product).then((data)=>{

            callback(data.insertedId)
        })
    },
    getAllProduct:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })

    },
    deleteProduct:(proId)=>{
        
        
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:objectId(proId)}).then((response)=>{
               
                resolve(response)
            })
        })


    },
    getProductDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
                resolve(product)

            })
        })
    },
    updateProduct:(proId,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION)
            .updateOne({_id:objectId(proId)},{
                $set:{
                    Name:proDetails.Name,
                    Description:proDetails.Description,
                    Price:proDetails.Price,
                    Category:proDetails.Category,
                   

                }
            }).then(response)==(
                resolve()
                )
                
        })
    }
    
}



 