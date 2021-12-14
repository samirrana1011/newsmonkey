import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export default class News extends Component {
    // articles=[
    //     {"source":{"id":null,"name":"NDTV News"},"author":"NDTV Sports Desk","title":"Yuvraj Singh, Others In Splits As Indian Cricketer Shares \"Selfie\" With Ariana Grande - NDTV Sports","description":"Ex-PBKS all-rounder Harpreet Brar has gone viral once again, but this time for his off the field antics. Brar shared a unique selfie with American pop star Ariana Grande.","url":"https://sports.ndtv.com/cricket/yuvraj-singh-others-in-splits-as-indian-cricketer-shares-selfie-with-ariana-grande-2648558","urlToImage":"https://c.ndtvimg.com/2021-12/e7c2tj9g_harpreet-brar-twitter_650x300_13_December_21.jpg","publishedAt":"2021-12-13T08:19:00Z","content":"Harpreet Brar, who played for Punjab Kings (PBKS) during Indian Premier League (IPL) 2021, grabbed eyeballs after taking the wickets of Virat Kohli, AB de Villiers and Glenn Maxwell in a game against… [+2312 chars]"},{"source":{"id":null,"name":"Hindustan Times"},"author":"hindustantimes.com","title":"'How many more runs should he score to prove himself?': Vengsarkar names 24-year-old batter BCCI should pick for SA ODIs - Hindustan Times","description":"The 24-year-old Maharashtra captain has been in blistering form, scoring three consecutive tons in the ongoing Vijay Hazare Trophy. | Cricket","url":"https://www.hindustantimes.com/cricket/no-point-in-picking-him-when-he-ll-be-28-ex-india-selector-dilip-vengsarkar-backs-ruturaj-gaikwad-for-south-africa-series-101639377140065.html","urlToImage":"https://images.hindustantimes.com/img/2021/12/13/1600x900/assignment-name-in-brief_ffe18048-781e-11ea-b578-8bb50559d90e_1639377570393.jpg","publishedAt":"2021-12-13T06:42:50Z","content":"While the suspense has been lifted off India's Test squad for the tour of South Africa, the ODI unit still remains a mystery. With the three-match ODIs between India and South Africa starting January… [+2403 chars]"}
    // ];
    static defaultProps={
        country:'in',
        pagesize:'10',
        category:'technology',
        API: 'fed9d1efed2840909c391da37cfe3787'
    }
    constructor(props){
        super(props);     
        this.state={
                articles:[],
                loading:false,
                page : 1
        }
        document.title= this.props.category + " : NewsMonkey";
    }
    async updateNews(){
        
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.API}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parseData=await data.json();
    
    this.setState({
                articles: parseData.articles,
                totalResults: parseData.totalResults,
                loading:false
            });
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
    render() {
        return (
            <>
            
            <div className='container my-3'> 
            <h1 className='text-center' style={{margin : '40px'}}>News Monkey : {this.props.category} Top headlines</h1>
            {this.state.loading && <Spinner/>}
             <div className="row">
            {
              !this.state.loading &&  this.state.articles.map((element)=>{
                     return  <div className="col-md-4" key={element.url}>
                        <NewsItem  
                        titile={element.title ?element.title.length >45?element.title.slice(0,45)+'...':element.title.slice(0,45):""} 
                        description={element.description ? element.description.length >88 ? element.description.slice(0,88)+'...' : element.description.slice(0,88):""}
                         imageURl={element.urlToImage} newsURL={element.url} publishedAt={element.publishedAt} author={element.author} source={element.source.name}/>
                        </div>
                })}
            </div>
            <div className="container d-flex justify-content-between">
                
                <button disabled={this.state.page<=1} className="btn btn-dark my-2 mx-2" onClick={this.handlePrevClick}>&larr; Previous</button>
                <button disabled={(this.state.page+1 > Math.ceil( this.state.totalResults/this.props.pagesize))}  className="btn btn-dark my-2 mx-2" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
            </div>
            </>
        )
    }
}
