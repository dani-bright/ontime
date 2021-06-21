import * as React from "react";
import '../styles/Heading.css'
import {SmartCategorySelector} from "./CategorySelector";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getSelectedCategory} from "../selectors/category/getSelectedCategory";
import {getCategory} from "../selectors/category/getCategory";
import {connect} from "react-redux";
import {getCategories} from "../selectors/category/getCategories";

export class Heading extends React.PureComponent {
    render() {
        const {pageTitle, icon, category} = this.props;
        const categoryName = category.length ? "All" : category.name;
        return (
            <div className="heading">
                <div className="headingTitle">
                    <FontAwesomeIcon icon={icon} size="lg" style={{color: '#46d2e9'}}/>
                    <p>{pageTitle}</p>
                </div>
                <div style={{textAlign: "center", marginRight:'15px'}}>
                    <p style={{margin: '0', color: '#46d2e9'}}>{categoryName}</p>
                    <SmartCategorySelector/>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    const categoryId = getSelectedCategory(state);
    const category = typeof categoryId === "number" && categoryId !== 0 ? getCategory(state)(categoryId) : getCategories(state);
    return {
        category,
    }

};

export const SmartHeading = connect(mapStateToProps)(Heading);