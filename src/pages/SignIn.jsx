import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

const SignIn = () => {
    const { } = useAuth()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //sign up - bygg ett formulär.




    const handleSubmit = async (e) => {
        e.preventDefault()
        const succeeded = await signIn(email, password)
        if (succeeded)
            console.log("inloggning lyckades")
        //omdirigera till inloggning
        else
            console.log("inloggning misslyckades")
    }

    return (
        <div id="card-page">
            <section id="signin-page" className="card-body">
                <header className="card-header">
                    <h1>
                        Login
                    </h1>
                </header>
                <div>

                    <div className="content">
                        <form onSubmit={"hej "}>
                            <div>
                                <label className="h6"> Email </label>
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="h6"> Password </label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn btn-submit">Log in</button>

                            <span>Don't have an account? <Link to="/auth/signup">Sign up</Link></span>
                        </form>
                    </div>
                </div>
            </section>
            <div className="logotype card-footer">
                <img src="/src/assets/images/alpha-logotype.svg" alt="Alpha Logo" />
                <span>alpha</span>
            </div>
        </div>
    )
}

export default SignIn