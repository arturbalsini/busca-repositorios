import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default class Repos extends Component {
    constructor(props){
        super(props)

        this.state = { 
            repos: {items: []},
            show: false
        };

        this.acessarRepo = this.acessarRepo.bind(this);
    }

    componentDidMount() {
        const { code } = this.props

        this.callApi(`/languages/repos?search=${code}`)
          .then(res => {
            console.log(res)
            this.setState({ repos: res, show: true })
          })
          .catch(err => console.log(err));
    }

    callApi = async (endpoint) => {
        const response = await fetch(endpoint);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    }

    acessarRepo(url) {
        window.location.href=url;
    }

    render() {
        const { repos } = this.state

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
            centerPadding: "60px",
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: false
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                  }
                }
              ]
          };

        return (
            <div>
                {repos.total_count > 0 
                    ? <h3>total: {repos.total_count}</h3> 
                    : <h3>carregando...</h3>}
                <div>
                    <Slider {...settings}>
                        {repos.items.map((repo) => {
                            return (
                                <div className="info-repo">                             
                                    <h5>{repo.full_name}</h5>
                                    <div>
                                        <Button 
                                            type="submit" 
                                            variant="contained" 
                                            color="primary"
                                            onClick={() => this.acessarRepo(repo.html_url)}>Acessar</Button> 
                                    </div>                            
                                </div>
                            )
                        })}
                        {(this.state.show)
                            ? <div className="info-repo">                             
                                <div className="info-more">
                                    <Button 
                                        fullWidth={true} 
                                        variant="contained" 
                                        color="primary"
                                        >Ver Mais...</Button> 
                                </div>                            
                            </div>
                            : ''
                        }

                    </Slider>
                </div>  
            </div>  
        )
    }
}