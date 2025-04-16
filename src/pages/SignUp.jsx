import React from 'react'
import { Link } from 'react-router-dom'


const SignUp = () => {
  return (
    <div id="card-page">
      <section id="signup-page" className="card-body">
        <header>
          <h1>
            Create Account
          </h1>
        </header>

        <div className="content">
          <form>
            <div>
              <label className="h6">First Name</label>
              <input type="text" id="firstName" placeholder="Enter your first name" />
            </div>

            <div>
              <label className="h6">Last Name</label>
              <input type="text" id="lastName" placeholder="Enter your last name" />
            </div>

            <div>
              <label className="h6">Email</label>
              <input type="email" id="email" placeholder="Enter your email address" />
            </div>

            <div>
              <label className="h6">Password</label>
              <input type="password" id="password" placeholder="Enter your password" />
            </div>

            <div>
              <label className="h6">Confirm Password</label>
              <input type="text" id="confirmPassword" placeholder="Confirm your password" />
            </div>

            <div className="checkbox-group">
              <input id="TermsAndCondition" type="checkbox" />
              <label htmlFor="TermsAndCondition">I accept Terms and Conditions</label>
            </div>

            <div>
              <button className="btn btn-submit ">Create Account</button>
            </div>

            <span>Already have an account? <Link to="/auth/signin">Login</Link></span>
          </form>
        </div>

      </section>
      <div className="logotype card-footer">
        <img src="/src/assets/images/alpha-logotype.svg" alt="Alpha Logo" />
        <span>alpha</span>
      </div>
    </div>
  )
}

export default SignUp