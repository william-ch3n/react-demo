import React, { Component } from 'react';
import './Todo.css';

export default class Todo extends Component {

  state = {
    taskList : [], // todo列表
    taskAll : 0, // todo总数
    taskDone : 0, // todo已完成总数
    taskId: 0, // todo id用于给任务编号
    checkAll: false // 用于标记todo是否打勾
  }

  refInput = React.createRef();

  /*
    回应键盘上的enter输入，再触发添加任务函数
   */
  enterTask = (e) => {
    if(e.keyCode === 13){
      this.addTask();
    }
  }

  /*
    生成一个task对象，获取输入框中的数据。然后清除输入框中的数据。
    这里通过createRef来获取
   */
  addTask = () => {
      let taskList = this.state.taskList;
      let task = {id : this.state.taskId, name : this.refInput.current.value, check : false}
      taskList = [task, ...taskList];
      this.setState({taskList, taskId: this.state.taskId+1, taskAll: taskList.length});
      this.refInput.current.value = null;
  }

  /*
    删除单个任务。
    难点在于如何通过deleteOne的id获取taskId
   */
  deleteOneTask = (event) => {
    let deleteOneId = event.target.id;
    let taskId = deleteOneId.replace("deleteOne_", "")
    let taskList = this.state.taskList;
    let done = this.state.taskDone;

    for(let i = 0; i < taskList.length; i++){
      if(taskList[i].id == taskId){
        done = taskList[i].check == true ? done - 1 : done;
        taskList.splice(i, 1);
        break;
      }
    }
    this.setState({taskList, taskAll: taskList.length, taskDone: done});
  }

  /*
    给task打勾/取消打勾
    由于列表中的元素个数会变动，所以需要遍历来获取对应task对象
    并动态改动taskDone的数量
   */
  taskCheck = (event) => {
    let taskList = this.state.taskList;
    let targetId = event.target.id.replace("check_","");
    let count = this.state.taskDone;
    for(let i = 0; i < taskList.length; i++){
      if(taskList[i].id == targetId){
        taskList[i].check = !taskList[i].check;
        count = taskList[i].check ? count+1 : count-1;
        break;
      }
    }
    this.setState({taskList, taskDone: count});
  }


  /*
    全选所有任务/反全选所有任务
    遍历所有对象，并将其checked属性取反
   */
  toggleAll = () => {
    let taskList = this.state.taskList;
    let flag = !this.state.checkAll;
    for(let i = 0; i < taskList.length; i++){
      let id = taskList[i].id;
      let checkbox = document.getElementById("check_"+id);
      checkbox.checked = flag;
      taskList[i].check = flag;
    }
    this.setState({taskList, taskDone: flag ? this.state.taskAll : 0, checkAll : flag});
  }

  /*
    删除全部
    重置所有state属性
   */
  deleteAll = () => {
    let deleteAllFlag = window.confirm("Are you sure to delete all?");
    if(deleteAllFlag == true){
      let taskList = this.state.taskList;
      taskList = [];
      this.setState({taskList, taskDone:0, taskAll:0, checkAll:false});
    }
    
  }


  render() {
    return (
    <div className="outFrame">
    {/* header */}
    <div className="inputArea">
      <span className="inputSpan">Add new task:</span>
      <input className="inputInput" ref={this.refInput} type="text" placeholder="enter new task..." onKeyDown={(e) => {this.enterTask(e)}}/>
    </div>

    <div className="taskList">
      {
        this.state.taskList.map(
          (task) => {
            return (
              <div className="taskDiv" key={"task_"+task.id} id={"task_"+task.id}>
                <input className="taskCheck" id={"check_"+task.id} type="checkbox" onChange={ (event)=> {this.taskCheck(event)}}/>
                <span className="taskName">{task.name}</span>
                <button className="deleteOne" key={"deleteOne_"+task.id} id={"deleteOne_"+task.id} onClick={(event) => {this.deleteOneTask(event)}}>delete</button>
              </div>
            )
          }
        )
      }
      </div>

      <input type="checkbox" onChange={ this.toggleAll }/>
      <span>已完成{this.state.taskDone}/全部{this.state.taskAll}</span>
      <button onClick={this.deleteAll}>Delete All</button>
    </div>
    )
  }
}
