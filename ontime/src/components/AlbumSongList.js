import * as React from "react";
import {SmartAlbumSongs} from "./AlbumSongs";

export class AlbumSongList extends React.PureComponent {

    render() {
        const {songs, idAlbum, show} = this.props;
        return (
            <>
                {
                    show ? (
                        songs.map((song, index) => (
                            <SmartAlbumSongs idSong={song.id} key={index} idAlbum={idAlbum}/>
                        ))
                    ) : null
                }
            </>
        )
    }
}