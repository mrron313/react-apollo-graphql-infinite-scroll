import React, { Component } from "react";
import NewsCard from './NewsCard'

class NewsList extends Component {
  componentDidMount() {
    this.refs.iScroll.addEventListener("scroll", this.handleOnScroll);
  }

  componentWillUnmount() {
    this.refs.iScroll.removeEventListener("scroll", this.handleOnScroll);
  }

  handleOnScroll = () => {
    if (
      this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=
      this.refs.iScroll.scrollHeight
    ) {
      this.props.onLoadMore();
    }
  };

  render() {
    if (!this.props.entries && this.props.loading) return <p>Loading....</p>
    const news = this.props.entries.edges || []
    const windowHeight = window.screen.height - 200

    return (

      <div>
        <div ref="iScroll" style={{ height: windowHeight, paddingBottom: "100px", overflow: "auto" }}>
          {news.map(({ node }, idx) => (

            <NewsCard key={idx} singleNews={node} />

          ))}
          {this.props.loading && <h2>Loading...</h2>}
        </div>
      </div>

    );
  }
}

export default NewsList;
