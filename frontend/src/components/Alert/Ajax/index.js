import React, { Component } from "react";
import Swal from "sweetalert2";

export default class AlertAjax extends Component {
  constructor() {
    super();
    this.HandleClick = this.HandleClick.bind(this);
  }

  HandleClick() {
    Swal.fire({
      ...this.props,
      preConfirm: login => {
        return fetch(`//api.github.com/users/${login}`, { crossdomain: true })
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch(error => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
      if (result.value) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          text: `Name: ${result.value.name}`,
          imageUrl: result.value.avatar_url
        });
      }
    });
  }

  render() {
    return (
      <div>
        <button class="btn btn-info" onClick={this.HandleClick}>
          Show Ajax Alert
        </button>
      </div>
    );
  }
}
