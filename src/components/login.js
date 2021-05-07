import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { loginUser } from "../actions/users";
import { DashboardLayout } from './Layout';
import { sucess, error } from "./Notification";

class Login extends Component {
    constructor(props) {
        super(props);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.login = this.login.bind(this);
    
        this.state = {
            id: 0,
            userName: "",
            password: "",
            token: "",
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

    login() {
        const { id, userName, password } = this.state;
        this.props
            .loginUser({ id, userName, password })
            .then((data) => {
                this.setState({
                    id: data.id,
                    userName: data.userName,
                    password: data.password,
                    token: data.token,
                });
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', data.user.result.userName);
                localStorage.setItem('userId', data.user.result.id);
                console.log(data);
                sucess("Usuário logado com sucesso");
                this.newLogin();
            })
            .catch((e) => {
                console.log(e);
                error("Ocorreu algum erro.");
                this.newLogin();
            });
    }

    newLogin() {
        this.setState({
            id: 0,
            userName: "",
            password: "",
            token: "",
        });
    }

    render() {
        return (
            <DashboardLayout>
            <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Acesso</h1>
            <p className="text-xs-center">
                <Link to="/register">
                    Não possui cadastro?
                </Link>
            </p>
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

                <button onClick={this.login} className="btn btn-success pull-xs-right">
                Login
                </button>
            </div>
        </div>
        </DashboardLayout>
        );
    }
}

export default connect(null, { loginUser })(Login);