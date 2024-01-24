export function validateSignup(values) {
  let errors = {};

  //username Errors
  if (!values.name) {
    errors.name = "A username is required.";
  } else if (values.name.length < 4) {
    errors.name = "A username must be at least 4 characters.";
  }

  // email Errors
  if (!values.email) {
    errors.email = "Your email is required.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Your email is invalid.";
  }

  // Password Errors
  if (!values.password) {
    errors.password = "A password is required.";
  } else if (values.password.length < 4) {
    errors.password = "Your password must be at least 2 characters.";
  }

  // phone Errors
  if (values.phone.length > 1 && values.phone.length < 10) {
    errors.phone = "Youe phone is Invalid";
  }
  return errors;
}

export function validateSignin(values) {
  let errors = {};

  //email Errors
  if (!values.email) {
    errors.email = "Your email is required.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Your email is invalid.";
  }

  // Password Errors
  if (!values.password) {
    errors.password = "A password is required.";
  } else if (values.password.length < 4) {
    errors.password = "Your password must be at least 4 characters.";
  }

  return errors;
}

export function validateTicket(values) {
  let errors = {};

  //topic errors
  if (!values.topic) {
    errors.topic = "Topic is required.";
  } else if (values.topic.length <= 4) {
    errors.topic = "Provide proper topic";
  }

  if (!values.description) {
    errors.description = "Description is required.";
  } else if (values.description.length <= 20) {
    errors.description = "Provide proper summary / description";
  }

  return errors
}