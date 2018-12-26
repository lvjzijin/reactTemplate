import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import intlService from 'ucCommon/intlService';
const {formatMessage} = intlService;

class Header extends Component{
    getHeaderNav(){
        const navs = [
            {
                name: formatMessage({id: "ITEM_1"}),
                path: "/user",
                component: "Item1"
            }, {
                name: formatMessage({id: "ITEM_2"}),
                path: "/item2",
                component: "item2",
            }, {
                name: formatMessage({id: "ITEM_3"}),
                path: "/item3",
                component: "item3"
            }, {
                name: formatMessage({id: "ITEM_4"}),
                path: "/item4",
                component: "item4"
            }
        ];
        return navs;
    }

    onHandleClick(){

    }
    render(){
        let navs = this.getHeaderNav();
        return(
            <section className="u-layout-header">
                <div className="u-header-left">
                    <div className="logo">
                        <NavLink to="/" className="u-header-title">A项目</NavLink>
                    </div>
                    <ul>
                        {navs.map((item, index)=>{
                            return(
                                <li key={item.key+ '_'+ index} onClick={()=>this.onHandleClick(item)}><NavLink activeClassName="u-link-active" to={item.path}>{item.name}</NavLink></li>
                            )
                        })}
                    </ul>
                </div>
                <div className="u-header-right">
                    <ul className="u-dib">
                        <li>{formatMessage({id: "LOGIN"})}</li>
                        <li>{formatMessage({id: "REGISTER"})}</li>
                    </ul>
                </div>
            </section>
        )
    }
}
export default Header;