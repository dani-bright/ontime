import * as React from "react";
import {SmartSongDetail} from "./SongDetails";

export class SongList extends React.PureComponent {

    render() {
        const {songs} = this.props;
        return (
            <>
                {songs.map((song, index) => (
                    <div key={song.id + index}>
                        <SmartSongDetail idSong={song.id} key={index}/>
                    </div>
                ))}
            </>
        )
    }
}
