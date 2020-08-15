import React from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
  const alertContext = React.useContext(AlertContext);
  const { alert } = alertContext;
  return (
    <>
      {alert && (
        <div className={`alert alert-${alert.type}`}>
          <i className='fas fa-info-circle'></i> {alert.message}
        </div>
      )}
    </>
  );
};

export default Alert;
