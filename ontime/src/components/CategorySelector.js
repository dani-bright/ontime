import * as React from "react";
import {connect} from "react-redux";
import {getCategories} from "../selectors/getCategories";
import {changeSelectedCategory} from "../action-creator/changeSelectedCategory";

export class CategorySelector extends React.PureComponent {

    onCategorySelected = (e) => {
        this.props.changeSelectedCategory(parseFloat(e.target.value))
    };

    render() {
        return (
            <select name="" id="" onChange={this.onCategorySelected}>
                <option value=""></option>
                {this.props.categories.map(category => (
                    <option value={category.id} key={category.id}>{category.name}</option>
                ))}
            </select>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        categories: getCategories(state)
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        changeSelectedCategory: (categoryId) => dispatch(changeSelectedCategory(categoryId))
    }
};

export const SmartCategorySelector = connect(mapStateToProps, mapDispatchToProps)(CategorySelector);