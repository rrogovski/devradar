import React, { Component } from "react";
import Swal from "sweetalert2";

export default class AlertError extends Component {

    constructor() {
        super();
        this.HandleClick = this.HandleClick.bind(this);
    }

    HandleClick() {
        Swal.fire({
            ...this.props
        });
    }

    render() {
        return (
            <div>
                <button class="btn btn-danger" onClick={this.HandleClick}>
                    Show Error Alert
                </button>
            </div>
        );
    }
}
