import React, { Component } from 'react';
import { Input, Button, Snackbar  } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/Delete';
import Repos from './Repos'

export default class Search extends Component {

    constructor(props){
        super(props);

        this.state = {
            langCode: [],
            total: [],
            search: "",
            erro: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.buscaCodes()
    }

    buscaCodes(){
        this.callApi('/languages/codes', false)
        .then(res => {
            this.setState({ langCode: res.data })
        })
        .catch(err => console.log(err));
    }
    
      callApi = async (endpoint, post) => {
        var response = '';

        if(post)
        response = await fetch(endpoint, {method: 'post'});
        else
        response = await fetch(endpoint);

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
      }

      callApiDelete = async (endpoint, post) => {
        var response = '';

        response = await fetch(endpoint, {method: 'delete'});

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
      }
      
      handleChange(event) {
        this.setState({search: event.target.value});
      }

      handleSubmit(event) {
        event.preventDefault();
        this.setState({erro: false})

        this.callApi(`/languages/repos?search=${this.state.search}`, false)
        .then(res => {
            if(res.total_count){                
                this.salvaBusca()              
            }
            else{
                this.setState({erro: true})
            }
        })
        .catch(err => console.log(err));
      }

      salvaBusca(){
        this.callApi(`/languages/?code=${this.state.search}`, true)
        .then(res => {
            this.buscaCodes()
        })
        .catch(err => console.log(err));
      }

      removerCode(id){
        this.callApiDelete(`/languages/${id}`, true)
        .then(res => {
            this.buscaCodes()
        })
        .catch(err => console.log(err));
      }

    render() {
        const { langCode } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Input 
                        className="input-search" 
                        fullWidth={true} 
                        value={this.state.search} 
                        onChange={this.handleChange} 
                        placeholder="Buscar por Linguagem" />

                    {this.state.erro ? <div className="msg-erro">Nenhum repositório encontrado!</div> : '' }
                    
                    <Button 
                        type="submit" 
                        fullWidth={true} 
                        variant="contained" 
                        color="primary">Buscar</Button>
                </form>
                <div>
                    {langCode.map((lang) => {
                        return (
                            <div>
                                <h1>{lang.code}</h1>
                                <IconButton onClick={() => this.removerCode(lang._id)} color="secondary" className="remove-code" color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera color="secondary" />
                                </IconButton>   
                                <Repos code={lang.code}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}