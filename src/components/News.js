import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
    static defaultProps={
        country:'in',
        pagesize:'10',
        category:'general'
    }
    constructor(props){
        super(props);     
        this.state={
                articles:[],
                loading:true,
                page : 1,
                totalResults:0
        }
        document.title= this.props.category + " : NewsMonkey";
    }
    async updateNews(){

    this.props.setProgress(0); 
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.API}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    this.props.setProgress(30)
    let parseData=await data.json();
    this.props.setProgress(70)
    this.setState({
                articles: parseData.articles,
                totalResults: parseData.totalResults,
                loading:false,
                
            });
    this.props.setProgress(100);
        console.log(parseData.totalResults)

          
   }
    async componentDidMount() {
        this.updateNews();
    }
    handleNextClick=async ()=>{
        this.setState({page: this.state.page +1});
        this.updateNews();
    }
    handlePrevClick=async()=>{
        this.setState({page: this.state.page -1});
        this.updateNews();
    }
    fetchMoreData = async () => {
        this.setState({page:this.state.page+1})
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.API}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
        let data=await fetch(url);
        let parseData=await data.json();
        this.setState({
                    articles:this.state.articles.concat(parseData.articles),
                    totalResults: parseData.totalResults,
                });
      };

    render() {
        
        return (
            <>
            <h1 className='text-center' style={{margin : '40px'}}>News Monkey : {this.props.category} Top headlines</h1>
            {this.state.loading && <Spinner/>}
            <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner/>}
            >
            <div className="container">
                    <div className="row">
                    {
                    this.state.articles.map((element)=>{
                            return  <div className="col-md-4" key={element.url}>
                                <NewsItem  
                                titile={element.title ?element.title.length >45?element.title.slice(0,45)+'...':element.title.slice(0,45):""} 
                                description={element.description ? element.description.length >88 ? element.description.slice(0,88)+'...' : element.description.slice(0,88):""}
                                imageURl={element.urlToImage} newsURL={element.url} publishedAt={element.publishedAt} author={element.author} source={element.source.name}/>
                                </div>
                        })}
                    </div>
            </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                
                <button disabled={this.state.page<=1} className="btn btn-dark my-2 mx-2" onClick={this.handlePrevClick}>&larr; Previous</button>
                <button disabled={(this.state.page+1 > Math.ceil( this.state.totalResults/this.props.pagesize))}  className="btn btn-dark my-2 mx-2" onClick={this.handleNextClick}>Next &rarr;</button>
            </div> */}
            </>
        )
    }
}
