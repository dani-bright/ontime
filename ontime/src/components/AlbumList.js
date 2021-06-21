import * as React from "react";
import {SmartAlbumDetail} from "./AlbumDetails";

export class AlbumList extends React.PureComponent {


    render() {
        const {albums} = this.props;

        return (
            <>
                {albums.map(album => (
                    <SmartAlbumDetail idAlbum={album.id} key={album.id}/>
                ))}
            </>
        )
    }
}
