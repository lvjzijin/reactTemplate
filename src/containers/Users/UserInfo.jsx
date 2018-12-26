import React, {Component} from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import intlService from 'ucCommon/intlService';
const {formatMessage} = intlService;


class UserInfo extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className="uc-wc-content">
                <div className="uc-wc-content-header">{formatMessage({id: "ACCOUNT_SECURITY"})}</div>
                <div className="uc-wc-content-body">
                    <div>
                        <span>用户中心001</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserInfo;