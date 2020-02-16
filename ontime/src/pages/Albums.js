import * as React from "react";
import {connect} from "react-redux";
import {AlbumList} from "../components/AlbumList";
import {getAlbums} from "../selectors/album/getAlbums";
import {SmartHeading} from "../components/Heading";
import {faCompactDisc} from "@fortawesome/free-solid-svg-icons";
import {getSelectedCategory} from "../selectors/category/getSelectedCategory";
import {getAlbumsByCategory} from "../selectors/album/getAlbumsByCategory";

export class Albums extends React.PureComponent {
    render() {
        const {albums} = this.props;
        return (
            <div className="albumContainer">
                <SmartHeading icon={faCompactDisc} pageTitle="albums"/>
                <div className="container">
                    <AlbumList albums={albums}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const categoryId = getSelectedCategory(state);
    const albums = typeof categoryId === "number" ? getAlbumsByCategory(state)(categoryId) : getAlbums(state);
    return {
        albums,
    }
};

export const SmartAlbums = connect(mapStateToProps)(Albums);