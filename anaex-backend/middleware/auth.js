import jwt from 'jsonwebtoken';

// create function the verify if token is valid or not?
export const veriyfyToken = (req, res, next) => {
    // Authorization: Bearer <JWT_token> requst is comming like this so we expract this
    console.log('before geting autheader');
    const autHeader = req.headers.authorization;
    console.log('after authheader');

    //now we check if header is valid or not
    if (!autHeader || !autHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: 'unauthorized' });
    }
    console.log('verified autheader');


    //"Bearer <JWT_token>" only get token from this
    console.log('before token ');
    const token = autHeader.split(' ')[1];
    console.log('after token');


    // now actual varification starts
    try {
        // here verify that token is valid or not
        // if it is valid then it return the payload part 
        console.log('before decode');

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log('after decode');

        // payload part contains the userid 
        console.log('before getinf user id');

        req.user = { id: decode.id };
        console.log('after getting user id');


        // next function is used to call next express funciton in express chain
        // use to call controller function
        next();

    } catch (error) {
        return res.status(500).json({ message: 'error to verify the token', error: error.message });
    }
}