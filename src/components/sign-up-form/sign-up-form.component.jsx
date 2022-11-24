import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import { SignUpContainer } from './sign-up-form.styles';

// Default values for the form (empty)
const defaultFormFields ={
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  // setting default form fields (empty)
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent default behavior of submit button

    // First check if password and confirmPassword match
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return; //exit function, no proceed
    }
    try {
      // Create user with email and password
      const { user } = await createAuthUserWithEmailAndPassword(email, password);

      // adding displayName to user and saving it to DB
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();

    } catch (error) {
      if(error.code === 'auth/email-already-in-use'){ // if email already exists
        alert('Email already in use');
      } else {
      console.log('There is an error', error);
      }
    }
  };

  // getting the value of the input and setting it to the state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  // Form structure
  return(
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  )
}

export default SignUpForm;
