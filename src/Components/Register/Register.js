import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

class Register extends React.Component {
  
    constructor(props){
      super();
      this.state = {
        email: "",
        password: "",
        name: "",
        recaptchaValue: null,
      }
    }
    onNameChange = (event) => {
      this.setState({name: event.target.value});
    }
    onEmailChange = (event) => {
      this.setState({email: event.target.value});
    }
    onPasswordChange = (event) => {
      this.setState({password: event.target.value});
    }
    onRecaptchaChange = (value) => {
      this.setState({ recaptchaValue: value });
    };

    onSubmitSignIn = () => {
      const { email, name, password } = this.state;
  if (!email || !name || !password) {
    alert('All fields must be filled out.');
    return;
  } else if (name.length < 3) {
    alert('Name must be at least 3 characters long.');
    return;
  } else if (name.length > 20 || name.includes(' ') || name.includes('.') || name.includes(',') || name.includes('!') || name.includes('?') || name.includes('*') || name.includes('+') || name.includes('-') || name.includes('/') || name.includes('\\') || name.includes('|') || name.includes('(') || name.includes(')') || name.includes('{') || name.includes('}') || name.includes('[') || name.includes(']') || name.includes('<') || name.includes('>') || name.includes('=') || name.includes('~') || name.includes('`') || name.includes(';') || name.includes(':') || name.includes('\'') || name.includes('"')) {
    alert('Name must not contain any special characters or spaces.');
    return;
  } else if (name.includes('0') || name.includes('1') || name.includes('2') || name.includes('3') || name.includes('4') || name.includes('5') || name.includes('6') || name.includes('7') || name.includes('8') || name.includes('9')) {
    alert('Name must not contain any numbers.');
    return;
  } else if (email.length < 3) {
    alert('Email must be at least 3 characters long.');
    return;
  } else if (email.length > 254) {
    alert('Email must not exceed 254 characters.');
    return;
  } else if (email.includes(' ')) {
    alert('Email must not contain any spaces.');
    return;
  } else if (email.includes('..')) {
    alert('Email must not contain consecutive periods.');
    return;
  } else if (email.includes('@.')) {
    alert('Email must not contain a period immediately after an @ symbol.');
    return;
  } else if (email.includes('.@')) {
    alert('Email must not contain an @ symbol immediately after a period.');
    return;
  } 
   else if (!email.includes('@')) {
    alert('Email must contain an @ symbol.');
    return;
  } else if (password.length < 3) {
    alert('Password must be at least 3 characters long.');
    return;
  } else if (password.length > 100) {
    alert('Password must not exceed 100 characters.');
    return;
  }


      fetch('https://smart-brain-api-k158.onrender.com/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          password: password,
          name: name
        })
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('User with this email already exists');
        }
      })
      .then(user => {
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      })
      .catch(error => {
        alert(error.message);
      });
    }

    render() {
      const { recaptchaValue } = this.state;
   
    return (

        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
              onChange={this.onNameChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
              onChange={this.onEmailChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
              onChange={this.onPasswordChange}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
              />
            </div>
          </fieldset>
          <ReCAPTCHA
                        sitekey="6LfCYUkpAAAAAMA8rMl2HWqkGKLPGsn1A37EcdpW" // Replace with your reCAPTCHA site key
                        onChange={this.onRecaptchaChange}
                    />
                    {recaptchaValue && (
                        <div className="mt3">
                            <input
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                            />
                        </div>
                    )}
                </div>
            </main>
      </article>
    );
  };
}
  
  export default Register;
  