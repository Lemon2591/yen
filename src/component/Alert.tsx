import React from "react";

function AlertSuccess() {
  return (
    <>
      <div className="alert-success-main">
        <div className="alert-success">
          <p>Success !</p>
        </div>
      </div>
    </>
  );
}

function AlertErr() {
  return (
    <>
      <div className="alert-arr-main">
        <div className="alert-err">
          <p>Errors !</p>
        </div>
      </div>
    </>
  );
}

export { AlertErr, AlertSuccess };
