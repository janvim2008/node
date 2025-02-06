const app = require('../app');
var user = require('../model/usermodel');

login_status=0;
exports.insert=async(req,res)=>{

    user.create(req.body);
    res.status(200).json({
        status:'success'
    })
}

exports.getdata=async(req,res)=>{
    // var limit=3;
    // var total_rec=await user.countDocuments();
    // var total_page=Math.ceil(total_rec/limit);
    // var page_no=req.query.page_no;
    // if(page_no==undefined)
    // {
    //     page_no=1;
    // }
    // var start=(page_no-1)*limit;
    // var data =await user.find().skip(start).limit(limit);
    var data =await user.find();
    res.status(200).json({
        status:'get all data',
        data
        // total_page,
        // page_no
    })
}

exports.update_getdata=async(req,res)=>{
    const id = req.params.id;
    var data =await user.findById(id);
    res.status(200).json({
        status:'update data',
        data
    })
}

exports.update=async(req,res)=>{
    const id = req.params.id;
    const updateData= req.body;
    var data =await user.findByIdAndUpdate(id,updateData);
    res.status(200).json({
        status:'update data',
        messge:'update successfully',
        data
    })  
}

exports.delete=async(req,res)=>{
    const id = req.params.id;
    var data =await user.findByIdAndDelete(id);
    res.status(200).json({
        status:'delete data',
        messge:'delete successfully',
        data
    })
    }
exports.login = async(req,res)=>{
    var data = await user.find({"email" : req.body.email})
    if(login_status==0)
    {
        if(data.length==1)
        {
            if(data[0].password==req.body.password)
            {
                login_status=1;
                res.status(200).json({
                    status:"login successfully"
                })
            }
            else{
                res.status(200).json({
                    status:"checik email and password"
                })
            }
        }
        else{
            res.status(200).json({
                status:"checik email and password"
            })
        }
    }
    else{
        res.status(200).json({
            status:"user already login"
        }) 
    }
}
// if (data.status === "Login successful") {
//     // Store user data (email and ID) in localStorage
//     localStorage.setItem("user", JSON.stringify(data.user));  // Save user data (email, id)
    
//     // Optionally, you could also store other data like authentication token (if you use one)
//     alert("Login successful!");
//     console.log("User data stored in localStorage:", data.user);
// } else {
//     alert(data.status);  // Show error message if login fails
// }