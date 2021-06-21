import * as React from "react";
import "../styles/Modal.css"

export const PopupContext = React.createContext({});

export class PopupProvider extends React.PureComponent {
    static Toggle = ({children, className}) => (
        <PopupContext.Consumer>
            {data => (
                <button aria-label="toggle modal" onClick={data.popup.show} className={className}>
                    {children}
                </button>
            )}
        </PopupContext.Consumer>
    );

    state = {
        isOpen: false,
        title: null,
        content: null,
    };

    toggleShow = (title, content) => {
        this.setState({
            isOpen: !this.state.isOpen,
            title,
            content,
        })
    };

    render() {
        const {children} = this.props;
        const {isOpen, title, content} = this.state;
        const displayTitle = typeof title !== "string" ? null : title;

        return (
            <PopupContext.Provider value={
                {
                    popup: {
                        show: this.toggleShow,
                    }
                }
            }>
                <PopupProvider.Toggle className={`overlay ${isOpen && 'active'}`}/>

                <div className={`inner ${isOpen && 'active'}`}>
                    <div className="header">
                        {displayTitle}
                        <PopupProvider.Toggle>X</PopupProvider.Toggle>
                    </div>
                    <div className="content">
                        {content}
                    </div>
                </div>
                {children}

            </PopupContext.Provider>
        );
    }
}
