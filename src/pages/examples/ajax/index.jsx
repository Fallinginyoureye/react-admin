import React, {Component} from 'react';
import {Button,Table, Row, Col} from 'antd';
import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';

@config({
    path: '/example/ajax',
    ajax: true,
})
export default class Ajax extends Component {
    state = {
        dataSource: [],     // 表格数据
        loading: false,
    };
    columns = [
        {title: '姓名', dataIndex: 'name', width: 200},
        {title: '年龄', dataIndex: 'age', width: 200},
        {title: '工作', dataIndex: 'job', width: 200},
        {title: '职位', dataIndex: 'position', width: 200},
        {title: '手机', dataIndex: 'mobile', width: 200},
        {title: '邮箱', dataIndex: 'email', width: 200},
    ]
    componentDidMount() {
    }

    handleSendGet = () => {
        const params = {
            name: 'test',
            age: 0,
            job: '无业游民',
            position: '家里蹲',
            mobile: '18611434353',
            email: '666_boy@qq.com',
        };

        this.setState({loading: true});
        this.props.ajax
            .get('/test-ajax', params, {noEmpty: true, successTip: '请求成功！'})
            .then(res => {
                console.log(res);
                const dataSource = res?.list || [];
                const total = res?.total || 10;

                this.setState({dataSource, total});
            })
            .finally(() => {
                this.setState({loading: false});
            });
    };

    handleSendGet404 = () => {
        this.setState({loading: true});
        this.props.ajax
            .get('/generator-files', null, {baseURL: '', successTip: 'get 请求成功！'})
            .then(res => {
                console.log(res);
            })
            .finally(() => {
                this.setState({loading: false});
            });
    };

    render() {
        console.log('render Ajax');
        const {columns, dataSource, selectedRowKeys,} = this.state;
        return (
            <PageContent>
                <Button onClick={this.handleSendGet}>Get Request</Button>
                <Button onClick={this.handleSendGet404}>Get Request 404</Button>
                {/*<Row>
                    <Col span={4}>姓名</Col>
                    <Col span={4}>年龄</Col>
                    <Col span={4}>工作</Col>
                    <Col span={4}>地址</Col>
                    <Col span={4}>手机</Col>
                    <Col span={4}>邮箱</Col>
                </Row>*/}
                <Table
                    rowSelection={{
                        selectedRowKeys,
                        onChange: selectedRowKeys => this.setState({selectedRowKeys}),
                    }}
                    columns={this.columns}
                    dataSource={dataSource}
                    rowKey="id"
                    pagination={false}
                />
                {/*<Row>
                    <Col span={4}>{this.state.name}</Col>
                    <Col span={4}>{this.state.age}</Col>
                    <Col span={4}>{this.state.job}</Col>
                    <Col span={4}>{this.state.position}</Col>
                    <Col span={4}>{this.state.mobile}</Col>
                    <Col span={4}>{this.state.email}</Col>
                </Row>*/}
            </PageContent>
        );
    }
}
