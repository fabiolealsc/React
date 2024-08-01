import FormData from '../Components/FormData'
import {useNavigate} from 'react-router-dom'
import Header from '../Components/Header'

function RouteData(){
  const navigate = new useNavigate();
  return (
        <>
          <Header/>
          <div>
            <FormData/>
            <button onClick={()=>navigate("/")}>Go back</button>
          </div>
        </>
    );
}

export default RouteData