import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
       <Router>
      <div>
        <h1>My Task App</h1>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegistrationForm} />
          <Route path="/" component={TaskList} />
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
