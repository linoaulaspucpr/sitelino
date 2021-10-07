import React, { Component } from 'react';
import firebase from './Firebase';

class App extends Component{

    constructor(props){
      super(props);
      this.state = {
        usuario: "",
        senha: "",
        mensagem: "",
        nome: "",
        dataNascimento: "",
        cpf: ""
      }

      this.cadastrar = this.cadastrar.bind(this);
      this.deslogar = this.deslogar.bind(this);
      this.logar = this.logar.bind(this);
    }

    async cadastrar(){

      await firebase.auth().createUserWithEmailAndPassword(this.state.usuario, this.state.senha)
      .then( async (value) => {

          console.log(value);

          await firebase.firestore().collection("usuario").doc(value.user.uid)
          .set({
              nome: this.state.nome,
              cpf: this.state.cpf,
              dataNascimento: this.state.dataNascimento
          });

      })
      .catch((error)=>{
        console.log("Erro: " + error);
      });

    }

    async deslogar(){
      await firebase.auth().signOut();
    }

    async logar(){
      await firebase.auth().signInWithEmailAndPassword(this.state.usuario, this.state.senha)
      .then((value)=>{

        firebase.firestore().collection("usuario").doc(value.user.uid)
        .get()
        .then((snapshot)=>{

            let state = this.state;
            state.nome = snapshot.data().nome;
            state.cpf = snapshot.data().cpf;
            state.dataNascimento = snapshot.data().dataNascimento;

            this.setState(state);


        })

      })
    }

    componentDidMount(){
      firebase.auth().onAuthStateChanged((user)=>{
        if(user){
          console.log(user.uid);
          this.setState({mensagem: "logado"});
        }
      });
    }



    render(){
      return(
        <div>

            <h1> Tela de Login : {this.state.mensagem} </h1>

            <input type="text" placeholder="Usuário" onChange={(e)=> this.setState({usuario: e.target.value})}  /> <br/>
            <input type="password" placeholder="Senha" onChange={(e)=> this.setState({senha: e.target.value})}  /> <br/>
            <input type="text" placeholder="Nome" onChange={(e)=> this.setState({nome: e.target.value})}  /> <br/>
            <input type="text" placeholder="CPF" onChange={(e)=> this.setState({cpf: e.target.value})}  /> <br/>
            <input type="date" placeholder="Data de Nascimento" onChange={(e)=> this.setState({dataNascimento: e.target.value})}  /> <br/>

            <button onClick={this.cadastrar}> Cadastrar </button> <br/>
            <button onClick={this.deslogar}> Deslogar </button> <br/>
            <button onClick={this.logar}> Logar </button> <br/>


            <h5>{this.state.nome}</h5>
            <h5>{this.state.cpf}</h5>
            <h5>{this.state.dataNascimento}</h5>


        </div>
      )
    }
}

export default App;
