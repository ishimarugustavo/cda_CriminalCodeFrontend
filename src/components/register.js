import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { createUser } from "../actions/users";
import { DashboardLayout } from './Layout';

class Register extends Component {
    constructor(props) {
        super(props);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.create = this.create.bind(this);

        this.state = {
            id: 0,
            userName: "",
            password: "",
            
            submitted: false,
        };
    }

    onChangeUserName(e) {
        this.setState({
            userName: e.target.value,
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    create() {
        const { id, userName, password } = this.state;

        this.props
          .createUser({ id, userName, password })
          .then((data) => {
              this.setState({
                  id: data.id,
                  userName: data.userName,
                  password: data.password,

                  submitted: true,
              });
              console.log(data);
          })
          .catch((e) => {
              console.log(e);
          });
    }

    newUser() {
        this.setState({
            id: 0,
            userName: "",
            password: "",
      
            submitted: false,
        });
    }

    render() {
        return (
        <DashboardLayout>
        <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Cadastrar-se</h1>
            <p className="text-xs-center">
                <Link to="/login">
                    Possui uma conta?
                </Link>
            </p>
            {this.state.submitted ? ( 
            <div>
                <h4>Usuário criado com sucesso!</h4>
                <button className="btn btn-success" onClick={this.newUser}>
                Ok
                </button>
            </div>
            ) : ( 
            <div>
                <div className="form-group">
                <label htmlFor="userName">Usuário</label>
                <input
                    type="text"
                    className="form-control"
                    id="userName"
                    required
                    value={this.state.userName}
                    onChange={this.onChangeUserName}
                    name="userName"
                />
                </div>

                <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    required
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    name="password"
                />
                </div>

                <button onClick={this.create} className="btn btn-success pull-xs-right">
                Criar Usuário
                </button>
            </div>
            )}
        </div>
        </DashboardLayout>
        );
    }
}

export default connect(null, { createUser })(Register);