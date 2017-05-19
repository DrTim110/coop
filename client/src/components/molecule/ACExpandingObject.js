import React from 'react';
import API from '../../Utilities/API.js';
import Loading from '../atom/Loading.js';

/**
 * `ACExpandingObject` is meant to start with a root object, and then
 * be able to add its children visually.
 */
export default class ACExpandingObject extends React.Component {
    
    /**
     * Query api for an object.
     */
    query(type, value) {
        this.modifyState({
            loading: true
        });
        API.object(type, value).then((res) => {
            this.apiResponded(res, 'queryResult');
        });
    }

    modifyState(toModify) {
        let newState = this.state || {};
        newState = Object.assign(newState, toModify);
        this.setState(newState);
    }
    /**
     * Load from a reference
     */
    loadFromRef(ref, stateProperty) {
        API.objectFromRef(ref).then((res) => {
            this.apiResponded(res, stateProperty);
        });
    }

    apiResponded(res, stateProperty) {
        let afterState = {
            loading: false
        };

        if (res.ok) {
            res.json().then((json) => {
                console.log(json);
                afterState[stateProperty] = json;
                this.modifyState(afterState);
            });
        } else {
            res.text().then((text) => {
                console.log(text);
            });
            afterState[stateProperty] = undefined;
            this.modifyState(afterState);
        }
    }

    componentDidMount()
    {
        console.log("Mounting");
        var props = this.props;
        /**
         * Passed in query result, query was performed earlier
         */
        if(props['queryResult'])
        {
            this.modifyState('queryResult', props['queryResult']);
        }
        else
        { // check if can query

            // if using ref, then use ref
            if(props['objectRef'])
            {
                this.modifyState({
                    loading: true
                });
                this.loadFromRef(props['objectRef'], 'queryResult');
            }
            else if(props['formattedId'] && props['type'])
            { // else, use the formattedId and type
                this.query(props['type'], props['formattedId']);
            }
        }
        
        
    }

    componentWillUnmount()
    {
        console.log("Unmounting");
    }

    render() {
        let state = this.state || {};
        let loadingBar = state.loading ? (
            <Loading />
        ) : undefined;

        let results;
        if(state.queryResult && ! state.loading){
            console.log(state.queryResult);
            results = state.queryResult.Results.map((obj, index) => {
                let childrenSearch = undefined;
                let ref = undefined;
                let formattedId = undefined;
                let name = undefined;
                let type = undefined;
                if(!obj)
                {
                    obj = state.queryResult;
                }
                if(obj)
                {
                    if(obj.Children && obj.Children.Count > 0)
                    {
                        childrenSearch = (<button onClick={()=> this.loadFromRef(obj.Children._ref, 'children')} className="btn btn-info">
                            Find Children
                        </button>);
                    }
                    ref = obj._ref;
                    formattedId = obj.FormattedID;
                    name = obj.Name;
                    type = obj._type || obj.PortfolioItemTypeName;
                }
                return (
                    <div key={ref}>
                        {formattedId}: {name} ({type})
                        {childrenSearch}
                    </div>
                )
            });
        }

        let children;
        
        if(state.children)
        {
            children = state.children.Results.map((obj, index) => {
                return (
                    <div key={obj._ref}>
                    <ACExpandingObject key={obj._ref} objectRef={obj._ref} />
                    </div>
                )
            });
        }

        let divStyle = {
            marginLeft:'10px'
        }

        return (
            <div>
                {loadingBar}
                {results}
                <div style={divStyle}>
                    {children}
                </div>
            </div>  
        );
    }
}