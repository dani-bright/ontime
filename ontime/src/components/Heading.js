import * as React from "react";
import '../styles/Heading.css'
import {SmartCategorySelector} from "./CategorySelector";

export class Heading extends React.PureComponent {
    render() {
        const {pageTitle} = this.props;
        return (
            <div className="heading">
                <p>{pageTitle}</p>
                <SmartCategorySelector/>
            </div>
        )
    }

}