import React from 'react'
import Header from "../components/common/Header";
import CreatePodcastform from '../components/StartAPodcast/CreatPodcastForm';

function CreateAPodcast() {
    return (
        <div> <Header/>
        <div className="input-wrapper">
        <h1>Create A Podcast</h1>
        <CreatePodcastform/>
        </div>
        </div>
    )
}

export default CreateAPodcast