import React, { Component } from 'react';
import { Tabs } from 'antd';
import MineEditor from './MineEditor';

function callback(key) {
    console.log(key);
}

class Mine extends Component {
    render() {
        const { TabPane } = Tabs;
        return (
            <div className="t-mine">
                <div className="t-mine__header">
                    <div className="t-mine__avatar">
                        <img src="" alt=""/>
                    </div>
                    <h4 className="t-mine__username">Alan</h4>
                </div>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
                    <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                </Tabs>
                <MineEditor></MineEditor>
            </div>
        );
    }
}

export default Mine;
