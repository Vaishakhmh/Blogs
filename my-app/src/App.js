import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
//import CreateTheme from '@material-ui/core/styles/createMuiTheme'
import {Container} from './App.module.css';
import Navbar from './Components/Navbar'
import {Switch,BrowserRouter,Route} from 'react-router-dom'
import Start from './Components/Start'
import Login from './Containers/Login'
import Home from './Containers/Home'
import Signup from './Containers/Signup'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import newBlog from './Containers/newBlog'
const theme=createMuiTheme({
  
  palette: {
    primary: {
      light:'#616161',
      main: '#212121',
      dark: '#212121',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#a4a4a4',
      main: '#757575',
      dark: '#494949',
      contrastText: '#e8ffff',
    },
  },
}
)


function App() {
  return (
    <MuiThemeProvider theme={theme}>
    <div>
      <BrowserRouter>
      <Route exact path="/" component={Start}/>
      <Navbar/>
      <div className={Container}>
    <Switch>
          <Route exact path="/Home" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/newblog" component={newBlog}/>
    </Switch>
      </div>
    </BrowserRouter>
    </div>
    </MuiThemeProvider>
  );
}

export default App;