import React from 'react'
import App from './App'
import Update from './components/Update'
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import 'rsuite/dist/styles/rsuite-default.css';

function Root() {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path='/' component={App}/>
                    <Route exact path="/update/:postId" render={(props) => 
                        <Update {...props} />}
                    />
                </Switch>
            </Router>
        </>
    )
}

export default Root
