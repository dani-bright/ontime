import * as React from "react";
import {SongList} from "./SongList";

export class AlbumList extends React.PureComponent {

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
