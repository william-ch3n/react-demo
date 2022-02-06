import React from 'react';
import clock from './clock.module.css';

// 继承react组件，并暴露该组件
export default class Clock extends React.Component {
    // 初始化state
    state = {datetime:null}

    // 自定义一个组件函数
    getCurrentTime = () => {
        // 定义一个定时器，每隔一秒获取当前时间
        // 并将当前时间赋值给state
        setInterval(()=>{
            let datetime = new Date().toLocaleString();
            this.setState({datetime});
        }, 1000);
    }

    // 重写componentDidMount方法，在组件挂载完之后调用指定方法
    componentDidMount(){
        this.getCurrentTime();
    }

    render(){
        return(
            <h1 className={clock.clock}>
                {/* 将state中的datetime的值输出到DOM元素中 */}
                {this.state.datetime}
            </h1>
        );
    }
}
