import { Component } from "react";
import { DashboardLayout } from "./Layout";
import { 
    createStatus,
    updateStatus,
    deleteStatus,
    getStatus,
    getAllStatus
} from "../actions/status";
import { sucess, error } from "./Notification";
import { connect } from "react-redux";
import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Fragment } from "react";

class Status extends Component {
    constructor(props) {
        super(props);
        this.onChangeName =  this.onChangeName.bind(this);
        this.newStatus = this.newStatus.bind(this);
        this.saveStatus = this.saveStatus.bind(this);
        this.showForms = this.showForms.bind(this);
        this.editStatus = this.editStatus.bind(this);
        this.statusList = this.statusList.bind(this);
        this.delStatus = this.delStatus.bind(this);

        this.state = {
            id: 0,
            name: "",
            
            statusList: [],

            showForms: false,
            editForm: false,
        };

        

        this.columns = [
            {
                name: "Status",
                selector: "name",
                sortable: true
            },
            {
                name: "Editar",
                selector: "id",
                right: true,
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editStatus(record)}>
                                    <EditIcon fontSize="small" />
                            </button>
                        </Fragment>
                    );
                },
                button: true
            }, 
            {
                name: "Deletar",
                selector: "id",
                right: true,
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => this.delStatus(record)}>
                                    <DeleteIcon fontSize="small" />
                            </button>
                        </Fragment>
                    );
                },
                button: true
            }
        ];
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    newStatus() {
        this.setState({
            id: 0,
            name: "",

            editForm: false,
        });
    }

    saveStatus() {
        const { id, name } = this.state;

        if (id === 0) {
            this.props
                .createStatus({ id: id, name: name })
                .then((data) => {
                    sucess("Status criado com sucesso.");
                    console.log(data);
                    this.newStatus();
                    this.statusList();
                })
                .catch((e) => {
                    error("Ocorreu algum erro.");
                    console.log(e);
                    this.newStatus();
                });
        } else {
            this.props
                .updateStatus({ id, name })
                .then((data) => {
                    sucess("Status atualizado com sucesso.");
                    console.log(data);
                    this.newStatus();
                    this.statusList();
                })
                .catch((e) => {
                    error("Ocorreu algum erro.");
                    console.log(e);
                    this.newStatus();
                });
        }
    }

    showForms() {
        const { showForms } = this.state;

        if (showForms) {
            this.setState({
                showForms: false
            });
        } else {
            this.setState({
                showForms: true
            });
        }
    }

    editStatus(record) {
        this.setState({
            id: record.id,
            name: record.name,
            showForms: true,
            editForm: true,
        });
    }

    delStatus(record) {
        this.props
            .deleteStatus(record.id)
            .then((response) => {
                sucess("Status excluído com sucesso.");
                this.statusList();
            })
            .catch((e) => {
                error("Ocorreu algum erro.");
            });
    }

    statusList() {
        this.props
            .getAllStatus()
            .then((response) => {
                this.setState({
                    statusList: response
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
        this.statusList();
    }

    render() {
        const { showForms, statusList, editForm } = this.state;

        return (
            <DashboardLayout>
            <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Status</h1>
            </div>
            <div>
                <button onClick={this.showForms} className="btn btn-primary">Novo Status</button>
                { showForms ? 
                    <div>
                        <br/>
                        <div className="form-group">
                        <label htmlFor="name">Status</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={this.state.name}
                            onChange={this.onChangeName}
                            name="name"
                        />
                        </div>

                        
                            {editForm ? 
                            <button onClick={this.saveStatus} className="btn btn-success pull-xs-right">
                                Atualizar Status
                            </button>
                            :
                            <button onClick={this.saveStatus} className="btn btn-success pull-xs-right">
                                Adicionar Status
                            </button>
                            }
                        
                    </div>
                 : null }
            </div>
            <br /><br />
            <div className="statusList">
                <Card>
                    <DataTable
                        title="Lista de Status"
                        columns={this.columns}
                        data={statusList}
                        defaultSortAsc={1}
                        sortIcon={<SortIcon />}
                        pagination
                    />
                </Card>
            </div>
            </DashboardLayout>
        );
    }
}

export default connect(null, { 
    createStatus, 
    updateStatus, 
    getAllStatus, 
    getStatus, 
    deleteStatus 
})(Status);