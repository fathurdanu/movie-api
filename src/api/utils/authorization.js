const authorization = (req,res,next) =>{
    try{
        const apiKey = req.headers['api-key'];
        if(apiKey===process.env.API_KEY){
            next()
        }else{
            const error = new Error('Unauthorized');
            error.code = 401;
            throw error;
        }
    }catch(error){
        return res.status(error.code || 500).json({ message: error.message });
    }
}

module.exports = {authorization};