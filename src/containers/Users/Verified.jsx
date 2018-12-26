import React, {Component} from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import intlService from 'ucCommon/intlService';
const {formatMessage} = intlService;


class Verified extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className="uc-wc-content">
                <div className="uc-wc-content-header">{formatMessage({id: "VERIFITY"})}</div>
                <div className="uc-wc-content-body">
                    <div>
                        <span>实名认证</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Verified;