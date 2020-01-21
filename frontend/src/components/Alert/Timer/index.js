import React, { Component } from "react";
import Swal from "sweetalert2";

export default class Timer extends Component {

    constructor() {
        super();
        this.HandleClick = this.HandleClick.bind(this);
    }

    HandleClick() {
        Swal.fire({
            ...this.props,
            onBeforeOpen: () => {
                Swal.showLoading()
            }
        });
    }

    render() {
        return (
            <div>
                <button class="btn btn-primary" onClick={this.HandleClick}>
                    Show Timer Alert
                </button>
            </div>
        );
    }
}
