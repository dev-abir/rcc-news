import React, { Component } from 'react'
import Newsitem from './Newsitem'

export default class Newsarea extends Component {
    constructor() {
        super();
        this.state = {
            totalResults: 0,
            articles: [],
            page: 1,
            totalNumberOfPages: 0,
            pageSize: 12,
            displayAsList: true,
            loading: true
        }
    }

    updateNews = async () => {
        this.setState({ loading: true, articles: [] });
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=fb006d7d5f3841b28dc197c4bc9e3ceb&page=${this.state.page}&pageSize=${this.state.pageSize}`;
        const data = await fetch(url);
        const parsedData = await data.json();
        this.setState({ totalResults: parsedData.totalResults, articles: parsedData.articles, totalNumberOfPages: Math.ceil(parsedData.totalResults / this.state.pageSize), loading: false });
    }

    async componentDidMount() {
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=fb006d7d5f3841b28dc197c4bc9e3ceb&page=${this.state.page}&pageSize=${this.state.pageSize}`;
        const data = await fetch(url);
        const parsedData = await data.json();
        this.setState({ totalResults: parsedData.totalResults, articles: parsedData.articles, totalNumberOfPages: Math.ceil(parsedData.totalResults / this.state.pageSize), loading: false });
    }

    handleNextClick = () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    handlePrevClick = () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handlePageChange = (size) => {
        this.setState({ pageSize: size, page: 1 }, () => {
            this.updateNews();
        });
    }

    handleDisplayStyleChange = () => {
        if (this.state.displayAsList) {
            this.setState({displayAsList: false});
        }
        else {
            this.setState({ displayAsList: true });
        }
    }

    render() {
        return (
            <div className={`container my-3`}>
                <h2 className={`text-center text-${this.props.theme==='light'?'dark':'light'}`}>React Class Based Componenets News App - Top Headlines</h2>
                <div className="d-flex justify-content-between">
                    <div className="btn-group">
                        <button type="button" className={`btn btn-${this.props.theme === 'light' ? "dark" : "light"}`}>Posts Per Page: {this.state.pageSize}</button>
                        <button type="button" className={`btn btn-${this.props.theme === 'light' ? "dark" : "light"} dropdown-toggle dropdown-toggle-split`} data-bs-toggle="dropdown" aria-expanded="false">
                            <span className="visually-hidden">Posts Per Page</span>
                        </button>
                        <ul className={`dropdown-menu ${this.props.theme === 'light' ? "" : "dropdown-menu-dark"} dropdown-menu-end`}>
                            <li><button className="dropdown-item" onClick={this.changeSize = () => this.handlePageChange(12)}>12</button></li>
                            <li><button className="dropdown-item" onClick={this.changeSize = () => this.handlePageChange(24)}>24</button></li>
                            <li><button className="dropdown-item" onClick={this.changeSize = () => this.handlePageChange(36)}>36</button></li>
                        </ul>
                    </div>
                    <p className="text-muted">Showing page {`${this.state.page} of ${this.state.totalNumberOfPages}`}.</p>
                    <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button disabled={this.state.displayAsList} onClick={this.handleDisplayStyleChange} className={`btn btn-${this.props.theme==='light'?"dark":"light"} text-${this.props.theme}`}>List</button>
                            <button disabled={!this.state.displayAsList} onClick={this.handleDisplayStyleChange} className={`btn btn-${this.props.theme==='light'?"dark":"light"} text-${this.props.theme}`}>Card</button>
                        </div>
                    </div>
                </div>
                <div className={this.state.displayAsList?"":"row"}>
                    {this.state.loading ? <div className="d-flex justify-content-center">
                        <div className="spinner-border text-primary my-4" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> : ""}
                    {this.state.articles.map((element) => {
                        return <Newsitem title={element.title}
                            bgColor={this.props.theme==='light'?"#fff":"#181818"}
                            fgColor={this.props.theme==='light'?"black":"white"}
                            description={element.description}
                            key={element.url}
                            urlToImage={element.urlToImage}
                            url={element.url}
                            source={element.source}
                            date={element.publishedAt}
                            displayAsList={this.state.displayAsList} />
                    })}
                </div>
                <div className="d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrevClick} className={`btn btn-${this.props.theme === 'light' ? "dark" : "light"}`}>&laquo; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize)} type="button" onClick={this.handleNextClick} className={`btn btn-${this.props.theme === 'light' ? "dark" : "light"}`}>Next &raquo;</button>
                </div>
            </div>
            
        )
    }
}
