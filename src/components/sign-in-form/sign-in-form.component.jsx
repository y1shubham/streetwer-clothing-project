import { useState } from 'react';

import FormInput from '../form-input/form-input.component';

import { signInWithGooglePopup
        ,signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'

import './sign-in-form.styles.scss';

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'




const defaultFormFields = {
    
    Email: '',
    Password: '',
    
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {  Email, Password } = formFields;


const resetFormFields = () => {
    setFormFields(defaultFormFields);
};

const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    
};

const handleSubmit = async (event) => {
    event.preventDefault();


    try {
        const {user} = await signInAuthUserWithEmailAndPassword(
            Email,
            Password);


        
        resetFormFields();

    } catch(error){
        switch(error.code){
            case 'auth/wrong-password':
                alert('incorrect password for email');
                break;
            case 'auth/user-not-found':
                alert('no user associated with this email');
                break;
            default:
                console.log(error);
        }
    }
        
        
    };
        

    const handleChange = (event) => {
        const {name,value} = event.target;

        setFormFields({...formFields, [name]: value });
    };

    return (
        <div className = 'sign-up-container'>
            <h2>Already have an account? </h2>
            <span>Sign in with your email and password </span>
            <form onSubmit = {handleSubmit}>
            
                
                
                
                <FormInput 
                label = "Email" 
                type = 'email' 
                required onChange = {handleChange} 
                name = "Email" value = {Email} />

                
                <FormInput 
                label = "Password" 
                type ='password' 
                required onChange = {handleChange} 
                name = "Password" value = {Password} />

            
                <div className = 'buttons-container'>
                    <Button type = "submit">Sign In </Button>
                    <Button buttonType = {BUTTON_TYPE_CLASSES.googgle} type ='button'
                    onClick = {signInWithGoogle}>Sign in With Google </Button>
                </div>
                
            </form>
        </div>
    );
};

export default SignInForm;