import * as React from "react";
import {AuthenticationContext} from "../contexts/AuthentificationContext";
import ReactAudioPlayer from 'react-audio-player';
import {SongList} from "./SongList";

export class AlbumList extends React.PureComponent {
    static contextType = AuthenticationContext;

    render() {
        const {albums} = this.props;
        return (
            <>
                {albums.map(album => (
                    <SongList songs={album.songs}/>
                ))}
            </>
        )
    }
}
