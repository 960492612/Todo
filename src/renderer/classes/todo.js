const STATUS = {
  active: 0,
  pause: 1, //暂停的事件
  finished: 2,
  cancel: 3, //取消的事件
  error: 4
};
const COLORS = ["blue", "yellow", "green", "gray", "red"];
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
    
    this.children = this.initChildren(children);
    this._weight = weight || 1; //default
    this._status = status || STATUS["active"];
    this._end = this.status == STATUS['active']? new Date(): end;//如果依旧在进行中，应当更新结束时间
    this.parent = parent || ({
      time: {
        begin: null,
        end: null
      }
    });
  }
  set end(time) {
    let temp = time ? time : new Date();
    this._end = temp;
    this.children.forEach(item => {
      item.parent.time.end = temp;
    });
  }
  get end() {
    return this._end 
  }
  get begin() {
    return this._begin
  }
  set status(status) {
    this._status = STATUS[status] ? STATUS[status] : STATUS["active"];
  }
  get status() {
    return this._status
  }
  set weight(weight) {
    this._weight = weight;
  }
  get weight() {
    return this._weight
  }
  getWidthPercent() {
    if (!this.parent.time.begin) {
      return 1;
    }
    let end = this._end ? this._end : new Date().getTime();
    let begin = this._begin.getTime();
    let __end = this.parent.time.end ?
      this.parent.time.end.getTime() :
      new Date().getTime();
    let __begin = this.parent.time.begin.getTime();
    return Number(((end - begin) / (__end - __begin)).toFixed(2));
  }
  getStatusColor() {
    return COLORS[this.status];
  }
  //递归实例化children
  initChildren(children) {
    if (!children || children.length == 0) {
      return []
    }
    return children.map(item => {
      return new Todo(item)
    })
  }
  getJson() {
    return {
      id: this.id,
      title: this.title,
      info: this.info,
      begin: this._begin,
      end: this._end,
      children: this.children.length > 0 ? (this.children.map(item => {
        return item.getJson()
      })) : [],
      weight: this._weight,
      status: this._status,
      parent: this.parent
    }
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