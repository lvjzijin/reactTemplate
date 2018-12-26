import React, {Component} from 'react';
import { connect } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';
import intlService from 'ucCommon/intlService';
import UserInfo from 'containers/Users/UserInfo';
import Verified from 'containers/Users/Verified'
import { getUserInfo } from '../../redux/actions/userInfo';
// import Tickets from 'pages/Users/Tickets/index';
import _ from '_';

const {formatMessage} = intlService;

// import { getUserInfo } from '../../redux/actions/userInfo';

class Container extends Component{
    constructor(props){
        super(props);
        this.state = {
            defaultOpenKeys: _.pluck(this.getSideMenu(), 'name'),
            hideNav: false,

        }
    }
    getSideMenu(){
        const sideMenus = [
            {
                name: 'AccountManage',
                title: formatMessage({id: "USER_CENTER"}),
                children: [{
                    name: 'Security',
                    title: formatMessage({id: "ACCOUNT_SECURITY"}),
                    path: '/userInfo',
                    component: UserInfo
                }, {
                    name: "Verified",
                    title: formatMessage({id: "VERIFITY"}),
                    path: "/verified",
                    // component: Verified

                }]
            }, {
                name: "Tickets",
                title: formatMessage({id: "AUTH_MANAGE"}),
                path: '/Tickets',
                // component: Tickets
            }
        ];
        return sideMenus;
    }
    handleSwitchNav(){

    }
    toggleOpen(elem){
        let { defaultOpenKeys } = this.state;
        if(defaultOpenKeys.indexOf(elem.name)===-1){
            defaultOpenKeys.push(elem.name);
        }else{
            defaultOpenKeys.splice(defaultOpenKeys.indexOf(elem.name), 1);
        }
        this.setState({
            defaultOpenKeys: defaultOpenKeys
        })
    }
    //渲染侧边栏
    renderMenu(sideBarData){
        let { match } = this.props;
        let menu = [];
        let { defaultOpenKeys } = this.state;
        sideBarData.forEach((elem, index)=>{
            if(elem.children){
                let open = defaultOpenKeys.indexOf(elem.name)> -1;
                menu.push(
                    <div className="uc-wc-nav-subs" key={elem.title}>
                        <div className="uc-wc-nav-item u-font-nowrap u-font-ellipsis u-cursor-p"
                             onClick={()=>this.toggleOpen(elem)}>
                            {/*<icon className="u-mr4" type={open ? 'caret-down' : 'caret-right'}/>*/}
                            {elem.title}
                        </div>
                        {
                            open && this.renderMenu(elem.children)
                        }
                    </div>
                )
            }else{
                menu.push(
                    <NavLink className="uc-wc-nav-item u-font-nowrap u-font-ellipsis"
                             activeClassName="uc-wc-nav-item-active"
                             key={elem.title}
                             to={match.path +elem.path}>
                        {elem.title}
                    </NavLink>
                )
            }
        });
        return menu;
    }
    //渲染路由
    renderRoute(sideBarData){
        let { match } = this.props;
        let routes = [];
        sideBarData.forEach((item, index)=>{
            if(item.children){
                routes.push(
                    this.renderRoute(item.children)
                )
            }else{
                routes.push(
                    <Route key={item.name} path={match.path + item.path} component={item.component}/>
                )
            }
        })
        return routes;
    }
    render(){
        let sideBarData = this.getSideMenu();
        const  menuElems = this.renderMenu(sideBarData);
        const routeElems = this.renderRoute(sideBarData);
        return(
            <div className={`uc-comp uc-wc-wrapper`}>
                <div className="uc-wc-nav">
                    {menuElems}
                </div>
                <Switch>
                    {routeElems}
                </Switch>
            </div>
        )
    }
}

export default connect((state)=>({userInfo: state.userInfo}),{getUserInfo})(Container);