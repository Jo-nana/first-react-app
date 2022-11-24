import { useState} from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

// Default values for the form (empty)
const defaultFormFields ={
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  //Sign In with google
  const signInWithGoogle = async () => {
    await signInWithGooglePopup();

  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent default behavior of submit button

    try {
      const {user} = await signInAuthUserWithEmailAndPassword(email, password);

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found': // if email doesn't exist
          alert('User not found');
          break; //break = if this match don't check the rest
        case 'auth/wrong-password': // if password is wrong
          alert('Wrong password');
          break;
        default: // if no error code matches run this
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
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>

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
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          {/* Trigger sign in with google method */}
          <Button type='button' onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>Google Sign In</Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  )
}

export default SignInForm;
