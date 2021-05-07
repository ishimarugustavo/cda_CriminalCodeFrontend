import React, { Component } from "react";
import { DashboardLayout } from './Layout';
import FormCriminalCode from './FormCriminalCode';
import ListCriminalCode from './ListCriminalCode';

class CriminalCode extends Component {
    constructor(props) {
        super(props);
        this.showForms = this.showForms.bind(this);

        this.state = {
            editForms: false,
            idEditForm: null,
            showForms: false,
        };
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

    render() {
        const { showForms } = this.state;
        return (
            <DashboardLayout>
                <div className="col-md-6 offset-md-3 col-xs-12">
                    <h1 className="text-xs-center">Código Penal</h1>
                </div>
                <button onClick={this.showForms} className="btn btn-primary">Novo Código Penal</button>
                {showForms ? <FormCriminalCode 
                                    editForm={this.state.editForms} 
                                    idEditForm={this.state.idEditForm}
                            /> 
                : null }
                <br /><br />
                <ListCriminalCode />
            </DashboardLayout>
        );
    }
}

export default CriminalCode;