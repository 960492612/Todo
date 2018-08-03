import { STATUS, STATUS_TEXT } from "@/common/js/config";
const COLORS = ["#45b345", "yellow", "#6161e8", "gray", "#fb4913"];
export class Todo {
  constructor({
    id,
    title,
    info,
    begin,
    end,
    children,
    weight,
    status,
    parent
  }) {
    this.id = id || begin.getTime();
    this.title = title || "暂无标题";
    this.info = info || "暂无详细说明";
    this._begin = begin;
    this._weight = weight || 1; //default
    this._status = status || STATUS["active"];
    this._end = this.isActive() ? new Date() : end; //如果依旧在进行中，应当更新结束时间
    this.parent = parent || {
      time: {
        begin: null,
        end: null
      }
    };
    this.editAble = true;
    this.children = this.initChildren(children);
  }
  set end(time) {
    let temp = time ? time : new Date();
    this._end = temp;
    this.children.forEach(item => {
      item.parent.time.end = temp;
    });
  }
  get end() {
    return this._end;
  }
  get begin() {
    return this._begin;
  }
  set status(status) {
    if (status != "active") {
      if (
        this.children.every(item => {
          return item.status != STATUS['active'];
        })
      ) {
        this._status = STATUS[status];
        this.end = new Date();
      }else{
        throw new Error('尚有子事件正在进行中')
      }
    }else{
      this._status = STATUS[status];
      this.end = new Date();
    }
  }
  get status() {
    return this._status;
  }
  get status_text() {
    let temp = {};
    for (let i in STATUS) {
      temp[STATUS[i]] = i;
    }
    return STATUS_TEXT[temp[this.status]];
  }
  set weight(weight) {
    this._weight = weight;
  }
  get weight() {
    return this._weight;
  }
  isActive() {
    return this._status == STATUS["active"];
  }
  getWidthPercent() {
    if (!this.parent.time.begin || this.isActive()) {
      return 1;
    }
    let end = this._end ? this._end.getTime() : new Date().getTime();
    let begin = this._begin.getTime();
    let __end = this.parent.time.end.getTime()
      ? this.parent.time.end.getTime()
      : new Date().getTime();
    let __begin = this.parent.time.begin.getTime();
    // console.log((end-begin)/(__end-__begin));

    return ((end - begin) / (__end - __begin)).toFixed(2);
  }
  getStatusColor() {
    return COLORS[this.status];
  }
  //递归实例化children
  initChildren(children) {
    if (!children || children.length == 0) {
      return [];
    }
    return children.map(item => {
      let todo = new Todo(item);
      todo.parent.time.end = this._end;
      return todo;
    });
  }
  getJson() {
    return {
      id: this.id,
      title: this.title,
      info: this.info,
      begin: this._begin,
      end: this._end,
      children:
        this.children.length > 0
          ? this.children.map(item => {
              return item.getJson();
            })
          : [],
      weight: this._weight,
      status: this._status,
      parent: this.parent,
      editAble: this.editAble
    };
  }
  addTodoItem(item) {
    item instanceof Todo &&
      this.children.push(
        (() => {
          item.parent.time = {
            begin: this.begin,
            end: this.end
          };
          return item;
        })()
      );
  }
  deleteTodoItem(id) {
    this.children = this.children.filter(item => {
      return item.id != id;
    });
  }
}
