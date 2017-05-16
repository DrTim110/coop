import React from 'react';

/**
 * `SearchField` is a composite of a dropdown for search types, a text field for what to search for, and 
 * a search button.
 */
export default class SearchField extends React.Component {

    /**
     * props:{
     *  default: {label:String} The default selected option. Label is a required field.
     *  onSearch: {function} What to do when the search button is clicked.
     *  options: {[{
     *      label:String,
     *      type:String
     *   }]} The drop down options array, each object requires a label and type field. Type will give keys for the dropdown.
     * }
     */
    constructor(props){
        super();
        this.state = {
            type: props.default,
            value: '',
            optionsOpen: false
        };

    }
    /**
     * Set the states value, based upon the text field
     */
    setValue(evt){
        var state = Object.assign({}, this.state);
        state.value = evt.target.value;
        this.setState(state);
    }

    /**
     * Toggle the toggle options dropdown open.
     */
    toggleOptionsOpen(){
        var state = Object.assign({}, this.state);
        state.optionsOpen = !this.state.optionsOpen;
        this.setState(state);
    }

    /**
     * Select an option from the dropdown and close it.
     */
    selectOption(obj){
        var state = Object.assign({}, this.state);
        state.type = obj;
        state.optionsOpen = false;
        this.setState(state);
        return false;
    }

    /**
     * Render the option dropdown, input, and select button
     * TODO: Discuss if the dropdown should be its own component?
     */
    render(){

        const options = this.props.options.map((obj, index) => {
            return (
                <li key={obj.type}>
                    <a href="#" onClick={() => this.selectOption(obj)}>{obj.label}</a>
                </li>
            );
        })

        const inputStyle = {
            width:'300px'
        }

        return (
            <div className="input-group">
                <div className={'input-group-btn' + (this.state.optionsOpen ? ' open' : '')}>
                    <button type="button" className="btn btn-default dropdown-toggle" onClick={this.toggleOptionsOpen.bind(this)}>{this.state.type.label}<span className="caret"></span></button>
                    <ul className="dropdown-menu">
                        {options}
                    </ul>
                </div>
                <input type="text" className="form-control" style={inputStyle}  value={this.state.value} onChange={this.setValue.bind(this)}placeholder="Search for..." />
                <span className="input-group-btn">
                    <button className="btn btn-default" type="button" onClick={() => this.props.onSearch(this.state)}>Search</button>
                </span>
            </div>
        )
    }
}