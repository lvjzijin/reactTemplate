import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import {Provider} from 'react-redux';
import store from './redux/store';
import getRouter from './router/router';
import { IntlProvider } from 'react-intl';
import './common/styles/common.less';
import './common/styles/index.less';
import intlService from './common/service/intlService';
const {getLocale, getMessages } = intlService;

renderWithHotReload(getRouter());
/*初始化*/
if(module.hot){
    module.hot.accept('./router/router', ()=>{
        const getRouter = require('./router/router').default;
        renderWithHotReload(getRouter())
    });
}

function renderWithHotReload(RootElement){
    ReactDom.render(
        <AppContainer>
            <IntlProvider locale={getLocale()} message={getMessages()['zh']}>
                <Provider store={store}>
                    {RootElement}
                </Provider>
            </IntlProvider>
        </AppContainer>
        ,document.getElementById('root')
    )
}

