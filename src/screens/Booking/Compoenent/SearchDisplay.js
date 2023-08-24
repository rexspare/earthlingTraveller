import React, { Component } from 'react';
import { Text  } from 'react-native-elements';

class SearchDisplay extends Component{
    componentDidMount(){
        console.log(this.props.data);
    }   
    render(){
        return(
            <>
                <Text>Search Display</Text>
            </>
        )
    }
}

export default SearchDisplay;