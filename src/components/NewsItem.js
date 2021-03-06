import React from "react";

const NewsItem = (props)=> {
  
        let { titile, description, imageURl, newsURL, author, publishedAt, source } = props;
        return (
            <>
                <div className="my-3">
                    <div className="card">
                    <div>
                        <span className="badge rounded-pill bg-danger"
                              style={{display: 'flex',justifyContent: 'flex-end',position:'absolute',right:'0'}}     >
                                    {source}
                                </span>
                        </div>
                        <img
                            src={
                                imageURl
                                    ? imageURl
                                    : "https://www.infomoney.com.br/wp-content/uploads/2021/12/coinbase.jpg?quality=70"
                            }
                            className="card-img-top"
                            alt="..."
                        />
                       
                        
                        <div className="card-body">
                            <h5 className="card-title">
                                {titile}
                                
                            </h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text">
                                <small className="text-muted">
                                    By {!author ? "Unknown" : author} on
                                    {new Date(publishedAt).toGMTString()}
                                </small>
                            </p>
                            <a
                                href={newsURL}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-sm btn-dark"
                            >
                                Read More
                            </a>
                        </div>
                    </div>
                </div>
            </>
        );
    
}
export default NewsItem;