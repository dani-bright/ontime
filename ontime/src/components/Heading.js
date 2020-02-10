import * as React from "react";
import '../styles/Heading.css'
import {SmartCategorySelector} from "./SongCategorySelector";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export class Heading extends React.PureComponent {
    render() {
        const {pageTitle, icon} = this.props;
        return (
            <div className="heading">
                <div className="headingTitle">
                    <FontAwesomeIcon icon={icon} size="lg" style={{color: '#fff'}}/>
                    <p>{pageTitle}</p>
                </div>

                <SmartCategorySelector/>
            </div>
        )
    }

}