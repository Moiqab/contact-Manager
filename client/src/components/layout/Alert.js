import React ,{useContext} from 'react';
import AlertContext from '../../context/alert/alertContext';

 const Alert = () => {
     const alertContext = useContext(AlertContext);
     const {alert} = alertContext;
  return (
      alert.length > 0 && 
      alert.map(alt=>(
        <div key={alt.id} className={`alert alert-${alt.type}`}>
            <i className='fas fa-info-circle'/>{alt.msg}
        </div>
      ))
    
  )
}


export default Alert;