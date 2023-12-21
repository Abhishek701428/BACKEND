const mongoose=require('mongoose')
const connect=()=>{
    mongoose.connect('mongodb+srv://choudharyabhi7014:USNOTaz39nPkleQ1@cluster0.5n5xgwf.mongodb.net/CRM-Samsara?retryWrites=true&w=majority')
    .then((res)=>{
        // res.console.log("connected to mongoose")
    })
    .catch((err)=>{
        console.log(err)
    })
}
module.exports=connect