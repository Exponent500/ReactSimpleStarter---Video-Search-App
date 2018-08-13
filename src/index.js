import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

// YouTube Data Api key
const API_KEY = 'AIzaSyBnLNk3Xc7YNFzEIyMWdKLZ-270rx5CxSQ';

// Create a new component. This component should produce
// some HTML
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('surfboards');
    }

    videoSearch(term) {
        YTSearch( {key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce( (term) => { this.videoSearch(term) }, 800);
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos}/>
            </div>
        );
    };
}

// Take this component's generated html and put it
// on the page (which means, place it in the DOM).

// Providing it with <App /> is a way of giving the render
// method an INSTANCE of the above App class. This is
// necessary as the render method only works with instances
// of a class and not the class itself.

// But we also need to tell it WHERE to place the App component.
// That's what the second argument is for -- it tells React
// where on the DOM to add this component.
ReactDOM.render(<App />, document.querySelector('.container'));