import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const  News=(props)=> {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);    
    const [totalResults, setTotalResultsPage] = useState(0);
    // document.title= props.category + " : NewsMonkey";

   
    
   const updateNews =async()=>{

    props.setProgress(0); 
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.API}&page=${page}&pagesize=${props.pagesize}`;
    setLoading(true);
    let data=await fetch(url);
    props.setProgress(30)
    let parseData=await data.json();
    props.setProgress(70)
    setArticles(parseData.articles);
    setLoading(false);
    setTotalResultsPage(parseData.totalResults);
    props.setProgress(100);
   }

   useEffect(() => {
       updateNews();
       // eslint-disable-next-line
   }, [])


    // const  componentDidMount = async()=> {
    //     updateNews();
    // }
    // const handleNextClick= async ()=>{
    //     setPage(page +1);
    //     this.updateNews();
    // }
    // const  handlePrevClick=async()=>{
    //     setPage(page - 1);

    //     updateNews();
    // }
    const fetchMoreData = async () => {
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.API}&page=${page+1}&pagesize=${props.pagesize}`;
        setPage(page + 1);
        let data=await fetch(url);
        let parseData=await data.json();
        setArticles(articles.concat(parseData.articles));
        setTotalResultsPage(parseData.totalResults);
      };

   
        
        return (
            <>
            <h1 className='text-center' style={{margin : '40px',marginTop: '90px'}}>News Monkey : {props.category} Top headlines</h1>
            {loading && <Spinner/>}
            <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner/>}
            >
            <div className="container">
                    <div className="row">
                    {
                    articles.map((element)=>{
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
                
                <button disabled={page<=1} className="btn btn-dark my-2 mx-2" onClick={handlePrevClick}>&larr; Previous</button>
                <button disabled={(page+1 > Math.ceil( totalResults/props.pagesize))}  className="btn btn-dark my-2 mx-2" onClick={handleNextClick}>Next &rarr;</button>
            </div> */}
            </>
        )
    
}
News.defaultProps={
    category:'general'
}
export default News