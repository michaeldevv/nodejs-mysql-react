import React, { Component } from 'react';

import Home from "./home";


class App extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      ruc: '',
      phone: '',
      email: '',
      id: '',
      users: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    console.log(name + value)
    this.setState({
      [name]: value
    });
  }

  addUser(e) {
    e.preventDefault();
    if(this.state.id) {
      fetch(`/api/users/${this.state.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: this.state.name,
          ruc: this.state.ruc,
          phone: this.state.phone,
          email: this.state.email

        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          M.toast({html: 'User Updated'});
          this.setState({id: '', name: '', ruc: '', phone: '', email: ''});
          this.fetchUsers();
        });
    } else {
      fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({html: 'User Saved'});
          this.setState({name: '', ruc: '', phone: '', email: ''});
          this.fetchUsers();
        })
        .catch(err => console.error(err));
    }
  }

  deleteUser(id) {
    if(confirm('Seguro que quiere borrar?')) {
      fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({html: 'User deleted'});
          this.fetchUsers();
        });
    }
  }


  editUser(id) {
    //Fetch default method is GET request
    fetch(`/api/users/${id}`)
      .then(res => res.json())
      .then(data => {

        //console.log(data[0]);
        this.setState({
          id: data[0].id,
          name: data[0].name,
          ruc: data[0].ruc,
          phone: data[0].phone,
          email: data[0].email
        });
      });
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        this.setState({ users: data });
        console.log(this.state.users);
      });
  }

  render() {
    /*return (<Redirect
        to="/home"
    />)*/
    return (
      <div>
        {/* NAVIGATION */}
        <nav>
          <div class="nav-wrapper">
            <a href="/" class="brand-logo center">CRUD USER REGISTER</a>
            <ul id="nav-mobile" class="left hide-on-med-and-down">
              <li><a href="/">HOME</a></li>
              <li><a href="/">USERS</a></li>
              <li><a href="/tasks">TASKS</a></li>
            </ul>
          </div>
        </nav>

        {/* <nav className="light-blue darken-4">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">CRUD USER REGISTER</a>
            </div>
          </div>
        </nav> */}

        <div>
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addUser}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="name" onChange={this.handleChange} value={this.state.name} type="text" placeholder="Nombre" autoFocus />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="ruc" onChange={this.handleChange} value={this.state.ruc} cols="30" rows="10" placeholder="RUC" className="materialize-textarea"></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="phone" onChange={this.handleChange} value={this.state.phone} cols="30" rows="10" placeholder="Telefono" className="materialize-textarea"></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="email" onChange={this.handleChange} value={this.state.email} cols="30" rows="10" type="email" placeholder="Email" className="materialize-textarea"></textarea>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-success">
                      Guardar
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>RUC</th>
                    <th>Telefono</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.users.map(user => {
                      return (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.ruc}</td>
                          <td>{user.phone}</td>
                          <td>{user.email}</td>
                          <td>
                            <button onClick={() => this.deleteUser(user.id)} className="btn btn-primary">
                              <i className="material-icons">delete</i>
                            </button>
                            <button onClick={() => this.editUser(user.id)} className="btn btn-danger" style={{ margin: '4px' }}>
                              <i className="material-icons">edit</i>
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
