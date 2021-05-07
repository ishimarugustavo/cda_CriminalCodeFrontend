import React, { Component } from "react";
import { 
    createCriminalCode,
    updateCriminalCode,
    getCriminalCode,
} from "../actions/criminalCodes";
import { 
    getAllStatus,
} from "../actions/status";
import Select from 'react-select'
import { sucess, error } from "./Notification";
import { connect } from "react-redux";

function parseStatusList(statusList) {
    return statusList.map((status) => {
        return { label: status.name, value: status.id };
    });
}

class FormCriminalCode extends Component {
    constructor(props) {
        super(props);
        this.handleChange =  this.handleChange.bind(this);
        this.newCriminalCode = this.newCriminalCode.bind(this);
        this.saveCriminalCode = this.saveCriminalCode.bind(this);
        this.retrieveStatus = this.retrieveStatus.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.editCriminalCode = this.editCriminalCode.bind(this);

        this.state = {
            id: 0,
            name: "",
            description: "",
            penalty: "",
            prisonTime: "",
            statusId: 0,
            createDate: "",
            updateDate: "",
            createUserId: "",
            updateUserId: "",
            selectedStatus: {},

            statusList: [],

            editForm: false,
        };
    }

    saveCriminalCode() {
        const { 
            id, 
            name,
            description,
            penalty,
            prisonTime,
            selectedStatus,
        } = this.state;

        if (id === 0) {
            var status = { id: selectedStatus.value, name: selectedStatus.label };
            var userId = window.localStorage.getItem("userId");
            this.props
                .createCriminalCode({ 
                    id, 
                    name,
                    description,
                    penalty,
                    prisonTime,
                    status,
                    createUserId: userId, 
                })
                .then((data) => {
                    sucess("Código penal criado com sucesso.");
                    console.log(data);
                    this.newCriminalCode();
                })
                .catch((e) => {
                    error("Ocorreu algum erro.");
                    console.log(e);
                    this.newCriminalCode();
                });
        } else {
            this.props
                .updateCriminalCode({ 
                    id, 
                    name,
                    description,
                    penalty,
                    prisonTime,
                    status,
                    updateUserId: userId,
                })
                .then((data) => {
                    sucess("Código Penal atualizado com sucesso.");
                    console.log(data);
                    this.newCriminalCode();
                })
                .catch((e) => {
                    error("Ocorreu algum erro.");
                    console.log(e);
                    this.newCriminalCode();
                });
        }
    }

    editCriminalCode(id) {
        this.props
            .getCriminalCode(id)
            .then((data) => {
                console.log(data);
                this.setState({
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    penalty: data.penalty,
                    prisonTime: data.prisonTime,
                    statusId: data.statusId,
                    createDate: data.createDate,
                    updateDate: data.updateDate,
                    createUserId: data.createUserId,
                    updateUserId: data.updateUserId
                })
            })
            .catch((e) => {
                console.log(e);
                error("Ocorreu algum erro.");
                this.newCriminalCode();
            });
    }

    newCriminalCode() {
        this.setState({
            id: 0,
            name: "",
            description: "",
            penalty: "",
            prisonTime: "",
            statusId: 0,
            createDate: "",
            updateDate: "",
            createUserId: "",
            updateUserId: "",
            selectedStatus: {},
        });
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleChangeSelect = e => {
        this.setState({
            selectedStatus: e,
        });
    }

    retrieveStatus() {
        this.props
            .getAllStatus()
            .then((response) => {
                this.setState({
                    statusList: parseStatusList(response)
                });
            })
            .catch((e) => {
                error("Ocorreu algum erro.");
                this.setState({
                    statusList: [],
                });
            });
    }

    componentDidMount() {
        this.retrieveStatus();
    }

    render() {
        const { statusList } = this.state;
        const { editForm, idEditForm } = this.props;
        if (editForm) {
            if (idEditForm !== null) {
                this.editCriminalCode(idEditForm);
            }
        } 
        return(
            <div className="formCriminalCode">
                <div>
                    <br/>
                    <div className="form-group">
                        <label htmlFor="name">Nome do Código Penal</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={this.state.name}
                            onChange={this.handleChange}
                            name="name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descrição</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={this.state.description}
                            onChange={this.handleChange}
                            name="description"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="penalty">Pena</label>
                        <input
                            type="number"
                            className="form-control"
                            id="penalty"
                            required
                            value={this.state.penalty}
                            onChange={this.handleChange}
                            name="penalty"
                            step="0.1"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="prisonTime">Tempo de Prisão</label>
                        <input
                            type="number"
                            className="form-control"
                            id="prisonTime"
                            required
                            value={this.state.prisonTime}
                            onChange={this.handleChange}
                            name="prisonTime"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <Select 
                            options={statusList}
                            value={this.state.selectedStatus}
                            name="status"
                            required
                            onChange={this.handleChangeSelect}
                            id="status"
                        />
                    </div>
                    {editForm ? 
                        <button onClick={this.saveCriminalCode} className="btn btn-success pull-xs-right">
                            Atualizar Código Penal
                        </button>
                        :
                        <button onClick={this.saveCriminalCode} className="btn btn-success pull-xs-right">
                            Adicionar Código Penal
                        </button>
                    }
                </div>
            </div>
        );
    }
}

export default connect(null, { 
    getAllStatus, 
    createCriminalCode,
    updateCriminalCode,
    getCriminalCode
})(FormCriminalCode);