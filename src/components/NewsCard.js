import React from 'react'

const NewsCard = (props) => {
    const singleNews = props.singleNews

    return(
        <div className="col-md-12 news-card">
            <div className="card">
                <div className="card-body d-flex flex-row">
                    <div className="float-right ml-3 w-75">
                        <h5 className="card-title"> {singleNews.title} </h5>
                        <p> {singleNews.content} </p>
                    </div>
                </div>
            </div>
        </div>
    );
}   

export default NewsCard