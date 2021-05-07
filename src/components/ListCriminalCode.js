import { Component, Fragment } from "react";
import { connect } from "react-redux";
import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { sucess, error } from "./Notification";
import { 
    getAllCriminalCode,
    deleteCriminalCode,
} from "../actions/criminalCodes";

class ListCriminalCode extends Component {
    constructor(props) {
        super(props);
        this.editCriminalCode = this.editCriminalCode.bind(this);
        this.delCriminalCode = this.delCriminalCode.bind(this);
        this.criminalCodesList = this.criminalCodesList.bind(this);

        this.state = {
            criminalCodeList: [],
        };

        this.columns = [
            {
                name: "Nome",
                selector: "name",
                sortable: true
            },
            {
                name: "Data",
                selector: "createDate",
                sortable: true
            },
            {
                name: "Multa",
                selector: "penalty",
                sortable: true
            },
            {
                name: "Status",
                selector: "status.name",
                sortable: true
            },
            {
                name: "Info",
                selector: "id",
                right: true,
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => this.viewCriminalCode(record)}>
                                    <VisibilityIcon fontSize="small" />
                            </button>
                        </Fragment>
                    );
                },
                button: true
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
                                onClick={() => this.editCriminalCode(record)}>
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
                                onClick={() => this.delCriminalCode(record)}>
                                    <DeleteIcon fontSize="small" />
                            </button>
                        </Fragment>
                    );
                },
                button: true
            }
        ];
    }
    
    criminalCodesList() {
        this.props
            .getAllCriminalCode()
            .then((response) => {
                this.setState({
                    criminalCodeList: response
                });
            })
            .catch((e) => {
                error("Ocorreu algum erro.");
                this.setState({
                    criminalCodeList: [],
                });
            });
    }

    delCriminalCode(record) {
        this.props
            .deleteCriminalCode(record.id)
            .then((response) => {
                sucess("Status excluído com sucesso.");
                this.criminalCodesList();
            })
            .catch((e) => {
                error("Ocorreu algum erro.");
            });
    }

    editCriminalCode(record) {

    }

    componentDidMount() {
        this.criminalCodesList();
    }

    render() {
        const { criminalCodeList } = this.state;

        return (
            <div className="criminalCodeList">
                <Card>
                    <DataTable
                        title="Lista de Código Penal"
                        columns={this.columns}
                        data={criminalCodeList}
                        defaultSortAsc={1}
                        sortIcon={<SortIcon />}
                        pagination
                    />
                </Card>
            </div>
        );
    }
}

export default connect(null, { 
    getAllCriminalCode, 
    deleteCriminalCode, 
})(ListCriminalCode);