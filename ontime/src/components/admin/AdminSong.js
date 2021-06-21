import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {getNowPlaying} from "../../selectors/audio/getNowPlaying";


class AdminSong extends React.PureComponent {
    render() {
        const {song, nowPlaying} = this.props;
        const image = song.img ? <img src={song.img} width={50} alt=""/> : null;
        return (
            <tr>
                <td>{song.id}</td>
                <td>{image}</td>
                <td>{song.name}</td>
                <td>
                    {
                        nowPlaying.id !== song.id ? (
                            <>
                                <FontAwesomeIcon icon={faEdit} size="lg" id={song.id} onClick={this.props.edit}
                                                 color="#D7E944" style={{marginRight: "5px"}}/>

                                <FontAwesomeIcon icon={faTrashAlt} size="lg" id={song.id} onClick={this.props.delete}
                                                 color="#e04343"/>
                            </>
                        ) : null
                    }

                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        nowPlaying: getNowPlaying(state)
    }
};

export const SmartAdminSong = connect(mapStateToProps)(AdminSong);
