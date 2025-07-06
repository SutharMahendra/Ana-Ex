import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";


function ProtectedRoute({ children }) {
    // here we get token of user;
    const token = useSelector((state) => state.auth.token);

    // now check if token is availabel or not 
    // here children means dashboard only that user can access it who have token 
    // other user may redirect to the login page 
    return token ? children : <Navigate to={'/login'} />;

}

export default ProtectedRoute
