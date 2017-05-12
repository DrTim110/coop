import React from 'react';

export default class SearchField extends React.Component {

    constructor(props){
        super();
        this.state = {
            type: props.default,
            value: '',
            optionsOpen: false
        };

    }

    setValue(evt){
        var state = Object.assign({}, this.state);
        state.value = evt.target.value;
        this.setState(state);
    }

    toggleOptionsOpen(){
        var state = Object.assign({}, this.state);
        state.optionsOpen = !this.state.optionsOpen;
        this.setState(state);
    }

    selectOption(obj){
        var state = Object.assign({}, this.state);
        state.type = obj;
        state.optionsOpen = false;
        this.setState(state);
        return false;
    }

    render(){

        const options = this.props.options.map((obj, index) => {
            return (
                <li key={obj.type}>
                    <a href="#" onClick={() => this.selectOption(obj)}>{obj.label}</a>
                </li>
            );
        })

        return (
            <div className="input-group">
                <div className={'input-group-btn' + (this.state.optionsOpen ? ' open' : '')}>
                    <button type="button" className="btn btn-default dropdown-toggle" onClick={this.toggleOptionsOpen.bind(this)}>{this.state.type.label}<span className="caret"></span></button>
                    <ul className="dropdown-menu">
                        {options}
                    </ul>
                </div>
                <input type="text" className="form-control" value={this.state.value} onChange={this.setValue.bind(this)}placeholder="Search for..." />
                <span className="input-group-btn">
                    <button className="btn btn-default" type="button" onClick={() => this.props.onSearch(this.state)}>Search</button>
                </span>
            </div>
        )
    }
}