import categoryModel from "../models/categoryModel.js";


//get all catgory 
export const categoryController=async(req,res)=>{

    try {
        const category= await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:"All category List",
            category,
        })
        
    } catch (error) {
        console.log;
        res.status(500).send({
          success: false,
          error,
          message: "Error while geting all category",
        });
    }
}


