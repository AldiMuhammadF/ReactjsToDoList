import React, { Component } from "react";
import Header from "./header";
import "./App.css";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};
Modal.setAppElement("#root");
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      modalIsOpen: false,
      modal: [],
      yo: []
    };
    this.openModal = this.openModal.bind(this);
    this.afterModal = this.afterModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal(data, i) {
    this.setState({
      modalIsOpen: true,
      modal: data,
      yo: i
    });
  }
  afterModal() {
    this.refs.wektulur.value = this.state.modal.jam;
    this.refs.maktivitas.value = this.state.modal.aktivitas;
    this.refs.jeneng.value = this.state.modal.nama;
  }
  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }
  addList = e => {
    e.preventDefault(); //untuk mencegah data yang belum di proses
    let jam = this.refs.jam.value;
    let aktivitas = this.refs.aktivitas.value;
    let nama = this.refs.nama.value;
    this.state.list.push({
      jam,
      nama,
      aktivitas
    });
    this.setState({
      list: this.state.list
    });

    this.refs.formulir.reset();
    this.refs.jam.focus();
  };
  removeList = i => {
    this.state.list.splice(i, 1);
    this.setState({
      list: this.state.list
    });
  };
  editList = a => {
    a.preventDefault();
    let jam = this.refs.wektulur.value;
    let aktivitas = this.refs.maktivitas.value;
    let nama = this.refs.jeneng.value;
    this.state.list.splice(this.state.yo, 1, {
      jam,
      nama,
      aktivitas
    });
    this.setState({
      list: this.state.list,
      modal: []
    });
    this.closeModal();
    // this.refs.jam.value = data.jam;
    // this.refs.aktivitas.value = data.aktivitas;
  };
  render() {
    return (
      <div>
        <br />
        <div className="App">
          <Header />
        </div>
        <form ref="formulir" className="form-inline">
          <div className="form-group mx-sm-3 mb-2">
            <input
              type="time"
              className="form-control"
              ref="jam"
              placeholder="jam aktivitas"
            />
            <input
              type="text"
              className="form-control"
              ref="nama"
              placeholder="Name"
            />
            <input
              type="text"
              className="form-control"
              ref="aktivitas"
              placeholder="aktivitas"
            />
          </div>
          <div className="form-group mb-2">
            <button onClick={this.addList} className="btn btn-info">
              Simpan
            </button>
          </div>
        </form>
        <hr />
        <div>
          <ul className="list-group">
            {this.state.list.map((data, i) => (
              <li className="list-group" key={i}>
                <div>
                  {data.jam} : {data.nama} sedang {data.aktivitas}
                  <button
                    onClick={() => this.openModal(data, i)}
                    className="btn btn-outline-primary mx-sm-3 mb-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => this.removeList(i)}
                    className="btn btn-outline-danger mx-sm-3 mb-2"
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          shouldCloseOnOverlayClick={false}
          onRequestClose={this.CloseModal}
        >
          <h2> Edit Data </h2>
          <form ref="ok" className="form-inline">
            <input type="time" className="form-control" ref="wektulur" />
            <input
              type="text"
              className="form-control"
              ref="jeneng"
              placeholder="Name"
            />
            <input
              type="text"
              className="form-control"
              ref="maktivitas"
              placeholder="Jenis Aktivitas"
            />
          </form>
          <button
            onClick={this.editList}
            className="btn btn-outline-primary mx-sm-3 mb-2"
          >
            Simpan
          </button>
          <button
            onClick={this.closeModal}
            className="btn btn-outline-danger mx-sm-3 mb-2"
          >
            Batal
          </button>
        </Modal>
      </div>
    );
  }
}
