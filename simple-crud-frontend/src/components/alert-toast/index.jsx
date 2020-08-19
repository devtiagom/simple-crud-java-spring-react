import React from 'react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

import './styles.css';

const ALERT_SUCCESS = 'alert-success';
const SINGLE_ALERT = 'single';
const DEFAULT_ALERT_TEXT_SUCCESS = 'Operação realizada com sucesso!';
const DEFAULT_ALERT_TEXT_ERROR = 'Erro inesperado!';

function AlertToast({
  alertClass = ALERT_SUCCESS,
  alertType = SINGLE_ALERT,
  alertTitle,
  alertTextStrong,
  alertText,
  alertList
}) {
  let AlertIcon;

  if (alertClass === ALERT_SUCCESS) {
    AlertIcon = FaCheckCircle;
    if (alertType === SINGLE_ALERT) {
      if (!alertText) alertText = DEFAULT_ALERT_TEXT_SUCCESS;
    }
  } else {
    AlertIcon = FaExclamationCircle;
    if (alertType === SINGLE_ALERT) {
      if (!alertText) alertText = DEFAULT_ALERT_TEXT_ERROR;
    }
  }

  function renderSingleAlert() {
    if (alertTitle) {
      return (
        <>
          <h6 className="alert-heading">
            <AlertIcon />
            <span className="ml-3">{alertTitle}</span>
          </h6>
          <hr />
          {alertTextStrong && <strong>{alertTextStrong}: </strong>}
          {alertText}
        </>
      );
    } else {
      return (
        <>
          <AlertIcon />
          <span className="ml-3">
            {alertTextStrong && <strong>{alertTextStrong}: </strong>}
            {alertText}
          </span>
        </>
      );
    }
  }

  function renderMultipleAlerts() {
    if (alertTitle) {
      return (
        <>
          <h6 className="alert-heading">
            <AlertIcon />
            <span className="ml-3">{alertTitle}</span>
          </h6>
          <hr />
          <ul>
            {alertList.map((alert, index) => {
              return (
                <li key={index}>
                    <strong>{alert.strong}: </strong>
                    {alert.text}
                </li>
              );
            })}
          </ul>
        </>
      );
    } else {
      return (
        <ul>
          {alertList.map((alert, index) => {
            return (
              <li key={index}>
                  <AlertIcon />
                  <span className="ml-3">
                    <strong>{alert.strong}: </strong>
                    {alert.text}
                  </span>
              </li>
            );
          })}
        </ul>
      );
    }
  }

  return (
    <div className="alert-toast">
      <div className={`alert alert-dismissible fade show ${alertClass}`} role="alert">
        {alertType === SINGLE_ALERT ? renderSingleAlert() : renderMultipleAlerts()}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
}

export default AlertToast;