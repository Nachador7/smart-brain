import React from "react";
import "./Register.css";

class Register extends React.Component {
  
    constructor(props){
      super();
      this.state = {
        email: "",
        password: "",
        name: "",
        isLoading: false,
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


    onSubmitSignIn = () => {
      const { email, name, password } = this.state;
        if (!email || !name || !password) {
          alert('All fields must be filled out.');
          return;
        }

        this.setState({ isLoading: true });
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
          // this.setState({ isLoading: false });
        } else {
          this.setState({ isLoading: false });
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
   
    return (
      <div>
            {this.state.isLoading ? (
              <div className="loader-container">
              <div className="loader"></div>
              </div>
            ) : (

              
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
                required
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
                required
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
                required
              />
            </div>
          </fieldset>
                        <div className="mt3">
                            <input
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                            />
                        </div>
                </div>
            </main>
      </article>

    )}
    </div>
    )
  };
}
  
  export default Register;
  