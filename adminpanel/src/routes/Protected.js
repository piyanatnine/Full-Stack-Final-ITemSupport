import { Navigate } from "react-router-dom";

const Protected = ({  children }) => {
    const data = JSON.parse(localStorage.getItem('User'));
    if(!data){
        return <Navigate to="/" replace />;
    }
    return children;
};

export default Protected;