import * as React from "react";
import '../styles/Heading.css'
import {SmartCategorySelector} from "./CategorySelector";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getSelectedCategory} from "../selectors/category/getSelectedCategory";
import {getAlbumsByCategory} from "../selectors/album/getAlbumsByCategory";
import {getAlbums} from "../selectors/album/getAlbums";
import {getCategory} from "../selectors/category/getCategory";
import {connect} from "react-redux";

export class Heading extends React.PureComponent {
    render() {
        const {pageTitle, icon} = this.props;
        return (
            <div className="heading">
                <div className="headingTitle">
                    <FontAwesomeIcon icon={icon} size="lg" style={{color: '#fff'}}/>
                    <p>{pageTitle}</p>
                </div>
                <div>
                    <p style={{margin: '0', color: '#fff'}}>{this.props.category.name}</p>
                    <SmartCategorySelector/>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    const categoryId = getSelectedCategory(state);
    const category = typeof categoryId === "number" ? getCategory(state)(categoryId) : getAlbums(state);
    return {
        category,
    }

};

export const SmartHeading = connect(mapStateToProps)(Heading);