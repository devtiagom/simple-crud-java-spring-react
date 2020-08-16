import React from 'react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

import './styles.css';

const ALERT_TYPE_SUCCESS = 'success';
const DEFAULT_ALERT_TEXT_SUCCESS = 'Operação realizada com sucesso!';
const DEFAULT_ALERT_TEXT_STRONG_SUCCESS = 'Ok';
const DEFAULT_ALERT_TEXT_ERROR = 'Erro inesperado!';
const DEFAULT_ALERT_TEXT_STRONG_ERROR = 'Erro';

function AlertToast({ alertType = ALERT_TYPE_SUCCESS, alertText }) {
  let alertClass, AlertIcon, alertTextStrong;

  if (alertType === '' || alertText === '') return '';

  if (alertType === ALERT_TYPE_SUCCESS) {
    alertClass = 'alert-success';
    AlertIcon = FaCheckCircle;
    alertTextStrong = DEFAULT_ALERT_TEXT_STRONG_SUCCESS;
    if (!alertText) alertText = DEFAULT_ALERT_TEXT_SUCCESS;
  } else {
    alertClass = 'alert-danger';
    AlertIcon = FaExclamationCircle;
    alertTextStrong = DEFAULT_ALERT_TEXT_STRONG_ERROR;
    if (!alertText) alertText = DEFAULT_ALERT_TEXT_ERROR;
  }

  return (
    <div className="toast-alert">
      <div className={`alert alert-dismissible fade show ${alertClass}`} role="alert">
        <AlertIcon />
        <span className="ml-3"><strong>{alertTextStrong}</strong>: {alertText}</span>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
}

export default AlertToast;