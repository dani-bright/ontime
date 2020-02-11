import * as React from "react";
import {connect} from "react-redux";
import {AlbumList} from "../components/AlbumList";
import {getAlbums} from "../selectors/getAlbums";
import {Heading} from "../components/Heading";

export class Albums extends React.PureComponent {
    render() {
        const {albums} = this.props;
        return (
            <div className="container">
                <Heading pageTitle="albums"/>

                <AlbumList albums={albums}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        albums: getAlbums(state),
    }
};

export const SmartAlbums = connect(mapStateToProps)(Albums);