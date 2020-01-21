import React, { Component } from "react";
import Swal from "sweetalert2";
import DeleteIcon from '@material-ui/icons/Delete';

export default class AlertDelete extends Component {

    constructor() {
        super();
        this.HandleClick = this.HandleClick.bind(this);
    }

    HandleClick() {
        Swal.fire({
            ...this.props,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Excluir!',
            onOpen: () => {
                // code
            }
        }).then((result) => {
            if (result.value) {
              console.log(result.value);
              console.log(this.props.onClick());
              Swal.fire(
                  'Excluído!',
                  'Registro excluído.',
                  'success'
              )
            }
        });
    }

    render() {
        return (
            <div>
                <DeleteIcon className="icon" onClick={this.HandleClick}>Deletar</DeleteIcon>
            </div>
        );
    }
}
